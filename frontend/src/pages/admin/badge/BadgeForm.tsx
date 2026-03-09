import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateBadge } from "../../../utils/types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";
import { Button, FormInput } from "../../../components";
import { createBadge } from "../../../api";
import { toast } from "react-hot-toast";

export const BadgeForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<CreateBadge>({
        defaultValues: {
            badge_code: "",
        },
    });

    const onSubmit: SubmitHandler<CreateBadge> = async (data) => {
        try {
            await createBadge(data);
            toast.success("Badge created successfully");
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
                    <h1 className="form-title">Create Badge</h1>

                    {errors.root && (
                        <div className="error-root">{errors.root.message}</div>
                    )}

                    <div className="input-group-container">
                        <FormInput
                            isFieldRequired={true}
                            label="Badge Code"
                            id="code"
                            placeholder="Enter the badge code"
                            error={errors.badge_code}
                            {...register("badge_code", {
                                required: "Badge code is required",
                            })}
                        />
                    </div>

                    <Button variant="submit" isLoading={isSubmitting}>Submit</Button>
                </form>
            </div>
        </div>
    );
};
