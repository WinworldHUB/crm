import DashboardLayout from "../../lib/components/layouts/dashboard";
import { Button, Container, Table } from "react-bootstrap";
import { useMock } from "../../lib/contexts/mock-context";
import { useNavigate } from "react-router";

const Home = () => {
  const { getMockData } = useMock();
  const navigate = useNavigate();

  const campaigns = getMockData("campaigns") as CampaignDetails[] ?? [] ;

  const onCreateCampaign = () => {
    navigate("/campaign");
  };

  const onEdit = (campaignId: string) => {
    navigate(`/campaign/${campaignId}`);
  };

  return (
    <DashboardLayout>
      <Container fluid="xl">
        <div className="d-flex justify-content-between">
          <h3>Campaigns</h3>
          <Button size="sm" onClick={onCreateCampaign}>
            Create Campaign
          </Button>
        </div>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign, index) => (
              <tr
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => onEdit(campaign.basicDetails.id as string)}
              >
                <td>{index + 1}</td>
                <td>
                  <p className="text-decoration-underline">{campaign.basicDetails.title}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </DashboardLayout>
  );
};

export default Home;
