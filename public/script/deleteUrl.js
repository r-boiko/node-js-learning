document.addEventListener('DOMContentLoaded', () => {
  const urlList = document.querySelector('#urlList');

  urlList.addEventListener('click', (e) => {
    const target = e.target;

    if (target.classList.contains('delete')) {
      e.preventDefault();

      const href = target.attributes.href.value;
      const parent = target.closest('.item');

      fetch(href, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then(() => parent.remove())
        .catch((error) => console.error(error))
        .finally(() => {
          if (!urlList.children.length) {
            const li = document.createElement('li');

            li.classList.add('item');
            li.setAttribute('id', 'empty');
            li.textContent = 'Empty list';

            urlList.append(li);
          }
        });
    }
  });
});
