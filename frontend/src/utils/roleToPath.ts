//redirecting the role to its route or dashboard like admin to /admin or receptionist to /receptionist

import type { UserRoles } from "./types";

export const roleToPath: Record<UserRoles, string> = {
    "admin": "/admin",
    "receptionist": "/receptionist",
    "branch_officer": "/officer"
}