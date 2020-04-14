module.exports = (
  avgDailyIncomeInUSD,
  avgDailyIncomePopulation,
  periodType,
  timeToElapse,
  reportedCases,
  totalHospitalBeds,
  estimationFactor
) => {
  let estimate;
  if (periodType === 'months' || periodType === 'month') {
    estimate = timeToElapse * 30;
  } else if (periodType === 'weeks' || periodType === 'week') {
    estimate = timeToElapse * 7;
  } else {
    estimate = timeToElapse;
  }

  const factor = 2 ** Math.trunc(estimate / 3);

  const currentlyInfected = reportedCases * estimationFactor;

  const infectionsByRequestedTime = currentlyInfected * factor;

  const severeCasesByRequestedTime = Math.trunc(
    infectionsByRequestedTime * 0.15
  );

  const hospitalBedsByRequestedTime = Math.trunc(
    totalHospitalBeds * 0.35 - severeCasesByRequestedTime
  );

  const casesForICUByRequestedTime = Math.trunc(
    infectionsByRequestedTime * 0.05
  );

  const casesForVentilatorsByRequestedTime = Math.trunc(
    infectionsByRequestedTime * 0.02
  );

  const dollarsInFlight = Math.trunc(
    (infectionsByRequestedTime
      * avgDailyIncomePopulation
      * avgDailyIncomeInUSD)
      / estimate
  );

  const results = {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };

  return results;
};
