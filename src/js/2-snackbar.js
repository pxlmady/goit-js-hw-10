// Імпорт бібліотеки для відображення повідомлень
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Встановлення обробників подій для форми при відправці
document.querySelector('.form').addEventListener('submit', function (event) {
    // Запобігання відправці форми за замовчуванням
  event.preventDefault();

     // Отримання значень полів вводу затримки і стану
  const delayInput = document.querySelector('input[name="delay"]');
  const stateInput = document.querySelector('input[name="state"]:checked');

     // Перевірка наявності обох полів вводу
    if (!delayInput || !stateInput) {
      // Виведення повідомлення про заповнення всіх полів
    console.error('Please fill in all fields.');
    return;
  }

    // Парсинг значення затримки до цілого числа
  const delay = parseInt(delayInput.value, 10);

    // Створення об'єкта Promise
    const promise = new Promise((resolve, reject) => {
      // Встановлення затримки перед вирішенням або відхиленням обіцянки
    setTimeout(() => {
      if (stateInput.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

    // Обробка виконання або відхилення обіцянки
  promise.then(
      (value) => {
          // Виведення повідомлення про успішне виконання обіцянки
      iziToast.success({
        title: '',
        message: `Fulfilled promise in ${value}ms! ✅`,
          position: 'topRight',
        icon: '',
      });
    },
    (reason) => {
        // Виведення повідомлення про відхилення обіцянки
      iziToast.error({
        title: '',
        message: `Rejected promise in ${reason}ms! ❌`,
          position: 'topRight',
        icon: '',
      });
    }
  );
});
