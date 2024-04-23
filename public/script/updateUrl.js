document.addEventListener('DOMContentLoaded', () => {
  const updateUrlForm = document.querySelector('#updateUrlForm');

  updateUrlForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
      id: updateUrlForm.querySelector('#id').value,
      name: updateUrlForm.querySelector('#name').value,
      url: updateUrlForm.querySelector('#url').value,
      code: updateUrlForm.querySelector('#code').value,
      type: updateUrlForm.querySelector('#type').value,
      expired_time: updateUrlForm.querySelector('#expiredTime').value
        ? new Date(
            updateUrlForm.querySelector('#expiredTime').value,
          ).toISOString()
        : null,
      one_time: updateUrlForm.querySelector('#oneTime').checked,
      enabled: updateUrlForm.querySelector('#enabled').checked,
    };

    fetch('/url/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(() => alert('Updated'))
      .catch((error) => console.error(error));
  });
});
