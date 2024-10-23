import { ButtonProps } from "../types/components/button";
import Loader from "./Loader";

export function Button({
  children,
  className,
  onClick,
  disabled,
  loading,
  ...props
}: ButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        if (onClick) onClick(e);
      }}
      disabled={disabled}
      {...props}
      type="submit"
      className={`${className} rounded-md font-medium text-center disabled:hover:bg-opacity-100 hover:bg-opacity-85 transition-all duration-300 w-full py-3 px-3 lg:px-4`}
    >
      {loading ? (
        <div className="flex items-center  justify-center gap-x-3">
          <Loader /> {children}
        </div>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
}
