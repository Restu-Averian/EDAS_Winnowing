// sample from https://extra.cahyadsn.com/edas

const { EDAS } = require("./EDAS");

const bobotKriteria = [
  {
    title: "relevansi",
    code: "K1",
    bobot: 0.148,
    benefitCost: "benefit",
  },
  {
    title: "sks",
    code: "K2",
    bobot: 0.046,
    benefitCost: "cost",
  },
  {
    title: "nmhs usul",
    code: "K3",
    bobot: 0.052,
    benefitCost: "cost",
  },
  {
    title: "bdg",
    code: "K4",
    bobot: 0.17,
    benefitCost: "benefit",
  },
  {
    title: "jbtn",
    code: "K5",
    bobot: 0.083,
    benefitCost: "benefit",
  },
  {
    title: "pend",
    code: "K6",
    bobot: 0.076,
    benefitCost: "benefit",
  },
  {
    title: "is jdl",
    code: "K7",
    bobot: 0.423,
    benefitCost: "benefit",
  },
];

const alternativeDatas = [
  {
    K1: 0.1708,
    K2: 24,
    K3: 3,
    K4: 1,
    K5: 2,
    K6: 1,
    K7: 1,
  },
  {
    K1: 0.2196,
    K2: 18,
    K3: 5,
    K4: 1,
    K5: 3,
    K6: 1,
    K7: 1,
  },
  {
    K1: 0.244,
    K2: 22,
    K3: 4,
    K4: 0,
    K5: 2,
    K6: 1,
    K7: 1,
  },
  {
    K1: 0.2928,
    K2: 12,
    K3: 5,
    K4: 1,
    K5: 2,
    K6: 1,
    K7: 1,
  },
  {
    K1: 0.2684,
    K2: 11,
    K3: 3,
    K4: 0,
    K5: 1,
    K6: 1,
    K7: 1,
  },
];

const a = EDAS({
  alternativeDatas,
  bobotKriteria,
});

console.log(a);
