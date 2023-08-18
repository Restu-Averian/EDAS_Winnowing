const dividedBy = ({ pembilang, penyebut }) => {
  if (penyebut === 0) {
    return 0;
  }
  return pembilang / penyebut;
};

module.exports = dividedBy;
