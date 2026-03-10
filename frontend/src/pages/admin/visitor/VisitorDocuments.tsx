import { useLoaderData } from "react-router-dom";
import type { VisitorDocument } from "../../../utils/types";
import { DataTable } from "../../../components";
import { formatDateTime } from "../../../utils/formatDateTime";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const VisitorDocuments = () => {
    const { documents } = useLoaderData() as {
        documents: VisitorDocument[];
    };

    const columns = [
        {
            header: "ID",
            accessor: (doc: VisitorDocument) => doc.visitor_document_id,
            className: "table-td-muted",
        },
        {
            header: "Document Name",
            accessor: (doc: VisitorDocument) => doc.document_name,
        },
        {
            header: "Document Code",
            accessor: (doc: VisitorDocument) => doc.document_code,
        },
        {
            header: "Uploaded By",
            accessor: (doc: VisitorDocument) => doc.uploaded_by_username ?? "—",
        },
        {
            header: "Uploaded At",
            accessor: (doc: VisitorDocument) => formatDateTime(doc.created_at),
        },
        {
            header: "View",
            accessor: (doc: VisitorDocument) => (
                <a
                    href={`${API_BASE_URL}/${doc.file_path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-view-text"
                >
                    open image
                </a>
            ),
        },
    ];

    return (
        <DataTable
            title="Visitor Documents"
            backLink="/admin/visitors-list"
            backText="← BACK TO VISITORS"
            columns={columns}
            data={documents}
            getRowKey={(doc) => doc.visitor_document_id}
        />
    );
};

