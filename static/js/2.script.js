// Add event listeners to filter inputs and clear button
document.getElementById("breed").addEventListener("input", filterItems);
document.getElementById("age").addEventListener("change", filterItems);
document.getElementById("price").addEventListener("change", filterItems);
document.getElementById("clear-filters").addEventListener("click", clearFilters);

function filterItems() {
  const breedFilter = document.getElementById("breed").value.toLowerCase();
  const ageFilter = document.getElementById("age").value;
  const priceFilter = document.getElementById("price").value;

  const items = document.querySelectorAll(".grid-item");
  const noResultsMessage = document.getElementById("no-results-message");
  noResultsMessage.style.display = "none"; // Hide the "no results" message initially

  let hasResults = false;

  items.forEach(item => {
    const breed = item.querySelector("h4").textContent.toLowerCase();
    const age = parseFloat(item.querySelector("p").textContent.match(/Age: (\d+)/)[1]);
    const price = parseFloat(item.querySelector("p").textContent.match(/₹ (\d+)/)[1]);

    // Check if each filter condition matches
    const breedMatch = !breedFilter || breed.includes(breedFilter);
    const ageMatch = !ageFilter || (ageFilter == '<5' && age < 5) || 
                     (ageFilter == '5-10' && age >= 5 && age <= 10) ||
                     (ageFilter == '10-15' && age >= 10 && age <= 15) ||
                     (ageFilter == '15-20' && age >= 15 && age <= 20) ||
                     (ageFilter == '>20' && age > 20);
    const priceMatch = !priceFilter || (priceFilter == '<10000' && price < 10000) || 
                       (priceFilter == '10000-20000' && price >= 10000 && price <= 20000) ||
                       (priceFilter == '20000-30000' && price >= 20000 && price <= 30000) ||
                       (priceFilter == '30000-40000' && price >= 30000 && price <= 40000) ||
                       (priceFilter == '>40000' && price > 40000);

    // Show or hide items based on filter conditions
    if (breedMatch && ageMatch && priceMatch) {
      item.style.display = "block";
      hasResults = true; // We found at least one match
    } else {
      item.style.display = "none"; 
    }
  });

  // Show the "no results" message if no items match
  noResultsMessage.style.display = hasResults ? "none" : "block";
}

function clearFilters() {
  // Reset filter inputs to their default values
  document.getElementById("breed").value = '';
  document.getElementById("age").value = '';
  document.getElementById("price").value = '';

  // After clearing, apply the filters again to show all items
  filterItems();
}

// Clear filters functionality
const clearFiltersBtn = document.getElementById('clear-filters');
if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
        document.getElementById('breed').value = '';
        document.getElementById('age').value = '';
        document.getElementById('price').value = '';
        document.querySelector('.filter-sidebar form').submit();
    });
}


document.addEventListener('DOMContentLoaded', function() {
    const userLink = document.getElementById('onclickuser').querySelector('a');
    const adminLink = document.getElementById('onclickadmin').querySelector('a');
    
    // Check if there's a stored active state
    const activeState = localStorage.getItem('activeNavLink');
    if (activeState === 'user') {
        userLink.classList.add('active-nav');
        adminLink.classList.remove('active-nav');
    } else if (activeState === 'admin') {
        adminLink.classList.add('active-nav');
        userLink.classList.remove('active-nav');
    } else {
        // Set default active state to user if none is stored
        userLink.classList.add('active-nav');
        localStorage.setItem('activeNavLink', 'user');
    }
    
    // Add click handlers
    userLink.addEventListener('click', function(e) {
        adminLink.classList.remove('active-nav');
        userLink.classList.add('active-nav');
        localStorage.setItem('activeNavLink', 'user');
    });
    
    adminLink.addEventListener('click', function(e) {
        userLink.classList.remove('active-nav');
        adminLink.classList.add('active-nav');
        localStorage.setItem('activeNavLink', 'admin');
    });

});

//add to cart 
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
        const dogId = this.getAttribute('data-id'); 
        addToWishlist(dogId, this); 
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
