import { FC } from "react";
import { Card } from "react-bootstrap";

interface SimpleCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  bg?: string;
  className?: string;
}

const SimpleCard: FC<SimpleCardProps> = ({
  title,
  children,
  footer,
  bg = "light",
  ...props
}) => (
  <Card bg={bg} {...props}>
    {title && (
      <Card.Header>
        <h4 className="py-2">{title}</h4>
      </Card.Header>
    )}
    <Card.Body>{children}</Card.Body>
    {footer && <Card.Footer>{footer}</Card.Footer>}
  </Card>
);

export default SimpleCard;
