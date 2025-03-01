import { FC } from "react";

interface FlexBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  alignItems?: string;
  justifyContent?: string;
  direction?: string;
  className?: string;
  gap?: string;
}

const FlexBox: FC<FlexBoxProps> = ({
  children,
  alignItems = "center",
  justifyContent = "between",
  className = "",
  direction = "row",
  gap = "2",
  ...props
}) => (
  <div
    className={`d-flex align-items-${alignItems} justify-content-${justifyContent} flex-${direction} ${className} gap-${gap}`}
    {...props}
  >
    {children}
  </div>
);

export default FlexBox;
