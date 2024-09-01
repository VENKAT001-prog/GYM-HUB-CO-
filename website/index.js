document.addEventListener('DOMContentLoaded', () => {
    const decreaseBtn = document.getElementById('decreaseBtn');
    const increaseBtn = document.getElementById('increaseBtn');
    const quantityInput = document.getElementById('quantityInput');
    const addToCartBtn = document.getElementById('addToCartBtn');

    // Event listener for the decrease button
    decreaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value, 10);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });

    // Event listener for the increase button
    increaseBtn.addEventListener('click', () => {
        let currentValue = parseInt(quantityInput.value, 10);
        quantityInput.value = currentValue + 1;
    });

    // Event listener for the add to cart button
    addToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value, 10);

        // Add logic to handle adding items to the cart
        console.log(`Added ${quantity} item(s) to cart.`);

        // Animate button click
        addToCartBtn.classList.add('clicked');
        setTimeout(() => {
            addToCartBtn.classList.remove('clicked');
        }, 300);
    });
});
