const socket = io();

const $productContainer = document.getElementById('products-container');

socket.on('products', ( items ) => {
	$productContainer.innerHTML = '';
		items.forEach(product => {
			$productContainer.innerHTML += createProductCard(product);
		});
})

function addThumbnailInput() {
	const container = document.getElementById('thumbnails-container');
	const input = document.createElement('input');
	input.type = 'text';
	input.name = 'thumbnails[]';
	input.placeholder = 'URL de imagen';
	input.className = 'px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600';
	container.appendChild(input);
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
		.then(result => {
			console.log('Producto creado:', result);
			socket.emit('product', result);
		})
		.catch(error => console.error('Error:', error));
}

function createProductCard ( item ) {
	return `
			<div class="flex flex-row flex-wrap">
	            <div class="relative flex w-full  max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                    <a class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                        <img class="object-cover" src='https://i0.wp.com/port2flavors.com/wp-content/uploads/woocommerce-placeholder.png?fit=1200%2C1200&ssl=1' alt="product image" />
                    </a>
                    <div class="mt-4 px-5 pb-5">
                        <a href="#">
                        <h5 class="text-xl tracking-tight text-slate-900">${item.title}</h5>
                        </a>
                    	<div class="mt-2 mb-5 flex items-center justify-between flex-col gap-4">
                         	<p>
                            	<span class="text-3xl font-bold text-slate-900">${item.price}</span>
                        	</p>
                    		<div class="text-md text-slate-700">
                        		<p>${item.description}</p>
                    		</div>
                    	</div>
                        <a href="#" class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300">
                        <svg xmlns="http://www.w3.org/2000/svg" class="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to cart</a
                        >
                    </div>
                </div>
			</div>
	`;
}

