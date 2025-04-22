// Select DOM elements
const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Cart data structure
let cart = [];

// Open cart modal
cartIcon.addEventListener("click", () => {
    cartModal.style.display = "block";
});

// Close cart modal
closeCart.addEventListener("click", () => {
    cartModal.style.display = "none";
});

// Add item to cart
addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const bookName = button.getAttribute("data-book");
        const bookPrice = parseFloat(button.getAttribute("data-price"));

        // Check if item is already in the cart
        const existingItem = cart.find(item => item.name === bookName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name: bookName, price: bookPrice, quantity: 1 });
        }

        updateCart();
    });
});

// Update cart
function updateCart() {
    cartItems.innerHTML = ""; // Clear previous cart items
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        cartItems.appendChild(li);

        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}
