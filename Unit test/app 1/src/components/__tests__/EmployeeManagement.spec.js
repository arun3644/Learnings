import { describe, it, beforeEach, afterEach, expect } from '@jest/globals';
import { mount, flushPromises } from '@vue/test-utils';
import EmployeeManagement from '../EmployeeManagement.vue';
import employeeService from '../../services/employeeService';

jest.mock('../../services/employeeService');

describe('EmployeeManagement Component', () => {
  const mockEmployees = [
    { id: 1, name: 'John Doe', department: 'Engineering', salary: 60000, experience: 5, status: 'Active' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', salary: 45000, experience: 3, status: 'Active' },
    { id: 3, name: 'Bob Johnson', department: 'Finance', salary: 35000, experience: 1, status: 'Inactive' },
    { id: 4, name: 'Alice Williams', department: 'Engineering', salary: 75000, experience: 8, status: 'Active' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // ========================================
  // SECTION 1: INITIALIZATION TESTS
  // ========================================
  describe('Initialization Tests', () => {
    it('should mount the component successfully', () => {
      employeeService.getEmployees.mockResolvedValue({ data: mockEmployees });
      const wrapper = mount(EmployeeManagement);
      expect(wrapper.exists()).toBe(true);
      expect(wrapper.vm.$options.name).toBe('EmployeeManagement');
    });

    it('should initialize form data with correct default values', () => {
      employeeService.getEmployees.mockResolvedValue({ data: [] });
      const wrapper = mount(EmployeeManagement);
      
      expect(wrapper.vm.form.name).toBe('');
      expect(wrapper.vm.form.salary).toBeNull();
      expect(wrapper.vm.form.experience).toBe(0);
      expect(wrapper.vm.form.status).toBe('Active');
      expect(wrapper.vm.editingEmployeeId).toBeNull();
      expect(wrapper.vm.searchQuery).toBe('');
      expect(wrapper.vm.selectedDepartment).toBe('');
      expect(wrapper.vm.selectedStatus).toBe('');
      expect(wrapper.vm.sortBy).toBe('');
    });

    it('should load employees when component mounts', async () => {
      employeeService.getEmployees.mockResolvedValue({ data: mockEmployees });
      const wrapper = mount(EmployeeManagement);
      await flushPromises();
      
      expect(employeeService.getEmployees).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.employees).toEqual(mockEmployees);
      expect(wrapper.vm.employees.length).toBe(4);
    });

    it('should initialize errors object as empty', () => {
      employeeService.getEmployees.mockResolvedValue({ data: [] });
      const wrapper = mount(EmployeeManagement);
      
      expect(wrapper.vm.errors).toBeDefined();
      expect(Object.keys(wrapper.vm.errors).length).toBe(0);
    });
  });

  // ========================================
  // SECTION 2: BONUS CALCULATION TESTS
  // ========================================
  describe('calculateBonus() Method Tests', () => {
    let wrapper;

    beforeEach(() => {
      employeeService.getEmployees.mockResolvedValue({ data: [] });
      wrapper = mount(EmployeeManagement);
    });

    it('should calculate 20% bonus for salary > 50000 and experience >= 5', () => {
      const employee = { id: 1, name: 'John Doe', salary: 60000, experience: 5 };
      const bonus = wrapper.vm.calculateBonus(employee);
      expect(bonus).toBe(12000);
    });

    it('should calculate 10% bonus for salary > 30000 and experience >= 2', () => {
      const employee = { id: 2, name: 'Jane Smith', salary: 45000, experience: 3 };
      const bonus = wrapper.vm.calculateBonus(employee);
      expect(bonus).toBe(4500);
    });

    it('should calculate 5% bonus for other employees (default case)', () => {
      const employee = { id: 3, name: 'Bob Johnson', salary: 25000, experience: 1 };
      const bonus = wrapper.vm.calculateBonus(employee);
      expect(bonus).toBe(1250);
    });

    it('should calculate correct bonus when salary is exactly 50000', () => {
      const employee = { id: 4, name: 'Edge Case', salary: 50000, experience: 10 };
      const bonus = wrapper.vm.calculateBonus(employee);
      expect(bonus).toBe(5000);
    });

    it('should calculate correct bonus when salary is exactly 30000', () => {
      const employee = { id: 5, name: 'Edge Case 2', salary: 30000, experience: 5 };
      const bonus = wrapper.vm.calculateBonus(employee);
      expect(bonus).toBe(1500);
    });
  });

  // ========================================
  // SECTION 3: VALIDATION TESTS
  // ========================================
  describe('Form Validation Tests', () => {
    let wrapper;

    beforeEach(() => {
      employeeService.getEmployees.mockResolvedValue({ data: [] });
      wrapper = mount(EmployeeManagement);
    });

    it('should fail validation when employee name is empty', () => {
      wrapper.vm.form.name = '';
      wrapper.vm.form.salary = 50000;
      wrapper.vm.form.experience = 2;

      const isValid = wrapper.vm.validateForm();
      expect(isValid).toBe(false);
      expect(wrapper.vm.errors.name).toBeDefined();
      expect(wrapper.vm.errors.name).toBe('Name is required');
    });

    it('should fail validation when employee name is only whitespace', () => {
      wrapper.vm.form.name = '   ';
      wrapper.vm.form.salary = 50000;
      wrapper.vm.form.experience = 2;

      const isValid = wrapper.vm.validateForm();
      expect(isValid).toBe(false);
      expect(wrapper.vm.errors.name).toBe('Name is required');
    });

    it('should fail validation when salary is negative', () => {
      wrapper.vm.form.name = 'John Doe';
      wrapper.vm.form.salary = -5000;
      wrapper.vm.form.experience = 2;

      const isValid = wrapper.vm.validateForm();
      expect(isValid).toBe(false);
      expect(wrapper.vm.errors.salary).toBeDefined();
      expect(wrapper.vm.errors.salary).toBe('Salary must be positive');
    });

    it('should fail validation when salary is zero', () => {
      wrapper.vm.form.name = 'John Doe';
      wrapper.vm.form.salary = 0;
      wrapper.vm.form.experience = 2;

      const isValid = wrapper.vm.validateForm();
      expect(isValid).toBe(false);
      expect(wrapper.vm.errors.salary).toBe('Salary must be positive');
    });

    it('should fail validation when salary is not provided', () => {
      wrapper.vm.form.name = 'John Doe';
      wrapper.vm.form.salary = null;
      wrapper.vm.form.experience = 2;

      const isValid = wrapper.vm.validateForm();
      expect(isValid).toBe(false);
      expect(wrapper.vm.errors.salary).toBe('Salary is required');
    });

    it('should fail validation when experience is negative', () => {
      wrapper.vm.form.name = 'John Doe';
      wrapper.vm.form.salary = 50000;
      wrapper.vm.form.experience = -5;

      const isValid = wrapper.vm.validateForm();
      expect(isValid).toBe(false);
      expect(wrapper.vm.errors.experience).toBeDefined();
      expect(wrapper.vm.errors.experience).toBe('Experience cannot be negative');
    });

    it('should pass validation when all fields are valid', () => {
      wrapper.vm.form.name = 'John Doe';
      wrapper.vm.form.salary = 50000;
      wrapper.vm.form.experience = 5;

      const isValid = wrapper.vm.validateForm();
      expect(isValid).toBe(true);
      expect(Object.keys(wrapper.vm.errors).length).toBe(0);
    });

    it('should capture multiple validation errors', () => {
      wrapper.vm.form.name = '';
      wrapper.vm.form.salary = -1000;
      wrapper.vm.form.experience = -2;

      const isValid = wrapper.vm.validateForm();
      expect(isValid).toBe(false);
      expect(wrapper.vm.errors.name).toBeDefined();
      expect(wrapper.vm.errors.salary).toBeDefined();
      expect(wrapper.vm.errors.experience).toBeDefined();
      expect(Object.keys(wrapper.vm.errors).length).toBe(3);
    });
  });

  // ========================================
  // SECTION 4: COMPUTED PROPERTIES TESTS
  // ========================================
  describe('Computed Properties Tests', () => {
    let wrapper;

    beforeEach(async () => {
      employeeService.getEmployees.mockResolvedValue({ data: mockEmployees });
      wrapper = mount(EmployeeManagement);
      await flushPromises();
    });

    it('should calculate total employees count correctly', () => {
      expect(wrapper.vm.totalEmployees).toBe(4);
    });

    it('should update totalEmployees when employees array changes', () => {
      expect(wrapper.vm.totalEmployees).toBe(4);
      
      wrapper.vm.employees.push({
        id: 5, name: 'New Employee', department: 'Engineering',
        salary: 55000, experience: 2, status: 'Active'
      });
      
      expect(wrapper.vm.totalEmployees).toBe(5);
    });

    it('should return all employees when no filters are applied', () => {
      wrapper.vm.searchQuery = '';
      wrapper.vm.selectedDepartment = '';
      wrapper.vm.selectedStatus = '';
      wrapper.vm.sortBy = '';

      expect(wrapper.vm.filteredEmployees.length).toBe(4);
      expect(wrapper.vm.filteredEmployees).toEqual(mockEmployees);
    });

    it('should filter employees by search query', () => {
      wrapper.vm.searchQuery = 'john';
      expect(wrapper.vm.filteredEmployees.length).toBe(2);
      expect(wrapper.vm.filteredEmployees[0].name).toContain('John');
    });

    it('should return empty array when search query matches nothing', () => {
      wrapper.vm.searchQuery = 'NonExistentName123';
      expect(wrapper.vm.filteredEmployees.length).toBe(0);
    });

    it('should filter employees by department', () => {
      wrapper.vm.selectedDepartment = 'Engineering';
      expect(wrapper.vm.filteredEmployees.length).toBe(2);
      wrapper.vm.filteredEmployees.forEach(emp => {
        expect(emp.department).toBe('Engineering');
      });
    });

    it('should filter employees by Active status', () => {
      wrapper.vm.selectedStatus = 'Active';
      expect(wrapper.vm.filteredEmployees.length).toBe(3);
      wrapper.vm.filteredEmployees.forEach(emp => {
        expect(emp.status).toBe('Active');
      });
    });

    it('should filter employees by Inactive status', () => {
      wrapper.vm.selectedStatus = 'Inactive';
      expect(wrapper.vm.filteredEmployees.length).toBe(1);
      expect(wrapper.vm.filteredEmployees[0].name).toBe('Bob Johnson');
    });

    it('should sort employees by salary ascending', () => {
      wrapper.vm.sortBy = 'salary-asc';
      const sorted = wrapper.vm.filteredEmployees;

      expect(sorted[0].salary).toBe(35000);
      expect(sorted[sorted.length - 1].salary).toBe(75000);

      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].salary).toBeLessThanOrEqual(sorted[i + 1].salary);
      }
    });

    it('should sort employees by salary descending', () => {
      wrapper.vm.sortBy = 'salary-desc';
      const sorted = wrapper.vm.filteredEmployees;

      expect(sorted[0].salary).toBe(75000);
      expect(sorted[sorted.length - 1].salary).toBe(35000);

      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].salary).toBeGreaterThanOrEqual(sorted[i + 1].salary);
      }
    });

    it('should sort employees by name alphabetically', () => {
      wrapper.vm.sortBy = 'name';
      const sorted = wrapper.vm.filteredEmployees;

      expect(sorted[0].name).toBe('Alice Williams');
      expect(sorted[1].name).toBe('Bob Johnson');

      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].name.localeCompare(sorted[i + 1].name)).toBeLessThanOrEqual(0);
      }
    });

    it('should return unique departments in sorted order', () => {
      const depts = wrapper.vm.departments;
      expect(depts.length).toBe(4);
      expect(depts).toContain('Engineering');
      expect(depts).toContain('Marketing');
      
      const sorted = [...depts].sort();
      expect(depts).toEqual(sorted);
    });
  });

  // ========================================
  // SECTION 5: API CALL TESTS
  // ========================================
  describe('API Call Tests', () => {
    let wrapper;

    beforeEach(() => {
      jest.clearAllMocks();
      employeeService.getEmployees.mockResolvedValue({ data: mockEmployees });
      wrapper = mount(EmployeeManagement);
    });

    it('should call employeeService.getEmployees on loadEmployees', async () => {
      await flushPromises();
      expect(employeeService.getEmployees).toHaveBeenCalled();
      expect(wrapper.vm.employees).toEqual(mockEmployees);
    });

    it('should handle GET error gracefully', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
      employeeService.getEmployees.mockRejectedValue(new Error('Network error'));
      
      const failWrapper = mount(EmployeeManagement);
      await flushPromises();
      
      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(failWrapper.vm.employees.length).toBe(0);
      consoleErrorSpy.mockRestore();
    });

    it('should POST new employee data and reload employees', async () => {
      await flushPromises();

      const newEmployee = {
        name: 'New Employee', department: 'Engineering',
        salary: 55000, experience: 2, status: 'Active'
      };

      employeeService.createEmployee.mockResolvedValue({
        data: { id: 5, ...newEmployee }
      });

      wrapper.vm.form = newEmployee;
      await wrapper.vm.saveEmployee();
      await flushPromises();

      expect(employeeService.createEmployee).toHaveBeenCalled();
      expect(employeeService.createEmployee).toHaveBeenCalledWith(newEmployee);
    });

    it('should handle POST error when creating employee', async () => {
      await flushPromises();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      employeeService.createEmployee.mockRejectedValue(new Error('Failed to create'));

      wrapper.vm.form = {
        name: 'New Employee', department: 'Engineering',
        salary: 55000, experience: 2, status: 'Active'
      };

      await wrapper.vm.saveEmployee();
      await flushPromises();

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it('should PUT updated employee data and reload employees', async () => {
      await flushPromises();

      const updatedEmployee = {
        name: 'Updated Name', department: 'Engineering',
        salary: 60000, experience: 3, status: 'Active'
      };

      employeeService.updateEmployee.mockResolvedValue({
        data: { id: 1, ...updatedEmployee }
      });

      wrapper.vm.editingEmployeeId = 1;
      wrapper.vm.form = updatedEmployee;

      await wrapper.vm.saveEmployee();
      await flushPromises();

      expect(employeeService.updateEmployee).toHaveBeenCalled();
      expect(employeeService.updateEmployee).toHaveBeenCalledWith(1, updatedEmployee);
    });

    it('should handle PUT error when updating employee', async () => {
      await flushPromises();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      employeeService.updateEmployee.mockRejectedValue(new Error('Failed to update'));

      wrapper.vm.editingEmployeeId = 1;
      wrapper.vm.form = {
        name: 'Updated Name', department: 'Engineering',
        salary: 60000, experience: 3, status: 'Active'
      };

      await wrapper.vm.saveEmployee();
      await flushPromises();

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it('should DELETE employee and reload employees list', async () => {
      await flushPromises();

      global.confirm = jest.fn(() => true);
      employeeService.deleteEmployee.mockResolvedValue({ data: {} });

      await wrapper.vm.deleteEmployee(1);
      await flushPromises();

      expect(employeeService.deleteEmployee).toHaveBeenCalledWith(1);
    });

    it('should NOT delete employee if user cancels confirmation', async () => {
      await flushPromises();

      global.confirm = jest.fn(() => false);

      await wrapper.vm.deleteEmployee(1);

      expect(employeeService.deleteEmployee).not.toHaveBeenCalled();
    });

    it('should handle DELETE error when deleting employee', async () => {
      await flushPromises();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      global.confirm = jest.fn(() => true);
      employeeService.deleteEmployee.mockRejectedValue(new Error('Failed to delete'));

      await wrapper.vm.deleteEmployee(1);
      await flushPromises();

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });
  });

  // ========================================
  // SECTION 6: DOM TESTING
  // ========================================
  describe('DOM Testing', () => {
    let wrapper;

    beforeEach(async () => {
      employeeService.getEmployees.mockResolvedValue({ data: mockEmployees });
      wrapper = mount(EmployeeManagement);
      await flushPromises();
    });

    it('should render the main heading', () => {
      const heading = wrapper.find('h1');
      expect(heading.exists()).toBe(true);
      expect(heading.text()).toBe('Employee Management System');
    });

    it('should display total employees count', () => {
      const totalEmpParagraph = wrapper.find('.total-employees');
      expect(totalEmpParagraph.exists()).toBe(true);
      expect(totalEmpParagraph.text()).toContain('Total Employees: 4');
    });

    it('should render search input and allow typing', async () => {
      const searchInput = wrapper.find('.search-input');
      expect(searchInput.exists()).toBe(true);
      expect(searchInput.attributes('placeholder')).toContain('Search');

      await searchInput.setValue('John');
      expect(wrapper.vm.searchQuery).toBe('John');
    });

    it('should render employee table with correct headers', () => {
      const table = wrapper.find('.employees-table');
      expect(table.exists()).toBe(true);

      const headers = table.findAll('th');
      expect(headers.length).toBeGreaterThan(0);

      const headerTexts = headers.map(h => h.text());
      expect(headerTexts).toContain('Name');
      expect(headerTexts).toContain('Salary');
      expect(headerTexts).toContain('Department');
    });

    it('should render table rows for each employee', () => {
      const rows = wrapper.findAll('tbody tr');
      expect(rows.length).toBe(mockEmployees.length);
      
      const firstRowText = rows[0].text();
      expect(firstRowText).toContain('John Doe');
    });

    it('should populate form when Edit button is clicked', async () => {
      const editButtons = wrapper.findAll('.btn-edit');
      expect(editButtons.length).toBeGreaterThan(0);

      const startEditSpy = jest.spyOn(wrapper.vm, 'startEdit');
      await editButtons[0].trigger('click');

      expect(startEditSpy).toHaveBeenCalled();
      startEditSpy.mockRestore();
    });

    it('should call deleteEmployee when Delete button is clicked', async () => {
      const deleteButtons = wrapper.findAll('.btn-delete');
      expect(deleteButtons.length).toBeGreaterThan(0);

      global.confirm = jest.fn(() => true);
      employeeService.deleteEmployee.mockResolvedValue({ data: {} });

      await deleteButtons[0].trigger('click');
      await flushPromises();

      expect(employeeService.deleteEmployee).toHaveBeenCalled();
    });

    it('should display validation error message for empty name', async () => {
      wrapper.vm.form.name = '';
      wrapper.vm.form.salary = 50000;

      wrapper.vm.validateForm();
      await wrapper.vm.$nextTick();

      const errorSpans = wrapper.findAll('.error');
      expect(errorSpans.length).toBeGreaterThan(0);

      const errorText = wrapper.find('.error').text();
      expect(errorText).toContain('Name is required');
    });

    it('should clear all filters when Reset Filters button is clicked', async () => {
      wrapper.vm.searchQuery = 'John';
      wrapper.vm.selectedDepartment = 'Engineering';
      wrapper.vm.selectedStatus = 'Active';

      const resetButton = wrapper.find('.btn-reset');
      await resetButton.trigger('click');

      expect(wrapper.vm.searchQuery).toBe('');
      expect(wrapper.vm.selectedDepartment).toBe('');
      expect(wrapper.vm.selectedStatus).toBe('');
    });

    it('should display "No employees found" when no results match filter', async () => {
      wrapper.vm.searchQuery = 'NonExistentEmployee123';
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.filteredEmployees.length).toBe(0);

      const noDataDiv = wrapper.find('.no-data');
      expect(noDataDiv.exists()).toBe(true);
      expect(noDataDiv.text()).toContain('No employees found');
    });
  });

  // ========================================
  // SECTION 7: SPY TESTING
  // ========================================
  describe('Spy Testing', () => {
    let wrapper;

    beforeEach(async () => {
      jest.clearAllMocks();
      employeeService.getEmployees.mockResolvedValue({ data: mockEmployees });
      wrapper = mount(EmployeeManagement);
      await flushPromises();
    });

    it('should call validateForm before saving employee', async () => {
      const validateSpy = jest.spyOn(wrapper.vm, 'validateForm');

      wrapper.vm.form.name = 'John Doe';
      wrapper.vm.form.salary = 50000;
      wrapper.vm.form.experience = 2;

      employeeService.createEmployee.mockResolvedValue({
        data: { id: 5, ...wrapper.vm.form }
      });

      await wrapper.vm.saveEmployee();

      expect(validateSpy).toHaveBeenCalled();
      expect(validateSpy).toHaveBeenCalledTimes(1);

      validateSpy.mockRestore();
    });

    it('should call resetForm and clear form data', () => {
      wrapper.vm.form.name = 'John Doe';
      wrapper.vm.form.salary = 50000;
      wrapper.vm.editingEmployeeId = 1;

      const resetSpy = jest.spyOn(wrapper.vm, 'resetForm');

      wrapper.vm.resetForm();

      expect(resetSpy).toHaveBeenCalled();
      expect(wrapper.vm.form.name).toBe('');
      expect(wrapper.vm.form.salary).toBeNull();
      expect(wrapper.vm.editingEmployeeId).toBeNull();

      resetSpy.mockRestore();
    });

    it('should call startEdit with employee object and populate form', () => {
      const employeeToEdit = mockEmployees[0];
      const startEditSpy = jest.spyOn(wrapper.vm, 'startEdit');

      wrapper.vm.startEdit(employeeToEdit);

      expect(startEditSpy).toHaveBeenCalled();
      expect(startEditSpy).toHaveBeenCalledTimes(1);
      expect(startEditSpy).toHaveBeenCalledWith(employeeToEdit);

      expect(wrapper.vm.form.name).toBe(employeeToEdit.name);
      expect(wrapper.vm.form.salary).toBe(employeeToEdit.salary);
      expect(wrapper.vm.editingEmployeeId).toBe(employeeToEdit.id);

      startEditSpy.mockRestore();
    });

    it('should call cancelEdit which resets form', () => {
      wrapper.vm.editingEmployeeId = 1;
      wrapper.vm.form.name = 'John Doe';

      const cancelSpy = jest.spyOn(wrapper.vm, 'cancelEdit');

      wrapper.vm.cancelEdit();

      expect(cancelSpy).toHaveBeenCalled();
      expect(wrapper.vm.form.name).toBe('');
      expect(wrapper.vm.editingEmployeeId).toBeNull();

      cancelSpy.mockRestore();
    });

    it('should call applySorting when filteredEmployees is accessed', () => {
      const sortingSpy = jest.spyOn(wrapper.vm, 'applySorting');

      wrapper.vm.sortBy = 'salary-asc';
      const filtered = wrapper.vm.filteredEmployees;

      expect(sortingSpy).toHaveBeenCalled();
      expect(filtered.length).toBeGreaterThan(0);

      sortingSpy.mockRestore();
    });

    it('should call resetFilters and clear all filters', () => {
      wrapper.vm.searchQuery = 'John';
      wrapper.vm.selectedDepartment = 'Engineering';

      const filterResetSpy = jest.spyOn(wrapper.vm, 'resetFilters');

      wrapper.vm.resetFilters();

      expect(filterResetSpy).toHaveBeenCalled();
      expect(wrapper.vm.searchQuery).toBe('');
      expect(wrapper.vm.selectedDepartment).toBe('');

      filterResetSpy.mockRestore();
    });

    it('should format currency correctly', () => {
      const formatSpy = jest.spyOn(wrapper.vm, 'formatCurrency');

      const formatted = wrapper.vm.formatCurrency(50000);

      expect(formatSpy).toHaveBeenCalled();
      expect(typeof formatted).toBe('string');
      expect(formatted).toContain('50');

      formatSpy.mockRestore();
    });
  });
});
