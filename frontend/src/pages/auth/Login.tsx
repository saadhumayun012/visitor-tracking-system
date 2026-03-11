import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import type { LoginFormData } from "../../types";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { roleToPath } from "../../utils/roleToPath";
import { Button, FormInput } from "../../components";

export const Login = () => {
    const navigate = useNavigate();
    const { userLogin, user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormData>({
        defaultValues: {
            username: "",
            password: "",
        },
    });

    useEffect(() => {
        if (user) {
            navigate(roleToPath[user.user_role], { replace: true });
        }
    }, [user, navigate]);

    const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
        try {
            await userLogin(data.username, data.password);
        } catch (error) {
            setError("root", {
                message: getErrorMessage(error),
            });
        }
    };

    return (
        <div className="page-container">
            <form 
                onSubmit={handleSubmit(onSubmit)} 
                className="form-card"
            >
                <h1 className="form-title">Log In</h1>

                {/* Root error at the top */}
                {errors.root && (
                    <div className="error-root">
                        {errors.root.message}
                    </div>
                )}

                <div className="input-group-container">
                    {/* Username */}
                    <FormInput
                        isFieldRequired={true}
                        label="Username"
                        id="username"
                        autoComplete="username"
                        placeholder="Enter username"
                        error={errors.username}
                        {...register("username", {
                            required: "Username is required"
                        })}
                    />

                    {/* Password */}
                    <FormInput
                        isFieldRequired={true}
                        label="Password"
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter password"
                        error={errors.password}
                        {...register("password", {
                            required: "Password is required"
                        })}
                    />
                </div>

                <Button variant="submit" isLoading={isSubmitting}>Log In</Button>
            </form>
        </div>
    );
};