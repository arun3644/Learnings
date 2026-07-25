<template>
  <div class="employee-management">
    <div class="header">
      <h1>Employee Management System</h1>
      <p class="total-employees">Total Employees: {{ totalEmployees }}</p>
    </div>

    <!-- Filters and Search -->
    <div class="filters-section">
      <div class="filter-group">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by employee name..."
          class="search-input"
        />
      </div>

      <div class="filter-group">
        <select v-model="selectedDepartment" class="filter-select">
          <option value="">All Departments</option>
          <option v-for="dept in departments" :key="dept" :value="dept">
            {{ dept }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <select v-model="selectedStatus" class="filter-select">
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div class="filter-group">
        <select v-model="sortBy" class="filter-select">
          <option value="">Sort by...</option>
          <option value="salary-asc">Salary (Low to High)</option>
          <option value="salary-desc">Salary (High to Low)</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>

      <button @click="resetFilters" class="btn-reset">Reset Filters</button>
    </div>

    <!-- Add Employee Section -->
    <div class="form-section">
      <h2>{{ editingEmployeeId ? 'Edit Employee' : 'Add New Employee' }}</h2>
      <form @submit.prevent="saveEmployee" class="employee-form">
        <div class="form-group">
          <label>Name *</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Enter employee name"
            class="form-input"
          />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label>Department</label>
          <select v-model="form.department" class="form-input">
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div class="form-group">
          <label>Salary *</label>
          <input
            v-model.number="form.salary"
            type="number"
            placeholder="Enter salary"
            class="form-input"
          />
          <span v-if="errors.salary" class="error">{{ errors.salary }}</span>
        </div>

        <div class="form-group">
          <label>Experience (years)</label>
          <input
            v-model.number="form.experience"
            type="number"
            placeholder="Enter experience"
            class="form-input"
          />
          <span v-if="errors.experience" class="error">{{ errors.experience }}</span>
        </div>

        <div class="form-group">
          <label>Status</label>
          <select v-model="form.status" class="form-input">
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div class="form-buttons">
          <button type="submit" class="btn-submit">
            {{ editingEmployeeId ? 'Update Employee' : 'Add Employee' }}
          </button>
          <button
            v-if="editingEmployeeId"
            type="button"
            @click="cancelEdit"
            class="btn-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

    <!-- Employee Table -->
    <div class="table-section">
      <h2>Employees List</h2>
      <div v-if="filteredEmployees.length === 0" class="no-data">
        No employees found.
      </div>
      <table v-else class="employees-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Experience</th>
            <th>Bonus</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="employee in filteredEmployees" :key="employee.id">
            <td>{{ employee.id }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.department }}</td>
            <td>${{ formatCurrency(employee.salary) }}</td>
            <td>{{ employee.experience }} years</td>
            <td class="bonus-cell">${{ calculateBonus(employee) }}</td>
            <td>
              <span :class="['status-badge', employee.status.toLowerCase()]">
                {{ employee.status }}
              </span>
            </td>
            <td class="actions-cell">
              <button @click="startEdit(employee)" class="btn-edit">Edit</button>
              <button @click="deleteEmployee(employee.id)" class="btn-delete">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import employeeService from '../services/employeeService';

