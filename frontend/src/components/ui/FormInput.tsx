import type { FieldError } from "react-hook-form";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
    placeholder: string;
    isFieldRequired?: boolean
}

export const FormInput = ({
    label,
    id,
    error,
    placeholder,
    isFieldRequired,
    ...props
}: FormInputProps) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor={id} className="form-label">
                {label}
                {isFieldRequired && <span className="text-red-600 ml-1">*</span>}
            </label>

            <input
                id={id}
                placeholder={placeholder}
                className={`form-input-base ${
                    error ? "border-red-500" : "border-gray-300"
                }`}
                {...props}
            />

            {error && (
                <span className="text-red-600 text-xs">{error.message}</span>
            )}
        </div>
    );
};