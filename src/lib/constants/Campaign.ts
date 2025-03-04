export const BasicDetailsFormIntialValue: BasicDetails = {
  title: "",
  description: "",
  id: "",
};

export const channels = [
  { label: "SMS", value: "SMS" },
  { label: "E-Mail", value: "EMAIL" },
];

export const ScheduleFormIntialValue: ScheduleDetails = {
  type: "",
  time: "",
};

export const ScheduleTypes = [
  { label: "Now", value: "NOW" },
  { label: "Later", value: "LATER" },
];

export const categories = [
  {
    id: "demographics",
    label: "Demographics",
    subCategories: [
      { id: "ageRange", label: "Age Range" },
      { id: "gender", label: "Gender" },
      { id: "postCode", label: "Post Code" },
      { id: "clinic", label: "Specific Clinic" },
      { id: "practitioner", label: "Specific Practitioner" },
    ],
  },
  {
    id: "visitHistory",
    label: "Visit History",
    subCategories: [
      { id: "lastVisitDate", label: "Last Visit Date" },
      { id: "visitFrequency", label: "Visit Frequency" },
      { id: "upcomingAppointments", label: "Upcoming Appointments" },
      { id: "noShowPatients", label: "No-Show Patients" },
      { id: "oldPatients", label: "Old Patients" },
    ],
  },
  {
    id: "treatments",
    label: "Treatments",
    subCategories: [
      { id: "treatmentReceived", label: "Specific Treatment Received" },
      { id: "ongoingTreatments", label: "Ongoing Treatments" },
      { id: "treatmentDue", label: "Treatment Due for Renewal" },
      {
        id: "notOptedServices",
        label: "Didn't Opt for Recommended Services",
      },
    ],
  },
  {
    id: "engagement",
    label: "Engagement",
    subCategories: [
      { id: "subscribedMarketing", label: "Subscribed to Marketing" },
      { id: "respondedCampaign", label: "Responded to Last Campaigns" },
      { id: "neverEngaged", label: "Never Engaged with Campaigns" },
    ],
  },
  {
    id: "events",
    label: "Events",
    subCategories: [
      { id: "birthday", label: "Birthday Coming Up" },
      { id: "anniversary", label: "Anniversary" },
      { id: "followUp", label: "Follow-up Reminder" },
    ],
  },
];

export const fields: Record<string, FormSection[]> = {
  ageRange: [
    {
      sectionTitle: "",
      fields: [
        {
          name: "minAge",
          label: "Minimum Age",
          type: "number",
          validation: {
            required: true,
            min: 0,
            max: 120,
          },
        },
        {
          name: "maxAge",
          label: "Maximum Age",
          type: "number",
          validation: {
            required: true,
            min: 0,
            max: 120,
          },
        },
      ],
    },
  ],
  gender: [
    {
      sectionTitle: "",
      fields: [
        {
          name: "gender",
          label: "Gender",
          type: "select",
          options: ["Male", "Female", "Others"],
          validation: {
            required: true,
          },
        },
      ],
    },
  ],
  postCode: [
    {
      sectionTitle: "",
      fields: [
        {
          name: "postCode",
          label: "Post Code",
          type: "select",
          options: ["06010", "182142", "98738"],
          validation: {
            required: true,
          },
        },
      ],
    },
  ],
  practitioner: [
    {
      sectionTitle: "",
      fields: [
        {
          name: "practitioner",
          label: "Practitioner",
          type: "select",
          options: ["Osbourn Pettyfar", "Adam Ricardet", "Lesly Dell'Abbate"],
          validation: {
            required: true,
          },
        },
      ],
    },
  ],
  clinic: [
    {
      sectionTitle: "",
      fields: [
        {
          name: "clinic",
          label: "Clinic",
          type: "select",
          options: [
            "Elitecare Clinic",
            "Communitycare Hospital",
            "Gastroguard Digestive Health",
          ],
          validation: {
            required: true,
          },
        },
      ],
    },
  ],
} as unknown as Record<string, FormSection[]>;

export const PersonalizationFormIntialValue:Personalization = {
    channel: "",
    content: "",
  };
  
  
export const FilterFormIntialValue = {
    category: "",
    subCategory: "",
  };