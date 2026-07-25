# Jest Test Execution Flow Diagram

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│ npm run test                                                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ package.json: "test": "jest --run"                                  │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ jest.config.js - Jest Configuration                                 │
│ ├─ testEnvironment: 'jsdom'                                         │
│ ├─ transform: vue3-jest                                             │
│ ├─ testMatch: **/__tests__/**/*.spec.js                             │
│ └─ setupFilesAfterEnv: jest.setup.js                                │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ jest.setup.js - Global Setup                                        │
│ └─ Mock global.confirm()                                            │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Find Test Files                                                     │
│ └─ src/components/__tests__/EmployeeManagement.spec.js              │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ babel.config.js - Transpile ES Modules                              │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Load Test File                                                      │
│ ├─ jest.mock('employeeService')                                     │
│ ├─ import { mount, flushPromises }                                  │
│ └─ import EmployeeManagement                                        │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│ describe('EmployeeManagement Component')                            │
│ └─ Create test suite container                                      │
└────────────────────────────┬────────────────────────────────────────┘
                             │
        ┌────────┬──────────┬────────┬─────────┬─────────┬─────────┬──────────┐
        │        │          │        │         │         │         │          │
        ▼        ▼          ▼        ▼         ▼         ▼         ▼          ▼
    ┌────┐  ┌────────┐  ┌────────┐ ┌──────┐┌──────┐┌──────┐┌──────┐┌──────┐
    │ S1 │  │ S2     │  │ S3     │ │ S4   ││ S5   ││ S6   ││ S7   │
    │Ini │  │Bonus  │  │Validat│ │Compu││API  ││DOM  ││Spy  │
    └─┬──┘  └───┬────┘  └───┬───┘ └──┬──┘└──┬──┘└──┬──┘└──┬──┘
      │         │            │       │      │      │      │
      ▼         ▼            ▼       ▼      ▼      ▼      ▼
   ┌──────┐  ┌──────┐    ┌──────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
   │it 1  │  │it 1  │    │it 1  │ │it 1││it 1││it 1││it 1│
   └──────┘  └──────┘    └──────┘ └────┘ └────┘ └────┘ └────┘
   ┌──────┐  ┌──────┐    ┌──────┐ ┌────┐ ┌────┐ ┌────┐ ┌────┐
   │it 2  │  │it 2  │    │it 2  │ │it 2││it 2││it 2││it 2│
   └──────┘  └──────┘    └──────┘ └────┘ └────┘ └────┘ └────┘
   ┌──────┐  ┌──────┐    ┌──────┐ │... │ │... │ │... │ │... │
   │it 3  │  │it 3  │    │it 3  │ │    │ │    │ │    │ │    │
   └──────┘  └──────┘    └──────┘ └────┘ └────┘ └────┘ └────┘
   ┌──────┐  ┌──────┐    │...  │
   │it 4  │  │it 4  │    │     │
   └──────┘  └──────┘    └─────┘
   ┌──────┐  ┌──────┐
   │it 5  │  │it 5  │
   └──────┘  └──────┘

       ▼       ▼      ▼       ▼      ▼      ▼      ▼
      Each test executes:
      
      ┌────────────────────────────────────┐
      │ 1. beforeEach()                    │
      │    └─ jest.clearAllMocks()         │
      │                                    │
      │ 2. Mount Component                 │
      │    └─ wrapper = mount(Component)   │
      │                                    │
      │ 3. Mock API Data                   │
      │    └─ mockResolvedValue()          │
      │                                    │
      │ 4. Test Logic                      │
      │    ├─ wrapper.vm.method()          │
      │    ├─ wrapper.find()               │
      │    ├─ await flushPromises()        │
      │    └─ expect().toBe() ✓ or ✗       │
      │                                    │
      │ 5. afterEach()                     │
      │    └─ jest.clearAllMocks()         │
      └────────────────────────────────────┘

           ▼            ▼           ▼
    ┌──────────────────────────────────────┐
    │ Test Result for Each Test Case       │
    ├──────────────────────────────────────┤
    │ ✓ Test Passed (expect matched)       │
    │ or                                   │
    │ ✗ Test Failed (expect not matched)   │
    └──────────────────────────────────────┘

              ▼

    ┌──────────────────────────────────────┐
    │ Collect All Results                  │
    │ ├─ Total Tests Run: 90+              │
    │ ├─ Passed: XX                        │
    │ ├─ Failed: XX                        │
    │ ├─ Skipped: XX                       │
    │ └─ Execution Time: X.XXs              │
    └──────────────────────────────────────┘

              ▼

    ┌──────────────────────────────────────┐
    │ Display Test Report                  │
    ├──────────────────────────────────────┤
    │ PASS/FAIL                            │
    │ EmployeeManagement.spec.js           │
    │ ├─ Section 1: N passed               │
    │ ├─ Section 2: N passed               │
    │ ├─ Section 3: N passed               │
    │ ├─ Section 4: N passed               │
    │ ├─ Section 5: N passed               │
    │ ├─ Section 6: N passed               │
    │ └─ Section 7: N passed               │
    │                                      │
    │ Tests: XX passed, XX total           │
    │ Snapshots: 0 total                   │
    │ Time: X.XXs                          │
    └──────────────────────────────────────┘

              ▼

    ┌──────────────────────────────────────┐
    │ Exit with Code                       │
    ├──────────────────────────────────────┤
    │ Code 0: All tests passed ✓           │
    │ Code 1: Some tests failed ✗          │
    └──────────────────────────────────────┘
