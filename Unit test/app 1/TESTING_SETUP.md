# Setting Up and Running Tests

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

This installs all required testing libraries:
- `jest` - Test runner
- `@vue/test-utils` - Vue component testing
- `jasmine-core` - Jasmine framework
- `@vue/vue3-jest` - Vue 3 compiler for Jest
- `babel-jest` - JavaScript transpiler
- And more...

### 2. Run Tests

**Run all tests once:**
```bash
npm run test
```

**Run tests in watch mode (best for development):**
```bash
npm run test:watch
```

**Run tests with coverage report:**
```bash
npm run test:coverage
```

**Run a specific test file:**
```bash
npm run test -- EmployeeManagement.spec.js
```

**Run tests matching a pattern:**
```bash
npm run test -- --testNamePattern="should calculate bonus"
```

---

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── EmployeeManagement.vue          # Main component
│   │   └── __tests__/
│   │       └── EmployeeManagement.spec.js  # Test file (YOU ARE HERE)
│   ├── services/
│   │   └── employeeService.js              # API service
│   └── main.js
├── jest.config.js                          # Jest configuration
├── jest.setup.js                           # Test environment setup
├── babel.config.js                         # Babel configuration
├── package.json                            # Dependencies and scripts
├── TEST_GUIDE.md                           # Comprehensive test guide
└── TESTING_SETUP.md                        # This file
```

---

## Test File Overview

**Location:** `src/components/__tests__/EmployeeManagement.spec.js`

**Test Statistics:**
- 90+ individual test cases
- 7 major test sections
- 200+ lines of test code
- 500+ lines of detailed comments

**Test Sections:**
1. **Initialization Tests** (5 tests)
   - Component mounting
   - Initial data values
   - API loading on mount

2. **Method Tests - Bonus Calculation** (5 tests)
   - 20% bonus calculation
   - 10% bonus calculation
   - 5% bonus calculation
   - Edge cases

3. **Validation Tests** (8 tests)
   - Empty name validation
   - Negative salary validation
   - Negative experience validation
   - Multiple error handling

4. **Computed Properties Tests** (13 tests)
   - Total employee count
   - Search filtering
   - Department filtering
   - Status filtering
   - Salary sorting
   - Name sorting
   - Multiple filters

5. **API Call Tests** (10 tests)
   - GET success/failure
   - POST success/failure
   - PUT success/failure
   - DELETE success/failure
   - Complete CRUD workflow

6. **DOM Testing** (13 tests)
   - DOM element rendering
   - User interactions
   - Form submissions
   - Button clicks
   - Error display

7. **Spy Testing** (10 tests)
   - Method call verification
   - Argument checking
   - Call counting
   - Method order verification

---

## Understanding Test Output

### Successful Test Run
```
PASS  src/components/__tests__/EmployeeManagement.spec.js
  EmployeeManagement Component
    Initialization Tests
      ✓ should mount the component successfully (45ms)
      ✓ should initialize form data with correct default values (12ms)
      ✓ should load employees when component mounts (85ms)
    ✅ 90 passed (2.5s)
```

### Failed Test Run
```
FAIL  src/components/__tests__/EmployeeManagement.spec.js
  EmployeeManagement Component
    Validation Tests
      ✕ should fail validation when name is empty
        Expected: false
        Received: true
  ❌ 1 failed, 89 passed (2.8s)
```

---

## Test Debugging

### View Single Test Results
```bash
npm run test -- --testNamePattern="bonus"
```

### Run Single Test File
```bash
npm run test -- EmployeeManagement.spec.js
```

### Run With Verbose Output
```bash
npm run test -- --verbose
```

### Debug in VS Code

Add this to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand"],
  "console": "integratedTerminal"
}
```

Then press F5 to debug.

---

## Key Test Concepts Explained

### What Each Test Does

**Initialization Tests:**
- Verify component loads without errors
- Check default values are set correctly
- Confirm API is called on mount

