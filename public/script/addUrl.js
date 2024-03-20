document.addEventListener('DOMContentLoaded', () => {
  const addUrlForm = document.querySelector('#addUrlForm');

  addUrlForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      name: addUrlForm.querySelector('#name').value,
      url: addUrlForm.querySelector('#url').value,
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
      .finally(() => addUrlForm.reset());
  });
});
