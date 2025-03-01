import { Form, Row, Col, Button } from "react-bootstrap";
import { categories, fields } from "../../lib/constants";
import { Formik } from "formik";
import DynamicForm from "../../lib/components/DynamicForm/DynamicForm";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import {
  FilterFormIntialValue,
  getDefaultValuesForFilter,
  getValidationSchemaForFilter,
} from "../../lib/utils/TargetAudienceFilter";

interface Props {
  setFilters: React.Dispatch<React.SetStateAction<Filter[]>>
}

const TargetAudienceFilter = ({ setFilters }: Props) => {
  const [validationSchema, setValidationSchema] = useState(
    Yup.object().shape({})
  );

  return (
    <>
      <h3>Target Audience Filter</h3>
      <Formik
        initialValues={FilterFormIntialValue}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("*********", values);
          setFilters((prev) => [...prev, values]);
          resetForm(FilterFormIntialValue);
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
                <Col>
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
              </Row>

              <Row className="mt-3">
                <Col>
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
                    onClick={() => formik.resetForm(FilterFormIntialValue)}
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
    </>
  );
};

export default TargetAudienceFilter;
