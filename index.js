const { EDAS_Winnowing } = require("./EDAS_Winnowing");
const { winnowingHandler, allWinnowingDosen } = require("./Winnowing");

const strJudulMhs =
  "PENENTUAN DOSEN PEMBIMBING TUGAS AKHIR JURUSAN TI Politeknik Negeri Padang DENGAN ALGORITMA AHP-WP DAN WINNOWING BERBASIS WEBSITE";
const dataDosen = [
  {
    dosenName: "Alde",
    judulPenelitian: [
      "Sistem Informasi Harga Komoditas Pangan untuk Pasar-Pasar di Kota Padang",
      "The Implementation of IoT (Internet of Things) for Controlling Cow Health",
      "Web Application Penetration Testing Using SQL Injection Attack",
    ],
    SKS: 24,
    nMhs: 3,
    keahlian: 1,
    jbtn: 2,
    pend: 1,
    isJudulDriDosen: 1,
  },
  {
    dosenName: "Rasyidah",
    judulPenelitian: [
      "Implementing Machine Learning in Students Qur'an Memorization Prediction",
      "Most Profitable Currency Exchange for ASEAN Countries Using Dijkstra’s Algorithm",
      "Customer’s Behavior in Purchase Decision of Textile Materials: RoughRegression Model",
    ],
    SKS: 18,
    nMhs: 5,
    keahlian: 1,
    jbtn: 3,
    pend: 1,
    isJudulDriDosen: 1,
  },
  {
    dosenName: "Defni",
    judulPenelitian: [
      "Enkripsi SMS (Short Message Service) pada telepon selular berbasis Android dengan metode RC6",
      "Pemanfaatan Metode Kano Untuk Menilai Tingkat Kepuasan Pengguna Terhadap Fungsionalitas Sistem Informasi Kepegawaian (Studi Kasus: AKNP Pelalawan)",
      "Analisis Sistim Informasi Akademik Berbasis Web Menggunakan Model Kano",
    ],
    SKS: 22,
    nMhs: 4,
    keahlian: 0,
    jbtn: 2,
    pend: 1,
    isJudulDriDosen: 1,
  },
  {
    dosenName: "Dwiny Meidelfi",
    judulPenelitian: [
      "Hybrid of AHP and TOPSIS for loan approval decision",
      "Sistem Pendukung Keputusan Memilih Tiket Pesawat Dengan Menggunakan Metode AHP",
      "Perancangan Website untuk Menentukan Produk Paling Banyak Terjual di Bengkel Man Motor Metode TOPSIS",
    ],
    SKS: 12,
    nMhs: 5,
    keahlian: 1,
    jbtn: 2,
    pend: 1,
    isJudulDriDosen: 1,
  },
  {
    dosenName: "Roni Putra",
    judulPenelitian: [
      "E-Logbook Laporkan Kondisi Kesehatan, Absen & Kinerja Dosen, Kependidikan dan Kontrak selama WFH",
      "Financial Statements Analysis of Tanah Datar District Government",
      "Perancangan Sistim Monitoring Parkir Mobil Berbasis Web",
    ],
    SKS: 11,
    nMhs: 3,
    keahlian: 0,
    jbtn: 1,
    pend: 1,
    isJudulDriDosen: 1,
  },
  {
    dosenName: "Humaira",
    judulPenelitian: [
      "Implementing Machine Learning in Students Qur'an Memorization Prediction",
      "Multiple Climacteric Fruits Classification by Using Machine Learning Approach",
      "Designing Mamdani Fuzzy Inference Systems for Decision Support Systems",
    ],
    SKS: 11,
    nMhs: 5,
    keahlian: 0,
    jbtn: 3,
    pend: 1,
    isJudulDriDosen: 1,
  },
];

const bobotKriteria = [
  {
    code: "K1",
    bobot: 0.139,
    benefitCost: "benefit",
  },
  {
    code: "K2",
    bobot: 0.071,
    benefitCost: "cost",
  },
  {
    code: "K3",
    bobot: 0.086,
    benefitCost: "cost",
  },

  {
    code: "K4",
    bobot: 0.186,
    benefitCost: "benefit",
  },
  {
    code: "K5",
    bobot: 0.059,
    benefitCost: "benefit",
  },
  {
    code: "K6",
    bobot: 0.047,
    benefitCost: "benefit",
  },
  {
    code: "K7",
    bobot: 0.415,
    benefitCost: "benefit",
  },
];

// console.log(
//   EDAS_Winnowing({
//     dataDosen,
//     strJudulMhs,
//     bobotKriteria,
//   })
//   // allWinnowingDosen({
//   //   dataPenelitian: dataDosen,
//   //   strJudulMhs,
//   // })
// );
