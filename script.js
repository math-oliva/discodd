const products = [
    { name: "Disco 1", artist: "Artista 1", price: 50.00, image: "images/disco1.jpg" },
    { name: "Disco 2", artist: "Artista 2", price: 40.00, image: "images/disco2.jpg" },
    { name: "Disco 3", artist: "Artista 3", price: 60.00, image: "images/disco3.jpg" },
    { name: "Disco 4", artist: "Artista 4", price: 45.00, image: "images/disco4.jpg" },
    { name: "Disco 5", artist: "Artista 5", price: 55.00, image: "images/disco5.jpg" },
    { name: "Disco 6", artist: "Artista 6", price: 70.00, image: "images/disco6.jpg" },
    { name: "Disco 7", artist: "Artista 7", price: 35.00, image: "images/disco7.jpg" },
    { name: "Disco 8", artist: "Artista 8", price: 80.00, image: "images/disco8.jpg" },
    { name: "Disco 9", artist: "Artista 9", price: 65.00, image: "images/disco9.jpg" },
    { name: "Disco 10", artist: "Artista 10", price: 90.00, image: "images/disco10.jpg" },
    { name: "Disco 11", artist: "Artista 11", price: 55.00, image: "images/disco11.jpg" },
    { name: "Disco 12", artist: "Artista 12", price: 75.00, image: "images/disco12.jpg" },
];

let cart = [];
let currentPage = 0;
const itemsPerPage = 4;

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const productsToDisplay = products.slice(startIndex, endIndex);

    productsToDisplay.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3>${product.name}</h3>
            <p>Artista: ${product.artist}</p>
            <p>Preço: R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product.name}')">Adicionar ao Carrinho</button>
        `;
        productList.appendChild(productItem);
    });

    document.getElementById('prev-button').disabled = currentPage === 0;
    document.getElementById('next-button').disabled = endIndex >= products.length;
}

function changePage(direction) {
    currentPage += direction;
    displayProducts();
}

function addToCart(productName) {
    const product = products.find(p => p.name === productName);
    if (product) {
        cart.push(product);
        updateCart();
    }
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';

    let total = 0;

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `<p>${item.name} - R$ ${item.price.toFixed(2)}</p>`;
        cartItems.appendChild(cartItem);
        total += item.price;
    });

    document.getElementById('total-price').innerText = `Total: R$ ${total.toFixed(2)}`;
}

const modal = document.getElementById("signup-modal");

document.getElementById("checkout-button").onclick = function() {
    modal.style.display = "block";
};

function closeModal() {
    modal.style.display = "none";
}

document.querySelector(".close-button").onclick = closeModal;

document.getElementById("signup-form").onsubmit = function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const bank = document.getElementById("bank").value;

    alert(`Compra Finalizada!\n\nNome: ${name}\nE-mail: ${email}\nTelefone: ${phone}\nEndereço: ${address}\nDados Bancários: ${bank}`);
    
    cart = [];
    updateCart();
    closeModal();
};

document.addEventListener('DOMContentLoaded', displayProducts);
