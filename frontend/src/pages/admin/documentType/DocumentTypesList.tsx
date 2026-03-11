import { useLoaderData } from "react-router-dom";
import type { AllDocumentType } from "../../../types";
import { DataTable } from "../../../components";
import { formatDateTime } from "../../../utils/formatDateTime";

export const DocumentTypesList = () => {
    const { documentTypes } = useLoaderData() as {
        documentTypes: AllDocumentType[];
    };

    const columns = [
        {
            header: "ID",
            accessor: (docType: AllDocumentType) => docType.document_type_id,
            className: "table-td-muted",
        },
        {
            header: "Document Name",
            accessor: (docType: AllDocumentType) => docType.document_name,
        },
        {
            header: "Document Code",
            accessor: (docType: AllDocumentType) => docType.document_code,
        },
        {
            header: "Required",
            accessor: (docType: AllDocumentType) =>
                docType.is_required ? "Yes" : "No",
        },
        {
            header: "Created At",
            accessor: (docType: AllDocumentType) => formatDateTime(docType.created_at),
        },
    ];

    return (
        <DataTable
            title="All Document Types"
            backLink="/admin"
            backText="← BACK TO ADMIN DASHBOARD"
            columns={columns}
            data={documentTypes ?? []}
            getRowKey={(docType) => docType.document_type_id}
        />
    );
};
