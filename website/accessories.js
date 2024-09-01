document.addEventListener('DOMContentLoaded', () => {
    // accessories.js

// Initialize the cart as an empty array
let cart = [];

// Function to add product to cart
function addToCart(product) {
    // Find the product in the cart
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        // If product already exists, update the quantity
        existingProduct.quantity += product.quantity;
    } else {
        // Otherwise, add the new product
        cart.push(product);
    }
    
    // Log the cart to the console (for debugging purposes)
    console.log('Cart:', cart);
}

// Function to handle the "Add to Cart" button click
function handleAddToCartButtonClick(event) {
    const button = event.target;
    
    // Ensure that the click event came from an "Add to Cart" button
    if (button.classList.contains('add-to-cart-btn')) {
        // Find the closest product-card
        const productCard = button.closest('.product-card');
        
        // Get product details
        const productId = productCard.getAttribute('data-product-id');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = parseFloat(productCard.querySelector('.price').textContent.replace('/-', ''));
        const productQuantity = parseInt(productCard.querySelector('.quantity-input').value);
        
        // Create a product object
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: productQuantity
        };
        
        // Add product to cart
        addToCart(product);
        
        // Optional: Display a message or update UI to show the item was added
        alert(`${productName} added to cart`);
    }
}

// Add event listener to the entire document for "Add to Cart" buttons
document.addEventListener('click', handleAddToCartButtonClick);

    // Select all product cards
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        // Get elements within the current card
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        const decreaseBtn = card.querySelector('.decrease-btn');
        const increaseBtn = card.querySelector('.increase-btn');
        const quantityInput = card.querySelector('.quantity-input');

        // Add event listeners for buttons
        addToCartBtn.addEventListener('click', () => {
            const quantity = quantityInput.value;
            const productName = card.querySelector('h3').textContent;
            alert(`Added ${quantity} ${productName} to the cart.`);
            // Here you would typically send data to a server or update a cart object
        });

        decreaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value, 10);
            if (quantity > 1) {
                quantity--;
                quantityInput.value = quantity;
            }
        });

        increaseBtn.addEventListener('click', () => {
            let quantity = parseInt(quantityInput.value, 10);
            quantity++;
            quantityInput.value = quantity;
        });
    });
});
// accessories.js

document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Add event listeners to "Add to Cart" buttons
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productCard = button.closest('.product-card');
            const product = {
                name: productCard.querySelector('h3').innerText,
                price: parseFloat(productCard.querySelector('.price').innerText.replace('₹', '').replace('/', '')),
                quantity: parseInt(productCard.querySelector('.quantity-input').value),
                image: productCard.querySelector('img').src
            };
            
            // Add product to cart array
            const existingProductIndex = cart.findIndex(item => item.name === product.name);
            if (existingProductIndex > -1) {
                cart[existingProductIndex].quantity += product.quantity;
            } else {
                cart.push(product);
            }
            
            // Save cart to local storage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Animation for adding to cart
            animateAddToCart(productCard);
        });
    });

    // Function to animate adding item to cart
    function animateAddToCart(productCard) {
        const animationElement = document.createElement('div');
        animationElement.className = 'cart-animation';
        animationElement.innerHTML = `<img src="${productCard.querySelector('img').src}" alt="${productCard.querySelector('h3').innerText}">`;
        document.body.appendChild(animationElement);

        const cartButton = document.querySelector('.navbar .nav-links li a[href="cart.html"]');
        const rect = cartButton.getBoundingClientRect();
        const productRect = productCard.getBoundingClientRect();

        animationElement.style.position = 'absolute';
        animationElement.style.left = `${productRect.left}px`;
        animationElement.style.top = `${productRect.top}px`;

        setTimeout(() => {
            animationElement.style.left = `${rect.left}px`;
            animationElement.style.top = `${rect.top}px`;
            animationElement.style.opacity = '0';
            animationElement.style.transform = 'scale(0.5)';
        }, 10);

        animationElement.addEventListener('transitionend', () => {
            document.body.removeChild(animationElement);
        });
    }
});
