import { FC } from "react";
import { Link } from "react-router";

interface HyperlinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

const Hyperlink: FC<HyperlinkProps> = ({ to, className, children }) => (
  <Link to={to} className={`text-gold fw-bold ${className}`}>
    {children}
  </Link>
);

export default Hyperlink;
