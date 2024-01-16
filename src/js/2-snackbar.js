import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stateInput = document.querySelector('input[name="state"]:checked');

  if (!delayInput || !stateInput) {
    console.error('Please fill in all fields.');
    return;
  }

  const delay = parseInt(delayInput.value, 10);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateInput.value === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise.then(
    (value) => {
      iziToast.success({
        title: '',
        message: `Fulfilled promise in ${value}ms! ✅`,
          position: 'topRight',
        icon: '',
      });
    },
    (reason) => {
      iziToast.error({
        title: '',
        message: `Rejected promise in ${reason}ms! ❌`,
          position: 'topRight',
        icon: '',
      });
    }
  );
});
