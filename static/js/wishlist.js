document.addEventListener('DOMContentLoaded', function () {
    // Notification container setup
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification';
    notificationContainer.style.cssText = `
        position: fixed;
        left: 50%;
        top: 20px;
        transform: translateX(-50%);
        padding: 15px 30px;
        border-radius: 5px;
        color: white;
        display: none;
        z-index: 1000;
        transition: opacity 0.3s ease;
        text-align: center;
        min-width: 200px;
        font-weight: 500;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        background-color: #28a745; /* Default green for success */
    `;
    document.body.appendChild(notificationContainer);

    // Notification function
    function showNotification(message, color = '#28a745') {
        notificationContainer.textContent = message;
        notificationContainer.style.backgroundColor = color;
        notificationContainer.style.display = 'block';
        notificationContainer.style.opacity = '1';

        setTimeout(() => {
            notificationContainer.style.opacity = '0';
            setTimeout(() => {
                notificationContainer.style.display = 'none';
            }, 300);
        }, 2000);
    }

    // Add to Cart from Wishlist functionality
    const addToCartFromWishlistButtons = document.querySelectorAll('.add-to-cart-from-wishlist');
    addToCartFromWishlistButtons.forEach(button => {
        button.addEventListener('click', function () {
            const dogId = this.dataset.id;
            console.log(dogId); // Debugging - Check if the dogId is correctly retrieved
            fetch('/add_to_cart_from_wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ dog_id: dogId })
            })
            .then(response => response.json())
            .then(data => {
                // Show a notification based on the response
                const isSuccess = data.message.includes('added');
                showNotification(data.message, isSuccess ? 'blue' : 'red'); // Green for success, Red for already in cart
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Error adding to cart', 'red'); // Red for errors
            });
        });
    });


    // Remove from Wishlist functionality
    const removeFromWishlistButtons = document.querySelectorAll('.remove-from-wishlist');
    removeFromWishlistButtons.forEach(button => {
        button.addEventListener('click', function () {
            const dogId = this.dataset.id;

            fetch(`/remove_from_wishlist/${dogId}`, { 
                method: 'POST' 
            })
            .then(response => response.json())
            .then(data => {
                if (data.message.includes('removed')) {
                    // Find and remove the item from the UI
                    const wishlistItem = this.closest('.wishlist-item');
                    if (wishlistItem) wishlistItem.remove();

                    // Show success notification
                    showNotification('Dog removed from your wishlist', 'red'); // Red for Remove from Wishlist
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('Error removing from wishlist', 'red'); // Red for errors
            });
        });
    });
});

// Initialize add to cart functionality
function initializeAddToCartButtons() {
    const buttons = document.querySelectorAll('.add-to-cart');
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const dogId = this.getAttribute('data-id');
            addToCart(dogId);
        });
    });
}

// Add dog to cart
function addToCart(dogId) {
    const button = document.querySelector(`button[data-id="${dogId}"]`);
    button.disabled = true;

    fetch('/add_to_cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dog_id: dogId })
    })
        .then(response => response.json())
        .then(data => {
            const isSuccess = !data.message.includes('already');
            showNotification(data.message, isSuccess ? 'blue' : 'red'); // Blue for success, Red for already in cart
        })
        .catch(error => {
            showNotification(error.message || 'An error occurred. Please try again.', 'red'); // Red for errors
        })
        .finally(() => {
            button.disabled = false;
        });
}
