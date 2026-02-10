import { useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { LoginFormData } from "../utils/types";
import { getErrorMessage } from "../utils/getErrorMessage";
import { roleToPath } from "../utils/roleToPath";

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
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>Log In</h1>

                {errors.root && <div>{errors.root.message}</div>}

                {/* Username */}
                <div>
                    <label htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        {...register("username", {
                            required: "Username is required",
                        })}
                    />
                    {errors.username && <span>{errors.username.message}</span>}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            required: "Password is required",
                            minLength: {
                                value: 4,
                                message:
                                    "Password must be at least 4 characters long",
                            },
                        })}
                    />
                    {errors.password && <span>{errors.password.message}</span>}
                </div>

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "loading..." : "Log in"}
                </button>
            </form>
        </div>
    );
};
