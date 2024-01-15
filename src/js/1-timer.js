// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


let userSelectedDate;
let startButton = document.querySelector('[data-start]');
startButton.disabled = true;

const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

let timerInterval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  // Під час закриття елемента викликається ця функція
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      userSelectedDate = selectedDates[0];
      startButton.disabled = false;
      updateTimerDisplay();
    } else {
      userSelectedDate = undefined;
      startButton.disabled = true;
      // Повідомлення про помилку
      iziToast.error({
        message:
          '<i class="fa-regular fa-circle-xmark fa-lg"></i>Please choose a date in the future',
        position: 'topRight',
        icon: '',
      });
    }
  },
};

startButton.addEventListener('click', () => {
  if (userSelectedDate) {
    startTimer();
  }
});

function updateTimerDisplay() {
  const timeDifference = userSelectedDate - Date.now();
  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    daysDisplay.textContent = addLeadingZero(days);
    hoursDisplay.textContent = addLeadingZero(hours);
    minutesDisplay.textContent = addLeadingZero(minutes);
    secondsDisplay.textContent = addLeadingZero(seconds);
  }

  if (timeDifference <= 0) {
    stopTimer();
  }
}

function startTimer() {
  // Встановлюємо інтервал для оновлення таймера кожну секунду
  timerInterval = setInterval(updateTimerDisplay, 1000);
}

function stopTimer() {
  // Зупиняємо таймер та оновлюємо інтерфейс
  if (timerInterval) {
    clearInterval(timerInterval);

    daysDisplay.textContent = '00';
    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';

    timerInterval = null;
  }
}

function addLeadingZero(value) {
  // Додаємо ведучий нуль, якщо число складається з менше ніж двох символів
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Перетворюємо мілісекунди в об'єкт з розрахованим часом
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Ініціалізуємо flatpickr на вказаному елементі з використанням параметрів
flatpickr('#datetime-picker', options);
