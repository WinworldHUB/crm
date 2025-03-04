import { useState } from "react";
import DashboardLayout from "../../lib/components/layouts/dashboard";
import TargetAudience from "./TargetAudience";
import { Button, Container } from "react-bootstrap";
import Personalization from "./Personalization";
import Trigger from "./Schedule";
import BasicDetails from "./BasicDetails";
import { useMock } from "../../lib/contexts/mock-context";
import { useNavigate, useParams } from "react-router";

const steps = [
  "Basic Details",
  "Target Audience",
  "Personalization",
  "Trigger",
];

const Campaign = () => {
  const { getMockData, setMockDataById } = useMock();
  const { campaignId } = useParams();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState<number>(0);
  const [campaignDetails, setCampaignDetails] =
    useState<CampaignDetails | null>(
      (getMockData("campaigns", campaignId) as CampaignDetails) ?? null
    );

  const goToNextStep = (data: Partial<CampaignDetails>) => {
    const newCampaignDetails = {
      ...campaignDetails,
      ...data,
    } as CampaignDetails;
    setCampaignDetails(newCampaignDetails);
    if (activeStep === 3) {
      setMockDataById(
        "campaigns",
        newCampaignDetails,
        newCampaignDetails.basicDetails.id
      );
      navigate("/");
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const goToPreviousStep = () => {
    setActiveStep((prev) => prev - 1);
  };

  const getStepperContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <BasicDetails
            campaignDetails={campaignDetails}
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
          />
        );
      case 1:
        return (
          <TargetAudience
            campaignDetails={campaignDetails}
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
          />
        );
      case 2:
        return (
          <Personalization
            campaignDetails={campaignDetails}
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
          />
        );
      case 3:
        return (
          <Trigger
            campaignDetails={campaignDetails}
            goToPreviousStep={goToPreviousStep}
            goToNextStep={goToNextStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <Container fluid="xl">
        <div className="d-flex justify-content-center">
          <div className="timeline-wrapper mt-3">
            <ul className="timeline">
              {steps.map((step: string, index: number) => (
                <li key={index}>
                  <Button
                    className={`btn btn-sm rounded-circle custom border-4 ${
                      activeStep >= index
                        ? "btn-primary"
                        : "btn-secondary"
                    } ${
                      activeStep === index
                        && "active"
                    }`}
                    style={{ width: "30px", height: "30px" }}
                  ></Button>
                  <div
                    className={`mt-1 ${
                      activeStep === index ? "fw-semibold" : "fw-normal"
                    }`}
                  >
                    {step}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-3">{getStepperContent()}</div>
      </Container>
    </DashboardLayout>
  );
};

export default Campaign;
