const {
  allWinnowingDosen,
  winnowingHandler,
  jaccardSimilarityHandler,
} = require("./Winnowing");
const { EDAS } = require("./EDAS");
const sortArrObj = require("../helpers/sortArrObj");

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
  const K1Val = allWinnowingDosen({
    dataPenelitian: dataDosen,
    strJudulMhs,
    kGramCount: 3,
    windowCount: 11,
  });

  const arrDataAlternative = dataDosen?.map((data) => {
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

  const kriteriaSort = sortArrObj({
    arr: bobotKriteria,
    props: "code",
  });

  const EDASVal = EDAS({
    bobotKriteria: kriteriaSort,
    alternativeDatas: arrDataAlternative,
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
