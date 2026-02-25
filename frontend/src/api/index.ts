import { api } from "./axios";
import {login, logout, getCurrentUser} from "./auth.api"
import { getBranches, createBranch } from "./branch.api";
import { getBadges, createBadge, getAvailableBadges } from "./badge.api";
import { getUsers, createUser } from "./user.api";
import { getVisitors, createVisitor, getVisitorById, getVisitorByCnic } from "./visitor.api";
import { getVisitsOfVisitor, createVisit, findVisitByBadge, checkoutVisit} from "./visit.api"

export {
    api,
    login,
    logout,
    getCurrentUser,
    getBranches,
    createBranch,
    getBadges,
    createBadge,
    getUsers,
    createUser,
    getVisitors,
    getVisitsOfVisitor,
    createVisitor,
    createVisit,
    getVisitorById,
    getAvailableBadges,
    findVisitByBadge,
    checkoutVisit,
    getVisitorByCnic
}