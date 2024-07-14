const FormInput = ({
  label,
  type,
  value,
  onChange,
  required,
  disabled = false,
}) => (
  <div className="mb-4">
    <label className="block mb-2 text-sm font-bold">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-black rounded"
      required={required}
      disabled={disabled}
    />
  </div>
);

export default FormInput;
