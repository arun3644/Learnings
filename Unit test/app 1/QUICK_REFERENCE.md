# Quick Reference - Jasmine Testing Cheat Sheet

## 🚀 Quick Start

```bash
npm install              # Install dependencies
npm run test            # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
```

---

## 📝 Jasmine Basics

### describe() - Group Tests
```javascript
describe('Feature Name', () => {
  // Tests go here
});
```

### it() - Single Test
```javascript
it('should do something', () => {
  expect(actual).toBe(expected);
});
```

### beforeEach() - Setup Before Each Test
```javascript
beforeEach(() => {
  wrapper = mount(Component);
});
```

### afterEach() - Cleanup After Each Test
```javascript
afterEach(() => {
  jest.clearAllMocks();
});
```

---

## ✔️ Common Assertions (expect)

### Equality
```javascript
expect(5).toBe(5);                          // Strict equality
expect({ a: 1 }).toEqual({ a: 1 });        // Deep equality
expect(value).not.toBe(5);                  // Not equal
```

### Truthiness
```javascript
expect(value).toBeTruthy();                 // Truthy value
expect(value).toBeFalsy();                  // Falsy value
expect(value).toBeDefined();                // Not undefined
expect(value).toBeUndefined();              // Is undefined
expect(value).toBeNull();                   // Is null
```

### Comparisons
```javascript
expect(5).toBeGreaterThan(3);               // >
expect(5).toBeLessThan(10);                 // <
expect(5).toBeGreaterThanOrEqual(5);        // >=
expect(5).toBeLessThanOrEqual(5);           // <=
expect(value).toBeCloseTo(4.1, 1);          // Approximately equal
```

### Strings
```javascript
expect('hello').toMatch(/ll/);              // Regex match
expect('hello').toContain('ell');           // Contains substring
```

### Arrays & Objects
```javascript
expect([1, 2, 3]).toContain(2);             // Contains item
expect({ a: 1 }).toHaveProperty('a');      // Has property
expect(obj).toMatchObject({ a: 1 });       // Matches object
expect(array).toHaveLength(3);              // Array length
```

### Functions
```javascript
expect(fn).toHaveBeenCalled();              // Was called
expect(fn).toHaveBeenCalledTimes(2);        // Called N times
expect(fn).toHaveBeenCalledWith(arg);       // Called with arg
expect(fn).not.toHaveBeenCalled();          // Not called
expect(fn).toThrow();                       // Throws error
```

---

## 🔄 Vue Test Utils Basics

### Mount Component
```javascript
import { mount } from '@vue/test-utils';
import MyComponent from './MyComponent.vue';

const wrapper = mount(MyComponent);
```

### Find Elements
```javascript
wrapper.find('.class');                     // Find single
wrapper.find('#id');                        // Find by ID
wrapper.find('div');                        // Find by tag
wrapper.findAll('.item');                   // Find all
```

### Element Methods
```javascript
element.exists();                           // Element exists
element.text();                             // Get text content
element.html();                             // Get HTML
element.attributes('href');                 // Get attribute
element.classes();                          // Get CSS classes
element.trigger('click');                   // Trigger event
element.setValue('value');                  // Set input value
```

### Component Instance
```javascript
wrapper.vm;                                 // Vue instance
wrapper.vm.data;                            // Component data
wrapper.vm.method();                        // Call method
wrapper.vm.$emit;                           // Emit event
```

### Async Testing
```javascript
import { flushPromises } from '@vue/test-utils';

await flushPromises();                      // Wait for promises
await wrapper.vm.$nextTick();               // Wait for DOM update
```

---

## 🎭 Mocking with Jest

### Mock Module
```javascript
jest.mock('./module', () => ({
  method: jest.fn()
}));
```

### Mock Function
```javascript
jest.fn();                                  // Create mock
jest.fn(() => 42);                          // Return value
jest.fn().mockResolvedValue(data);          // Resolve promise
jest.fn().mockRejectedValue(error);         // Reject promise
```

### Clear Mocks
```javascript
jest.clearAllMocks();                       // Clear all mocks
jest.resetAllMocks();                       // Reset all mocks
mock.mockClear();                           // Clear single mock
```

---

## 👁️ Spying (Verify Method Calls)

### Create Spy
```javascript
const spy = jest.spyOn(obj, 'method');      // Spy on method
const spy = jest.fn();                      // Create spy

// Use the method...

spy.mockRestore();                          // Clean up
```

### Spy Assertions
```javascript
expect(spy).toHaveBeenCalled();             // Called
expect(spy).toHaveBeenCalledTimes(2);       // Called 2x
expect(spy).toHaveBeenCalledWith(5);        // Called with 5
expect(spy).toHaveReturnedWith(result);     // Returned value
```

---