export default {
  name: 'EmployeeManagement',
  data() {
    return {
      employees: [],
      form: {
        name: '',
        department: '',
        salary: null,
        experience: 0,
        status: 'Active'
      },
      errors: {},
      editingEmployeeId: null,
      searchQuery: '',
      selectedDepartment: '',
      selectedStatus: '',
      sortBy: ''
    };
  },

  computed: {
    departments() {
      const depts = new Set(this.employees.map(emp => emp.department).filter(Boolean));
      return Array.from(depts).sort();
    },

    filteredEmployees() {
      let filtered = this.employees;

      // Search filter
      if (this.searchQuery) {
        filtered = filtered.filter(emp =>
          emp.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Department filter
      if (this.selectedDepartment) {
        filtered = filtered.filter(emp => emp.department === this.selectedDepartment);
      }

      // Status filter
      if (this.selectedStatus) {
        filtered = filtered.filter(emp => emp.status === this.selectedStatus);
      }

      // Apply sorting
      filtered = this.applySorting(filtered);

      return filtered;
    },

    totalEmployees() {
      return this.employees.length;
    }
  },

  methods: {
    async loadEmployees() {
      try {
        const response = await employeeService.getEmployees();
        this.employees = response.data;
      } catch (error) {
        console.error('Error loading employees:', error);
      }
    },

    validateForm() {
      this.errors = {};

      if (!this.form.name || this.form.name.trim() === '') {
        this.errors.name = 'Name is required';
      }

      if (this.form.salary === null || this.form.salary === '') {
        this.errors.salary = 'Salary is required';
      } else if (this.form.salary <= 0) {
        this.errors.salary = 'Salary must be positive';
      }

      if (this.form.experience < 0) {
        this.errors.experience = 'Experience cannot be negative';
      }

      return Object.keys(this.errors).length === 0;
    },

    async saveEmployee() {
      if (!this.validateForm()) {
        return;
      }

      try {
        if (this.editingEmployeeId) {
          await employeeService.updateEmployee(this.editingEmployeeId, this.form);
        } else {
          await employeeService.createEmployee(this.form);
        }
        this.resetForm();
        await this.loadEmployees();
      } catch (error) {
        console.error('Error saving employee:', error);
      }
    },

    startEdit(employee) {
      this.editingEmployeeId = employee.id;
      this.form = {
        name: employee.name,
        department: employee.department,
        salary: employee.salary,
        experience: employee.experience,
        status: employee.status
      };
    },

    cancelEdit() {
      this.resetForm();
    },

    async deleteEmployee(id) {
      if (confirm('Are you sure you want to delete this employee?')) {
        try {
          await employeeService.deleteEmployee(id);
          await this.loadEmployees();
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      }
    },

    resetForm() {
      this.form = {
        name: '',
        department: '',
        salary: null,
        experience: 0,
        status: 'Active'
      };
      this.errors = {};
      this.editingEmployeeId = null;
    },

    resetFilters() {
      this.searchQuery = '';
      this.selectedDepartment = '';
      this.selectedStatus = '';
      this.sortBy = '';
    },

    calculateBonus(employee) {
      if (employee.salary > 50000 && employee.experience >= 5) {
        return Math.round(employee.salary * 0.2);
      } else if (employee.salary > 30000 && employee.experience >= 2) {
        return Math.round(employee.salary * 0.1);
      }
      return Math.round(employee.salary * 0.05);
    },

    formatCurrency(value) {
      return value.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      });
    },

    applySorting(employees) {
      const sorted = [...employees];

      if (this.sortBy === 'salary-asc') {
        sorted.sort((a, b) => a.salary - b.salary);
      } else if (this.sortBy === 'salary-desc') {
        sorted.sort((a, b) => b.salary - a.salary);
      } else if (this.sortBy === 'name') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
      }

      return sorted;
    }
  },

  mounted() {
    this.loadEmployees();
  }
};
</script>

<style scoped>
.employee-management {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: #333;
  margin: 0 0 10px 0;
  font-size: 28px;
}

.total-employees {
  color: #666;
  margin: 0;
  font-size: 14px;
}

.filters-section {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
}

.filter-group {
  flex: 1;
  min-width: 150px;
}

.search-input,
.filter-select {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.search-input:focus,
.filter-select:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

.btn-reset {
  padding: 8px 16px;
  background-color: #757575;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.btn-reset:hover {
  background-color: #616161;
}

.form-section {
  margin-bottom: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #e0e0e0;
}

.form-section h2 {
  margin-top: 0;
  color: #333;
  font-size: 20px;
}

.employee-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.form-input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.form-input:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

.error {
  color: #d32f2f;
  font-size: 12px;
  margin-top: 3px;
}

.form-buttons {
  grid-column: 1 / -1;
  display: flex;
  gap: 10px;
}

.btn-submit {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-submit:hover {
  background-color: #45a049;
}

.btn-cancel {
  padding: 10px 20px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
}

.btn-cancel:hover {
  background-color: #da190b;
}

.table-section {
  margin-top: 30px;
}

.table-section h2 {
  color: #333;
  font-size: 20px;
  margin-bottom: 15px;
}

.no-data {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 16px;
}

.employees-table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.employees-table thead {
  background-color: #2196F3;
  color: white;
}

.employees-table th {
  padding: 12px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
}

.employees-table td {
  padding: 12px;
  border-bottom: 1px solid #e0e0e0;
  font-size: 14px;
}

.employees-table tbody tr:hover {
  background-color: #f5f5f5;
}

.bonus-cell {
  color: #4CAF50;
  font-weight: 600;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.active {
  background-color: #c8e6c9;
  color: #2e7d32;
}

.status-badge.inactive {
  background-color: #ffcccc;
  color: #c62828;
}

.actions-cell {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
}

.btn-edit {
  background-color: #2196F3;
  color: white;
}

.btn-edit:hover {
  background-color: #1976D2;
}

.btn-delete {
  background-color: #f44336;
  color: white;
}

.btn-delete:hover {
  background-color: #da190b;
}

@media (max-width: 768px) {
  .filters-section {
    flex-direction: column;
  }

  .filter-group {
    min-width: 100%;
  }

  .employees-table {
    font-size: 12px;
  }

  .employees-table th,
  .employees-table td {
    padding: 8px;
  }

  .actions-cell {
    flex-direction: column;
  }
}
</style>
