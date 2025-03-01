import React, { FC } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";

interface SubscriptionCardProps {
  isAddOn: boolean;
  subscription: SubscriptionDetails;
  numberOfMonths: string;
  onSubscribe?: () => void;
}

const getTitleClass = (title: string, isAddOn: boolean) => {
  if (isAddOn) return "bg-black text-white";
  switch (title.toLowerCase()) {
    case "gold":
      return "custom-gold-sub-bg text-dark";
    case "silver":
      return "custom-silver-sub-bg text-white";
    case "bronze":
      return "custom-bronze-sub-bg text-white";
    default:
      return "custom-default-sub-bg text-dark";
  }
};

const SubscriptionCard: FC<SubscriptionCardProps> = ({
  subscription,
  numberOfMonths,
  isAddOn,
  onSubscribe,
}) => {
  return (
    <Card className="shadow-lg d-flex flex-column w-100 rounded-2">
      <Card.Title
        className={`fw-bold mx-4 my-3 text-center rounded-2 p-2 ${getTitleClass(
          subscription.title,
          isAddOn
        )}`}
      >
        {isAddOn ? "Add On" : subscription.title}
      </Card.Title>

      <Card.Subtitle className="mb-2 text-muted text-start mx-4">
        <h4>{subscription.subTitle}</h4>
      </Card.Subtitle>

      <Card.Body className="d-flex flex-column flex-grow-1 scrollable-content">
        <Card.Subtitle className="mb-2 text-muted text-center">
          SKU: {subscription.sku}
        </Card.Subtitle>
        {subscription.description && (
          <Card.Text className="text-center text-muted">
            {subscription.description}
          </Card.Text>
        )}
        <h5 className="text-primary text-center">
          ${subscription.monthlyPrice} / month
        </h5>
        <p className="text-muted text-center">For {numberOfMonths} months</p>

        {/* Scrollable Content */}
        <div
          className="flex-grow-1 overflow-auto"
          style={{ maxHeight: "400px", paddingRight: "10px" }}
        >
          <ListGroup variant="flush" className="mb-3 mx-2">
            <p className="fw-bold">Features:</p>
            {subscription.features.map((feature) => (
              <ListGroup.Item key={feature.id} className="text-muted">
                {feature.name}
              </ListGroup.Item>
            ))}
          </ListGroup>
          {subscription.notes && (
            <Card.Text className="text-muted small text-center">
              {subscription.notes}
            </Card.Text>
          )}

          <Button
            variant="primary"
            className="w-100 mt-2"
            onClick={onSubscribe}
          >
            Subscribe
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SubscriptionCard;
