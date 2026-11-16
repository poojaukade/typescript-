
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "danger";
type ButtonSize = "small" | "medium" | "large";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
};

function Button({
    variant = "primary",
    size = "medium",
    children,
    className = "",
    type = "button",
    ...rest
}: ButtonProps) {

    const variants: Record<ButtonVariant, string> = {
        primary:
            "border-0 bg-[#eaf0ff] text-[#2454b8] hover:bg-[#dce7ff]",

        secondary:
            "border border-[#cbd5e1] bg-transparent text-[#475569] dark:text-[#e2e8f0] dark:border-[#64748b]",

        danger:
            "border border-[#fecaca] bg-transparent text-[#dc2626] hover:bg-[#fef2f2]",
    };
    const sizes: Record<ButtonSize, string> = {
        small: "px-2 py-1 text-xs",
        medium: "px-3 py-2 text-sm",
        large: "px-5 py-3 text-base",
    };
    return (
        <button
            type={type}
            className={`
        rounded-[6px]
        px-3 py-2
        text-[13px]
        font-semibold
        transition
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${variants[variant]}
         ${sizes[size]}
        ${className}
      `}
            {...rest}
        >
            {children}
        </button>
    );
}

export default Button;