```

---

## Detailed Explanation of Each Step

### 1. Command Execution
```
npm run test
```
- User runs the test command in terminal
- npm reads package.json scripts section
- Executes the "test" script

### 2. Script Invocation
```
package.json: "test": "jest --run"
```
- npm executes Jest test runner
- `--run` flag tells Jest to run tests once (not watch mode)
- Jest loads and starts execution

### 3. Jest Configuration
```
jest.config.js - Jest Configuration
├─ testEnvironment: 'jsdom'
│  └─ Creates browser-like environment for DOM testing
│
├─ transform: vue3-jest
│  └─ Tells Jest how to compile .vue files
│
├─ testMatch: **/__tests__/**/*.spec.js
│  └─ Pattern to find test files
│
└─ setupFilesAfterEnv: jest.setup.js
   └─ Global setup file to run before tests
```

**What happens:**
- Jest reads jest.config.js
- Sets up jsdom environment (simulates browser)
- Configures Vue file transformation
- Identifies where test files are located

### 4. Global Setup
```
jest.setup.js - Global Setup
└─ Mock global.confirm()
```

**What happens:**
- jest.setup.js runs before any tests
- Global mocks are set up (like window.confirm)
- Global configurations applied to all tests

### 5. Test File Discovery
```
Find Test Files
└─ src/components/__tests__/EmployeeManagement.spec.js
```

**What happens:**
- Jest scans project using testMatch pattern
- Finds all `.spec.js` files in `__tests__` folders
- Identifies EmployeeManagement.spec.js as test file

### 6. Babel Transpilation
```
babel.config.js - Transpile ES Modules
```

**What happens:**
- Babel transpiles ES6+ syntax to ES5
- Allows use of modern JavaScript in tests
- Converts import/export statements

### 7. Test File Loading
```
Load Test File
├─ jest.mock('employeeService')
│  └─ Mocks API calls (no real network requests)
│
├─ import { mount, flushPromises }
│  └─ Vue Test Utils utilities for component testing
│
└─ import EmployeeManagement
   └─ Imports the component being tested
```

**What happens:**
- Jest reads EmployeeManagement.spec.js
- Executes jest.mock() to replace real API with mock
- Imports necessary testing libraries
- Loads the Vue component

### 8. Test Suite Creation
```
describe('EmployeeManagement Component')
└─ Create test suite container
```

**What happens:**
- describe() groups all tests for this component
- Creates logical organization
- All tests inside execute sequentially

### 9. Test Sections (7 Sections)
```
S1: Initialization Tests (5 tests)
S2: Bonus Calculation Tests (5 tests)
S3: Validation Tests (8 tests)
S4: Computed Properties Tests (13 tests)
S5: API Call Tests (10 tests)
S6: DOM Testing Tests (13 tests)
S7: Spy Testing Tests (10 tests)
```

**What happens:**
- Each section groups related tests
- Tests in each section execute sequentially
- Sections are independent

### 10. Individual Test Execution

For **each test** (it() block):

```
Step 1: beforeEach()
└─ jest.clearAllMocks()
   └─ Reset all mocks to clean state
   └─ Ensures test isolation

Step 2: Mount Component
└─ wrapper = mount(EmployeeManagement)
   └─ Creates instance of Vue component
   └─ Component runs its mounted() hook

Step 3: Mock API Data
└─ employeeService.getEmployees.mockResolvedValue({ data: mockEmployees })
   └─ Replaces real API call with mock response
   └─ Allows testing without network

Step 4: Test Logic
├─ wrapper.vm.method()
│  └─ Call component methods to test
│
├─ wrapper.find('.selector')
│  └─ Query DOM elements
│
├─ await flushPromises()
│  └─ Wait for async operations (API calls)
│  └─ Wait for Vue to update DOM
│
└─ expect().toBe() 
   └─ Assert expected vs actual results
   └─ Returns ✓ (pass) or ✗ (fail)

