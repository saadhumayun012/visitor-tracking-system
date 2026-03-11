import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateBranch } from "../../../types";
import { createBranch } from "../../../api";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";
import { Button, FormInput } from "../../../components";
import { toast } from "react-hot-toast";

export const BranchForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset
    } = useForm<CreateBranch>({
        defaultValues: {
            branch_code: "",
            branch_name: "",
        },
    });

    const onSubmit: SubmitHandler<CreateBranch> = async (data) => {
        try {
            await createBranch(data);
            toast.success("Branch created successfully");
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
                    className="form-body"
                >
                    <h1 className="form-title">Create Branch</h1>

                    {errors.root && (
                        <div className="error-root">{errors.root.message}</div>
                    )}

                    <div className="input-group-container">
                        <FormInput
                            isFieldRequired={true}
                            label="Branch Code"
                            id="code"
                            placeholder="Enter the branch code"
                            error={errors.branch_code}
                            {...register("branch_code", {
                                required: "Branch code is required",
                            })}
                        />

                        <FormInput
                            isFieldRequired={true}
                            label="Branch Name"
                            id="name"
                            placeholder="Enter the branch Name"
                            error={errors.branch_name}
                            {...register("branch_name", {
                                required: "Branch name is required",
                            })}
                        />
                    </div>

                    <Button variant="submit" isLoading={isSubmitting}>Submit</Button>
                </form>
            </div>
        </div>
    );
};
