import { ActionButtonProps } from "../../../types";

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  icon,
  text,
  bgColor,
}) => (
  <button
    onClick={onClick}
    className={`${bgColor} text-white p-10 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex items-center space-x-2`}
  >
    {icon}
    <span className="text-2xl font-bold text-neutral-100">{text}</span>
  </button>
);

export default ActionButton;
