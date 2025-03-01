interface StaticOption {
  label: string;
  value: string;
}

enum FormFieldType {
  Text = "text",
  Select = "select",
  Radio = "radio",
  Checkbox = "checkbox",
  Textarea = "textarea",
  Number = "number",
}

interface FormValidation {
  required?: boolean;
  min?: number | string;
  max?: number | string;
}

interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required: true;
  options?: (StaticOption | string)[];
  validation?: FormValidation;
}

interface FormSection {
  sectionTitle: string;
  fields: FormField[];
}

interface Filter {
  category: string;
  subCategory: string;
  filters?: Record<string, any>;
}

interface MockData {
  patientName: string;
  age: number;
  postCode: string;
  practitioner: string;
  clinic: string;
  gender: string;
}
