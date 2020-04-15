const express = require('express');
const fs = require('fs');
const o2x = require('object-to-xml');
const router = express.Router();
const estimator = require('../src/estimator');

const getEstimate = (req) => {
  const inputData = {
    region: {
      name: req.body.region.name,
      avgAge: req.body.region.avgAge,
      avgDailyIncomeInUSD: req.body.region.avgDailyIncomeInUSD,
      avgDailyIncomePopulation: req.body.region.avgDailyIncomePopulation
    },
    periodType: req.body.periodType,
    timeToElapse: req.body.timeToElapse,
    reportedCases: req.body.reportedCases,
    population: req.body.population,
    totalHospitalBeds: req.body.totalHospitalBeds
  };

  return estimator(inputData);
};
const checkParameter = (res, parameter) => {
  if (parameter === 'json') {
    return res.setHeader('Content-Type', 'application/json');
  }
  if (parameter === 'xml') {
    return res.setHeader('Content-Type', 'application/xml');
  }

  throw new Error('Check your url again');
};

router.post('/', (req, res) => {
  const result = getEstimate(req);
  res.status(200).json(result);
});

router.post('/:format', (req, res) => {
  const urlParam = req.params.format;
  checkParameter(res, urlParam);
  const result = getEstimate(req);

  if (urlParam === 'json') {
    res.status(200).json(result);
  }
  if (urlParam === 'xml') {
    res.status(200).send(o2x(result));
  }
});

router.get('/logs', (req, res) => {
  res.setHeader('Content-Type', 'text/plain');

  fs.readFile('./logs.txt', (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.status(200).send(data);
  });
});

module.exports = router;