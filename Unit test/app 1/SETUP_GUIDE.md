# Quick Setup Guide

## Step 1: Install Dependencies
```bash
npm install
```

This installs:
- vue@^3.3.0
- axios@^1.6.0
- @vitejs/plugin-vue@^4.5.0
- vite@^5.0.0
- json-server@^0.17.4

## Step 2: Start JSON Server (Terminal 1)
```bash
npm run server
```
Expected output:
```
  JSON Server is running
  Watching db.json...
  
  Resources
  http://localhost:3001/employees
```

## Step 3: Start Vite Dev Server (Terminal 2)
```bash
npm run dev
```
Expected output:
```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
```

## Step 4: Open Browser
Navigate to `http://localhost:5173/`

You should see the Employee Management System with:
- A form to add/edit employees
- A table with 6 sample employees
- Filter and search options
- Bonus calculations for each employee

## Available npm Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start Vite dev server (frontend) |
| `npm run server` | Start JSON Server (backend on port 3001) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## Project Files Overview

| File | Purpose |
|------|---------|
| `src/components/EmployeeManagement.vue` | Main component with all CRUD operations |
| `src/services/employeeService.js` | Axios API calls to JSON Server |
| `src/App.vue` | Root Vue component |
| `src/main.js` | Vue app initialization |
| `index.html` | HTML entry point |
| `db.json` | JSON Server database |
| `vite.config.js` | Vite configuration |
| `package.json` | Dependencies and scripts |

## Features Ready for Testing

All methods are organized for easy unit testing with Jasmine:

1. **calculateBonus(employee)** - Bonus calculation logic
2. **validateForm()** - Form validation logic
3. **applySorting(employees)** - Sorting logic
4. **formatCurrency(value)** - Currency formatting
5. **loadEmployees()** - API call handling
6. **saveEmployee()** - Create/Update logic
7. **deleteEmployee(id)** - Delete logic

## Troubleshooting

**Port already in use?**
- Change port in `vite.config.js` (frontend) or use `json-server --port 3002` (backend)

**Can't connect to API?**
- Ensure JSON Server is running on port 3001
- Check that `API_BASE_URL` in `employeeService.js` matches

**Styles not loading?**
- Clear browser cache (Ctrl+Shift+R)

## Next Steps

You're ready to add Jasmine tests. Key components to test:
- Component methods: `calculateBonus`, `validateForm`, `applySorting`
- Computed properties: `filteredEmployees`, `totalEmployees`, `departments`
- API calls: `loadEmployees`, `saveEmployee`, `deleteEmployee`
