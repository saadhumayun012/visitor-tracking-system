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
   | "submit"
   | "page";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   variant?: Variant;
   isLoading?: boolean;
   fullWidth?: boolean;
}

// every button is customizable (thats why i am not creating the general class in index.css)
const variantClasses: Record<Variant, string> = {
  primary: "bg-slate-50 text-slate-800 border border-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-800",
  get: "bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-600 hover:text-white hover:border-blue-600",
  post: "bg-emerald-50 text-emerald-700 border border-emerald-300 hover:bg-emerald-600 hover:text-white hover:border-emerald-600",
  put: "bg-amber-50 text-amber-700 border border-amber-300 hover:bg-amber-500 hover:text-white hover:border-amber-500",
  delete: "bg-red-50 text-red-700 border border-red-300 hover:bg-red-600 hover:text-white hover:border-red-600",
  search: "bg-blue-600 hover:bg-blue-700 text-white",
  found: "bg-green-50 text-green-700 border border-green-400 hover:bg-green-600 hover:text-white hover:border-green-600",
  find: "bg-blue-50 text-blue-700 border border-blue-300 hover:bg-blue-600 hover:text-white hover:border-blue-600",
  login: "bg-blue-600 hover:bg-blue-700 text-white",
  logout: "bg-red-600 hover:bg-red-700 text-white",
  submit: "bg-blue-600 hover:bg-blue-700 text-white",
  page: "bg-white text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 !rounded-full",
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
      "px-5 py-2 text-sm font-semibold rounded-sm transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

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
