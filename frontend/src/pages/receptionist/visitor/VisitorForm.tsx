import { useForm, type SubmitHandler } from "react-hook-form";
import type { CreateVisitor} from "../../../utils/types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { useNavigate } from "react-router-dom";
import { Button, FormInput, FormSelect } from "../../../components";
import {  createVisitor } from "../../../api";

export const VisitorForm = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<CreateVisitor>({
        defaultValues: {
            visitor_name: "",
            father_name: "",
            gender: "male",
            date_of_birth: "",
            cnic_number: "",
            cnic_date_of_issue: "",
            cnic_date_of_expiry: "",
            current_address: "",
            permanent_address: "",
            phone_number: "",
        },
    });

    const onSubmit: SubmitHandler<CreateVisitor> = async (data) => {
        try {
            const response = await createVisitor(data);
            const visitorId = response.visitor_id;
            navigate(`/receptionist/visits-form/${visitorId}`)
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
                            // error={errors.father_name}
                            {...register("father_name",)}
                        />

                        <FormSelect
                            isFieldRequired={false}
                            label="Gender"
                            id="role"
                            // error={errors.gender}
                            options={[
                                { value: "male", label: "Male" },
                                { value: "female", label: "Female" },
                                { value: "other", label: "Prefer Not To Say" }
                            ]}
                            {...register("gender", )}
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
                            label="cnic"
                            placeholder="XXXXX-XXXXXXX-X"
                            error={errors.cnic_number}
                            {...register("cnic_number", {
                                required: "CNIC is required",
                                pattern: {
                                    value: /^\d{5}-\d{7}-\d{1}$/,
                                    message: "cnic must be in XXXXX-XXXXXXX-X format"
                                }
                            })}
                        />
                        
                        <div className="flex gap-2">
                            <FormInput
                                isFieldRequired={false}
                                label="Cnic Date Of Issue"
                                id="birth"
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
                                label="Cnic Date Of Issue"
                                id="birth"
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
                                label="Current address"
                                id="currenAddress"
                                placeholder="Enter current address"
                                error={errors.current_address}
                                {...register("current_address", {
                                    required: "current address is required",
                                })}
                            />

                            <FormInput
                                isFieldRequired={false}
                                label="permanent"
                                id="birth"
                                placeholder="Enter permanent address"
                                error={errors.permanent_address}
                                {...register("permanent_address",)}
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
                                    message: "phone must start with +92 or 0 and have 10 digits after"
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
