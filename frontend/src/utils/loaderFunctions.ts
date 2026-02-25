import type { LoaderFunctionArgs } from "react-router-dom";
import { 
    getBranches, 
    getVisitsOfVisitor,
    getVisitorById,
    getAvailableBadges
} from "../api"

// get all branches
export const branchesLoader = async () => {
    const branches = await getBranches();
    return { branches };
};

// get all visits of visitor
export const visitLoader = async ({params}: {params: any}) => {
    const visits = await getVisitsOfVisitor(params.visitor_id);
    return { visits }
};

export const visitFormLoader = async ({ params }: LoaderFunctionArgs) => {
    const visitorId = Number(params.visitor_id);

    if (!visitorId || isNaN(visitorId)) {
        throw new Response("Visitor ID required", { status: 400 });
    }

    const [branches, badges, visitor] = await Promise.all([
        getBranches(),
        getAvailableBadges(),
        getVisitorById(visitorId),
    ]);

    return { branches, badges, visitor };
};