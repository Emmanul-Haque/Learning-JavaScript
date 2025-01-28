"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Md.Emmanul Haque",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 9090,
  type: "premium",

  movementsDates: [
    "2022-11-01T13:15:33.035Z",
    "2022-11-30T09:48:16.867Z",
    "2023-12-25T06:04:23.907Z",
    "2023-01-25T14:18:46.235Z",
    "2023-02-05T16:33:06.386Z",
    "2024-04-10T14:43:26.374Z",
    "2024-11-17T18:49:59.371Z",
    "2024-11-21T12:01:20.894Z",
  ],
  currency: "INR",
  locale: "en-IN", // for India
};

const account2 = {
  owner: "Jonas Schmedtmann",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  type: "premium",

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE for portuguese
  // currency: "USD",
  // locale: "en-US", // for USA
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  type: "standard",
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  type: "basic",
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// ----------------------X------Functions------X------------------------

// Formatted date and time according to each country
const formatMovementsDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  };
  return new Intl.DateTimeFormat(locale, options).format(date);
};

// Formatted currency according to each country
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

// Display Transaction on the page
const displayMovements = function (acc, sort = false) {
  containerMovements.textContent = "";

  const combinedMovDates = acc.movements.map((mov, i) => ({
    movement: mov,
    movementDate: acc.movementsDates.at(i),
  }));

  console.log(combinedMovDates);

  if (sort) combinedMovDates.sort((a, b) => a.movement - b.movement);

  combinedMovDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? `deposit` : `withdrawal`;

    const date = new Date(movementDate);
    const displayDate = formatMovementsDate(date, acc.locale);

    const formattedMov = formatCurrency(movement, acc.locale, acc.currency);

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${displayDate}</div>
      <div class="movements__value">${formattedMov}</div>
    </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// calculate the total transaction and then display balance
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  )}`;
};

// calculate the total incomes, outcome and interest given out by bank
const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, deposit) => acc + deposit, 0);
  labelSumIn.textContent = `${formatCurrency(
    incomes,
    acc.locale,
    acc.currency
  )}`;

  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, withdrew) => acc + withdrew, 0);
  labelSumOut.textContent = `${formatCurrency(
    Math.abs(outcomes),
    acc.locale,
    acc.currency
  )}`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest >= 1)
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${formatCurrency(
    interest,
    acc.locale,
    acc.currency
  )}`;
};

// create username ➡️ Md Emmanul Haque's username = MEH
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map(word => word[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display Movements
  displayMovements(acc);

  // Display Balance
  calcDisplayBalance(acc);

  // Display Summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  // make a timer clock
  const clock = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, show the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // when 0 second, stop / reset timer and log out the user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    //Decrease 1 sec
    time--;
  };

  // set time to 5 minutes
  let time = 300;

  // call the timer clock every second
  clock();
  const timer = setInterval(clock, 1000);
  return timer;
};

// Trying New Feature in JS Group-By
// const groupedAccounts = Object.groupBy(accounts, acc => acc.type); -> Old Way
const groupedAccounts = Object.groupBy(accounts, ({ type }) => type); // -> New Way
console.log(groupedAccounts);

// ----------------------X------BUTTON EVENTS------X------------------------

// Global variables
let currentAccount, timer;

// Implementing Login
btnLogin.addEventListener("click", function (e) {
  // Prevent Form from submitting or reloading the page
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display Message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;

    // Display Current Date and Time
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    const locale = navigator.language;
    console.log(locale); // Use for formating as per user's country Date and Time

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now); // Use the code wrtten in the object

    // Display UI
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // check if timer exist, if not only then call the timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Updating UI
    updateUI(currentAccount);
  }
});

// Implementing Transfer
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );

  // Clear input fields
  inputTransferAmount.value = inputTransferTo.value = "";
  inputTransferAmount.blur();

  // checking pre-conditions before transfer money
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Transfering money
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Adding Transfer Data
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Updating UI
    updateUI(currentAccount);

    // Reset the timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

// Implementing Loan Functionality
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Bank taking 2.5 sec to approve the loan
    setTimeout(function () {
      // Add movements
      currentAccount.movements.push(amount);

      // Adding loan Data
      currentAccount.movementsDates.push(new Date().toISOString());

      // Updating UI
      updateUI(currentAccount);

      // Reset the timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }

  // Clear input fields
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

// Implementing Close Account
btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  const userName = inputCloseUsername.value;
  const userPin = +inputClosePin.value;

  if (userName === currentAccount.username && userPin === currentAccount.pin) {
    const index = accounts.findIndex(acc => userName === acc.username);

    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }
  // Clear input fields
  inputCloseUsername.value = inputClosePin.value = "";
  inputClosePin.blur();
});

// Implementing sort functionality
let sorted = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});
