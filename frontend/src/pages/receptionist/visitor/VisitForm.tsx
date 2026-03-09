import { useForm, type SubmitHandler } from "react-hook-form";
import type { Badge, Branch, CreateVisit, Visitor} from "../../../utils/types";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, FormInput, FormSelect } from "../../../components";
import {  createVisit } from "../../../api";
import toast from "react-hot-toast";

export const VisitForm = () => {
    const navigate = useNavigate();
    const { visitor_id } = useParams();
    const { branches, badges, visitor } = useLoaderData() as { 
        branches: Branch[], 
        badges: Badge[],
        visitor: Visitor
    };

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<CreateVisit>({
        defaultValues: {
            purpose: "",
            purpose_description: null,
            visitor_id: visitor_id ? Number(visitor_id) : 0,
            branch_id: 0,
            badge_id: 0,
            vehicle: null,
            items: null
        },
    });

    const onSubmit: SubmitHandler<CreateVisit> = async (data) => {
        try {
            const payload = {
                ...data,
                //checking these because if no data is provided then it will be null rather then empty string
                vehicle: data.vehicle?.vehicle_number?.trim() ? data.vehicle : null, //not checking color and type cuz if number is not provided then it will be null (as there is no need or meaning of other fields)
                items: data.items?.items_description?.trim() ? data.items : null
            };
            await createVisit(payload);
            toast.success("Visit created successfully");
            navigate("/receptionist");
        } catch (error) {
            setError("root", {
                message: getErrorMessage(error),
            });
        }
    };

    return (
        <div className="page-container">
            <div className="form-card">
                <div className="nav-back" onClick={() => navigate("/receptionist")}>
                    ← BACK TO DASHBOARD
                </div>

                {visitor && (
                    <div className="visitor-info-card mb-4">
                        <p className="text-sm font-semibold text-blue-900">
                            Visitor: {visitor.visitor_name}
                        </p>
                        <p className="text-xs text-blue-700">
                            CNIC: {visitor.cnic_number}
                        </p>
                    </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="form-body">
                    {errors.root && <div className="error-root">{errors.root.message}</div>}

                    {/* Hidden field - visitor_id already set */}
                    <input type="hidden" {...register("visitor_id")} />

                    {/* Visit Details Section */}
                    <div className="form-section">
                        <h2 className="form-section-title">Visit Details</h2>
                        
                        <div className="input-group-container">
                            <FormInput
                                isFieldRequired={true}
                                label="Purpose"
                                id="purpose"
                                placeholder="Meeting, Delivery, etc."
                                error={errors.purpose}
                                {...register("purpose", { 
                                    required: "Purpose is required" 
                                })}
                            />

                            <FormInput
                                isFieldRequired={false}
                                label="Purpose Description"
                                id="purpose_desc"
                                placeholder="Additional details"
                                {...register("purpose_description")}
                            />

                            <FormSelect
                                isFieldRequired={true}
                                label="Branch"
                                id="branch"
                                placeholder="Select Branch"
                                error={errors.branch_id}
                                options={branches?.map(b => ({
                                    value: b.branch_id,
                                    label: b.branch_name
                                })) || []}
                                {...register("branch_id", { 
                                    required: "Branch is required",
                                    valueAsNumber: true 
                                })}
                            />

                            <FormSelect
                                isFieldRequired={true}
                                label="Badge"
                                id="badge"
                                placeholder="Select Available Badge"
                                error={errors.badge_id}
                                options={badges.map(badge => ({
                                        value: badge.badge_id,
                                        label: `${badge.badge_code}`
                                    })) || []
                                }
                                {...register("badge_id", {
                                    required: "Badge is required",
                                    valueAsNumber: true
                                })}
                            />
                        </div>
                    </div>

                    {/* Vehicle Section */}
                    <div className="form-section">
                        <h2 className="form-section-title">
                            Vehicle Details <span className="text-sm font-normal text-gray-500">(Optional)</span>
                        </h2>
                        
                        <div className="input-group-container">
                            <FormInput
                                label="Vehicle Number"
                                id="vehicle_number"
                                placeholder="ABC-123"
                                {...register("vehicle.vehicle_number")}
                            />
                            <FormInput
                                label="Vehicle Color"
                                placeholder="Red, Blue"
                                {...register("vehicle.vehicle_color")}
                            />
                            <FormInput
                                label="Vehicle Type"
                                placeholder="Car, Bike"
                                {...register("vehicle.vehicle_type")}
                            />
                        </div>
                    </div>

                    {/* Items Section */}
                    <div className="form-section">
                        <h2 className="form-section-title">
                            Items Carried <span className="text-sm font-normal text-gray-500">(Optional)</span>
                        </h2>
                        
                        <FormInput
                            label="Items Description"
                            placeholder="Laptop, Documents"
                            {...register("items.items_description")}
                        />
                    </div>

                    <Button variant="submit" isLoading={isSubmitting}>Create Visit</Button>
                </form>
            </div>
        </div>
    );
};
