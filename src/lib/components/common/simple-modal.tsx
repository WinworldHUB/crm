import React from "react";
import { Modal } from "react-bootstrap";

type SimpleModalProps = {
  open: boolean;
  close: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const SimpleModal: React.FC<SimpleModalProps> = ({
  open,
  close,
  title,
  subtitle,
  children,
  footer,
}) => {
  return (
    <Modal show={open} onHide={close} centered  backdrop="static" keyboard={false} className="simple-modal" backdropClassName="simple-modal-backdrop"> 
   { title &&  <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>}
      {subtitle && <div className="px-3 pb-2 text-muted">{subtitle}</div>}
      <Modal.Body>{children}</Modal.Body>
      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
};

export default SimpleModal;
