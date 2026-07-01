export default function Button({
    children,
    type = "button",
    className = "",
    onClick,
    disabled = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
                w-full mt-4 bg-[#33CC1A] hover:bg-[#29b816] text-white font-semibold py-3 rounded-xl transition-all duration-300
                ${className}
            `}
        >
            {children}
        </button>
    );
}