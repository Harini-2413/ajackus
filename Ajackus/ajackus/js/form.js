const FormController = (function() {
    const modal = document.getElementById('employee-modal');
    const form = document.getElementById('employee-form');
    const closeButton = document.querySelector('.modal .close-button');
    const cancelButton = form.querySelector('.btn-cancel');
    const submitButton = form.querySelector('.btn-add-update');
    const employeeIdInput = document.getElementById('employee-id');

    // Input fields
    const firstNameInput = document.getElementById('employee-firstName');
    const lastNameInput = document.getElementById('employee-lastName');
    const emailInput = document.getElementById('employee-email');
    const departmentSelect = document.getElementById('employee-department');
    const roleSelect = document.getElementById('employee-role');

    let currentEmployeeId = null; // To track if we're adding or editing

    // Show the modal form, pre-filling if editing
    function showForm(employee = null) {
        // Reset form and clear errors first
        form.reset();
        clearErrors();
        form.classList.remove('edit-mode'); // Remove any edit mode styling if present
        submitButton.textContent = 'Add'; // Default button text

        if (employee) {
            currentEmployeeId = employee.id;
            firstNameInput.value = employee.firstName;
            lastNameInput.value = employee.lastName;
            emailInput.value = employee.email;
            departmentSelect.value = employee.department;
            roleSelect.value = employee.role;
            employeeIdInput.value = employee.id; // Set hidden ID for update
            submitButton.textContent = 'Update'; // Change button text for edit mode
            modal.querySelector('.modal-title').textContent = 'Edit Employee';
            form.classList.add('edit-mode'); // Add class for potential styling changes
        } else {
            currentEmployeeId = null;
            employeeIdInput.value = '';
            modal.querySelector('.modal-title').textContent = 'Add Employee';
        }
        modal.style.display = 'flex'; // Use flex to center
        modal.classList.remove('hide'); // Ensure it's not animating out
    }

    // Hide the modal form
    function hideForm() {
        modal.classList.add('hide'); // Trigger fadeOut animation
        // Wait for animation to finish before hiding completely
        modal.addEventListener('animationend', function handler() {
            if (modal.classList.contains('hide')) {
                modal.style.display = 'none';
                modal.classList.remove('hide'); // Clean up class
            }
            modal.removeEventListener('animationend', handler);
        });
    }

    // Client-side validation
    function validateForm() {
        let isValid = true;
        clearErrors(); // Clear previous errors

        // Required fields
        if (firstNameInput.value.trim() === '') {
            displayError('firstName-error', 'First name is required.');
            isValid = false;
        }
        if (lastNameInput.value.trim() === '') {
            displayError('lastName-error', 'Last name is required.');
            isValid = false;
        }
        if (emailInput.value.trim() === '') {
            displayError('email-error', 'Email is required.');
            isValid = false;
        }
        if (departmentSelect.value === '') {
            displayError('department-error', 'Department is required.');
            isValid = false;
        }
        if (roleSelect.value === '') {
            displayError('role-error', 'Role is required.');
            isValid = false;
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() !== '' && !emailRegex.test(emailInput.value.trim())) {
            displayError('email-error', 'Invalid email format.');
            isValid = false;
        }

        return isValid;
    }

    function displayError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block'; // Make error visible
        // Add error class to parent form-group for styling
        errorElement.closest('.form-group').classList.add('has-error');
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none'; // Hide error
            el.closest('.form-group').classList.remove('has-error'); // Remove error class
        });
    }

    // Handle form submission
    function handleSubmit(event) {
        event.preventDefault(); // Prevent default form submission

        if (validateForm()) {
            const employeeData = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                department: departmentSelect.value,
                role: roleSelect.value
            };

            if (currentEmployeeId) {
                // Editing existing employee
                App.updateEmployee(currentEmployeeId, employeeData);
            } else {
                // Adding new employee
                App.addEmployee(employeeData);
            }
        }
    }

    // Event Listeners
    closeButton.addEventListener('click', hideForm);
    cancelButton.addEventListener('click', hideForm);
    form.addEventListener('submit', handleSubmit);

    // Close modal if user clicks outside of it
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            hideForm();
        }
    });

    return {
        showForm: showForm,
        hideForm: hideForm
    };
})();