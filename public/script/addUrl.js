const validateTypeUrl = () => {
  const type = document.querySelector('#type');
  const expiredTime = document.querySelector('#expiredTime');

  expiredTime.disabled = type.value === 'permanent';

  type.addEventListener('change', () => {
    expiredTime.disabled = type.value === 'permanent';
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const addUrlForm = document.querySelector('#addUrlForm');

  validateTypeUrl();

  addUrlForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: addUrlForm.querySelector('#name').value,
      url: addUrlForm.querySelector('#url').value,
      type: addUrlForm.querySelector('#type').value,
      expiredTime: addUrlForm.querySelector('#expiredTime').value,
      oneTime: addUrlForm.querySelector('#oneTime').checked,
      enabled: addUrlForm.querySelector('#enabled').checked,
    };

    fetch('/url/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(({ name, url, code }) => {
        const urlList = document.querySelector('#urlList');
        const empty = urlList.querySelector('#empty');

        if (empty) empty.remove();

        const li = document.createElement('li');
        li.classList.add('item');

        li.innerHTML = `
            <span>name: ${name},</span>
            <span>url: <a href="${url}" target="_blank">${url}</a></span>
            <span>code: <a href="/code/${code}" target="_blank">${code}</a></span>
        `;

        urlList.append(li);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        addUrlForm.reset();
        document.querySelector('#expiredTime').disabled = true;
      });
  });
});
