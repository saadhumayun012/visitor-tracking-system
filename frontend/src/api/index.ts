import { api } from "./axios";
import {login, logout, getCurrentUser} from "./auth.api"
import { getBranches, createBranch } from "./branch.api";
import { getBadges, createBadge, getAvailableBadges } from "./badge.api";
import { getUsers, createUser, resetUserPassword } from "./user.api";
import { getVisitors, createVisitor, getVisitorById, getVisitorByCnic, updateVisitor, getVisitorDocuments } from "./visitor.api";
import { getVisitsOfVisitor, createVisit, findVisitByBadge, checkoutVisit} from "./visit.api"
import { extractCnicOcr } from "./ocr.api";
import { getAllDocumentTypes, getAdminDocumentTypes, createDocumentType } from "./documentType.api";

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
    getVisitorByCnic,
    updateVisitor,
    getVisitorDocuments,
    extractCnicOcr,
    getAllDocumentTypes,
    getAdminDocumentTypes,
    createDocumentType,
    resetUserPassword
}