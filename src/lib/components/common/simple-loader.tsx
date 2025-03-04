import Spinner from "react-bootstrap/Spinner";

const SimpleLoader = () => {
  return (
    <div className="d-flex  justify-content-center align-items-center">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default SimpleLoader;
