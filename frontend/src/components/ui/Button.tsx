// components/ui/Button.tsx

type Variant =
   | "primary"
   | "get"
   | "post"
   | "put"
   | "delete"
   | "search"
   | "found"
   | "login"
   | "logout"
   | "find"
   | "submit";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: Variant;
   isLoading?: boolean;
   fullWidth?: boolean;
}

// every button is customizable (thats why i am not creating the general class in index.css)
const variantClasses: Record<Variant, string> = {
  primary: "bg-white text-black border border-slate-800 hover:bg-slate-800 hover:text-white",
  get: "bg-white text-black border border-blue-500 hover:bg-blue-500 hover:text-white",
  post: "bg-white text-black border border-emerald-500 hover:bg-emerald-500 hover:text-white",
  put: "bg-white text-black border border-amber-500 hover:bg-amber-500 hover:text-white",
  delete: "bg-white text-black border border-red-500 hover:bg-red-500 hover:text-white",
  search: "bg-blue-600 hover:bg-blue-700 text-white",
  found: "bg-white text-black border border-green-600 hover:bg-green-600 hover:text-white",
  find: "bg-white text-black border border-blue-500 hover:bg-blue-500 hover:text-white",
  login: "bg-blue-600 hover:bg-blue-700 text-white",
  logout: "bg-red-600 hover:bg-red-700 text-white",
  submit: "bg-blue-600 hover:bg-blue-700 text-white",
};

export const Button = ({
   children,
   variant = "primary",
   isLoading = false,
   fullWidth = false,
   className = "",
   disabled,
   ...props
}: ButtonProps) => {
   const baseClasses =
      "px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";

   const widthClass = fullWidth ? "w-full" : "";

   return (
      <button
         className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
         disabled={disabled || isLoading}
         {...props}
      >
         {isLoading ? "Loading..." : children}
      </button>
   );
};
