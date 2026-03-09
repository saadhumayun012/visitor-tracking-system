import { useForm, type SubmitHandler } from "react-hook-form";
import type { UserPasswordReset } from "../../../utils/types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";
import { Button, FormInput } from "../../../components";
import { resetUserPassword } from "../../../api";
import toast from "react-hot-toast";

export const PasswordResetForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<UserPasswordReset>({
        defaultValues: {
            username: "",
            new_password: ""
        },
    });

    const onSubmit: SubmitHandler<UserPasswordReset> = async (data) => {
        try {
            await resetUserPassword(data);
            toast.success("Password reset successfully");
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
                    <h1 className="form-title">Reset User Password</h1>

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
                            placeholder="Enter new password"
                            error={errors.new_password}
                            {...register("new_password", {
                                required: "password is required",
                                minLength: {
                                    value: 6,
                                    message: "minimum password is 6"
                                }
                            })}
                        />
                    </div>

                    <Button variant="submit" isLoading={isSubmitting}>Submit</Button>
                </form>
            </div>
        </div>
    );
};
