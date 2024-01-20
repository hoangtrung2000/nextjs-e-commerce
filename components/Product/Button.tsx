import { IconType } from "react-icons";

type ButtonType = "primary" | "outline";
type ButtonSize = "md" | "sm";

const buttonVariants: Record<ButtonType, string> = {
  primary: "bg-slate-700 text-white",
  outline: "bg-white text-slate-700",
};

const buttonSizes: Record<ButtonSize, string> = {
  md: "text-md font-semibold py-3 px-4 border-2",
  sm: "text-sm px-2 py-1 border-[1px] font-light",
};

type Props = {
  label: string;
  disabled?: boolean;
  variants?: "primary" | "outline";
  size?: "md" | "sm";
  custom?: string;
  icon?: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const Button = ({
  label,
  disabled,
  variants = "primary",
  size = "md",
  custom,
  icon: Icon,
  onClick,
}: Props) => {
  return (
    <button
      disabled={disabled}
      className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2  ${
        buttonVariants[variants]
      } ${buttonSizes[size]} ${custom ? custom : ""}`}
      onClick={onClick}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
