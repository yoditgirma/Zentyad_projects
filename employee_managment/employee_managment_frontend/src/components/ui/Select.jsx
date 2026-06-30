function Select({
    label,
    name,
    value,
    onChange,
    options
}) {
    return (
        <div className="form-group">
            <label>{label}</label>

            <select
                name={name}
                value={value}
                onChange={onChange}
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
            >
                {options.map(option => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;