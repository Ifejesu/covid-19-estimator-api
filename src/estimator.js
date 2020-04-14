const estimator = require('./myEstimator');

const covid19ImpactEstimator = (data) => {
  const {
    region,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds
  } = data;

  const { avgDailyIncomeInUSD, avgDailyIncomePopulation } = region;

  const impact = estimator(
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    10
  );

  const severeImpact = estimator(
    avgDailyIncomeInUSD,
    avgDailyIncomePopulation,
    periodType,
    timeToElapse,
    reportedCases,
    totalHospitalBeds,
    50
  );

  return {
    data,
    impact,
    severeImpact
  };
};

module.exports= covid19ImpactEstimator;
