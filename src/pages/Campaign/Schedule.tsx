import { Formik } from "formik";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  ScheduleFormIntialValue,
  ScheduleTypes,
} from "../../lib/constants";
import * as Yup from 'yup';
 
interface Props {
  campaignDetails: CampaignDetails | null;
  goToPreviousStep: () => void;
  goToNextStep: (data: {scheduleDetails: ScheduleDetails}) => void;
}

const schema =  Yup.object().shape({
  type: Yup.string().required("Type is required"),
  time: Yup.date()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === "" ? null : value
    )
    .when("type", {
      is: "LATER",
      then: (schema) =>
        schema
          .required("Time is required")
          .test("is-future-date", "Please provide a future date", (value) => {
            return !!value && value > new Date();
          }),
      otherwise: (schema) => schema.notRequired(),
    }),
});

const Schedule = ({ campaignDetails, goToPreviousStep, goToNextStep }: Props) => {
  return (
    <>
      <Formik
        initialValues={campaignDetails?.scheduleDetails ?? ScheduleFormIntialValue}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log("*********", values);
          goToNextStep({scheduleDetails: values});
        }}
      >
        {({
          values,
          handleBlur,
          handleChange,
          touched,
          errors,
          handleSubmit,
          setFieldValue,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Select
                      name="type"
                      value={values.type}
                      onBlur={handleBlur}
                      onChange={(e) => {
                        handleChange(e);
                        setFieldValue("time", "");
                      }}
                      className={`form-control ${
                        touched.type && errors.type ? "is-invalid" : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select Type
                      </option>
                      {ScheduleTypes.map(({ label, value }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </Form.Select>
                    {touched.type && errors.type && (
                      <div className="invalid-feedback">
                        {errors.type as string}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              {values.type === "LATER" && (
                <Row className="mt-3">
                  <Col>
                    <Form.Group>
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        className={`form-control ${
                          touched.time && errors.time ? "is-invalid" : ""
                        }`}
                        onBlur={handleBlur}
                        type="datetime-local"
                        name="time"
                        value={values.time}
                        onChange={handleChange}
                      />
                      {touched.time && errors.time && (
                        <div className="invalid-feedback d-flex">
                          {errors.time as string}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
              )}

              <div className="d-flex justify-content-between mt-3">
                <Button onClick={goToPreviousStep}>Previous Step</Button>
                <Button type="submit">Submit</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Schedule;
