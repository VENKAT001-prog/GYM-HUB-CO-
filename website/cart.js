document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('checkout-btn');
    const checkoutModal = document.getElementById('checkout-modal');
    const closeModal = document.querySelector('.close');
    const paymentBtns = document.querySelectorAll('.payment-btn');
    const paymentDetailsDiv = document.getElementById('payment-details');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to render cart items
    function renderCartItems() {
        cartItemsContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>${item.price} /-</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <button class="remove-btn" data-name="${item.name}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            totalPrice += item.price * item.quantity;
        });

        totalPriceElement.innerText = totalPrice.toFixed(2);
    }

    // Handle remove item
    function handleRemoveItem(name) {
        const cartItemElement = document.querySelector(`.remove-btn[data-name="${name}"]`).closest('.cart-item');

        // Add removal animation
        const animationElement = document.createElement('div');
        animationElement.className = 'remove-animation';
        animationElement.innerHTML = `<img src="${cartItemElement.querySelector('img').src}" alt="${name}">`;
        document.body.appendChild(animationElement);

        const rect = cartItemElement.getBoundingClientRect();
        const removeButtonRect = document.querySelector('.navbar .nav-links li a[href="cart.html"]').getBoundingClientRect();

        animationElement.style.position = 'absolute';
        animationElement.style.left = `${rect.left}px`;
        animationElement.style.top = `${rect.top}px`;

        setTimeout(() => {
            animationElement.style.left = `${removeButtonRect.left}px`;
            animationElement.style.top = `${removeButtonRect.top}px`;
            animationElement.style.opacity = '0';
            animationElement.style.transform = 'scale(0.5)';
        }, 10);

        animationElement.addEventListener('transitionend', () => {
            document.body.removeChild(animationElement);
        });

        // Remove item from cart array and local storage
        cart = cart.filter(item => item.name !== name);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
    }

    // Event delegation for removing items
    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const itemName = e.target.getAttribute('data-name');
            handleRemoveItem(itemName);
        }
    });

    // Show checkout modal
    checkoutButton.addEventListener('click', () => {
        checkoutModal.style.display = 'flex';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        checkoutModal.style.display = 'none';
    });

    // Handle payment option selection
    paymentBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const method = btn.getAttribute('data-method');
            showPaymentDetails(method);
        });
    });

    // Display payment details based on selected payment method
    function showPaymentDetails(method) {
        let html = '';
        switch (method) {
            case 'credit-card':
                html = `
                    <h4>Credit Card Payment</h4>
                    <input type="text" placeholder="Card Number" />
                    <input type="text" placeholder="Name on Card" />
                    <input type="text" placeholder="Expiry Date" />
                    <input type="text" placeholder="CVV" />
                `;
                break;
            case 'paypal':
                html = `
                    <h4>PayPal Payment</h4>
                    <input type="email" placeholder="PayPal Email" />
                `;
                break;
            case 'bank-transfer':
                html = `
                    <h4>Bank Transfer</h4>
                    <input type="text" placeholder="Bank Account Number" />
                `;
                break;
        }
        paymentDetailsDiv.innerHTML = html;
    }

    

    checkoutButton.addEventListener('click', () => {
        redirectToPaymentGateway();
    });

    renderCartItems();
});
