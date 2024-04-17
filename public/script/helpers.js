const validateTypeUrl = () => {
  const type = document.querySelector('#type');
  const expiredTime = document.querySelector('#expiredTime');

  if (!type || !expiredTime) return;

  expiredTime.disabled = type.value === 'permanent';

  type.addEventListener('change', () => {
    expiredTime.disabled = type.value === 'permanent';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  validateTypeUrl();
});
