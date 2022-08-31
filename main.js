// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// Further testing from CC validator site. Should all pass as valid: 
const fakeVisa1 = [4, 7, 1, 6, 6, 4, 6, 0, 7, 9, 2, 7, 4, 0, 3, 8];
const fakeVisa2 = [4, 9, 1, 6, 3, 9, 9, 5, 4, 2, 2, 5, 8, 6, 0, 4];
const fakeDiscover1 = [6, 0, 1, 1, 1, 7, 7, 3, 4, 8, 4, 4, 5, 2, 3, 0];
const fakeDiscover2 = [6, 0, 1, 1, 1, 1, 5, 9, 3, 3, 6, 6, 7, 3, 8, 8];
const fakeAmex1 = [3, 4, 1, 7, 8, 8, 3, 9, 7, 3, 2, 4, 2, 3, 5];
const fakeAmex2 = [3, 7, 7, 7, 8, 7, 7, 6, 4, 2, 5, 7, 7, 8, 5];

const batch2 = [fakeVisa1, fakeVisa2, fakeDiscover1, fakeDiscover2, fakeAmex1, fakeAmex2];

// CC numbers entered as strings
const visaString1 = "8532719662822174"; // should return as invalid, all others valid
const visaString2 = "4539224674390628";
const discoverString1 = "6011639183356871";
const discoverString2 = "6011013540035901";

// Array of string CCs
const stringBatch = [visaString1, visaString2, discoverString1, discoverString2];

// Function to convert batch of credit cards entered as strings to a nested array of numbers (useful for validating with functions below)
const creditCardConvert = inputString => {
  let splitStrings = [];
  for (let i = 0; i < inputString.length; i++) {
    splitStrings[i] = inputString[i].split('').map(x => parseInt(x));
  }
  return splitStrings;
};

const batch3 = (creditCardConvert(stringBatch));   //testing creditCardConvert

//Checks a single credit card's numbers according to Luhn algorithm. Returns 'true' if valid, 'false' if invalid
const validateCred = array => {
  if (!array) {
    return false;
  }
  const luhnArray = [];
  luhnArray.push(array[array.length-1]);
  for (let i = array.length-2; i >= 0; i--) {
    //CC with even number of digits
    if (array.length % 2 === 0) {
      if (i % 2 === 0) {
        if (array[i] * 2 > 9) {
          luhnArray.unshift(array[i] * 2 - 9);
        } else if (array[i] * 2 <= 9) {
          luhnArray.unshift(array[i] * 2);
        }
      } else if (i % 2 === 1) {
          luhnArray.unshift(array[i]);
        };
      //CC with odd number of digits
      } else if (array.length % 2 === 1) {
        if (i % 2 === 1) {
          if (array[i] * 2 > 9) {
            luhnArray.unshift(array[i] * 2 - 9);
          } else if (array[i] * 2 <= 9) {
            luhnArray.unshift(array[i] * 2);
          }
      } else if (i % 2 === 0) {
          luhnArray.unshift(array[i]);
        };
      }
  }
  const arraySum = luhnArray.reduce((a, b) => a + b);
  return arraySum % 10 === 0 ? true : false;
}

//Takes in a batch of credit card numbers (nested array) and returns all invalid numbers using validateCred function above
const findInvalidCards = creditCardBatch => {
  const invalidNumbers = []
  for (creditCard of creditCardBatch) {
    if (validateCred(creditCard) === false) {
       invalidNumbers.push(creditCard);
    }
  }
  return invalidNumbers;
}

const invalidCards = findInvalidCards(batch); // testing function. Can be passed into idInvalidCardCompanies() below
// console.log(findInvalidCards(batch2)); // testing, should return empty array
// console.log(findInvalidCards(batch3)); // testing, should return 1 CC as invalid
console.log("Invalid cards from batch:")
console.log(invalidCards);

//Takes input of invalid card numbers and returns list of credit card issuers (no duplicates)
const idInvalidCardCompanies = invalidCards => {
  const companies = [];
  const amex = "Amex (American Express)";
  const visa = "Visa";
  const mastercard = "Mastercard";
  const discover = "Discover";
  for (card of invalidCards) {
    if (card[0] === 3 && !companies.includes(amex)) {
      companies.push(amex);
    } else if (card[0] === 4 && !companies.includes(visa)) {
      companies.push(visa);
    } else if (card[0] === 5 && !companies.includes(mastercard)) {
      companies.push(mastercard);
    } else if (card[0] === 6 && !companies.includes(discover)) {
      companies.push(discover);
    } else if (card[0] > 6 || card[0] < 3) {
      console.log(`Card no. ${invalidCards.indexOf(card) + 1}: company not found`);
    }
  }
  return companies;
}
console.log("Invalid card company issuers:")
console.log(idInvalidCardCompanies(invalidCards)); //test of above function
