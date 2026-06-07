class BankAccount {
  constructor() {
    this.balance = 0;
    this.transactions = [];
  }

  deposit(amount) {
    if (amount <= 0) {
      return "Deposit amount must be greater than zero.";
    }

    this.transactions.push({ type: "deposit", amount: amount });
    this.balance += amount;
    return `Successfully deposited $${amount}. New balance: $${this.balance}`;
  }

  withdraw(amount) {
    if (amount <= 0 || amount > this.balance) {
      return "Insufficient balance or invalid amount.";
    }

    this.transactions.push({ type: "withdraw", amount: amount });
    this.balance -= amount;

    return `Successfully withdrew $${amount}. New balance: $${this.balance}`;
  }

  checkBalance() {
    return `Current balance: $${this.balance}`;
  }

  listAllDeposits() {
    const deposite = this.transactions
      .filter((t) => t.type === "deposit")
      .map((t) => t.amount);

    return `Deposits: ${deposite.join(",")}`;
  }

  listAllWithdrawals() {
    const withdrawals = this.transactions
      .filter((t) => t.type === "withdraw")
      .map((t) => t.amount);

    return `Withdrawals: ${withdrawals.join(",")}`;
  }
}

const myAccount = new BankAccount();

const elements = {
  depositInput: document.getElementById("deposit-amount"),
  depositBtn: document.getElementById("deposit-btn"),
  withdrawInput: document.getElementById("withdraw-amount"),
  withdrawBtn: document.getElementById("withdraw-btn"),

  balance: document.getElementById("balance-display"),
  systemMessage: document.getElementById("system-message"),
  depositsList: document.getElementById("deposits-list"),
  withdrawalsList: document.getElementById("withdrawals-list"),
};

const state = new Proxy(
  {
    balance: "$0.00",
    systemMessage: "Welcome back. System ready for transactions.",
    depositsList: "Deposits: None",
    withdrawalsList: "Withdrawals: None",
  },
  {
    set(target, property, value) {
      target[property] = value;
      if (typeof elements !== "undefined" && elements[property]) {
        elements[property].textContent = value;
      }
      return true;
    },
  },
);

function updateDashboardUI(message) {
  state.balance = `$${myAccount.balance.toFixed(2)}`;
  state.systemMessage = message;
  state.depositsList = myAccount.listAllDeposits();
  state.withdrawalsList = myAccount.listAllWithdrawals();
}

function initEventListeners() {
  if (elements.depositBtn) {
    elements.depositBtn.addEventListener("click", () => {
      const amount = parseFloat(elements.depositInput.value);

      const msg = myAccount.deposit(amount);

      updateDashboardUI(msg);
      elements.depositInput.value = "";
    });
  }

  if (elements.withdrawBtn) {
    elements.withdrawBtn.addEventListener("click", () => {
      const amount = parseFloat(elements.withdrawInput.value);
      const msg = myAccount.withdraw(amount);

      updateDashboardUI(msg);
      elements.withdrawInput.value = "";
    });
  }
}

function init() {
  updateDashboardUI("Welcome back. Account initialized with baseline history.");
  initEventListeners();
}

document.addEventListener("DOMContentLoaded", init);
