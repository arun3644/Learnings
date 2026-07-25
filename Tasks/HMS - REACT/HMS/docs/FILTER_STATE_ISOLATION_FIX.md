# Filter State Isolation Fix

## Problem

Filters were being shared between doctors and patients pages, causing cross-contamination:

### Scenario:
1. Go to Doctors page
2. Filter by Specialization = "Cardiology"
3. Switch to Patients page
4. **BUG**: Patients table shows "No data" (filtered by non-existent specialization field)
5. Go back to Doctors page
6. Clear filter
7. **BUG**: Both pages now show all data (because filter state is shared)

### Root Cause:

**FilterContext** stored a single global `selected` object:

```javascript
// OLD - Global filter state (WRONG)
const [selected, setSelected] = useState({
  specialization: ["Cardiology"],  // Applied to BOTH modules!
  yearsOfExperience: [5, 10]
});
```

When you filtered doctors, it set filters that don't exist for patients, causing no matches.

---

## Solution

### Module-Specific Filter State

Changed `FilterContext` to store filters per module:

```javascript
// NEW - Module-specific filter state (CORRECT)
const [selected, setSelected] = useState({
  doctors: {
    specialization: ["Cardiology"],
    yearsOfExperience: [5, 10]
  },
  patients: {
    gender: ["Male"],
    condition: ["Severe"]
  }
});
```

---

## Changes Made

### 1. FilterContext.jsx

**Before:**
```javascript
const [selected, setSelected] = useState({});
const values = { selected, setSelected };
```

**After:**
```javascript
const [selected, setSelected] = useState({
  doctors: {},   // Filters for doctors
  patients: {}   // Filters for patients
});

// Helper functions
const getModuleFilters = (moduleName) => {
  return selected[moduleName] || {};
};

const setModuleFilters = (moduleName, filters) => {
  setSelected(prev => ({
    ...prev,
    [moduleName]: filters
  }));
};

const values = { 
  selected,           // Keep for structure
  setSelected,        // Keep for structure
  getModuleFilters,   // NEW: Get module-specific filters
  setModuleFilters    // NEW: Set module-specific filters
};
```

---

### 2. Dropdown.jsx

**Before:**
```javascript
const { selected, setSelected } = useContext(FilterCntxObj);

const handleApply = (e) => {
  setSelected(checked);  // Sets global filters
};
```

**After:**
```javascript
import { RouteContextObj } from "../context/RouteContext";

const { activeItem } = useContext(RouteContextObj);
const currentModule = activeItem?.name || 'doctors';

const { getModuleFilters, setModuleFilters } = useContext(FilterCntxObj);
const selected = getModuleFilters(currentModule);  // Get module-specific filters

const handleApply = (e) => {
  setModuleFilters(currentModule, checked);  // Set module-specific filters
};
```

---

### 3. Table.jsx

**Before:**
```javascript
const { query, selected } = useContext(FilterCntxObj);

const filteredData = useMemo(() => {
  // Uses global selected (WRONG)
  if (selected && Object.keys(selected).length > 0) {
    result = result.filter(row => {
      return Object.entries(selected).every(...);
    });
  }
}, [data, selected, query]);
```

**After:**
```javascript
import { RouteContextObj } from "../context/RouteContext";

const { activeItem } = useContext(RouteContextObj);
const currentModule = activeItem?.name || 'doctors';

const { query, getModuleFilters } = useContext(FilterCntxObj);
const selected = getModuleFilters(currentModule);  // Get module-specific filters

const filteredData = useMemo(() => {
  // Uses module-specific selected (CORRECT)
  if (selected && Object.keys(selected).length > 0) {
    result = result.filter(row => {
      return Object.entries(selected).every(...);
    });
  }
}, [data, selected, query]);
```

---

## How It Works Now

### Filter State Structure

