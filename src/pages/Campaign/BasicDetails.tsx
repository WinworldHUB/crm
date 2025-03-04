import { Form, Row, Col, Button } from "react-bootstrap";
import { Formik } from "formik";
import { BasicDetailsFormIntialValue } from "../../lib/constants";
import * as Yup from "yup";
import { useNavigate } from "react-router";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string(),
});

interface Props {
  campaignDetails: CampaignDetails | null;
  goToPreviousStep: () => void;
  goToNextStep: (data: { basicDetails: BasicDetails }) => void;
}

const BasicDetails = ({ goToNextStep, campaignDetails }: Props) => {
  const navigate = useNavigate();

  const getInitalFormValues = () => {
    return {
      ...BasicDetailsFormIntialValue,
      id: `${+new Date()}`,
    };
  };
  const onBack = () => {
    navigate("/");
  };

  return (
    <>
      <Formik
        initialValues={campaignDetails?.basicDetails || getInitalFormValues()}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("*********onSubmit", values);
          goToNextStep({ basicDetails: values });
        }}
      >
        {({
          handleSubmit,
          touched,
          errors,
          values,
          handleBlur,
          handleChange,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col xs={6}>
                  <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      className={`form-control ${
                        touched.title && errors.title ? "is-invalid" : ""
                      }`}
                      type="text"
                      name="title"
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {touched.title && errors.title && (
                      <div className="invalid-feedback">
                        {errors.title as string}
                      </div>
                    )}
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      className={`form-control ${
                        touched.description && errors.description
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={handleBlur}
                      name="description"
                      value={values.description}
                      onChange={handleChange}
                    />
                    {touched.description && errors.description && (
                      <div className="invalid-feedback">
                        {errors.description as string}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <div className="d-flex justify-content-between mt-3">
                <Button onClick={onBack}>Back</Button>
                <Button type="submit">Next Step</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default BasicDetails;
