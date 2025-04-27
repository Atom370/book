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

// Load cart from localStorage
function loadCart() {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
}

loadCart();

// Save cart to localStorage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Open cart modal
cartIcon.addEventListener("click", () => {
    cartModal.classList.add("visible");
});
const coupons = {
    "DISCOUNT10": 10, // Coupon code and corresponding discount percentage
    "SAVE20": 20
};

document.getElementById("apply-coupon").addEventListener("click", () => {
    const couponCode = document.getElementById("coupon-code").value.toUpperCase(); // Convert input to uppercase
    const couponMessage = document.getElementById("coupon-message");

    if (coupons[couponCode]) {
        const discount = coupons[couponCode];
        couponMessage.textContent = `Coupon applied! You get ${discount}% off.`;
        applyDiscount(discount); // Apply the discount
    } else {
        couponMessage.textContent = "Invalid coupon code.";
    }
});

function applyDiscount(discount) {
    const originalTotal = parseFloat(cartTotal.textContent); // Get the current cart total
    const discountedTotal = originalTotal - (originalTotal * discount / 100);
    cartTotal.textContent = discountedTotal.toFixed(2); // Update the cart total
}


// Close cart modal
closeCart.addEventListener("click", () => {
    cartModal.classList.remove("visible");
});

// Add item to cart
addToCartButtons.forEach(button => {
    button.addEventListener("click", () => {
        const bookName = button.getAttribute("data-book");
        const bookPrice = parseFloat(button.getAttribute("data-price"));

        if (!bookName || isNaN(bookPrice)) return;

        // Check if item is already in the cart
        const existingItem = cart.find(item => item.name === bookName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name: bookName, price: bookPrice, quantity: 1 });
        }

        updateCart();
        saveCart();
    });
});

// Update cart display
function updateCart() {
    cartItems.innerHTML = ""; // Clear previous cart items
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => {
            cart = cart.filter(cartItem => cartItem.name !== item.name);
            updateCart();
            saveCart();
        });
        li.appendChild(removeButton);
        cartItems.appendChild(li);

        total += item.price * item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
}