## 🧪 Testing Patterns

### Test a Method
```javascript
it('should calculate correctly', () => {
  const result = wrapper.vm.calculate(5);
  expect(result).toBe(10);
});
```

### Test Computed Property
```javascript
it('should compute filtered list', () => {
  wrapper.vm.searchQuery = 'john';
  expect(wrapper.vm.filtered.length).toBe(1);
});
```

### Test Form Validation
```javascript
it('should validate email', () => {
  wrapper.vm.form.email = 'invalid';
  const valid = wrapper.vm.validateForm();
  expect(valid).toBe(false);
  expect(wrapper.vm.errors.email).toBeDefined();
});
```

### Test API Call
```javascript
it('should fetch data', async () => {
  mockService.getData.mockResolvedValue({ data: [] });
  const wrapper = mount(Component);
  await flushPromises();
  expect(mockService.getData).toHaveBeenCalled();
});
```

### Test Event Handling
```javascript
it('should handle click', async () => {
  const button = wrapper.find('button');
  await button.trigger('click');
  expect(wrapper.vm.count).toBe(1);
});
```

### Test DOM Rendering
```javascript
it('should render error message', async () => {
  wrapper.vm.error = 'Something went wrong';
  await wrapper.vm.$nextTick();
  expect(wrapper.find('.error').exists()).toBe(true);
});
```

---

## 📊 Test File Structure

```javascript
describe('ComponentName', () => {
  let wrapper;

  beforeEach(() => {
    // Setup
    wrapper = mount(Component);
  });

  afterEach(() => {
    // Cleanup
    jest.clearAllMocks();
  });

  describe('Feature 1', () => {
    it('should do X', () => { });
    it('should do Y', () => { });
  });

  describe('Feature 2', () => {
    it('should do Z', () => { });
  });
});
```

---

## 🐛 Debugging

### Log in Tests
```javascript
console.log(wrapper.vm.data);               // Log data
console.log(wrapper.html());                // Log HTML
console.log(spy.mock.calls);                // Log spy calls
```

### Run Single Test
```bash
npm run test -- --testNamePattern="test name"
```

### Use Only (Skip Others)
```javascript
it.only('should test this', () => {});      // Only this runs
```

### Skip Test
```javascript
it.skip('should skip this', () => {});      // This skipped
```

### Debug in VS Code
```json
{
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand"]
}
```

---

## 📈 Coverage

```bash
npm run test:coverage                       # Generate report
```

**Coverage targets:**
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

---

## ⚡ Pro Tips

### 1. Use Meaningful Names
```javascript
// ✅ Good
it('should show error when email is invalid')

// ❌ Bad
it('email test')
```

### 2. AAA Pattern (Arrange-Act-Assert)
```javascript
it('should calculate correctly', () => {
  // Arrange
  const input = 5;
  
  // Act
  const result = calculate(input);
  
  // Assert
  expect(result).toBe(10);
});
```

### 3. Mock External Dependencies
```javascript
// ✅ Good - Mock API
jest.mock('./api');

// ❌ Bad - Make real calls
// fetch('/api/data')
```

### 4. Test Behavior, Not Implementation
```javascript
// ✅ Good - Test what user sees
expect(wrapper.find('.error').exists()).toBe(true);

// ❌ Bad - Test internal details
expect(wrapper.vm._internalError).toBe(true);
```

### 5. Keep Tests Isolated
```javascript
// ✅ Good - Each test independent
beforeEach(() => {
  wrapper = mount(Component);
});

// ❌ Bad - Tests depend on order
// shared state modified by tests
```

---

## 🔗 Test Suite Files

- **EmployeeManagement.spec.js** - 90+ test cases
- **TEST_GUIDE.md** - Detailed explanations
- **TESTING_SETUP.md** - Setup instructions
- **TEST_SUMMARY.md** - High-level overview
- **QUICK_REFERENCE.md** - This file

---

## 📞 Common Issues

### Cannot find module
```bash
npm install
```

### Tests timeout
```javascript
// In jest.config.js
testTimeout: 20000  // 20 seconds
```

### Mock not working
```javascript
// Ensure jest.mock() is at top of file
jest.mock('./module');
```

### Component not updating
```javascript
// Wait for update
await wrapper.vm.$nextTick();
await flushPromises();
```

---

## ✅ Verification Checklist

- [ ] npm install successful
- [ ] Dependencies installed
- [ ] Tests run: `npm run test`
- [ ] All 90+ tests pass
- [ ] Can run specific tests
- [ ] Watch mode works
- [ ] Coverage report works
- [ ] Tests are readable
- [ ] Understand test structure
- [ ] Ready to write tests

---

**Last Updated:** July 2026
**Tests:** 90+ ✅
**Status:** Production Ready 🚀
