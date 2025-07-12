const FormController = (function() {
    const modal = document.getElementById('employee-modal');
    const form = document.getElementById('employee-form');
    const closeButton = document.querySelector('.modal .close-button');
    const cancelButton = form.querySelector('.btn-cancel');
    const submitButton = form.querySelector('.btn-add-update');
    const employeeIdInput = document.getElementById('employee-id');

    const firstNameInput = document.getElementById('employee-firstName');
    const lastNameInput = document.getElementById('employee-lastName');
    const emailInput = document.getElementById('employee-email');
    const departmentSelect = document.getElementById('employee-department');
    const roleSelect = document.getElementById('employee-role');

    let currentEmployeeId = null; 

    function showForm(employee = null) {
        form.reset();
        clearErrors();
        form.classList.remove('edit-mode'); 
        submitButton.textContent = 'Add'; 

        if (employee) {
            currentEmployeeId = employee.id;
            firstNameInput.value = employee.firstName;
            lastNameInput.value = employee.lastName;
            emailInput.value = employee.email;
            departmentSelect.value = employee.department;
            roleSelect.value = employee.role;
            employeeIdInput.value = employee.id; 
            submitButton.textContent = 'Update'; 
            modal.querySelector('.modal-title').textContent = 'Edit Employee';
            form.classList.add('edit-mode'); 
        } else {
            currentEmployeeId = null;
            employeeIdInput.value = '';
            modal.querySelector('.modal-title').textContent = 'Add Employee';
        }
        modal.style.display = 'flex'; 
        modal.classList.remove('hide'); 
    }

    function hideForm() {
        modal.classList.add('hide'); 
        modal.addEventListener('animationend', function handler() {
            if (modal.classList.contains('hide')) {
                modal.style.display = 'none';
                modal.classList.remove('hide'); 
            }
            modal.removeEventListener('animationend', handler);
        });
    }

    function validateForm() {
        let isValid = true;
        clearErrors(); 

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
        errorElement.style.display = 'block';
        errorElement.closest('.form-group').classList.add('has-error');
    }

    function clearErrors() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none'; 
            el.closest('.form-group').classList.remove('has-error'); 
        });
    }

    function handleSubmit(event) {
        event.preventDefault(); 

        if (validateForm()) {
            const employeeData = {
                firstName: firstNameInput.value.trim(),
                lastName: lastNameInput.value.trim(),
                email: emailInput.value.trim(),
                department: departmentSelect.value,
                role: roleSelect.value
            };

            if (currentEmployeeId) {
                App.updateEmployee(currentEmployeeId, employeeData);
            } else {
                App.addEmployee(employeeData);
            }
        }
    }

    closeButton.addEventListener('click', hideForm);
    cancelButton.addEventListener('click', hideForm);
    form.addEventListener('submit', handleSubmit);

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
