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

export const visitFormLoader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const visitorId = url.searchParams.get("visitor_id");

    // Parallel fetch
    const [branches, badges] = await Promise.all([
        getBranches(),
        getAvailableBadges(),
    ]);

    let visitor = null;
    if (visitorId) {
        visitor = await getVisitorById(Number(visitorId));
    }

    return { branches, badges, visitor };
};