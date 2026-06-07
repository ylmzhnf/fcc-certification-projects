const state = new Proxy(
  {
    systemMessage: "System initialized. Awaiting options...",
    pollResults: "Poll Results: No options added yet.",
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

const elements = {
  addOptionBtn: document.getElementById("add-option-btn"),
  optionInput: document.getElementById("option-input"),
  voteBtn: document.getElementById("vote-btn"),
  voteIdInput: document.getElementById("voter-id-input"),
  voteOptionInput: document.getElementById("vote-option-input"),
  systemMessage: document.getElementById("system-message"),
  pollResults: document.getElementById("poll-results"),
};

const poll = new Map();

function addOption(option) {
  if (!option || option.trim() === "") {
    state.systemMessage = "Option cannot be empty";
    return;
  }
  if (poll.has(option)) {
    state.systemMessage = `Option "${option}" already exists.`;
    return;
  }

  poll.set(option, new Set());
  state.systemMessage = `Option "${option}" added to the poll.`;

  updateResultDisplay();
}

function vote(option, voterId) {
  if (!poll.has(option)) {
    state.systemMessage = `Option "${option}" does not exist.`;
    return;
  }

  const voteSet = poll.get(option);
  if (voteSet.has(voterId)) {
    state.systemMessage = `Voter <${voterId}> has already voted for "${option}".`;
    return;
  }
  voteSet.add(voterId);
  state.systemMessage = `Voter <${voterId}> voted for "${option}".`;

  updateResultDisplay();
}

function updateResultDisplay() {
  let resultString = "Poll Results:\n";
  poll.forEach((votersSet, opt) => {
    resultString += `${opt}: ${votersSet.size} votes\n`;
  });
  state.pollResults = resultString.trim();
}

function initEventListeners() {
  if (elements.addOptionBtn) {
    elements.addOptionBtn.addEventListener("click", () => {
      addOption(elements.optionInput.value);
      elements.optionInput.value = "";
    });
  }

  if (elements.voteBtn) {
    elements.voteBtn.addEventListener("click", () => {
      vote(elements.voteOptionInput.value, elements.voteIdInput.value);
      elements.voteIdInput.value = "";
      elements.voteOptionInput.value = "";
    });
  }
}

function init() {
  state.systemMessage = state.systemMessage;
  state.pollResults = state.pollResults;
  initEventListeners();
}


document.addEventListener('DOMContentLoaded', init);