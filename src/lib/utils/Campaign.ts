import * as Yup from "yup";
import { fields } from "../constants";

export const getDefaultValuesForFilter = (subCategory: string) => {
  const defaultValues: Record<string, any> = {};

  if (!subCategory || !fields[subCategory]) {
    return {};
  }

  fields[subCategory].forEach((section) => {
    section.fields.forEach((field) => {
      defaultValues[field.name] = "";
    });
  });
  return defaultValues;
};

export const getValidationSchemaForFilter = (subCategory: string) => {
  const schemaFields: Record<string, any> = {};

  if (!subCategory || !fields[subCategory]) {
    return Yup.object().shape({});
  }

  fields[subCategory].forEach((section) => {
    section.fields.forEach((field) => {
      let validator: Yup.AnySchema = Yup.mixed();

      if (field.validation?.required) {
        validator = validator.required(`${field.label} is required`);
      }

      if (field.type === "number") {
        let numberValidator = Yup.number()
          .typeError(`${field.label} must be a number`)
          .nullable()
          .transform((value, originalValue) =>
            originalValue === "" ? null : value
          );

        if (field.validation?.required) {
          numberValidator = numberValidator.required(`${field.label} is required`);
        }

        if (field.validation?.min !== undefined) {
          numberValidator = numberValidator.min(
            Number(field.validation.min),
            `${field.label} must be at least ${field.validation.min}`
          );
        }

        if (field.validation?.max !== undefined) {
          numberValidator = numberValidator.max(
            Number(field.validation.max),
            `${field.label} must be at most ${field.validation.max}`
          );
        }
        validator = numberValidator;
      }

      if (["select", "radio", "text", "textarea"].includes(field.type)) {
        validator = Yup.string().trim().required(`${field.label} is required`);

        if (field.options && Array.isArray(field.options)) {
          const optionValues = field.options.map((opt) =>
            typeof opt === "string" ? opt : opt.value
          );
          validator = validator.oneOf(
            optionValues,
            `${field.label} must be a valid selection`
          );
        }
      }

      if (field.type === "checkbox") {
        validator = Yup.array()
          .of(Yup.string())
          .min(1, `${field.label} is required`);
      }

      schemaFields[field.name] = validator;
    });
  });

  return Yup.object().shape(schemaFields);
};

export const applyFilters = (data: MockData[], filters: Filter[]) => {
  return filters.reduce((filteredData, { subCategory, filters = {} }) => {
    return filteredData.filter((patient) => {
      switch (subCategory) {
        case "ageRange":
          return patient.age >= filters.minAge && patient.age <= filters.maxAge;
        case "gender":
          return patient.gender === filters.gender;
        case "postCode":
          return patient.postCode === filters.postCode;
        case "clinic":
          return patient.clinic === filters.clinic;
        case "practitioner":
          return patient.practitioner === filters.practitioner;
        default:
          return true;
      }
    });
  }, data);
};
