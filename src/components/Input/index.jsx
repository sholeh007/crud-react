export default function Input({ type, placeholder, name, val, onChange }) {
  return (
    <input
      className="border-b border-b-black text-lg focus:outline-none"
      type={type}
      placeholder={placeholder}
      name={name}
      value={val}
      onChange={onChange}
    />
  );
}
