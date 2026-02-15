import type { LoaderFunctionArgs } from "react-router-dom";
import { 
    getBranches, 
    getBadges, 
    getUsers, 
    getVisitors,
    getVisitsOfVisitor,
    getVisitorById,
    getAvailableBadges
} from "../api"

// get all branches
export const branchesLoader = async () => {
    const branches = await getBranches();
    return { branches };
};

// get all badges
export const badgesLoader = async () => {
    const badges = await getBadges();
    return { badges };
};

// get all users
export const userLoader = async () => {
    const users = await getUsers();
    return { users };
};

// get all visitors
export const visitorLoader = async () => {
    const visitors = await getVisitors();
    return { visitors };
};

// get all visits of visitor
export const visitLoader = async ({params}: {params: any}) => {
    const visits = await getVisitsOfVisitor(params.visitor_id);
    return { visits }
};

// get all branches. and badges which are available. and visitor by Id
export const visitFormLoader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const visitorId = url.searchParams.get("visitor_id");
    
    const branches = await getBranches();
    const badges = await getAvailableBadges();
    

    let visitor = null;
    if (visitorId) {
        visitor = await getVisitorById(Number(visitorId));
    }

    return { branches, badges, visitor };
};