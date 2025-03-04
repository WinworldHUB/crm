import { Form, Row, Col, Button, Badge, Table } from "react-bootstrap";
import { categories, fields, FilterFormIntialValue } from "../../lib/constants";
import { Formik, FormikProps } from "formik";
import DynamicForm from "../../lib/components/DynamicForm/DynamicForm";
import * as Yup from "yup";
import { useEffect, useRef, useState } from "react";
import {
  applyFilters,
  getDefaultValuesForFilter,
  getValidationSchemaForFilter,
} from "../../lib/utils/Campaign";
import { FaRegTrashAlt } from "react-icons/fa";
import { MockAudienceList } from "../../lib/mocks";

interface Props {
  campaignDetails: CampaignDetails | null;
  goToPreviousStep: () => void;
  goToNextStep: (data: { filters: Filter[] }) => void;
}

const TargetAudience = ({ campaignDetails, goToNextStep }: Props) => {
  const formikRef = useRef<FormikProps<any>>(null);
  const [validationSchema, setValidationSchema] = useState(
    Yup.object().shape({})
  );

  const [filters, setFilters] = useState<Filter[]>(
    campaignDetails?.filters || []
  );

  const getCategoryLabel = (categoryId: string) => {
    return categories.find((cat) => cat.id === categoryId)?.label || categoryId;
  };

  const removeFilter = (index: number) => {
    setFilters((prev) => prev.filter((_, i) => i !== index));
  };

  const onNextStep = () => {
    if (filters.length) {
      goToNextStep({ filters });
    } else {
      window.alert("Please add filters.");
      formikRef.current?.handleSubmit();
    }
  };

  const mockData = applyFilters(MockAudienceList, filters);

  return (
    <>
      <Formik
        innerRef={formikRef}
        initialValues={FilterFormIntialValue}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("*********", values);
          setFilters((prev) => [...prev, values]);
          resetForm({
            values: FilterFormIntialValue,
          })
        }}
      >
        {(formik) => {
          useEffect(() => {
            setValidationSchema(
              Yup.object().shape({
                category: Yup.string().required("Please select a category"),
                subCategory: Yup.string().required(
                  "Please select a sub-category"
                ),
                filters: getValidationSchemaForFilter(
                  formik.values.subCategory
                ),
              })
            );
            formik.setFieldValue(
              "filters",
              getDefaultValuesForFilter(formik.values.subCategory)
            );
          }, [formik.values.subCategory]);

          return (
            <Form onSubmit={formik.handleSubmit}>
              <Row>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={formik.values.category}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.category && formik.errors.category
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select Category
                      </option>
                      {categories.map(({ label, id }) => (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      ))}
                    </Form.Select>
                    {formik.touched.category && formik.errors.category && (
                      <div className="invalid-feedback">
                        {formik.errors.category as string}
                      </div>
                    )}
                  </Form.Group>
                </Col>

                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Sub-Category</Form.Label>
                    <Form.Select
                      name="subCategory"
                      value={formik.values.subCategory}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={`form-control ${
                        formik.touched.subCategory && formik.errors.subCategory
                          ? "is-invalid"
                          : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select Sub-Category
                      </option>
                      {(
                        categories.find(
                          (cat) => cat.id === formik.values.category
                        )?.subCategories ?? []
                      ).map(({ id, label }) => (
                        <option key={id} value={id}>
                          {label}
                        </option>
                      ))}
                    </Form.Select>
                    {formik.touched.subCategory &&
                      formik.errors.subCategory && (
                        <div className="invalid-feedback">
                          {formik.errors.subCategory as string}
                        </div>
                      )}
                  </Form.Group>
                </Col>
              </Row>
              <DynamicForm
                sections={
                  (fields[formik.values.subCategory] ?? []) as FormSection[]
                }
                formik={formik}
              />
              <Row className="d-flex align-items-center justify-content-end mt-3">
                <Col xs="auto">
                  <Button
                    variant="outline-primary"
                    onClick={() =>
                      formik.resetForm({
                        values: FilterFormIntialValue,
                      })
                    }
                  >
                    Clear
                  </Button>
                  <Button variant="primary" type="submit" className="ms-3">
                    Add
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>
      <Row className="row-gap-2 mt-3">
        {filters.map((filter, index) => (
          <Col xs="auto" key={index}>
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
          {mockData.map((data: MockData, index: number) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <p className="text-decoration-underline">{data.patientName}</p>
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
      <div className="d-flex justify-content-between">
        <Button disabled>Previous Step</Button>
        <Button onClick={onNextStep}>Next Step</Button>
      </div>
    </>
  );
};

export default TargetAudience;
