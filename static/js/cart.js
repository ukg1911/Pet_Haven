// Function to remove item from cart
function removeFromCart(cartId) {
    fetch(`/remove_from_cart/${cartId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Item removed from cart successfully') {
                location.reload(); // Refresh the page to reflect changes
            } else {
                alert('Error removing item from cart');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error processing request');
        });
}

// Attach event listeners to remove buttons after DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    const removeButtons = document.querySelectorAll('.remove-from-cart');

    removeButtons.forEach(button => {
        const cartId = button.dataset.id;

        button.addEventListener('click', function () {
            removeFromCart(cartId);
        });
    });
});


// Update Quantity (Increase/Decrease)
document.querySelectorAll('.increase-quantity').forEach(button => {
    button.addEventListener('click', function () {
        const dogId = this.getAttribute('data-id');
        updateQuantity(dogId, 'increase');
    });
});

document.querySelectorAll('.decrease-quantity').forEach(button => {
    button.addEventListener('click', function () {
        const dogId = this.getAttribute('data-id');
        updateQuantity(dogId, 'decrease');
    });
});
    

function updateQuantity(dogId, action) {
    fetch('/update_quantity', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dog_id: dogId, action: action })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Quantity updated successfully') {
                document.getElementById('quantity-' + dogId).innerText = data.new_quantity;
                document.getElementById('total-items').innerText = data.total_quantity;
                document.getElementById('cart-total').innerText = '₹ ' + data.total_price;
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Add to Cart (Updated)
function addToCart(dogId) {
    fetch('/add_to_cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dog_id: dogId })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Dog added to cart successfully') {
                document.getElementById('total-items').innerText = data.total_quantity;
                document.getElementById('cart-total').innerText = '₹ ' + data.total_price;
            } else {
                alert(data.message);
            }
        })
        .catch(error => console.error('Error:', error));
}



// team 3
// cart.js
function addToCart() {
    // Select the button that was clicked
    const button = document.querySelector('.add-to-cart');
    if (!button) {
        console.error('Add to Cart button not found!');
        return;
    }

    // Extract data attributes
    const service_id3 = button.getAttribute('data-service-id');
    const trainer_id = button.getAttribute('data-trainer-id');
    const timeslot_id = button.getAttribute('data-timeslot-id');
    const booking_date = button.getAttribute('data-booking-date');

    // Check if data attributes are valid
    if (!service_id3 || !trainer_id || !timeslot_id || !booking_date) {
        console.error('Missing data attributes on the button!');
        return;
    }

    // Log the data to the console for debugging
    console.log({
        service_id3: service_id3,
        trainer_id: trainer_id,
        timeslot_id: timeslot_id,
        booking_date: booking_date
    });

    // Send POST request to the server
    fetch('/add_to_cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            service_id3: service_id3,
            trainer_id: trainer_id,
            timeslot_id: timeslot_id,
            booking_date: booking_date
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.message.includes('already')) {
            showNotification(data.message, 'warning');
        } else {
            showNotification(data.message, 'success');
            updateCartCount(data.total_quantity);
        }
    })
    .catch(error => {
        console.error('Error adding to cart:', error);
        showNotification('An error occurred while adding to cart.', 'error');
    });
}
