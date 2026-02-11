interface FormButtonProps {
    isLoading?: boolean;
    children: React.ReactNode;
}

export const FormButton = ({ isLoading, children }: FormButtonProps) => {
    return (
        <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-sm text-sm font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
            {isLoading ? "Loading..." : children}
        </button>
    );
};