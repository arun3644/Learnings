# Employee Management Component - Comprehensive Jasmine Test Guide

## Overview

This guide explains every aspect of the Jasmine unit tests for the Employee Management Vue component. Whether you're new to testing or looking to deepen your understanding, this document breaks down each concept with detailed explanations.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Understanding Jasmine](#understanding-jasmine)
3. [Test Structure](#test-structure)
4. [Running Tests](#running-tests)
5. [Test Sections Explained](#test-sections-explained)
6. [Key Concepts](#key-concepts)

---

## Getting Started

### Prerequisites

Make sure you have the required dependencies installed:

```bash
npm install
```

The package.json includes:
- `@vue/test-utils` - Vue component testing utilities
- `jasmine-core` - Jasmine testing framework
- `jest` - Test runner (uses Jasmine under the hood)
- `@vue/vue3-jest` - Vue 3 compiler for Jest

---

## Understanding Jasmine

### What is Jasmine?

Jasmine is a JavaScript testing framework that makes it easy to write readable, maintainable tests. It uses a BDD (Behavior Driven Development) style that reads like English sentences.

### Basic Jasmine Syntax

```javascript
describe('Component Name', () => {
  // Group of tests
  
  it('should do something', () => {
    // Single test
    expect(actual).toBe(expected);
  });
});
```

---

## Test Structure

### Core Building Blocks

#### 1. `describe()` - Test Suite Container
```javascript
describe('EmployeeManagement Component', () => {
  // All tests for this component go here
});
```
- Groups related tests together
- Used to organize tests hierarchically
- Can be nested for better organization

#### 2. `it()` - Individual Test Case
```javascript
it('should mount the component successfully', () => {
  // Test code here
});
```
- Defines a single test
- The string should describe what is being tested
- Uses natural language: "should..." or "it should..."

#### 3. `expect()` - Assertion
```javascript
expect(wrapper.exists()).toBe(true);
```
- Asserts that something is true
- Multiple expects can be in one test
- If any expect fails, the test fails

#### 4. `beforeEach()` - Setup Before Each Test
```javascript
beforeEach(() => {
  jest.clearAllMocks();
  employeeService.getEmployees.mockResolvedValue({ data: mockEmployees });
  wrapper = mount(EmployeeManagement);
});
```
- Runs before EACH test in the suite
- Used for initialization and setup
- Ensures each test starts fresh

#### 5. `afterEach()` - Cleanup After Each Test
```javascript
afterEach(() => {
  jest.clearAllMocks();
});
```
- Runs after EACH test completes
- Used for cleanup
- Prevents test pollution (one test affecting another)

---

## Running Tests

### Run All Tests
```bash
npm run test
```

### Run Tests in Watch Mode (recommended during development)
```bash
npm run test -- --watch
```

### Run Specific Test File
```bash
npm run test -- EmployeeManagement.spec.js
```

### Run Tests with Coverage
```bash
npm run test -- --coverage
```

---

## Test Sections Explained

### Section 1: Initialization Tests

**Purpose**: Verify the component starts with correct initial state

**Key Tests**:
- Component mounts without errors
- Initial data values are correct
- Component loads employees on mount
- Errors object is empty initially

**Why This Matters**:
- Ensures component is properly set up
- Prevents bugs from wrong initial values
- Verifies lifecycle hooks work correctly

**Example**:
```javascript
it('should initialize form data with correct default values', () => {
  expect(wrapper.vm.form.name).toBe('');
  expect(wrapper.vm.form.salary).toBeNull();
});
```

---

### Section 2: Method Tests - Bonus Calculation

**Purpose**: Test the `calculateBonus()` method with different scenarios

**Business Logic**:
- Salary > 50,000 AND Experience >= 5 → 20% bonus
- Salary > 30,000 AND Experience >= 2 → 10% bonus
- All others → 5% bonus

**Key Tests**:
- 20% bonus calculation
- 10% bonus calculation
- 5% bonus calculation (default)
- Edge cases (exactly 50000, exactly 30000)

**Why This Matters**:
- Bonus calculation is a critical business rule
- Edge cases can cause unexpected behavior
- Ensures accuracy of financial calculations

**Example**:
```javascript
it('should calculate 20% bonus for salary > 50000 and experience >= 5', () => {
  const employee = { salary: 60000, experience: 5 };
  const bonus = wrapper.vm.calculateBonus(employee);
  expect(bonus).toBe(12000); // 20% of 60000
});
```

---

### Section 3: Validation Tests

**Purpose**: Test form validation before saving employees

**Key Tests**:
- Empty name validation
- Whitespace-only name validation
- Negative salary validation
- Zero salary validation
- Missing salary validation
- Negative experience validation
- Valid data passes validation
- Multiple errors captured together

**Why This Matters**:
- Prevents invalid data from being saved
- Ensures user gets clear error messages
- Protects database integrity

**Validation Rules**:
```javascript
// Name is required and cannot be empty
if (!this.form.name || this.form.name.trim() === '') {
  this.errors.name = 'Name is required';
}

// Salary is required and must be positive
if (this.form.salary <= 0) {
  this.errors.salary = 'Salary must be positive';
}

// Experience cannot be negative
if (this.form.experience < 0) {
  this.errors.experience = 'Experience cannot be negative';
}
```

**Example**:
```javascript
it('should fail validation when name is empty', () => {
  wrapper.vm.form.name = '';
  const isValid = wrapper.vm.validateForm();
  expect(isValid).toBe(false);
  expect(wrapper.vm.errors.name).toBe('Name is required');
});
```

---

### Section 4: Computed Properties Tests

**Purpose**: Test reactive computed properties that filter and transform data

**Key Tests**:
- Total employee count
- Filter by search query
- Filter by department
- Filter by status (Active/Inactive)
- Sort by salary (ascending and descending)
- Sort by name (alphabetically)
- Multiple filters together
- Unique departments list

**Why This Matters**:
- Computed properties are reactive and error-prone
- Filters affect what users see
- Sorting changes data presentation
- Multiple filters need to work together

**Example**:
```javascript
it('should filter employees by search query', () => {
  wrapper.vm.searchQuery = 'john';
  // Case-insensitive search
  expect(wrapper.vm.filteredEmployees.length).toBe(2); // John Doe, Bob Johnson
});
```

---

### Section 5: API Call Tests

**Purpose**: Test API interactions using mocked axios calls

**Mocking Explained**:
- Mocking prevents real network requests during testing
- Allows testing of success and failure scenarios
- Verifies correct API endpoints are called
- Verifies correct data is sent

**Key Tests**:
- GET success (loadEmployees)
- GET failure (error handling)
- POST success (create employee)
- POST failure (error handling)
- PUT success (update employee)
- PUT failure (error handling)
- DELETE success (delete employee)
- DELETE user cancels
- DELETE failure (error handling)
- Complete CRUD workflow

**Mocking Example**:
```javascript
// Mock successful API response
employeeService.getEmployees.mockResolvedValue({
  data: mockEmployees
});

// Mock failed API response
employeeService.createEmployee.mockRejectedValue(
  new Error('Failed to create')
);
```

**Why This Matters**:
- Ensures component handles API responses correctly
- Tests error handling without breaking on real errors
- Verifies correct HTTP methods are used
- Tests complete workflows

---

### Section 6: DOM Testing

**Purpose**: Test that DOM elements render correctly and user interactions work

**Key Tests**:
- Component renders headings
- Employee count displays
- Search input works
- Filter dropdowns exist
- Employee table renders
- Table headers present
- Employee rows display
- Edit button triggers edit
- Delete button triggers delete
- Validation errors display
- Form submission works
- Reset filters works
- No data message shows

**DOM Query Methods**:
```javascript
// Find single element
wrapper.find('.class-name')

// Find all matching elements
wrapper.findAll('.class-name')

// Check if element exists
element.exists()

// Get element text
element.text()

// Get element attributes
element.attributes('placeholder')

// Set input value
input.setValue('value')

// Trigger event
button.trigger('click')
```

**Why This Matters**:
- Ensures users can interact with the UI
- Verifies DOM updates when state changes
- Tests accessibility of form elements
- Ensures error messages display

---

### Section 7: Spy Testing

**Purpose**: Verify that methods are called correctly using spies

**What is a Spy?**
- Wraps a method and tracks calls
- Records arguments passed to the method
- Can verify call count
- Can replace method behavior

**Key Tests**:
- Verify validateForm is called
- Verify loadEmployees is called
- Verify resetForm is called
- Verify startEdit with correct arguments
- Verify cancelEdit is called
- Verify applySorting is called
- Verify calculateBonus is called
- Verify method call order
- Verify resetFilters is called
- Verify formatCurrency works

**Spy Example**:
```javascript
// Create a spy on a method
const spy = jest.spyOn(wrapper.vm, 'validateForm');

// Call the method
wrapper.vm.validateForm();

// Verify it was called
expect(spy).toHaveBeenCalled();

// Verify how many times
expect(spy).toHaveBeenCalledTimes(1);

// Verify arguments
expect(spy).toHaveBeenCalledWith(expectedArg);

// Clean up
spy.mockRestore();
```

**Spy Matchers**:
```javascript
expect(spy).toHaveBeenCalled();              // Called at least once
expect(spy).toHaveBeenCalledTimes(2);        // Called exactly 2 times
expect(spy).toHaveBeenCalledWith(arg);       // Called with specific argument
expect(spy).not.toHaveBeenCalled();          // Never called
```

**Why This Matters**:
- Ensures methods are called when expected
- Verifies correct arguments passed
- Tests integration between methods
- Prevents unintended method calls

---

## Key Concepts

### 1. Test Isolation

Each test should be independent:
- `beforeEach()` resets state before each test
- Tests don't affect each other
- Can run tests in any order

```javascript
beforeEach(() => {
  jest.clearAllMocks();  // Clear previous mocks
  wrapper = mount(EmployeeManagement);  // Fresh component
});
```

### 2. Mocking and Spying

**Mocking** - Replace real implementation:
```javascript
employeeService.getEmployees.mockResolvedValue({ data: mockEmployees });
```

**Spying** - Track method calls:
```javascript
const spy = jest.spyOn(wrapper.vm, 'validateForm');
```

### 3. Async Testing

Tests with APIs need to wait for promises:
```javascript
await flushPromises();  // Wait for all promises to resolve
```

### 4. Assertions

Different assertion types:
```javascript
expect(value).toBe(expected);              // Strict equality (===)
expect(value).toEqual(expected);           // Deep equality
expect(value).toContain(item);             // Array contains
expect(function).toHaveBeenCalled();       // Function was called
expect(value).toBeDefined();               // Value is not undefined
expect(value).toBeNull();                  // Value is null
expect(value).toBeGreaterThan(5);          // Comparison
```

### 5. Test Coverage

Coverage measures what code is tested:
- **Line Coverage** - How many lines are executed
- **Branch Coverage** - How many if/else branches are tested
- **Function Coverage** - How many functions are tested
- **Statement Coverage** - How many statements are executed

Run with coverage:
```bash
npm run test -- --coverage
```

---

## Best Practices

### 1. Write Clear Test Descriptions
```javascript
// Good
it('should calculate 20% bonus for high earners with 5+ years experience')

// Bad
it('bonus test')
```

### 2. One Assertion Per Test
```javascript
// Better
it('should set editingEmployeeId', () => {
  wrapper.vm.startEdit(employee);
  expect(wrapper.vm.editingEmployeeId).toBe(1);
});
```

### 3. Use beforeEach for Setup
```javascript
beforeEach(() => {
  wrapper = mount(EmployeeManagement);
});

// Avoid repetition in every test
```

### 4. Mock External Dependencies
```javascript
// Mock API calls
employeeService.getEmployees.mockResolvedValue({ data: [] });

// Don't make real API calls in tests
```

### 5. Test Behavior, Not Implementation
```javascript
// Test what user experiences
expect(wrapper.find('.error').exists()).toBe(true);

// Don't test internal details
expect(wrapper.vm.errorObject.name).toBe('...');
```

---

## Common Patterns

### Testing a Method
```javascript
it('should perform action X when method called', () => {
  // Arrange: Set up test data
  wrapper.vm.form.name = 'John';
  
  // Act: Call the method
  wrapper.vm.saveEmployee();
  
  // Assert: Verify the result
  expect(wrapper.vm.editingEmployeeId).toBeNull();
});
```

### Testing a Computed Property
```javascript
it('should compute filtered list', () => {
  wrapper.vm.searchQuery = 'john';
  expect(wrapper.vm.filteredEmployees.length).toBe(2);
});
```

### Testing API Calls
```javascript
it('should fetch data on mount', async () => {
  employeeService.getEmployees.mockResolvedValue({ data: mockEmployees });
  const wrapper = mount(EmployeeManagement);
  await flushPromises();
  expect(wrapper.vm.employees).toEqual(mockEmployees);
});
```

### Testing Form Validation
```javascript
it('should show error for invalid input', () => {
  wrapper.vm.form.name = '';
  wrapper.vm.validateForm();
  expect(wrapper.vm.errors.name).toBeDefined();
});
```

---

## Debugging Tests

### Run Single Test
```javascript
// Use .only to run just one test
it.only('should test this', () => {
  // Only this test runs
});
```

### Skip Test
```javascript
// Use .skip to skip a test
it.skip('should test this', () => {
  // This test is skipped
});
```

### Console Logging
```javascript
it('should debug', () => {
  console.log(wrapper.vm.employees);  // Logs to test output
  expect(true).toBe(true);
});
```

---

## Summary

This comprehensive test suite covers:
- ✅ Component initialization
- ✅ All methods and business logic
- ✅ Form validation
- ✅ Computed properties and filtering
- ✅ API calls and error handling
- ✅ DOM rendering and interactions
- ✅ Method verification with spies
- ✅ Edge cases and multiple scenarios

Use this test suite as a reference for testing Vue components. Every test includes detailed comments explaining what is being tested and why it matters.

Happy Testing! 🚀
