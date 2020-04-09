const covid19ImpactEstimator = (data) => {
    const {
      reportedCases,
      timeToElapse,
      periodType,
      totalHospitalBeds,
      region: {
        avgDailyIncomeInUSD,
        avgDailyIncomePopulation
      }
    } = data;
    let NormalizeDay;
    let period;
  
    if (periodType === 'days') {
      NormalizeDay = Math.floor(timeToElapse / 3);
      period = timeToElapse;
    } else if (periodType === 'weeks') {
      NormalizeDay = Math.floor((timeToElapse * 7) / 3);
      period = timeToElapse * 7;
    } else {
      NormalizeDay = Math.floor((timeToElapse * 30) / 3);
      period = timeToElapse * 30;
    }
    // impact estimator

    //challenge 1 (impact)
    const impactCurrentlyInfected = reportedCases * 10;
    const impactInfectionsByRequestedTime = impactCurrentlyInfected * (2 ** NormalizeDay);

    // challenge 2 (impact)
    const casesByRequestedTime = impactInfectionsByRequestedTime * 0.15;
    const impactHospitalBedsByRequestedTime = (totalHospitalBeds * 0.35) - casesByRequestedTime;

    // challenge 3 (impact)
    const impactCasesForICUByRequestedTime = impactInfectionsByRequestedTime * 0.05;
    const impactCasesForVentilatorsByRequestedTime = impactInfectionsByRequestedTime * 0.02;
    const impactDollarsInFlight = impactInfectionsByRequestedTime * region.avgDailyIncomePopulation
                                      * region.avgDailyIncomeInUSD * period;
  
    // severe impact estimator

     // challenge 1 (severeImpact)
    const severeImpactCurrentlyInfected = reportedCases * 50;
    const severeImpactInfectionsByRequestedTime = severeImpactCurrentlyInfected * (2 ** NormalizeDay);

    // challenge 2 (severeImpact)
    const severeCasesByRequestedTime = severeImpactInfectionsByRequestedTime * 0.15;
    const hospitalBedsByRequestedTime = (totalHospitalBeds * 0.35) - severeCasesByRequestedTime;

    // challenge 3 (severeImpact)
    const casesForICUByRequestedTime = severeImpactInfectionsByRequestedTime * 0.05;
    const casesForVentilatorsByRequestedTime = severeImpactInfectionsByRequestedTime * 0.02;
    const dollarsInFlight = severeImpactInfectionsByRequestedTime * region.avgDailyIncomePopulation
                              * region.avgDailyIncomeInUSD * period;
  
       // estimations output for impact an d severeImpact
    const impact = {
      currentlyInfected: impactCurrentlyInfected,
      infectionsByRequestedTime: impactInfectionsByRequestedTime,
      severeCasesByRequestedTime: casesByRequestedTime,
      hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: impactCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: impactCasesForVentilatorsByRequestedTime,
      dollarsInFlight: impactDollarsInFlight
    };
  
    const severeImpact = {
      currentlyInfected: severeImpactCurrentlyInfected,
      infectionsByRequestedTime: severeImpactInfectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    };
  
    return {
      data,
      impact,
      severeImpact
    };
  };
  
  export default covid19ImpactEstimator;


 