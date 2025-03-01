import { Card } from "react-bootstrap";
import FlexBox from "../flex-box";
import IconBox from "../icon-box";
import { PiUserPlus } from "react-icons/pi";

const TileStats = () => {
  return (
    <Card className="border-0">
      <Card.Body className="p-0">
        <FlexBox justifyContent="start" alignItems="center">
          <IconBox size="64px" icon={<PiUserPlus size={24} />} />
          <FlexBox direction="column" justifyContent="start" alignItems="start">
            <p className="lh-1">Some</p>
            <p className="lh-1">Some</p>
          </FlexBox>
        </FlexBox>
      </Card.Body>
    </Card>
  );
};

export default TileStats;
