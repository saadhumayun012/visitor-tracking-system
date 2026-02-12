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
            <label htmlFor={id} className="text-sm font-semibold text-gray-900">
                {label}
                {isFieldRequired && <span className="text-red-600 ml-1">*</span>}
            </label>

            <select
                id={id}
                className={`px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                    error ? "border-red-500" : "border-gray-400"
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