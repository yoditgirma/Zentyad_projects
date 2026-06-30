function Input({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    required = false
}) {
    return (
        <div className="form-group">
            <label>{label}</label>

            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                 className="
                    w-full
                    px-4
                    py-2.5
                    border
                    border-slate-300
                    rounded-lg
                    bg-white
                    text-slate-800
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-200
                    transition
                "
            />
        </div>
    );
}

export default Input;