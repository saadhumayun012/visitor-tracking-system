import type { FieldError } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
    isFieldRequired?: boolean
}

export const FormInput = ({
    label,
    id,
    error,
    isFieldRequired,
    ...props
}: FormInputProps) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={id} className="text-sm font-semibold text-gray-900">
                {label}
                {isFieldRequired && <span className="text-red-600 ml-1">*</span>}
            </label>

            <input
                id={id}
                className={`px-3 py-2 border rounded-sm text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 ${
                    error ? "border-red-500" : "border-gray-400"
                }`}
                {...props}
            />

            {error && (
                <span className="text-red-600 text-xs">{error.message}</span>
            )}
        </div>
    );
};