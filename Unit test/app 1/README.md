# Vue 3 Employee Management System

A complete Vue 3 (Options API) application with CRUD operations, built for practicing Jasmine unit testing.

## Project Structure

```
vue3-employee-management/
├── src/
│   ├── components/
│   │   └── EmployeeManagement.vue    # Main component
│   ├── services/
│   │   └── employeeService.js        # Axios API service
│   ├── App.vue                       # Root component
│   └── main.js                       # App entry point
├── index.html                        # HTML template
├── vite.config.js                    # Vite configuration
├── package.json                      # Dependencies
├── db.json                           # JSON Server database
└── README.md                         # This file
```

## Installation

1. **Clone/Setup the project**
   ```bash
   cd vue3-employee-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Application

You need two terminals:

**Terminal 1 - Start JSON Server (Backend)**
```bash
npm run server
```
This starts JSON Server on `http://localhost:3001` with the db.json file.

**Terminal 2 - Start Vite Dev Server (Frontend)**
```bash
npm run dev
```
This starts the Vue app on `http://localhost:5173`.

## Features

### CRUD Operations
- **Display**: View all employees in a table
- **Create**: Add new employees via form
- **Read**: List employees with sorting and filtering
- **Update**: Edit employee details
- **Delete**: Remove employees with confirmation

### Business Logic
- **calculateBonus() method**: Calculates employee bonus based on rules:
  - Salary > $50,000 + Experience ≥ 5 years → 20% bonus
  - Salary > $30,000 + Experience ≥ 2 years → 10% bonus
  - Otherwise → 5% bonus

### UI Features
- **Search**: Filter employees by name
- **Department Filter**: Filter by department
- **Status Filter**: Filter Active/Inactive employees
- **Salary Sort**: Sort by salary (ascending/descending)
- **Name Sort**: Sort alphabetically
- **Total Count**: Display total number of employees
- **Responsive Design**: Mobile-friendly UI

### Validation
- Name is required
- Salary must be positive
- Experience cannot be negative
- Error messages display on form validation failure

### Computed Properties
- `departments`: Dynamically extracts unique departments
- `filteredEmployees`: Combines search, filters, and sorting
- `totalEmployees`: Returns employee count

### Component Methods
- `loadEmployees()`: Fetches employees from API
- `saveEmployee()`: Creates or updates employee
- `deleteEmployee()`: Deletes employee with confirmation
- `validateForm()`: Validates form inputs
- `calculateBonus()`: Calculates bonus amount
- `formatCurrency()`: Formats numbers as currency
- `applySorting()`: Sorts employees by selected criteria
- `startEdit()`: Prepares employee for editing
- `cancelEdit()`: Cancels editing mode
- `resetForm()`: Clears form fields
- `resetFilters()`: Clears all filters

## API Endpoints

JSON Server provides REST endpoints:

```
GET    /employees          # Get all employees
GET    /employees/:id      # Get single employee
POST   /employees          # Create employee
PUT    /employees/:id      # Update employee
DELETE /employees/:id      # Delete employee
```

## Sample Employee Data

The db.json includes 6 sample employees:
- John Smith (Engineering, $85,000, 6 years)
- Sarah Johnson (Marketing, $65,000, 4 years)
- Mike Chen (Engineering, $92,000, 8 years)
- Emily Davis (HR, $55,000, 3 years)
- Alex Wilson (Finance, $72,000, 5 years)
- Lisa Brown (Marketing, $58,000, 2 years)

## Build for Production

```bash
npm run build
```

Output files will be in the `dist/` folder.

## Technology Stack

- **Vue 3**: Frontend framework
- **Vite**: Build tool and dev server
- **Axios**: HTTP client for API calls
- **JSON Server**: Mock REST API backend
- **CSS**: Scoped styling with responsive design

## Notes

- Uses Vue 3 Options API (not Composition API)
- All business logic in methods (no inline logic)
- Computed properties for derived state
- Form validation with error display
- Axios service layer for API communication
- Ready for Jasmine unit testing setup
