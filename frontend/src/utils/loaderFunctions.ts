import type { LoaderFunctionArgs } from "react-router-dom";
import { 
    getBranches, 
    getVisitsOfVisitor,
    getVisitorById,
    getAvailableBadges,
    getDocumentTypes,
    getVisitorDocuments
} from "../api"

// get all branches
export const branchesLoader = async () => {
    const branches = await getBranches();
    return { branches };
};

// get all visits of visitor
export const visitLoader = async ({params}: LoaderFunctionArgs) => {
    const visitorId = Number(params.visitor_id);
    const visits = await getVisitsOfVisitor(visitorId);
    return { visits }
};

export const visitFormLoader = async ({ params }: LoaderFunctionArgs) => {
    const visitorId = Number(params.visitor_id);

    const [branches, badges, visitor] = await Promise.all([
        getBranches(),
        getAvailableBadges(),
        getVisitorById(visitorId),
    ]);

    return { branches, badges, visitor };
};

// get all document types (admin panel)
export const documentTypesLoader = async () => {
    const documentTypes = await getDocumentTypes();
    return { documentTypes };
};

// get all documents of a visitor
export const visitorDocumentsLoader = async ({ params }: LoaderFunctionArgs) => {
    const visitorId = Number(params.visitor_id);
    
    const documents = await getVisitorDocuments(visitorId);
    return { documents };
};