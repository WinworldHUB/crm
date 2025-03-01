import { Logo } from "../../../../assets";

import { Container, Image, Navbar } from "react-bootstrap";

const MainMenu = () => {

  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="sm"
      className="main-menu shadow"
      fixed="top"
    >
      <Container fluid>
        <Navbar.Brand href={"/"}>
          <Image src={Logo} alt="HEAL" width={150} />
        </Navbar.Brand>
        <Navbar.Toggle />
      </Container>
    </Navbar>
  );
};

export default MainMenu;
