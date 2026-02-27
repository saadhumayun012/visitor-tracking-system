// components/ui/FormSelect.tsx
import type { FieldError } from "react-hook-form";

interface Option {
    value: string | number;
    label: string;
}

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    error?: FieldError;
    isFieldRequired?: boolean;
    options: Option[];
    placeholder?: string;
}

export const FormSelect = ({ 
    label, 
    id, 
    error, 
    isFieldRequired, 
    options, 
    placeholder, 
    ...props 
}: FormSelectProps) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={id} className="form-label">
                {label}
                {isFieldRequired && <span className="text-red-600 ml-1">*</span>}
            </label>

            <select
                id={id}
                className={`form-input-base ${
                    error ? "border-red-500" : "border-gray-300"
                }`}
                {...props}
            >
                {<option value="">{placeholder}</option>}
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {error && (
                <span className="text-red-600 text-xs">{error.message}</span>
            )}
        </div>
    );
};