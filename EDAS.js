// const bobotKriteria = [
//   {
//     code: "K1",
//     bobot: 0.139,
//     benefitCost: "benefit",
//   },
//   {
//     code: "K2",
//     bobot: 0.071,
//     benefitCost: "cost",
//   },
//   {
//     code: "K3",
//     bobot: 0.086,
//     benefitCost: "cost",
//   },

//   {
//     code: "K4",
//     bobot: 0.186,
//     benefitCost: "benefit",
//   },
//   {
//     code: "K5",
//     bobot: 0.059,
//     benefitCost: "benefit",
//   },
//   {
//     code: "K6",
//     bobot: 0.047,
//     benefitCost: "benefit",
//   },
//   {
//     code: "K7",
//     bobot: 0.415,
//     benefitCost: "benefit",
//   },
// ];

// const alternativeDatas = [
//   {
//     K1: 0.1708,
//     K2: 24,
//     K3: 3,
//     K4: 1,
//     K5: 2,
//     K6: 1,
//     K7: 1,
//   },
//   {
//     K1: 0.2196,
//     K2: 18,
//     K3: 5,
//     K4: 1,
//     K5: 3,
//     K6: 1,
//     K7: 1,
//   },
//   {
//     K1: 0.244,
//     K2: 22,
//     K3: 4,
//     K4: 0,
//     K5: 2,
//     K6: 1,
//     K7: 1,
//   },
//   {
//     K1: 0.2928,
//     K2: 12,
//     K3: 5,
//     K4: 1,
//     K5: 2,
//     K6: 1,
//     K7: 1,
//   },
//   {
//     K1: 0.2684,
//     K2: 12,
//     K3: 3,
//     K4: 0,
//     K5: 1,
//     K6: 1,
//     K7: 1,
//   },
// ];

const AVHandler = ({ bobotKriteria, alternativeDatas }) => {
  const arrAV = [];

  const objPerKriteria = {};

  bobotKriteria?.forEach((dataBobot, idx) => {
    if (dataBobot?.code === `K${idx + 1}`) {
      const arrValuePerKriteria = [];
      alternativeDatas?.forEach((alt) => {
        arrValuePerKriteria.push(alt?.[`K${idx + 1}`]);
      });
      objPerKriteria[`K${idx + 1}`] = arrValuePerKriteria;
    }
  });

  bobotKriteria?.forEach((bobotData, idx) => {
    arrAV?.push({
      code: `K${idx + 1}`,
      value:
        objPerKriteria?.[`K${idx + 1}`]?.reduce((total, curr) => {
          return (total += curr);
        }, 0) / alternativeDatas?.length,
      benefitCost: bobotData?.benefitCost === "benefit" ? "benefit" : "cost",
    });
  });

  return arrAV;
};

const PDAHandler = ({ bobotKriteria, alternativeDatas }) => {
  const valueAV = AVHandler({
    bobotKriteria,
    alternativeDatas,
  });
  let dataPerAlternative = {};

  const ArrAVPositifDatas = alternativeDatas?.map((altObj) => {
    dataPerAlternative = { ...altObj };
    Object?.keys(dataPerAlternative)?.forEach((altKey) => {
      const findIndexAVHandler = valueAV?.findIndex(
        (data) => data?.code === altKey
      );
      const valueAVHandler = valueAV?.[findIndexAVHandler]?.value;
      const benefitCostAVHandler = valueAV?.[findIndexAVHandler]?.benefitCost;

      if (benefitCostAVHandler === "benefit") {
        dataPerAlternative[altKey] =
          (valueAVHandler - dataPerAlternative[altKey]) / valueAVHandler;
      }
      if (benefitCostAVHandler === "cost") {
        dataPerAlternative[altKey] =
          (dataPerAlternative[altKey] - valueAVHandler) / valueAVHandler;
      }
    });

    return dataPerAlternative;
  });

  return ArrAVPositifDatas;
};
const NDAHandler = ({ bobotKriteria, alternativeDatas }) => {
  const valueAV = AVHandler({
    bobotKriteria,
    alternativeDatas,
  });
  let dataPerAlternative = {};

  const ArrAVNegatifDatas = alternativeDatas?.map((altObj) => {
    dataPerAlternative = { ...altObj };
    Object?.keys(dataPerAlternative)?.forEach((altKey) => {
      const findIndexAVHandler = valueAV?.findIndex(
        (data) => data?.code === altKey
      );
      const valueAVHandler = valueAV?.[findIndexAVHandler]?.value;
      const benefitCostAVHandler = valueAV?.[findIndexAVHandler]?.benefitCost;

      if (benefitCostAVHandler === "benefit") {
        dataPerAlternative[altKey] =
          (dataPerAlternative[altKey] - valueAVHandler) / valueAVHandler;
      }
      if (benefitCostAVHandler === "cost") {
        dataPerAlternative[altKey] =
          (valueAVHandler - dataPerAlternative[altKey]) / valueAVHandler;
      }
    });

    return dataPerAlternative;
  });

  return ArrAVNegatifDatas;
};

