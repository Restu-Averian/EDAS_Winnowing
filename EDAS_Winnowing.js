const { allWinnowingDosen } = require("./Winnowing");
const { EDAS } = require("./EDAS");

const sortArr = (arr = [], deps) => {
  return arr?.sort((a, b) => {
    if (a?.[deps] < b?.[deps]) {
      return 1;
    } else if (a?.[deps] > b?.[deps]) {
      return -1;
    }
    return 0;
  });
};

const EDAS_Winnowing = ({ dataDosen, strJudulMhs, bobotKriteria }) => {
  const K1Val = allWinnowingDosen({ dataPenelitian: dataDosen, strJudulMhs });

  const arrDatAlternative = dataDosen?.map((data) => {
    return {
      K1: K1Val?.find((k1) => k1?.dosenName === data?.dosenName)
        ?.winnowingValue,
      K2: data?.SKS,
      K3: data?.nMhs,
      K4: data?.keahlian,
      K5: data?.jbtn,
      K6: data?.pend,
      K7: data?.isJudulDriDosen,
    };
  });

  const EDASVal = EDAS({
    bobotKriteria,
    alternativeDatas: arrDatAlternative,
  });

  const result = [];

  EDASVal.forEach((edas, idx) => {
    result?.push({
      ...dataDosen[idx],
      dosenName: dataDosen[idx]?.dosenName,
      skor: edas,
    });
  });

  const rankData = sortArr(result, "skor");

  return rankData;
};

module.exports = { EDAS_Winnowing };
