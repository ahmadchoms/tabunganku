interface InputAuthProps {
  name: string;
  label: string;
  icon: React.ReactNode;
  value: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputAuth({
  icon,
  label,
  name,
  value,
  placeholder,
  onChange,
}: InputAuthProps) {
  return (
    <div>
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={name}
          type={name}
          required
          className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring focus:ring-zinc-800 sm:text-sm"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
