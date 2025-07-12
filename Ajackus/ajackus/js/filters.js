const FilterController = (function() {
    const searchInput = document.getElementById('employee-search');
    const filterFirstNameInput = document.getElementById('filter-firstName');
    const filterDepartmentInput = document.getElementById('filter-department');
    const filterRoleInput = document.getElementById('filter-role');
    const applyFiltersBtn = document.getElementById('apply-filters');
    const resetFiltersBtn = document.getElementById('reset-filters');

    let currentSearchTerm = '';
    let currentFilters = {
        firstName: '',
        department: '',
        role: ''
    };
    let currentSortBy = 'firstName'; // Default sort

    let renderCallback = null; // Callback to re-render employee list in App.js

    // Debounce function to limit how often a function runs (e.g., for search input)
    function debounce(func, delay) {
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), delay);
        };
    }

    // Apply all active filters and sort order to the employee list
    function applyAllFiltersAndSort(employees) {
        let result = [...employees]; // Create a shallow copy to work with

        // 1. Apply Search Term
        if (currentSearchTerm) {
            const lowerCaseSearch = currentSearchTerm.toLowerCase();
            result = result.filter(employee =>
                employee.firstName.toLowerCase().includes(lowerCaseSearch) ||
                employee.lastName.toLowerCase().includes(lowerCaseSearch) ||
                employee.email.toLowerCase().includes(lowerCaseSearch)
            );
        }

        // 2. Apply Sidebar Filters
        if (currentFilters.firstName) {
            const lowerCaseFilter = currentFilters.firstName.toLowerCase();
            result = result.filter(employee =>
                employee.firstName.toLowerCase().includes(lowerCaseFilter)
            );
        }
        if (currentFilters.department) {
            const lowerCaseFilter = currentFilters.department.toLowerCase();
            result = result.filter(employee =>
                employee.department.toLowerCase().includes(lowerCaseFilter)
            );
        }
        if (currentFilters.role) {
            const lowerCaseFilter = currentFilters.role.toLowerCase();
            result = result.filter(employee =>
                employee.role.toLowerCase().includes(lowerCaseFilter)
            );
        }

        // 3. Apply Sort Order
        result.sort((a, b) => {
            let valA = a[currentSortBy].toLowerCase();
            let valB = b[currentSortBy].toLowerCase();

            if (valA < valB) return -1;
            if (valA > valB) return 1;
            return 0;
        });

        return result;
    }

    // Event handlers
    const handleSearchInput = debounce(() => {
        currentSearchTerm = searchInput.value.trim();
        if (renderCallback) renderCallback();
    }, 300); // Debounce search input by 300ms

    function handleApplyFilters() {
        currentFilters.firstName = filterFirstNameInput.value.trim();
        currentFilters.department = filterDepartmentInput.value.trim();
        currentFilters.role = filterRoleInput.value.trim();
        if (renderCallback) renderCallback();
    }

    function handleResetFilters() {
        searchInput.value = '';
        currentSearchTerm = '';
        filterFirstNameInput.value = '';
        filterDepartmentInput.value = '';
        filterRoleInput.value = '';
        currentFilters = { firstName: '', department: '', role: '' };
        document.getElementById('sort-by').value = 'firstName'; // Reset sort dropdown
        currentSortBy = 'firstName';

        if (renderCallback) renderCallback();
    }

    // Setters for external components (like App.js for sort)
    function setSortBy(value) {
        currentSortBy = value;
    }

    // Initialization
    function init(callback) {
        renderCallback = callback; // Store the callback from App.js

        // Add event listeners
        searchInput.addEventListener('input', handleSearchInput);
        applyFiltersBtn.addEventListener('click', handleApplyFilters);
        resetFiltersBtn.addEventListener('click', handleResetFilters);
    }

    return {
        init: init,
        applyAllFiltersAndSort: applyAllFiltersAndSort,
        setSortBy: setSortBy
    };
})();