# Credit Card Checker
By Jamie Barlow

## Purpose

- This program began from a Codecademy project designed to help practice working with a number of JavaScript concepts: higher-order functions and callbacks, arrays, loops, and array methods/iterators. 
- The program also introduces the concept of input validation, specifically using the [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) which is commonly used for validating credit card numbers and various formats of ID number. The aim was to replicate the algorithm, and manually apply test conditions to ensure the checker is functioning correctly.
- For added flexibility and potential use with a user form input, I expanded this to account for different value types, i.e. credit card numbers that have been input as a single string of numbers - this can then be converted using the program to arrays of numbers, which is the format required for validation.

## Features

- A creditCardConvert() function to convert a batch (array) of credit cards, entered as strings, to a nested array of credit cards as numbers (instead of strings). This will be required for validation later - the numbers can then be validated using the program's other functions (below). Note: each credit card number is itself an array of numbers, so the batch of credit cards becomes a nested array of arrays. 
- A validateCred() function which checks a single credit card's numbers according to the Luhn algorithm. Returns 'true' if valid, 'false' if invalid.
- A findInvalidCards() function which uses the validateCred() function above, but applies this to a batch (nested array) of credit card numbers. This returns all invalid credit card numbers.
- An idInvalidCardCompanies() function which takes the invalid cards returned from findInavlidCards() as an input, and returns a list of credit card issuers. The function is set up to create a list without duplicates, even if the same company has issued multiple invalid credit cards.

## Technologies

- JavaScript

## Potential Additions

- Implementing a form with inputs for user submission, followed by a display of results.
