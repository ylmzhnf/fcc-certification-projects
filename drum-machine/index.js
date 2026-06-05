const drumPadButtons = document.querySelectorAll(".drum-pad");
const volumeSlider = document.querySelector(".volume-slider");
const powerButton = document.getElementById("switch");
const display = document.querySelector('#display')

let currentVolume = volumeSlider.value / 100;

volumeSlider.addEventListener("input", (event) => {
  currentVolume = event.target.value / 100;
  if (powerButton.checked) {
    display.textContent = `VOL: ${event.target.value}%`;
  }
});

function playSound(button) {
  if (!powerButton.checked) return;
  const audio = button.querySelector(".clip");
  if (audio) {
    audio.currentTime = 0;
    audio.volume = currentVolume;
    audio.play();
    button.classList.add("active");
    setTimeout(() => button.classList.remove("active"), 100);
    display.textContent = button.id.replace(/-/g, ' ').toUpperCase();
  }
}

drumPadButtons.forEach((button) => {
  button.addEventListener("click", () => playSound(button));
});

window.addEventListener("keydown", (event) => {
  const pressedKey = event.key.toUpperCase();

  const audioElement = document.getElementById(pressedKey);
  if (audioElement) {
    const parentButton = audioElement.closest(".drum-pad");
    playSound(parentButton);
  }
});

powerButton.addEventListener("change", () => {
    display.textContent = powerButton.checked ? "READY" : "POWER OFF";
});