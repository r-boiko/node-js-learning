document.addEventListener('DOMContentLoaded', () => {
  const addUrlForm = document.querySelector('#addUrlForm');

  addUrlForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: addUrlForm.querySelector('#name').value,
      url: addUrlForm.querySelector('#url').value,
      code: addUrlForm.querySelector('#code').value,
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
      .then(({ id, name, url, code, disabled }) => {
        const urlList = document.querySelector('#urlList');
        const empty = urlList.querySelector('#empty');

        if (empty) empty.remove();

        const li = document.createElement('li');
        li.classList.add('item');

        if (disabled) {
          li.innerHTML = `
            <span class="disabled">
                <span>name: ${name},</span>
                <span>url: ${url}</span>
                <span>code: ${code}</span>
            </span>
            <button><a href="/url/${id}">edit</a></button>
            <button><a href="/url/delete/${id}" class="delete">delete</a></button>
        `;
        } else {
          li.innerHTML = `
            <span>name: ${name},</span>
            <span>url: <a href="${url}" target="_blank">${url}</a></span>
            <span>code: <a href="/code/${code}" target="_blank">${code}</a></span>
            <button><a href="/url/${id}">edit</a></button>
            <button><a href="/url/delete/${id}" class="delete">delete</a></button>
        `;
        }

        urlList.append(li);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        addUrlForm.reset();
        document.querySelector('#expiredTime').disabled = true;
      });
  });
});
