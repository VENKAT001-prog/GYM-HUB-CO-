// accessories.js

document.addEventListener('DOMContentLoaded', () => {
    // Initialize cart from localStorage or as an empty array
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to add product to cart
    function addToCart(product) {
        const existingProductIndex = cart.findIndex(item => item.id === product.id);
        
        if (existingProductIndex > -1) {
            // If product already exists, update the quantity
            cart[existingProductIndex].quantity += product.quantity;
        } else {
            // Otherwise, add the new product
            cart.push(product);
        }
        
        // Save cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
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
            const productId = productCard.querySelector('img').alt; // Using alt text as a unique ID
            const productName = productCard.querySelector('h3').textContent;
            const productQuantity = parseInt(productCard.querySelector('.quantity-input').value, 10);
            
            // Create a product object
            const product = {
                id: productId,
                name: productName,
                quantity: productQuantity,
                image: productCard.querySelector('img').src
            };
            
            // Add product to cart
            addToCart(product);
            
            // Optional: Display a message or update UI to show the item was added
            alert(`${productName} added to cart`);

            // Animate adding to cart
            animateAddToCart(productCard);
        }
    }

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
        animationElement.style.transition = 'left 0.5s ease, top 0.5s ease, opacity 0.5s ease, transform 0.5s ease';

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

    // Attach event listener to the entire document for "Add to Cart" buttons
    document.addEventListener('click', handleAddToCartButtonClick);

    // Attach event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let currentValue = parseInt(input.value, 10);
            
            if (this.classList.contains('increase-btn')) {
                input.value = currentValue + 1;
            } else if (this.classList.contains('decrease-btn') && currentValue > 1) {
                input.value = currentValue - 1;
            }
        });
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-card');
    const sortBySelect = document.getElementById('sort-by');
    const filterInput = document.getElementById('filter');

    let products = [
        { name: 'Supplement 1', price: 30 },
        { name: 'Supplement 2', price: 10 },
        { name: 'Supplement 3', price: 20 },
        { name: 'Supplement 4', price: 50 }
    ];

    function renderProducts(filteredProducts) {
        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            const li = document.createElement('li');
            li.className = 'product-item';
            li.textContent = `${product.name} - $${product.price}`;
            productList.appendChild(li);
        });
    }

    function sortProducts(products, sortBy) {
        return [...products].sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });
    }

    function filterProducts(products, query) {
        return products.filter(product =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
    }

    function updateProducts() {
        const sortBy = sortBySelect.value;
        const filterQuery = filterInput.value;
        let filteredProducts = filterProducts(products, filterQuery);
        filteredProducts = sortProducts(filteredProducts, sortBy);
        renderProducts(filteredProducts);
    }

    sortBySelect.addEventListener('change', updateProducts);
    filterInput.addEventListener('input', updateProducts);

    // Initial render
    updateProducts();
});
