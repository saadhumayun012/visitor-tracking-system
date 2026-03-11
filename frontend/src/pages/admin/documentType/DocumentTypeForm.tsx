import { useForm, type SubmitHandler } from "react-hook-form";
import type { DocumentType } from "../../../types";
import { createDocumentType } from "../../../api";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";
import { Button, FormInput } from "../../../components";
import toast from "react-hot-toast";

export const DocumentTypeForm = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<DocumentType>({
        defaultValues: {
            document_code: "",
            document_name: "",
            is_required: false,
        },
    });

    const onSubmit: SubmitHandler<DocumentType> = async (data) => {
        try {
            await createDocumentType(data);
            toast.success("Document type created successfully");
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
                <div
                    className="nav-back"
                    onClick={() => navigate("/admin")}
                >
                    ← BACK TO DASHBOARD
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="form-body"
                >
                    <h1 className="form-title">Create Document Type</h1>

                    {errors.root && (
                        <div className="error-root">{errors.root.message}</div>
                    )}

                    <div className="input-group-container">
                        <FormInput
                            isFieldRequired={true}
                            label="Document Code"
                            id="code"
                            placeholder="Enter the document code"
                            error={errors.document_code}
                            {...register("document_code", {
                                required: "Document code is required",
                            })}
                        />

                        <FormInput
                            isFieldRequired={true}
                            label="Document Name"
                            id="name"
                            placeholder="Enter the document name"
                            error={errors.document_name}
                            {...register("document_name", {
                                required: "Document name is required",
                            })}
                        />

                        <div className="checkbox-group">
                            <input
                                type="checkbox"
                                id="is_required"
                                {...register("is_required")}
                            />
                            <label htmlFor="is_required">Is Required</label>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create Document Type"}
                    </Button>
                </form>
            </div>
        </div>
    );
};
