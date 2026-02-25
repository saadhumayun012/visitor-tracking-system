import { useState, useEffect, useRef } from "react";
import type { ActiveVisit } from "../../utils/types";
import { formatDateTime } from "../../utils/formateDateTime";

export const OfficerDashboard = () => {
    const [activeVisits, setActiveVisits] = useState<ActiveVisit[]>([]);
    const [connected, setConnected] = useState(false);
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        // Open the SSE Connection
        const es = new EventSource(
            "http://localhost:8000/branch-officer/stream",
            { withCredentials: true }
        );

        eventSourceRef.current = es;

        es.onopen = () => setConnected(true);

        es.onmessage = (event) => {
            const data: ActiveVisit = JSON.parse(event.data);

            if (data.event === "checkin") {
                setActiveVisits(prev => [...prev, data]);
            } else if (data.event === "checkout") {
                setActiveVisits(prev =>
                    prev.filter(v => v.visit_id !== data.visit_id)
                );
            }
        };

        es.onerror = () => {
            setConnected(false);
        };

        // Component unmount — connection close
        return () => {
            es.close();
            setConnected(false);
        };
    }, []);

    return (
        <div className="p-8 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between border-b pb-4">
                <h1 className="text-xl font-bold">Branch Officer Dashboard</h1>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    connected
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                }`}>
                    {connected ? "● Live" : "● Disconnected"}
                </span>
            </div>

            {/* Active Visits */}
            <div>
                <h2 className="text-sm font-semibold text-gray-500 mb-4">
                    ACTIVE VISITORS — {activeVisits.length}
                </h2>

                {activeVisits.length === 0 ? (
                    <p className="text-gray-400 text-sm">No active visitors</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {activeVisits.map((visit) => (
                            <div
                                key={visit.visit_id}
                                className="border rounded-lg p-4 flex flex-col gap-1 bg-white shadow-sm"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold">
                                        {visit.visitor_name}
                                    </span>
                                    <span className="text-xs text-gray-400">
                                        #{visit.visit_id}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-500">
                                    CNIC: {visit.cnic_number}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Purpose: {visit.purpose}
                                </span>
                                <span className="text-sm text-gray-400">
                                    Check-in: {visit.check_in_time
                                        ? formatDateTime(visit.check_in_time)
                                        : "--"
                                    }
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};