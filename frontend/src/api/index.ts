import { api } from "./axios";
import {login, logout, getCurrentUser} from "./auth.api"
import { getBranches, createBranch } from "./branch.api";
import { getBadges, createBadge } from "./badge.api";
import { getUsers, createUser } from "./user.api";
import { getVisitors, getVisitsOfVisitor, createVisitor } from "./visitor.api";

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
    createVisitor
}