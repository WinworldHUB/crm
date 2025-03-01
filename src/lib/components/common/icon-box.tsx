import { FC } from "react";

interface IconBoxProps {
  icon: React.ReactNode;
  isFilled?: boolean;
  size?: string;
  onClick?: () => void;
}

const IconBox: FC<IconBoxProps> = ({
  icon,
  isFilled = true,
  onClick,
  size = "40px",
}) => {
  const inlineStyle = { width: size, height: size } as React.CSSProperties;
  return (
    <button
      onClick={onClick}
      className={`icon-box border-0 ${isFilled ? "filled" : ""}`}
      tabIndex={0}
      type="button"
      style={inlineStyle}
    >
      {icon}
    </button>
  );
};

export default IconBox;
