const mockEmployees = [
    { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'alice.smith@example.com', department: 'HR', role: 'Manager' },
    { id: 2, firstName: 'Bob', lastName: 'Johnson', email: 'bob.j@example.com', department: 'IT', role: 'Developer' },
    { id: 3, firstName: 'Charlie', lastName: 'Lee', email: 'charlie.lee@example.com', department: 'Finance', role: 'Analyst' },
    { id: 4, firstName: 'Diana', lastName: 'Miller', email: 'diana.m@example.com', department: 'Marketing', role: 'Specialist' },
    { id: 5, firstName: 'Eve', lastName: 'Davis', email: 'eve.d@example.com', department: 'Sales', role: 'Representative' },
    { id: 6, firstName: 'Frank', lastName: 'White', email: 'frank.w@example.com', department: 'IT', role: 'QA Engineer' },
    { id: 7, firstName: 'Grace', lastName: 'Taylor', email: 'grace.t@example.com', department: 'HR', role: 'Recruiter' },
    { id: 8, firstName: 'Henry', lastName: 'Brown', email: 'henry.b@example.com', department: 'Finance', role: 'Accountant' },
    { id: 9, firstName: 'Ivy', lastName: 'Wilson', email: 'ivy.w@example.com', department: 'Marketing', role: 'Manager' },
    { id: 10, firstName: 'Jack', lastName: 'Moore', email: 'jack.m@example.com', department: 'Sales', role: 'Manager' },
    { id: 11, firstName: 'Karen', lastName: 'Green', email: 'karen.g@example.com', department: 'IT', role: 'DevOps Engineer' },
    { id: 12, firstName: 'Liam', lastName: 'Hall', email: 'liam.h@example.com', department: 'HR', role: 'HR Specialist' },
    { id: 13, firstName: 'Mia', lastName: 'Allen', email: 'mia.a@example.com', department: 'Finance', role: 'Financial Analyst' },
    { id: 14, firstName: 'Noah', lastName: 'Young', email: 'noah.y@example.com', department: 'Marketing', role: 'Coordinator' },
    { id: 15, firstName: 'Olivia', lastName: 'King', email: 'olivia.k@example.com', department: 'Sales', role: 'Associate' },
    { id: 16, firstName: 'Peter', lastName: 'Wright', email: 'peter.w@example.com', department: 'IT', role: 'Network Engineer' },
    { id: 17, firstName: 'Quinn', lastName: 'Scott', email: 'quinn.s@example.com', department: 'HR', role: 'Payroll Specialist' },
    { id: 18, firstName: 'Rachel', lastName: 'Adams', email: 'rachel.a@example.com', department: 'Finance', role: 'Auditor' },
    { id: 19, firstName: 'Sam', lastName: 'Baker', email: 'sam.b@example.com', department: 'Marketing', role: 'Analyst' },
    { id: 20, firstName: 'Tina', lastName: 'Gonzalez', email: 'tina.g@example.com', department: 'Sales', role: 'Consultant' },
    { id: 21, firstName: 'Uma', lastName: 'Nelson', email: 'uma.n@example.com', department: 'IT', role: 'Frontend Developer' },
    { id: 22, firstName: 'Victor', lastName: 'Carter', email: 'victor.c@example.com', department: 'HR', role: 'Recruitment Coordinator' },
    { id: 23, firstName: 'Wendy', lastName: 'Mitchell', email: 'wendy.m@example.com', department: 'Finance', role: 'Tax Specialist' },
    { id: 24, firstName: 'Xavier', lastName: 'Perez', email: 'xavier.p@example.com', department: 'Marketing', role: 'Campaign Manager' },
    { id: 25, firstName: 'Yara', lastName: 'Roberts', email: 'yara.r@example.com', department: 'Sales', role: 'Account Executive' }
];

// Simple ID counter for new employees
let nextEmployeeId = mockEmployees.length > 0 ? Math.max(...mockEmployees.map(e => e.id)) + 1 : 1;