export const Input = ({ type, value, onChange, readOnly, className, ...props }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      className={`px-2 py-1 border rounded ${className}`}
      {...props}
    />
  );
};
