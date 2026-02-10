import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateBranch } from "../../utils/types";
import { createBranch } from "../../api/branch.api";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";

export const BranchForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<CreateBranch>({
        defaultValues: {
            branch_code: "",
            branch_name: "",
        },
    });

    const onSubmit: SubmitHandler<CreateBranch> = async (data) => {
        try {
            await createBranch(data);
            reset();
        } catch (error) {
            setError("root", {
                message: getErrorMessage(error),
            });
        }
    };
    return (
        <div>
            <div onClick={() => navigate("/admin")}>back to Dashboard</div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Create Branch</h1>
                {errors.root && <div>{errors.root.message}</div>}

                <div>
                    <label htmlFor="code">Branch Code</label>
                    <input 
                        id="code"
                        type="text"
                        placeholder="Enter the branch code"
                        {...register("branch_code", {
                            required: "Branch code is required"
                        })}
                    />
                    {errors.branch_code && <span>{errors.branch_code.message}</span>}
                </div>
                <div>
                    <label htmlFor="name">Branch Name</label>
                    <input 
                        id="name"
                        type="text"
                        placeholder="Enter the branch Name"
                        {...register("branch_name", {
                            required: "Branch name is required"
                        })}
                    />
                    {errors.branch_name && <span>{errors.branch_name.message}</span>}
                </div>
                <div>
                    <button type="submit">
                        {isSubmitting ? <div>Loading...</div> : "Submit"}
                    </button>
                </div>

            </form>
        </div>
    );
};
