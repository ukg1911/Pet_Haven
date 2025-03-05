// Validation Functions
function validateFullName() {
    const fullName = document.getElementById('fullName');
    const fullNameError = document.getElementById('fullNameError');
    const nameRegex = /^[a-zA-Z\s]{3,50}$/;

    if (!nameRegex.test(fullName.value.trim())) {
        fullName.classList.add('input-error');
        fullNameError.style.display = 'block';
        return false;
    }
    fullName.classList.remove('input-error');
    fullNameError.style.display = 'none';
    return true;
}

function validateEmail() {
    const email = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value.trim())) {
        email.classList.add('input-error');
        emailError.style.display = 'block';
        return false;
    }
    email.classList.remove('input-error');
    emailError.style.display = 'none';
    return true;
}

function validatePhone() {
    const phone = document.getElementById('phone');
    const phoneError = document.getElementById('phoneError');
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(phone.value.trim())) {
        phone.classList.add('input-error');
        phoneError.style.display = 'block';
        return false;
    }
    phone.classList.remove('input-error');
    phoneError.style.display = 'none';
    return true;
}

function validateHouseNo() {
    const houseNo = document.getElementById('HouseNo');
    const houseNoError = document.getElementById('HouseNoError');
    const houseNoRegex = /^[a-zA-Z0-9\s,.'-]{1,100}$/; // Accepting alphanumeric characters and common symbols

    if (!houseNoRegex.test(houseNo.value.trim())) {
        houseNo.classList.add('input-error');
        houseNoError.style.display = 'block';
        return false;
    }
    houseNo.classList.remove('input-error');
    houseNoError.style.display = 'none';
    return true;
}

function validateLandmark() {
    const landmark = document.getElementById('landmark');
    const landmarkError = document.getElementById('landmarkError');
    const landmarkRegex = /^[a-zA-Z0-9\s,.'-]{1,100}$/;  // Accepting alphanumeric and common address symbols

    if (landmark.value.trim() && !landmarkRegex.test(landmark.value.trim())) {
        landmark.classList.add('input-error');
        landmarkError.style.display = 'block';
        return false;
    }
    landmark.classList.remove('input-error');
    landmarkError.style.display = 'none';
    return true;
}

function validateCity() {
    const city = document.getElementById('city');
    const cityError = document.getElementById('cityError');
    const cityRegex = /^[a-zA-Z\s]{2,50}$/;

    if (!city.value.trim()) {
        city.classList.add('input-error');
        cityError.style.display = 'block';
        return false;
    }
    city.classList.remove('input-error');
    cityError.style.display = 'none';
    return true;
}

function validateState() {
    const state = document.getElementById('state');
    const stateError = document.getElementById('stateError');
    const stateRegex = /^[a-zA-Z\s]{2,50}$/;

    if (!state.value.trim()) {
        state.classList.add('input-error');
        stateError.style.display = 'block';
        return false;
    }
    state.classList.remove('input-error');
    stateError.style.display = 'none';
    return true;
}

function validatePincode() {
    const pincode = document.getElementById('pincode');
    const pincodeError = document.getElementById('pincodeError');
    const pincodeRegex = /^\d{6}$/; // Validating 6-digit PIN code

    if (!pincode.value.trim() || !pincodeRegex.test(pincode.value.trim())) {
        pincode.classList.add('input-error');
        pincodeError.style.display = 'block';
        return false;
    }
    pincode.classList.remove('input-error');
    pincodeError.style.display = 'none';
    return true;
}

function validateTerms() {
    const termsCheckbox = document.getElementById('terms');
    const termsError = document.getElementById('termsError');

    if (!termsCheckbox.checked) {
        termsError.style.display = 'block';
        return false;
    }
    termsError.style.display = 'none';
    return true;
}
function validateDogName() {
    const dogName = document.getElementById('dog-name');
    const dogNameError = document.getElementById('dogNameError');
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;

    if (!dogName.value.trim()) {
        dogName.classList.add('input-error');
        if (dogNameError) dogNameError.style.display = 'block';
        return false;
    }
    if (!nameRegex.test(dogName.value.trim())) {
        dogName.classList.add('input-error');
        if (dogNameError) dogNameError.style.display = 'block';
        return false;
    }
    dogName.classList.remove('input-error');
    if (dogNameError) dogNameError.style.display = 'none';
    return true;
}

function validateBreed() {
    const breed = document.getElementById('breed');
    const breedError = document.getElementById('breedError');
    const breedRegex = /^[a-zA-Z\s]{2,50}$/;

    if (!breed.value.trim()) {
        breed.classList.add('input-error');
        if (breedError) breedError.style.display = 'block';
        return false;
    }
    if (!breedRegex.test(breed.value.trim())) {
        breed.classList.add('input-error');
        if (breedError) breedError.style.display = 'block';
        return false;
    }
    breed.classList.remove('input-error');
    if (breedError) breedError.style.display = 'none';
    return true;
}

function validateAge() {
    const age = document.getElementById('age');
    const ageError = document.getElementById('ageError');
    const ageValue = parseInt(age.value.trim());

    if (!age.value.trim()) {
        age.classList.add('input-error');
        if (ageError) ageError.style.display = 'block';
        return false;
    }
    if (isNaN(ageValue) || ageValue < 0 || ageValue > 360) {
        age.classList.add('input-error');
        if (ageError) ageError.style.display = 'block';
        return false;
    }
    age.classList.remove('input-error');
    if (ageError) ageError.style.display = 'none';
    return true;
}

// Add event listeners for real-time validation
document.getElementById('fullName').addEventListener('blur', validateFullName);
document.getElementById('email').addEventListener('blur', validateEmail);
document.getElementById('phone').addEventListener('blur', validatePhone);
document.getElementById('HouseNo').addEventListener('blur', validateHouseNo);
document.getElementById('landmark').addEventListener('blur', validateLandmark);
document.getElementById('city').addEventListener('blur', validateCity);
document.getElementById('state').addEventListener('blur', validateState);
document.getElementById('pincode').addEventListener('blur', validatePincode);
document.getElementById('terms').addEventListener('change', validateTerms);

// Checkout Form Validation
function validateCheckoutForm() {
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isHouseNoValid = validateHouseNo();
    const isLandmarkValid = validateLandmark();
    const isCityValid = validateCity();
    const isStateValid = validateState();
    const isPincodeValid = validatePincode();
    const isTermsAccepted = validateTerms();

    return isFullNameValid && isEmailValid && isPhoneValid && 
           isHouseNoValid && isLandmarkValid && isCityValid && 
           isStateValid && isPincodeValid && isTermsAccepted;
}
// Add this to your DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Add error message elements if they don't exist
    const dogFields = [
        { id: 'dog-name', error: 'dogNameError', message: 'Please enter a valid dog name (letters and spaces only)' },
        { id: 'breed', error: 'breedError', message: 'Please enter a valid breed (letters and spaces only)' },
        { id: 'age', error: 'ageError', message: 'Please enter a valid age between 0 and 360 months' }
    ];

    dogFields.forEach(field => {
        const input = document.getElementById(field.id);
        if (input && !document.getElementById(field.error)) {
            const errorDiv = document.createElement('div');
            errorDiv.id = field.error;
            errorDiv.className = 'error-message';
            errorDiv.style.display = 'none';
            errorDiv.textContent = field.message;
            input.parentNode.insertBefore(errorDiv, input.nextSibling);
        }
    });

    // Add event listeners for dog form fields
    const dogName = document.getElementById('dog-name');
    const breed = document.getElementById('breed');
    const age = document.getElementById('age');

    if (dogName) dogName.addEventListener('blur', validateDogName);
    if (breed) breed.addEventListener('blur', validateBreed);
    if (age) age.addEventListener('blur', validateAge);

    // Modify your existing validateCheckoutForm function to include dog validation
    const originalValidateCheckoutForm = validateCheckoutForm;
    validateCheckoutForm = function() {
        let isValid = originalValidateCheckoutForm();
        
        // Only validate dog fields if they exist in the form
        if (document.getElementById('dog-name')) {
            const isDogNameValid = validateDogName();
            const isBreedValid = validateBreed();
            const isAgeValid = validateAge();
            isValid = isValid && isDogNameValid && isBreedValid && isAgeValid;
        }
        
        return isValid;
    };
    const payNowButton = document.getElementById('payNow');
    if (payNowButton) {
        payNowButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            if (validateCheckoutForm()) {
                // Proceed with the payment
                window.location.href = '/payments';
            } else {
                // Scroll to the first error
                const firstError = document.querySelector('.input-error');
                if (firstError) {
                    firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }
});
// Terms and Conditions Modal Logic
document.getElementById('termsLink').addEventListener('click', function (event) {
    event.preventDefault();
    document.getElementById('termsModal').style.display = 'block';
});

document.getElementById('closeModal').addEventListener('click', function () {
    document.getElementById('termsModal').style.display = 'none';
});

window.addEventListener('click', function (event) {
    if (event.target === document.getElementById('termsModal')) {
        document.getElementById('termsModal').style.display = 'none';
    }
});
