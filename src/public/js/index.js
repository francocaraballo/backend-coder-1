const CART_ID = '6768aab53602f4fede96d30b';

function deleteItem(id) {
    console.log(id)
    fetch(`/home/${id}`, {
        method: 'DELETE',
    })
    .then(res => {
        console.log(res);
        location.reload();
    })
    .catch(err => console.log(err))
}

async function agregarAlCarrito(productId, qty = 1) {
    try {
      const response = await fetch(`/api/cart/${CART_ID}/product/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ quantity: qty })
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log('Producto agregado al carrito:', data);
        alert('Producto agregado al carrito con éxito');
      } else {
        console.error('Error al agregar producto al carrito:', response.statusText);
        alert('No se pudo agregar el producto al carrito');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Error de conexión al servidor');
    }
}

document.querySelectorAll('.btn-add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.getAttribute('data-id');
    agregarAlCarrito(productId);
  });
});

  