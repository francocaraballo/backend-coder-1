const socket = io();

function addThumbnailInput() {
    const container = document.getElementById('thumbnails-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'thumbnails[]';
    input.placeholder = 'URL de imagen';
    container.appendChild(input);
    container.appendChild(document.createElement('br'));
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = {
      title: formData.get('title'),
      description: formData.get('description'),
      code: formData.get('code'),
      price: parseFloat(formData.get('price')),
      status: formData.get('status') === 'true',
      stock: parseInt(formData.get('stock')),
      category: formData.get('category'),
      thumbnails: formData.getAll('thumbnails[]').filter(url => url.trim() !== ''),
    };

    fetch(form.action, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => console.log('Producto creado:', result))
    .catch(error => console.error('Error:', error));
  }