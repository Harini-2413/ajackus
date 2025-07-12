const App = (function() {
    let employees = []; // This will hold the active list of employees, derived from mockEmployees
    let currentPage = 1;
    let itemsPerPage = 10;
    let filteredAndSortedEmployees = []; // Store the currently filtered/sorted data

    const employeeListContainer = document.getElementById('employee-list-container');
    const paginationContainer = document.getElementById('pagination');
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const sortBySelect = document.getElementById('sort-by');
    const showEntriesSelect = document.getElementById('show-entries');
    const employeeSearchInput = document.getElementById('employee-search');

    // Helper to create an employee card HTML
    function createEmployeeCard(employee) {
        return `
            <div class="employee-card" data-employee-id="${employee.id}">
                <h3>${employee.firstName} ${employee.lastName}</h3>
                <p>ID: ${employee.id}</p>
                <p>Email: ${employee.email}</p>
                <p>Department: ${employee.department}</p>
                <p>Role: ${employee.role}</p>
                <div class="card-actions">
                    <button class="btn btn-info btn-edit" data-id="${employee.id}">Edit</button>
                    <button class="btn btn-danger btn-delete" data-id="${employee.id}">Delete</button>
                </div>
            </div>
        `;
    }

    // Render employee list based on current page and filters
    function renderEmployees() {
        employeeListContainer.innerHTML = ''; // Clear existing cards

        // Apply filters and sort order from FilterController
    
        filteredAndSortedEmployees = FilterController.applyAllFiltersAndSort(employees);

        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const employeesToDisplay = filteredAndSortedEmployees.slice(startIndex, endIndex);

        if (employeesToDisplay.length === 0) {
            employeeListContainer.innerHTML = '<p class="text-center">No employees found matching your criteria.</p>';
        } else {
            employeesToDisplay.forEach(employee => {
                employeeListContainer.innerHTML += createEmployeeCard(employee);
            });
        }
        renderPagination();
        attachCardEventListeners();
    }

    // Render pagination controls
    function renderPagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredAndSortedEmployees.length / itemsPerPage);

        if (totalPages <= 1) {
            return; // No pagination needed for 1 or less pages
        }

        const prevBtn = document.createElement('button');
        prevBtn.textContent = 'Previous';
        prevBtn.disabled = currentPage === 1;
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderEmployees();
            }
        });
        paginationContainer.appendChild(prevBtn);

        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            if (i === currentPage) {
                pageBtn.classList.add('current-page');
            }
            pageBtn.addEventListener('click', () => {
                currentPage = i;
                renderEmployees();
            });
            paginationContainer.appendChild(pageBtn);
        }

        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                renderEmployees();
            }
        });
        paginationContainer.appendChild(nextBtn);
    }

    // Attach event listeners to dynamically created Edit/Delete buttons
    function attachCardEventListeners() {
        document.querySelectorAll('.btn-edit').forEach(button => {
            button.onclick = (event) => {
                const id = parseInt(event.target.dataset.id);
                const employeeToEdit = employees.find(emp => emp.id === id);
                if (employeeToEdit) {
                    FormController.showForm(employeeToEdit);
                }
            };
        });

        document.querySelectorAll('.btn-delete').forEach(button => {
            button.onclick = (event) => {
                const id = parseInt(event.target.dataset.id);
                if (confirm('Are you sure you want to delete this employee?')) {
                    deleteEmployee(id);
                }
            };
        });
    }

    // CRUD Operations
    function addEmployee(employeeData) {
        const newId = nextEmployeeId++;
        const newEmployee = { ...employeeData, id: newId };
        mockEmployees.push(newEmployee);
        employees = [...mockEmployees]; // Update local 'employees' array
        currentPage = 1; // Go to first page on add
        renderEmployees(); // Re-render to show new employee
        FormController.hideForm();
        alert('Employee added successfully!');
    }

    function updateEmployee(id, updatedData) {
        const index = mockEmployees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            mockEmployees[index] = { ...mockEmployees[index], ...updatedData };
            employees = [...mockEmployees]; // Update local 'employees' array
            renderEmployees(); // Re-render to show updated employee
            FormController.hideForm();
            alert('Employee updated successfully!');
        } else {
            console.error('Employee not found for update:', id);
        }
    }

    function deleteEmployee(id) {
        const initialLength = mockEmployees.length;
        mockEmployees = mockEmployees.filter(emp => emp.id !== id);
        employees = [...mockEmployees]; // Update local 'employees' array

        if (mockEmployees.length < initialLength) {
            // Adjust current page if the last item on a page was deleted
            const totalPagesAfterDelete = Math.ceil(filteredAndSortedEmployees.length / itemsPerPage);
            if (currentPage > totalPagesAfterDelete) {
                currentPage = Math.max(1, totalPagesAfterDelete);
            }
            renderEmployees(); // Re-render the list
            alert('Employee deleted successfully!');
        } else {
            console.error('Employee not found for deletion:', id);
        }
    }

    // Event Listeners for main controls
    function setupEventListeners() {
        addEmployeeBtn.addEventListener('click', () => FormController.showForm());

        sortBySelect.addEventListener('change', () => {
            FilterController.setSortBy(sortBySelect.value);
            currentPage = 1; // Reset to page 1 on sort change
            renderEmployees();
        });

        showEntriesSelect.addEventListener('change', () => {
            itemsPerPage = parseInt(showEntriesSelect.value);
            currentPage = 1; // Reset to page 1 on entries change
            renderEmployees();
        });

        // Initialize FilterController with render callback
        FilterController.init(renderEmployees);
    }

    // Initial setup
    function init() {
        employees = [...mockEmployees]; // Initialize working copy of employees
        setupEventListeners();
        renderEmployees(); // Initial render
    }

    return {
        init: init,
        addEmployee: addEmployee,
        updateEmployee: updateEmployee,
        deleteEmployee: deleteEmployee,
        getEmployeeById: (id) => mockEmployees.find(emp => emp.id === id) // Expose for form pre-fill
    };
})();

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', App.init);