const App = (function() {
    let employees = []; 
    let currentPage = 1;
    let itemsPerPage = 10;
    let filteredAndSortedEmployees = []; 
    const employeeListContainer = document.getElementById('employee-list-container');
    const paginationContainer = document.getElementById('pagination');
    const addEmployeeBtn = document.getElementById('add-employee-btn');
    const sortBySelect = document.getElementById('sort-by');
    const showEntriesSelect = document.getElementById('show-entries');
    const employeeSearchInput = document.getElementById('employee-search');

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

    function renderEmployees() {
        employeeListContainer.innerHTML = '';
    
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

    function renderPagination() {
        paginationContainer.innerHTML = '';
        const totalPages = Math.ceil(filteredAndSortedEmployees.length / itemsPerPage);

        if (totalPages <= 1) {
            return; 
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

    function addEmployee(employeeData) {
        const newId = nextEmployeeId++;
        const newEmployee = { ...employeeData, id: newId };
        mockEmployees.push(newEmployee);
        employees = [...mockEmployees]; 
        currentPage = 1; 
        renderEmployees(); 
        FormController.hideForm();
        alert('Employee added successfully!');
    }

    function updateEmployee(id, updatedData) {
        const index = mockEmployees.findIndex(emp => emp.id === id);
        if (index !== -1) {
            mockEmployees[index] = { ...mockEmployees[index], ...updatedData };
            employees = [...mockEmployees]; 
            renderEmployees(); 
            FormController.hideForm();
            alert('Employee updated successfully!');
        } else {
            console.error('Employee not found for update:', id);
        }
    }

    function deleteEmployee(id) {
        const initialLength = mockEmployees.length;
        mockEmployees = mockEmployees.filter(emp => emp.id !== id);
        employees = [...mockEmployees]; 
        if (mockEmployees.length < initialLength) {
            const totalPagesAfterDelete = Math.ceil(filteredAndSortedEmployees.length / itemsPerPage);
            if (currentPage > totalPagesAfterDelete) {
                currentPage = Math.max(1, totalPagesAfterDelete);
            }
            renderEmployees(); 
            alert('Employee deleted successfully!');
        } else {
            console.error('Employee not found for deletion:', id);
        }
    }

    function setupEventListeners() {
        addEmployeeBtn.addEventListener('click', () => FormController.showForm());

        sortBySelect.addEventListener('change', () => {
            FilterController.setSortBy(sortBySelect.value);
            currentPage = 1;
            renderEmployees();
        });

        showEntriesSelect.addEventListener('change', () => {
            itemsPerPage = parseInt(showEntriesSelect.value);
            currentPage = 1; 
            renderEmployees();
        });

        FilterController.init(renderEmployees);
    }

    function init() {
        employees = [...mockEmployees];
        setupEventListeners();
        renderEmployees(); 
    }

    return {
        init: init,
        addEmployee: addEmployee,
        updateEmployee: updateEmployee,
        deleteEmployee: deleteEmployee,
        getEmployeeById: (id) => mockEmployees.find(emp => emp.id === id) 
    };
})();

document.addEventListener('DOMContentLoaded', App.init);
