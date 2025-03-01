import { Container } from "react-bootstrap";
import MainMenu from "./dashboard/main-menu";
import FlexBox from "../common/flex-box";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {


  return (
    <Container fluid className="page-wrapper">
      <MainMenu />
      <FlexBox
        justifyContent="start"
        alignItems="start"
        className="main-content"
      >
        <Container
          fluid
          className={`page-content px-3`}
        >
          {children}
        </Container>
      </FlexBox>
    </Container>
  );
};

export default DashboardLayout;
