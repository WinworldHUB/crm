import { Formik } from "formik";
import {
  PersonalizationFormIntialValue,
} from "../../lib/constants";
import { Button, Col, Form, Row } from "react-bootstrap";
import { channels } from "../../lib/constants";
import Editor from "../../lib/components/Editor/Editor";
import * as Yup from 'yup';

interface Props {
  campaignDetails: CampaignDetails | null;
  goToPreviousStep: () => void;
  goToNextStep: (data: { personalization: Personalization }) => void;
}

const schema = Yup.object().shape({
  channel: Yup.string().required("Channel is required"),
  content: Yup.string()
  .test("is-not-empty", "Content is required", (value) => {
    return !!value && value.replace(/<(.|\n)*?>/g, "").trim().length > 0;
  }),
});

const Personalization = ({
  campaignDetails,
  goToPreviousStep,
  goToNextStep,
}: Props) => {
  return (
    <>
      <Formik
        initialValues={
          campaignDetails?.personalization || PersonalizationFormIntialValue
        }
        validationSchema={schema}
        onSubmit={(values) => {
          console.log("*********", values);
          goToNextStep({ personalization: values });
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
          setFieldTouched,
        }) => {
          return (
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Channel</Form.Label>
                    <Form.Select
                      name="channel"
                      value={values.channel}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className={`form-control ${
                        touched.channel && errors.channel ? "is-invalid" : ""
                      }`}
                    >
                      <option value="" disabled>
                        Select Channel
                      </option>
                      {channels.map(({ label, value }) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </Form.Select>
                    {touched.channel && errors.channel && (
                      <div className="invalid-feedback">
                        {errors.channel as string}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mt-3">
                <Col>
                  <Form.Group>
                    <Form.Label>Template</Form.Label>
                    <Editor
                      value={values.content}
                      onBlur={() => {
                        setFieldTouched("content");
                      }}
                      onChange={(value) => {
                        setFieldValue("content", value);
                      }}
                    />
                    {touched.content && errors.content && (
                      <div className="invalid-feedback d-flex">
                        {errors.content as string}
                      </div>
                    )}
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-flex justify-content-between mt-3">
                <Button onClick={goToPreviousStep}>Previous Step</Button>
                <Button type="submit">Next Step</Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default Personalization;
