const validateTypeUrl = () => {
  const type = document.querySelector('#type');
  const expiredTime = document.querySelector('#expiredTime');

  if (!type || !expiredTime) return;

  expiredTime.disabled = type.value === 'permanent';

  type.addEventListener('change', () => {
    expiredTime.disabled = type.value === 'permanent';

    if (type.value === 'permanent') {
      expiredTime.value = null;
    }
  });
};

document.addEventListener('DOMContentLoaded', () => {
  validateTypeUrl();
});
