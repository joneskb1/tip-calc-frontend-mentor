const bill = document.querySelector(".bill-input");
const numPeople = document.querySelector(".num-people-input");
const tipPercentBtns = document.querySelectorAll(".percent-button");
const tipPercentCustom = document.querySelector(".custom-tip-input");
const resetBtn = document.querySelector(".reset-btn");
const arrTipBtns = [...tipPercentBtns];
const arrInputs = [bill, numPeople, tipPercentCustom];
const errorText = document.querySelector(".error-text");
const tipAmount = document.querySelector(".tip-total-amount.top-total");
const totalAmount = document.querySelector(".tip-total-amount.middle-total");

// getActiveTipBtn
function getActiveTipBtn() {
  return (activeArr = arrTipBtns.filter((el) =>
    el.classList.contains("active-percent-btn")
  ));
}

// activate reset btn on any input
function toggleResetBtn() {
  const activeArr = getActiveTipBtn();
  if (
    bill.value === "" &&
    numPeople.value === "" &&
    tipPercentCustom.value === "" &&
    activeArr.length === 0
  ) {
    resetBtn.classList.remove("active-reset-btn");
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
  } else {
    resetBtn.classList.add("active-reset-btn");
  }
}
document.body.addEventListener("keyup", toggleResetBtn);

// add active to target % btn, remove active from all other % btns
function percentBtnAddActive(e) {
  arrTipBtns.forEach((el) => el.classList?.remove("active-percent-btn"));
  e.target.classList.add("active-percent-btn");
  tipPercentCustom.value = "";
  toggleResetBtn();
}

arrTipBtns.forEach((el) => el.addEventListener("click", percentBtnAddActive));

// clear active percent btns
function clearActiveClassPercentBtns() {
  arrTipBtns.forEach((el) => el.classList.remove("active-percent-btn"));
}

// clear % btns active class when using custom %
tipPercentCustom.addEventListener("click", clearActiveClassPercentBtns);

// reset btn clear all inputs
function clearInputs() {
  bill.value = "";
  numPeople.value = "";
  tipPercentCustom.value = "";
  clearActiveClassPercentBtns();
  toggleResetBtn();
  tipAmount.textContent = "$0.00";
  totalAmount.textContent = "$0.00";
}
resetBtn.addEventListener("click", clearInputs);

// error on num people
function errorMsg(e) {
  if (Number(e.target.value) === 0 && e.target.value !== "") {
    errorText.classList.add("error-text-display");
    numPeople.classList.add("error-input");
  } else {
    errorText.classList.remove("error-text-display");
    numPeople.classList.remove("error-input");
  }
}

numPeople.addEventListener("keyup", errorMsg);

// calc tip/totals
function calcTip() {
  let totalPerPerson;
  let tipAmountPerPerson;

  const activeArr = getActiveTipBtn();

  const readyActiveArr =
    activeArr.length > 0 && tipPercentCustom.value === "" ? true : false;

  const readyCustom =
    activeArr.length === 0 && tipPercentCustom.value !== "" ? true : false;

  // check if ready & calculate if so
  if (
    bill.value === "" ||
    numPeople.value === "" ||
    Number(numPeople.value) === 0 ||
    (!readyActiveArr && !readyCustom)
  ) {
    tipAmount.textContent = "$0.00";
    totalAmount.textContent = "$0.00";
    return;
  } else if (readyActiveArr) {
    totalPerPerson =
      (Number(bill.value) * Number(1 + activeArr[0].dataset.amount)) /
      Number(numPeople.value);
    tipAmountPerPerson =
      (Number(bill.value) * Number(activeArr[0].dataset.amount)) /
      Number(numPeople.value);
  } else if (readyCustom) {
    const customTip = tipPercentCustom.value / 100;
    totalPerPerson =
      (Number(bill.value) * Number(1 + customTip)) / Number(numPeople.value);
    tipAmountPerPerson =
      (Number(bill.value) * Number(customTip)) / Number(numPeople.value);
  }

  //render totals
  tipAmount.textContent = `$${tipAmountPerPerson.toFixed(2)}`;
  totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
}

document.body.addEventListener("keyup", calcTip);
arrTipBtns.forEach((el) => el.addEventListener("click", calcTip));
