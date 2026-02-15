// components/ui/Button.tsx

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void;
}

export const Button = ({ 
    children,
    onClick,
    className = "",
    ...props 
}: ButtonProps) => {
    return (
        <button
            className={`px-4 py-2 text-sm font-bold rounded-sm ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};