const distance_PDA = ({ bobotKriteria, alternativeDatas }) => {
  const PDA_Value = PDAHandler({
    bobotKriteria,
    alternativeDatas,
  });
  let maxVal;
  const arrPerAlternatif = [];

  const arrDistancePDA = PDA_Value?.map((dataObj, idx) => {
    Object?.keys(dataObj)?.forEach((dataKey) => {
      const indexBobot = bobotKriteria?.findIndex(
        (data) => data?.code === dataKey
      );

      dataObj[dataKey] = dataObj[dataKey] * bobotKriteria?.[indexBobot]?.bobot;
    });
    return dataObj;
  });

  arrDistancePDA?.forEach((dataPDA) => {
    arrPerAlternatif?.push(Object?.values(dataPDA));
  });

  const sumPDAPerAlternative = arrPerAlternatif?.map((data) =>
    data?.reduce((total, curr) => (total += curr), 0)
  );

  maxVal = Math.max(...sumPDAPerAlternative);

  return { arrDatas: arrDistancePDA, maxValue: maxVal };
};

const distance_NDA = ({ bobotKriteria, alternativeDatas }) => {
  const NDA_Value = NDAHandler({
    bobotKriteria,
    alternativeDatas,
  });
  let maxVal;
  const arrPerAlternatif = [];

  const arrDistanceNDA = NDA_Value?.map((dataObj, idx) => {
    Object?.keys(dataObj)?.forEach((dataKey) => {
      const indexBobot = bobotKriteria?.findIndex(
        (data) => data?.code === dataKey
      );

      dataObj[dataKey] = dataObj[dataKey] * bobotKriteria?.[indexBobot]?.bobot;
    });
    return dataObj;
  });

  arrDistanceNDA?.forEach((dataPDA) => {
    arrPerAlternatif?.push(Object?.values(dataPDA));
  });

  const sumNDAPerAlternative = arrPerAlternatif?.map((data) =>
    data?.reduce((total, curr) => (total += curr), 0)
  );

  maxVal = Math.max(...sumNDAPerAlternative);

  return { arrDatas: arrDistanceNDA, maxValue: maxVal };
};

const normalisasiSPHandler = ({ bobotKriteria, alternativeDatas }) => {
  const arrDistancePDA = distance_PDA({
    bobotKriteria,
    alternativeDatas,
  });
  const arrValuesPerAlternatif = [];
  const NSP = [];

  arrDistancePDA?.arrDatas?.forEach((dataPDA) => {
    arrValuesPerAlternatif?.push(Object?.values(dataPDA));
  });

  arrValuesPerAlternatif?.forEach((valuePerAlt) => {
    NSP?.push(
      valuePerAlt?.reduce((total, curr) => (total += curr), 0) /
        arrDistancePDA?.maxValue
    );
  });

  return NSP;
};

const normalisasiSNHandler = ({ bobotKriteria, alternativeDatas }) => {
  const arrDistanceNDA = distance_NDA({
    bobotKriteria,
    alternativeDatas,
  });
  const arrValuesPerAlternatif = [];
  const NSN = [];

  arrDistanceNDA?.arrDatas?.forEach((dataNDA) => {
    arrValuesPerAlternatif?.push(Object?.values(dataNDA));
  });

  arrValuesPerAlternatif?.forEach((valuePerAlt) => {
    NSN?.push(
      valuePerAlt?.reduce((total, curr) => (total += curr), 0) /
        arrDistanceNDA?.maxValue
    );
  });

  return NSN;
};

const skorHandler = ({ bobotKriteria, alternativeDatas }) => {
  const arrNormalisasiSP = normalisasiSPHandler({
    bobotKriteria,
    alternativeDatas,
  });
  const arrNormalisasiSN = normalisasiSNHandler({
    bobotKriteria,
    alternativeDatas,
  });

  const arrSkor = [];
  const utkConsoleLog = [];

  for (let i = 0; i < alternativeDatas?.length; i++) {
    utkConsoleLog?.push({
      NormalisasiSP: arrNormalisasiSP[i],
      NormalisasiSN: arrNormalisasiSN[i],
    });
    arrSkor?.push((arrNormalisasiSP[i] + arrNormalisasiSN[i]) / 2);
  }
  return arrSkor;
};

// skorHandler();

const EDAS = ({ bobotKriteria, alternativeDatas }) => {
  return skorHandler({
    bobotKriteria,
    alternativeDatas,
  });
};

module.exports = { EDAS };
