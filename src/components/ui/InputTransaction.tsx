interface InputTransactionProps {
  label: string;
  name: string;
  color: string;
  icon: React.ReactNode;
  value: string | number;
  type: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputTransaction({
  name,
  label,
  icon,
  value,
  color,
  placeholder,
  type,
  onChange,
}: InputTransactionProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          id={name}
          step="100"
          required
          placeholder={placeholder}
          className={`focus:ring-2 focus:ring-${color}-400 p-2 focus:outline-none block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md`}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
