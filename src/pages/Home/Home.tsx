import { useState } from "react";
import DashboardLayout from "../../lib/components/layouts/dashboard";
import TargetAudienceFilter from "./TargetAudienceFilter";
import { Badge, Button, Col, Container, Row, Table } from "react-bootstrap";
import { categories, fields } from "../../lib/constants";
import { FaRegTrashAlt } from "react-icons/fa";
import { applyFilters } from "../../lib/utils/TargetAudienceFilter";
import { AudienceList } from "../../lib/mocks";

const Home = () => {
  const [filters, setFilters] = useState<Filter[]>([]);

  const getCategoryLabel = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.label || categoryId;
  };

  const getSubCategoryLabel = (categoryId: string, subCategoryId: string) => {
    return (
      categories
        .find((cat) => cat.id === categoryId)
        ?.subCategories.find((sub) => sub.id === subCategoryId)?.label ||
      subCategoryId
    );
  };

  const removeFilter = (index: number) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const mockData = applyFilters(AudienceList, filters);

  return (
    <DashboardLayout>
      <Container fluid="xl">
        <TargetAudienceFilter setFilters={setFilters} />
        <Row className="row-gap-2 mt-3">
          {filters.map((filter, index) => (
            <Col xs="auto">
              <Badge
                key={index}
                bg="secondary"
                className="d-flex align-items-center gap-2 px-3 py-2 rounded-pill"
                style={{ fontSize: "14px" }}
              >
                <span>
                  <strong>{getCategoryLabel(filter.category)}:&nbsp;</strong>
                  &nbsp;
                  {Object.entries(filter.filters ?? {}).map(([key, value]) => (
                    <span key={key}>
                      {fields[filter.subCategory]?.[0]?.fields.find(
                        (f) => f.name === key
                      )?.label || key}
                      : {value}{" "}
                    </span>
                  ))}
                </span>
                <Button
                  variant="link"
                  className="p-0 ms-2 icon text-white"
                  onClick={() => removeFilter(index)}
                >
                  <FaRegTrashAlt />
                </Button>
              </Badge>
            </Col>
          ))}
          {/* <Col xs="auto">
            <Badge className="rounded-pill" style={{ fontSize: "14px" }}>
              <Button className="text-white btn-sm">Submit</Button>
            </Badge>
          </Col> */}
        </Row>
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>#</th>
              <th>Patient Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Post Code</th>
              <th>Practitioner</th>
              <th>Clinic</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((data: MockData, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <p className="text-decoration-underline">
                    {data.patientName}
                  </p>
                </td>
                <td>{data.gender}</td>
                <td>{data.age}</td>
                <td>{data.postCode}</td>
                <td>{data.practitioner}</td>
                <td>{data.clinic}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </DashboardLayout>
  );
};

export default Home;
