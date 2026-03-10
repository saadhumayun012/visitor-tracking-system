import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateVisitor } from "../../../utils/types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, FormInput, FormSelect } from "../../../components";
import { createVisitor, updateVisitor } from "../../../api";
import { formatDate } from "../../../utils/formatDateTime";
import toast from "react-hot-toast";

export const VisitorForm = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const visitorInfo = state?.visitorInfo;
    const ocrData = state?.ocrData;
    const documentPaths = state?.documentPaths ?? [];
    const formMode = visitorInfo ? "update" : "create";

    const { register, handleSubmit, formState: { errors, isSubmitting }, setError } = useForm<CreateVisitor>({
            defaultValues: {
                visitor_name: visitorInfo?.visitor_name ?? ocrData?.name ?? "",
                father_name: visitorInfo?.father_name ?? ocrData?.father_name ?? "",
                gender: visitorInfo?.gender ?? ocrData?.gender ?? "male",
                date_of_birth: visitorInfo?.date_of_birth 
                    ? formatDate(visitorInfo.date_of_birth) 
                    : ocrData?.date_of_birth ?? "",
                cnic_number: visitorInfo?.cnic_number ?? ocrData?.cnic_number ?? "",
                cnic_date_of_issue: visitorInfo?.cnic_date_of_issue 
                    ? formatDate(visitorInfo.cnic_date_of_issue) 
                    : ocrData?.date_of_issue ?? "",
                cnic_date_of_expiry: visitorInfo?.cnic_date_of_expiry 
                    ? formatDate(visitorInfo.cnic_date_of_expiry) 
                    : ocrData?.date_of_expiry ?? "",
                current_address: visitorInfo?.current_address ?? "",
                permanent_address: visitorInfo?.permanent_address ?? "",
                phone_number: visitorInfo?.phone_number ?? "",
            },
    });

    const onSubmit: SubmitHandler<CreateVisitor> = async (data) => {
        try {
            if (formMode === "create") {
                const response = await createVisitor({ ...data, document_paths: documentPaths });
                toast.success("Visitor created successfully");
                navigate(`/receptionist/visits-form/${response.visitor_id}`);
            } else {
                await updateVisitor(visitorInfo.visitor_id, data);
                toast.success("Visitor updated successfully");
                navigate(`/receptionist/visits-form/${visitorInfo.visitor_id}`);
            }
        } catch (error) {
            setError("root", { message: getErrorMessage(error) });
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <div className="nav-back" onClick={() => navigate("/receptionist")}>
                    ← BACK TO DASHBOARD
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="form-body">
                    <h1 className="form-title">
                        {formMode === "create" ? "Create Visitor" : "Update Visitor"}
                    </h1>

                    {errors.root && (
                        <div className="error-root">{errors.root.message}</div>
                    )}

                    <div className="input-group-container flex-col">
                        <FormInput
                            isFieldRequired={true}
                            label="Visitor Name"
                            id="name"
                            placeholder="Enter Visitor Name"
                            error={errors.visitor_name}
                            {...register("visitor_name", {
                                required: "name is required",
                            })}
                        />

                        <FormInput
                            isFieldRequired={false}
                            label="Father Name"
                            id="father"
                            placeholder="Enter Father Name"
                            {...register("father_name")}
                        />

                        <FormSelect
                            isFieldRequired={false}
                            label="Gender"
                            id="role"
                            options={[
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" },
                                { value: "other", label: "Prefer Not To Say" }
                            ]}
                            {...register("gender")}
                        />

                        <FormInput
                            isFieldRequired={true}
                            label="Date of Birth"
                            id="birth"
                            placeholder="DD/MM/YYYY"
                            error={errors.date_of_birth}
                            {...register("date_of_birth", {
                                required: "DOB is required",
                                pattern: {
                                    value: /^(0[1-9]|[12][0-9]|3[01])[\/.\\-](0[1-9]|1[0-2])[\/.\\-]\d{4}$/,
                                    message: "Date must be in DD/MM/YYYY, DD.MM.YYYY, or DD-MM-YYYY format"
                                }
                            })}
                        />

                        <FormInput
                            isFieldRequired={true}
                            label="CNIC"
                            placeholder="XXXXX-XXXXXXX-X"
                            error={errors.cnic_number}
                            {...register("cnic_number", {
                                required: "CNIC is required",
                                pattern: {
                                    value: /^\d{5}-\d{7}-\d{1}$/,
                                    message: "CNIC must be in XXXXX-XXXXXXX-X format"
                                }
                            })}
                        />

                        <div className="flex gap-2">
                            <FormInput
                                isFieldRequired={false}
                                label="CNIC Date Of Issue"
                                id="cnic_doi"
                                placeholder="DD/MM/YYYY"
                                error={errors.cnic_date_of_issue}
                                {...register("cnic_date_of_issue", {
                                    pattern: {
                                        value: /^(0[1-9]|[12][0-9]|3[01])[\/.\\-](0[1-9]|1[0-2])[\/.\\-]\d{4}$/,
                                        message: "Date must be in DD/MM/YYYY, DD.MM.YYYY, or DD-MM-YYYY format"
                                    }
                                })}
                            />

                            <FormInput
                                isFieldRequired={false}
                                label="CNIC Date Of Expiry"
                                id="cnic_doe"
                                placeholder="DD/MM/YYYY"
                                error={errors.cnic_date_of_expiry}
                                {...register("cnic_date_of_expiry", {
                                    pattern: {
                                        value: /^(0[1-9]|[12][0-9]|3[01])[\/.\\-](0[1-9]|1[0-2])[\/.\\-]\d{4}$/,
                                        message: "Date must be in DD/MM/YYYY, DD.MM.YYYY, or DD-MM-YYYY format"
                                    }
                                })}
                            />
                        </div>

                        <div className="flex gap-2">
                            <FormInput
                                isFieldRequired={true}
                                label="Current Address"
                                id="currentAddress"
                                placeholder="Enter current address"
                                error={errors.current_address}
                                {...register("current_address", {
                                    required: "Current address is required",
                                })}
                            />

                            <FormInput
                                isFieldRequired={false}
                                label="Permanent Address"
                                id="permanentAddress"
                                placeholder="Enter permanent address"
                                {...register("permanent_address")}
                            />
                        </div>

                        <FormInput
                            isFieldRequired={true}
                            label="Phone Number"
                            id="phone"
                            placeholder="+92XXXXXXXXXX or 0XXXXXXXXXX"
                            error={errors.phone_number}
                            {...register("phone_number", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^(?:\+92|0)\d{10}$/,
                                    message: "Phone must start with +92 or 0 and have 10 digits after"
                                }
                            })}
                        />
                    </div>

                    <Button variant="submit" isLoading={isSubmitting}>
                        {formMode === "create" ? "Submit" : "Update"}
                    </Button>
                </form>
            </div>
        </div>
    );
};