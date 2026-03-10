import { useState, useEffect, useRef } from "react";
import type { ActiveVisit } from "../../utils/types";
import { formatDateTime } from "../../utils/formatDateTime";

export const OfficerDashboard = () => {
    const [activeVisits, setActiveVisits] = useState<ActiveVisit[]>([]);
    const [connected, setConnected] = useState(false);
    const eventSourceRef = useRef<EventSource | null>(null);

    useEffect(() => {
        // Open the SSE Connection
        const es = new EventSource(
            `${import.meta.env.VITE_API_BASE_URL}/branch-officer/stream`,
            { withCredentials: true }
        );

        eventSourceRef.current = es;

        es.onopen = () => {
            setConnected(true);
            setActiveVisits([]); // Clear existing visits on new connection (handles page refresh case)
        };

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
    <div className="min-h-screen bg-gray-50 p-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-10 pb-5 border-b-2 border-gray-200">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Branch Officer Dashboard
            </h1>
            <span className={`text-lg font-semibold px-5 py-2 rounded-full ${
                connected
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
            }`}>
                {connected ? "Live" : "Disconnected"}
            </span>
        </div>

        {/* Count */}
        <h2 className="text-xl font-semibold text-gray-500 uppercase tracking-widest mb-6">
            Active Visitors : {activeVisits.length}
        </h2>

        {/* Cards */}
        {activeVisits.length === 0 ? (
            <p className="text-2xl text-gray-400 mt-20 text-center">
                No active visitors
            </p>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {activeVisits.map((visit) => (
                    <div
                        key={visit.visit_id}
                        className="bg-white rounded-2xl border border-gray-200 shadow-md p-8 flex flex-col gap-4"
                    >
                        {/* Name + ID */}
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-gray-900">
                                {visit.visitor_name}
                            </span>
                            <span className="text-sm text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                #{visit.visit_id}
                            </span>
                        </div>

                        <hr className="border-gray-100" />

                        {/* Details */}
                        <div className="flex flex-col gap-3">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">CNIC</p>
                                <p className="text-lg font-semibold text-gray-800">{visit.cnic_number}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Purpose</p>
                                <p className="text-lg font-semibold text-gray-800">{visit.purpose}</p>
                            </div>
                            <div>
                                <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">Check-in</p>
                                <p className="text-lg font-semibold text-gray-800">
                                    {visit.check_in_time ? formatDateTime(visit.check_in_time) : "--"}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
    </div>
);
};