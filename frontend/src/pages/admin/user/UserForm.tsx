import { useForm, type SubmitHandler } from "react-hook-form";
import type { Branch, CreateUser } from "../../../utils/types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FormButton, FormInput, FormSelect } from "../../../components";
import { createUser } from "../../../api";

export const UserForm = () => {
    const navigate = useNavigate();
    const { branches } = useLoaderData() as { branches: Branch[] };
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<CreateUser>({
        defaultValues: {
            username: "",
            password: "",
            user_role: "admin",
            branch_id: null
        },
    });

    const onSubmit: SubmitHandler<CreateUser> = async (data) => {
        try {
            await createUser(data);
            reset();
        } catch (error) {
            setError("root", {
                message: getErrorMessage(error),
            });
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <div className="nav-back" onClick={() => navigate("/admin")}>
                    ← BACK TO DASHBOARD
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                >
                    <h1 className="form-title">Create User</h1>

                    {errors.root && (
                        <div className="error-root">{errors.root.message}</div>
                    )}

                    <div className="input-group-container">
                        <FormInput
                            isFieldRequired={true}
                            label="Username"
                            id="username"
                            placeholder="Enter username"
                            error={errors.username}
                            {...register("username", {
                                required: "username is required",
                            })}
                        />

                        <FormInput
                            isFieldRequired={true}
                            label="Password"
                            id="password"
                            placeholder="Enter password"
                            error={errors.password}
                            {...register("password", {
                                required: "password is required",
                                minLength: {
                                    value: 6,
                                    message: "minimum password is 6"
                                }
                            })}
                        />

                        <FormSelect
                            isFieldRequired={true}
                            label="User Role"
                            id="role"
                            error={errors.user_role}
                            options={[
                                { value: "admin", label: "Admin" },
                                { value: "receptionist", label: "Receptionist" },
                                { value: "branch_officer", label: "Branch Officer" }
                            ]}
                            {...register("user_role", {
                                required: "User role is required",
                            })}
                        />

                        <FormSelect
                            isFieldRequired={false} 
                            label="Branch (Optional - Only for Branch Officer)"
                            id="branch"
                            placeholder="Select Branch"
                            options={branches?.map(branch => ({
                                value: branch.branch_id,
                                label: branch.branch_name
                            })) || []} //if no branch pass the empty array (fast-api handle it as null, or handle it in auth.user.api (no need))
                            {...register("branch_id")}
                        />

                    </div>

                    <FormButton isLoading={isSubmitting}>Submit</FormButton>
                </form>
            </div>
        </div>
    );
};
