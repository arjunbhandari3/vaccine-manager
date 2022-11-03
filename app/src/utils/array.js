export const sortVaccinesData = (data) => {
  const mandatoryVaccine = data.filter((vaccine) => vaccine.isMandatory);
  const optionalVaccine = data.filter((vaccine) => !vaccine.isMandatory);

  return [
    ...sortDataByKey(mandatoryVaccine),
    ...sortDataByKey(optionalVaccine),
  ];
};

export const sortDataByKey = (data = [], key = "name") => {
  return data.sort((a, b) => a[key].localeCompare(b[key]));
};
