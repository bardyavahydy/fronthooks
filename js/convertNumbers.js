// persian to english
const p2e = (s) => s.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

// english to persian 
const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

// Separate numbers with comma
const sp = (number) => {
  const separatorNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = separatorNumber.join(",");
  return e2p(joinedNumber);
};


export { e2p, p2e, sp };