const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const isZipCodeValid = (zip) => {
  if (zip.length !== 5) {
    return false;
  }
  if (!zip.split('').every((char) => numbers.includes(char))) {
    return false;
  }
  return true;
};

export default isZipCodeValid;
