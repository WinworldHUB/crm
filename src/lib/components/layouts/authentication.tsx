import { Container } from "react-bootstrap";

const AuthenticationLayout = ({ children }) => {
  return (
    <Container fluid className="page-content py-3 ">
      {children}
    </Container>
  );
};

export default AuthenticationLayout;
