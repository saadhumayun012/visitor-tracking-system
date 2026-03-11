export interface Branch {
    branch_id: number;
    branch_code: string;
    branch_name: string;
    created_at: string;
    updated_at: string | null;
}

export interface CreateBranch {
    branch_code: string;
    branch_name: string;
}
