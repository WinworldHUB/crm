import { Form, Row, Col } from "react-bootstrap";

interface Props {
  sections: FormSection[];
  formik: any;
}

const DynamicForm = ({ sections, formik }: Props) => {

  const renderField = (field: FormField) => {
    const fieldValue = formik.values.filters[field.name] || "";
    const fieldError = formik.errors.filters?.[field.name];
    const fieldTouched = formik.touched.filters?.[field.name];

    switch (field.type) {
      case "select":
        return (
          <>
            <Form.Select
              name={`filters.${field.name}`}
              value={fieldValue}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={fieldTouched && fieldError}
            >
              <option value="" disabled>
                Select...
              </option>
              {field.options?.map(
                (option: StaticOption | string, index: number) => (
                  <option
                    key={index}
                    value={typeof option === "string" ? option : option.value}
                  >
                    {typeof option === "string" ? option : option.label}
                  </option>
                )
              )}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {fieldError}
            </Form.Control.Feedback>
          </>
        );

      case "radio":
        return field.options?.map(
          (option: StaticOption | string, index: number) => (
            <Form.Check
              key={index}
              type="radio"
              name={`filters.${field.name}`}
              value={typeof option === "string" ? option : option.value}
              label={typeof option === "string" ? option : option.label}
              onChange={formik.handleChange}
              checked={
                fieldValue ===
                (typeof option === "string" ? option : option.value)
              }
              isInvalid={fieldTouched && fieldError}
            />
          )
        );

      case "checkbox":
        return (
          <>
            <Form.Check
              type="checkbox"
              name={`filters.${field.name}`}
              label={field.label}
              onChange={formik.handleChange}
              checked={!!fieldValue}
              isInvalid={fieldTouched && fieldError}
            />
            <Form.Control.Feedback type="invalid">
              {fieldError}
            </Form.Control.Feedback>
          </>
        );

      case "textarea":
        return (
          <>
            <Form.Control
              as="textarea"
              rows={3}
              name={`filters.${field.name}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={fieldValue}
              isInvalid={fieldTouched && fieldError}
            />
            <Form.Control.Feedback type="invalid">
              {fieldError}
            </Form.Control.Feedback>
          </>
        );

      default:
        return (
          <>
            <Form.Control
              type={field.type}
              name={`filters.${field.name}`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={fieldValue}
              isInvalid={fieldTouched && fieldError}
            />
            <Form.Control.Feedback type="invalid">
              {fieldError}
            </Form.Control.Feedback>
          </>
        );
    }
  };

  return (
    <>
      {sections.map((section: FormSection, sectionIndex: number) => (
        <div key={sectionIndex} className="mt-3">
          <Row>
            {section.fields.map((field: FormField, fieldIndex: number) => (
              <Col md={6} sm={12} key={fieldIndex}>
                <Form.Group className="mb-3">
                  <Form.Label>{field.label}</Form.Label>
                  {renderField(field)}
                </Form.Group>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </>
  );
};

export default DynamicForm;