```javascript
{
  doctors: {
    specialization: ["Cardiology", "Neurology"],
    yearsOfExperience: [5, 10, 15]
  },
  patients: {
    gender: ["Male", "Female"],
    bloodGroup: ["A+", "O+"],
    condition: ["Severe"]
  }
}
```

### Scenario 1: Filter Doctors
1. Navigate to Doctors page (`currentModule = 'doctors'`)
2. Select Specialization = "Cardiology"
3. `setModuleFilters('doctors', {specialization: ["Cardiology"]})`
4. Filter state: `{doctors: {specialization: ["Cardiology"]}, patients: {}}`
5. **Patients filters remain empty** ✓

### Scenario 2: Switch to Patients
1. Navigate to Patients page (`currentModule = 'patients'`)
2. `getModuleFilters('patients')` returns `{}`
3. Table shows all patients (no filters applied) ✓
4. **Doctor filters still preserved** in `state.doctors`

### Scenario 3: Filter Patients
1. On Patients page
2. Select Gender = "Male"
3. `setModuleFilters('patients', {gender: ["Male"]})`
4. Filter state: `{doctors: {specialization: ["Cardiology"]}, patients: {gender: ["Male"]}}`
5. **Both modules have independent filters** ✓

### Scenario 4: Switch Back to Doctors
1. Navigate to Doctors page
2. `getModuleFilters('doctors')` returns `{specialization: ["Cardiology"]}`
3. Table shows filtered doctors ✓
4. **Doctor filters preserved from before** ✓

---

## Benefits

### 1. **Complete Isolation**
- Doctor filters don't affect patients
- Patient filters don't affect doctors
- Each module maintains its own filter state

### 2. **Persistent Filters**
- Filters preserved when switching between modules
- No need to re-apply filters when returning to a page

### 3. **Independent Clearing**
- Clearing doctor filters doesn't clear patient filters
- Each module manages its own filter lifecycle

### 4. **Scalable**
- Easy to add new modules (appointments, nurses, etc.)
- Each module gets its own filter namespace

---

## Testing

### Test Case 1: Cross-Module Isolation
1. ✓ Go to Doctors → Filter by Specialization
2. ✓ Go to Patients → Should show all patients (no filters)
3. ✓ Filter Patients by Gender
4. ✓ Go back to Doctors → Should still show specialization filter

### Test Case 2: Filter Persistence
1. ✓ Filter Doctors by Specialization + Experience
2. ✓ Go to Patients page
3. ✓ Return to Doctors → Both filters still applied

### Test Case 3: Independent Clearing
1. ✓ Filter both Doctors and Patients
2. ✓ Clear Doctor filters → Patients filters unchanged
3. ✓ Clear Patient filters → Doctor filters unchanged

### Test Case 4: Multiple Filters Per Module
1. ✓ Doctors: Filter by Specialization + Experience
2. ✓ Patients: Filter by Gender + Blood Group + Condition
3. ✓ All filters work independently

---

## Migration Notes

### Backward Compatibility

The context still exports `selected` and `setSelected` for backward compatibility, but they now point to the nested structure:

```javascript
// Old code still works (but deprecated)
const { selected } = useContext(FilterCntxObj);
// selected = {doctors: {...}, patients: {...}}

// New code (recommended)
const { getModuleFilters } = useContext(FilterCntxObj);
const moduleFilters = getModuleFilters('doctors');
// moduleFilters = {specialization: [...], yearsOfExperience: [...]}
```

### Components Updated
- ✓ FilterContext.jsx - Module-specific state
- ✓ Dropdown.jsx - Uses module-specific getters/setters
- ✓ Table.jsx - Reads module-specific filters

### Components Not Updated (Don't Use Filters)
- Header.jsx
- Form.jsx
- Filters.jsx (just renders dropdowns)
- Search.jsx

---

## Summary

**Before:** One global filter state → Filters leaked between modules ❌

**After:** Module-specific filter state → Complete isolation ✓

Now doctors and patients have completely independent filtering with no cross-contamination!
