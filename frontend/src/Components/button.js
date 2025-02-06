export const Button = ({ children, variant, onClick, className }) => {
    const baseStyles =
      "px-4 py-2 rounded-lg font-semibold transition-all focus:outline-none";
    const variants = {
      destructive: "bg-red-500 text-white hover:bg-red-600",
      default: "bg-blue-500 text-white hover:bg-blue-600",
    };
  
    return (
      <button
        onClick={onClick}
      >
        {children}
      </button>
    );
  };