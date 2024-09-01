document.addEventListener('DOMContentLoaded', () => {
    const cartItemsSection = document.querySelector('.cart-items');
    const totalPriceSpan = document.getElementById('total-price');
    const checkoutBtn = document.getElementById('checkout-btn');
    const modal = document.getElementById('checkout-modal');
    const closeModal = document.querySelector('.close');
    const paymentBtns = document.querySelectorAll('.payment-btn');
    const paymentDetailsDiv = document.getElementById('payment-details');

    // Mock data for cart items
    const cartItems = [
        { name: 'Item 1', price: 100 },
        { name: 'Item 2', price: 200 }
    ];

    // Display cart items
    cartItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `<span>${item.name}</span> <span>${item.price} /-</span>`;
        cartItemsSection.appendChild(itemDiv);
    });

    // Calculate total price
    const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
    totalPriceSpan.textContent = totalPrice;

    // Show checkout modal
    checkoutBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
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
});
