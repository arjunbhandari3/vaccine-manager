export const authResponseData = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
  user: {
    id: 1,
    name: "Test User",
    email: "test@gmail.com",
    createdAt: "2023-01-01T08:05:15.241Z",
    updatedAt: "2023-01-01T08:05:15.241Z",
  },
};

export const allVaccinesResponseData = [
  {
    id: 1,
    name: "Vaccine 1",
    description: "vaccine 1 desc",
    numberOfDoses: 2,
    manufacturer: "ABC",
    releaseDate: "2022-11-07T18:15:00.000Z",
    expirationDate: "2022-11-28T18:15:00.000Z",
    photoUrl: null,
    isMandatory: true,
    createdAt: "2023-01-01T08:05:15.342Z",
    updatedAt: "2023-01-02T05:59:10.031Z",
    deletedAt: null,
    allergies: [
      {
        id: 1,
        risk: "Low",
        allergy: "Allergy 1",
      },
      {
        id: 2,
        risk: "High",
        allergy: "Allergy 2",
      },
    ],
    key: 1,
  },
  {
    id: 2,
    name: "Vaccine 2",
    description: "vaccine 2 desc",
    numberOfDoses: 3,
    manufacturer: "ABC",
    releaseDate: "2022-11-01T18:15:00.000Z",
    expirationDate: "2022-11-28T18:15:00.000Z",
    photoUrl: null,
    isMandatory: false,
    createdAt: "2023-01-01T08:05:15.342Z",
    updatedAt: "2023-01-01T14:25:09.941Z",
    deletedAt: null,
    allergies: [
      {
        id: 3,
        risk: "Medium",
        allergy: "Allergy 3",
      },
    ],
    key: 2,
  },
];

export const vaccineCountResponseData = {
  total: "2",
  mandatory: "1",
  optional: "1",
};