Step 5: afterEach()
└─ jest.clearAllMocks()
   └─ Clean up mocks after test
   └─ Prevents affecting next test
```

**Example Test Execution:**

```javascript
it('should calculate 20% bonus for salary > 50000 and experience >= 5', () => {
  // beforeEach() ran ↑
  
  // Create employee object
  const employee = { salary: 60000, experience: 5 };
  
  // Call method being tested
  const bonus = wrapper.vm.calculateBonus(employee);
  
  // Assert result
  expect(bonus).toBe(12000);  // ✓ or ✗
  
  // afterEach() will run ↓
});
```

### 11. Test Results Collection
```
Collect All Results
├─ Total Tests Run: 90+
├─ Passed: XX (green ✓)
├─ Failed: XX (red ✗)
├─ Skipped: XX (yellow)
└─ Execution Time: X.XXs
```

**What happens:**
- Jest collects results from all tests
- Counts passed/failed/skipped tests
- Calculates total execution time
- Aggregates results

### 12. Display Test Report
```
Display Test Report
├─ PASS/FAIL status
├─ Test file name
├─ Each section results
├─ Total statistics
├─ Execution time
└─ Coverage summary (optional)
```

**Example Output:**
```
PASS  src/components/__tests__/EmployeeManagement.spec.js
  EmployeeManagement Component
    Initialization Tests
      ✓ should mount the component successfully (45ms)
      ✓ should initialize form data with correct default values (12ms)
      ✓ should load employees when component mounts (85ms)
      ✓ should initialize errors object as empty (8ms)
    Bonus Calculation Tests
      ✓ should calculate 20% bonus (3ms)
      ✓ should calculate 10% bonus (2ms)
      ✓ should calculate 5% bonus (2ms)
    [... more sections ...]

Test Suites: 1 passed, 1 total
Tests:       90 passed, 90 total
Snapshots:   0 total
Time:        2.8s
```

### 13. Exit with Status Code
```
Exit with Code
├─ Code 0: All tests passed ✓
│  └─ Command line returns 0 (success)
│  └─ Can be used in CI/CD pipelines
│
└─ Code 1: Some tests failed ✗
   └─ Command line returns 1 (failure)
   └─ Blocks deployment in CI/CD
```

---

## Test Execution Timeline

```
Time: 0.0s  → npm run test starts
Time: 0.1s  → Jest initializes
Time: 0.2s  → jest.setup.js runs
Time: 0.3s  → Test file discovered
Time: 0.4s  → Babel transpilation
Time: 0.5s  → Mock setup (jest.mock)
Time: 0.6s  → describe() creates suite
Time: 0.7s  → First test (S1: it 1) starts
         ├─ beforeEach()
         ├─ mount(Component)
         ├─ test logic executes
         ├─ afterEach()
         └─ PASS ✓
Time: 0.8s  → Second test (S1: it 2) starts
Time: 0.9s  → Continue through all 90+ tests...
Time: 2.7s  → Last test completes
Time: 2.8s  → Collect results
Time: 2.85s → Display report
Time: 2.9s  → Exit with code 0 (success)
```

---

## Key Concepts

### beforeEach() and afterEach()
```
beforeEach() - Runs BEFORE each test
├─ Clear mocks
├─ Reset state
└─ Set up fresh component instance

TEST RUNS HERE
↓

afterEach() - Runs AFTER each test
├─ Clean up
├─ Reset mocks
└─ Free resources
```

### Mock vs Real
```
Without Mock:
API Call → Network Request → External Server → Response

With Mock:
API Call → Mock Function → Fake Response → Instant Return
(No network, no delay, predictable)
```

### Test Isolation
```
Test 1                Test 2                Test 3
├─ beforeEach        ├─ beforeEach         ├─ beforeEach
├─ Run               ├─ Run                ├─ Run
├─ afterEach         ├─ afterEach          ├─ afterEach
└─ Clean             └─ Clean              └─ Clean

Each test is independent - doesn't affect others
```

---

## Summary Flow

1. **User** runs `npm run test`
2. **npm** executes Jest
3. **Jest** reads configuration
4. **Jest** finds test files
5. **Babel** transpiles code
6. **jest.setup.js** runs global setup
7. **Test file** loads and mocks are applied
8. **describe()** creates test suite
9. **Each test** (it()) executes:
   - beforeEach()
   - Test logic
   - afterEach()
10. **Results** collected
11. **Report** displayed
12. **Exit code** returned (0 = success, 1 = failure)
