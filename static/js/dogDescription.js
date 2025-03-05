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
            showNotification(data.message, isSuccess ? 'blue' : 'red');
        })
        .catch(error => {
            showNotification(error.message || 'An error occurred. Please try again.', 'red');
        })
        .finally(() => {
            button.disabled = false;
        });
}

// Initialize add to wishlist functionality
document.querySelectorAll('.add-to-wishlist').forEach(button => {
    button.addEventListener('click', function () {
        const dogId = this.getAttribute('data-id'); // Get the dog id from the data attribute
        addToWishlist(dogId, this); // Call the function to handle adding to wishlist
    });
});

// Add dog to wishlist
function addToWishlist(dogId, button) {
    fetch('/add_to_wishlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dog_id: dogId })
    })
        .then(response => response.json())
        .then(data => {
            // Show notification based on the message
            if (data.message === 'Dog added to wishlist successfully') {
                showNotification('Dog added to your wishlist', 'blue');
                // Change the button icons: filled heart (add to wishlist) and hide the outline heart
                button.querySelector('.far').style.display = 'none';
                button.querySelector('.fas').style.display = 'inline'; // Show the filled heart
            } else if (data.message === 'Dog already in the wishlist') {
                showNotification('Dog is already in your wishlist', 'red');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            showNotification('An error occurred. Please try again.', 'red');
        });
}

// Show notification at the top of the screen
function showNotification(message, color) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        left: 50%;
        top: 20px;
        transform: translateX(-50%);
        padding: 15px 30px;
        background-color: ${color};
        color: white;
        border-radius: 15px;
        font-size: 16px;
        font-weight: normal;
        z-index: 1000;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        min-width: 300px;
        opacity: 0;
        transition: opacity 0.3s ease, top 0.3s ease;
    `;

    let notificationContainer = document.getElementById('notification-container');
    if (!notificationContainer) {
        notificationContainer = document.createElement('div');
        notificationContainer.id = 'notification-container';
        notificationContainer.style.cssText = `
            position: fixed;
            left: 50%;
            top: 20px;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            z-index: 1000;
        `;
        document.body.appendChild(notificationContainer);
    }

    notificationContainer.appendChild(notification);
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
    });

    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Initialize both add to cart and add to wishlist buttons on page load
document.addEventListener('DOMContentLoaded', function () {
    initializeAddToCartButtons();
});

