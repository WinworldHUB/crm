import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface CalendarFiltersProps {
  showCancellations: boolean;
  setShowCancellations: (checked: boolean) => void;
  showHolidays: boolean;
  setShowHolidays: (checked: boolean) => void;
  showUnavailable: boolean;
  setShowUnavailable: (checked: boolean) => void;
  appointmentRoute: string;
}

const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  showCancellations,
  setShowCancellations,
  showHolidays,
  setShowHolidays,
  showUnavailable,
  setShowUnavailable,
  appointmentRoute,
}) => {
  return (
    <Col xs="auto" className="d-flex align-items-center">
      <div style={{ textAlign: "end" }} className="calender-checkboxes">
        <Form.Check
          inline
          label="Cancellations"
          type="checkbox"
          checked={showCancellations}
          onChange={(e) => setShowCancellations(e.target.checked)}
          id="inline-checkbox-1"
          className="cancellation"
        />
        <Form.Check
          inline
          label="Holidays"
          type="checkbox"
          checked={showHolidays}
          onChange={(e) => setShowHolidays(e.target.checked)}
          id="inline-checkbox-2"
          className="holiday"
        />
        <Form.Check
          inline
          label="Unavailable"
          type="checkbox"
          checked={showUnavailable}
          onChange={(e) => setShowUnavailable(e.target.checked)}
          id="inline-checkbox-3"
          className="unavailable"
        />
      </div>
      <div className="ms-3">
        <Link to={appointmentRoute}>
          <Button>Add Appointment</Button>
        </Link>
      </div>
    </Col>
  );
};

export default CalendarFilters;