**Calculation Tests:**
- Test business logic (bonus calculation)
- Verify math is correct
- Handle edge cases

**Validation Tests:**
- Prevent invalid data entry
- Show error messages
- Catch multiple errors

**Computed Properties:**
- Test reactive data filtering
- Verify sorting works
- Check search functionality

**API Tests:**
- Mock network requests
- Test success scenarios
- Test error handling
- Verify correct methods called

**DOM Tests:**
- Ensure UI renders correctly
- Test user interactions
- Verify events trigger
- Check error display

**Spy Tests:**
- Track method calls
- Verify correct arguments
- Check call count
- Ensure proper call order

---

## Common Issues and Solutions

### Issue: "Cannot find module '@vue/test-utils'"
**Solution:**
```bash
npm install @vue/test-utils
```

### Issue: "jest is not recognized"
**Solution:**
```bash
npm install
# or
npm run test
```

### Issue: "Tests timeout"
**Solution:**
- Increase timeout in jest.config.js:
```javascript
testTimeout: 20000  // 20 seconds
```

### Issue: "Cannot mock axios"
**Solution:**
- Ensure jest.mock() is at the top of the file:
```javascript
jest.mock('../../services/employeeService');
```

---

## Viewing Test Coverage

```bash
npm run test:coverage
```

This generates a `coverage` folder with:
- `index.html` - Visual coverage report
- Coverage statistics by file
- Line-by-line coverage indicator

**Coverage Goals:**
- Statements: > 80%
- Branches: > 75%
- Functions: > 80%
- Lines: > 80%

---

## Writing New Tests

### Template for New Test

```javascript
describe('Feature Name', () => {
  let wrapper;

  beforeEach(() => {
    // Setup
    wrapper = mount(Component);
  });

  afterEach(() => {
    // Cleanup
    jest.clearAllMocks();
  });

  it('should do something', () => {
    // Arrange
    const input = 'test';

    // Act
    wrapper.vm.method(input);

    // Assert
    expect(wrapper.vm.result).toBe('expected');
  });
});
```

### Assertion Examples

```javascript
// Equality
expect(value).toBe(5);
expect(value).toEqual({ a: 1 });
expect(value).not.toBe(5);

// Truthiness
expect(value).toBeTruthy();
expect(value).toBeFalsy();
expect(value).toBeDefined();
expect(value).toBeNull();

// Comparisons
expect(value).toBeGreaterThan(3);
expect(value).toBeLessThan(5);
expect(value).toBeCloseTo(4.1, 1);

// Strings
expect(string).toMatch(/pattern/);
expect(string).toContain('substring');

// Arrays
expect(array).toContain(item);
expect(array).toEqual(expect.arrayContaining([1, 2]));

// Objects
expect(obj).toHaveProperty('key');
expect(obj).toMatchObject({ key: value });

// Functions
expect(func).toHaveBeenCalled();
expect(func).toHaveBeenCalledTimes(1);
expect(func).toHaveBeenCalledWith(arg);
```

---

## Performance Tips

1. **Use beforeEach for setup** - Don't repeat setup code
2. **Mock external dependencies** - Don't make real API calls
3. **Test behavior, not implementation** - Focus on what matters
4. **Keep tests isolated** - Tests shouldn't depend on each other
5. **Use specific matchers** - Makes tests more readable

---

## Next Steps

1. **Read TEST_GUIDE.md** - Deep dive into each test section
2. **Run the tests** - See them pass: `npm run test`
3. **Explore coverage** - Run: `npm run test:coverage`
4. **Modify a test** - Change an expectation and watch it fail
5. **Write new tests** - Add tests for new features

---

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Jasmine Documentation](https://jasmine.github.io/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Vue 3 Testing Guide](https://vuejs.org/guide/scaling-up/testing.html)

---

## Questions?

Refer to:
- `TEST_GUIDE.md` - Comprehensive explanation of every test
- Test file comments - Each test is thoroughly documented
- Jest output - Shows exactly what failed and why

Happy Testing! 🧪✅
