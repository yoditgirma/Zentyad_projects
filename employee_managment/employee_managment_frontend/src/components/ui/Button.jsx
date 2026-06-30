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
                w-full
                px-4
                py-2.5
                rounded-lg
                font-medium
                text-white
                bg-blue-600
                hover:bg-blue-700
                active:bg-blue-800
                transition
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${className}
            `}
        >
            {children}
        </button>
    );
}