# The Complete React + Redux Mastery & Interview Guide

*A senior-engineer-level reference: theory, code, diagrams, comparisons, optimization, and interview prep.*

---

## Table of Contents
1. [React Fundamentals — Theory](#1-react-fundamentals--theory)
2. [Hooks — Deep Dive](#2-hooks--deep-dive)
3. [Redux — Theory & Architecture](#3-redux--theory--architecture)
4. [Middleware: Thunk vs Saga](#4-middleware-thunk-vs-saga)
5. [Redux Toolkit (RTK)](#5-redux-toolkit-rtk)
6. [Diagrams](#6-diagrams)
7. [Hard Comparisons](#7-hard-comparisons)
8. [Tricks & Best Practices](#8-tricks--best-practices)
9. [Advanced Topics](#9-advanced-topics)
10. [Interview Question Bank](#10-interview-question-bank)

---

## 1. React Fundamentals — Theory

### 1.1 What is React?
**One-liner:** React is a declarative, component-based JavaScript library for building user interfaces using a virtual DOM.

**Deep notes:**
- React doesn't manipulate the real DOM directly for every change. It builds a **Virtual DOM** (a lightweight JS object tree mirroring the UI), diffs the new tree against the previous one (**reconciliation**), and applies only the minimal set of real DOM mutations.
- React is a *library*, not a framework — it only handles the view layer. Routing, state management, and HTTP are add-ons (React Router, Redux, Axios).
- Since React 18, rendering can be **concurrent** — React can pause, abort, or prioritize rendering work (via Fiber architecture) instead of blocking the main thread.

### 1.2 JSX
**One-liner:** JSX is syntactic sugar that compiles to `React.createElement()` calls, letting you write UI markup inside JavaScript.

```jsx
// JSX
const element = <h1 className="title">Hello, {user.name}</h1>;

// Compiles to (classic runtime)
const element = React.createElement(
  'h1',
  { className: 'title' },
  'Hello, ', user.name
);
```

**Deep notes:**
- JSX expressions must return a single root element (or a Fragment `<>...</>`).
- `{ }` embeds any valid JS expression (not statements).
- React 17+ introduced the "new JSX transform" — you no longer need `import React from 'react'` just to use JSX, because the compiler imports `jsx`/`jsxs` from `react/jsx-runtime` automatically.

### 1.3 Components
**One-liner:** A component is a reusable, self-contained function or class that returns UI (JSX) based on inputs (props) and internal state.

**Functional component (modern standard):**
```jsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

**Class component (legacy, still asked in interviews):**
```jsx
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

**Deep notes:**
- Functional components + Hooks (post React 16.8) are now the industry default. Class components remain relevant for legacy codebases and interview theory (lifecycle methods, `this` binding, error boundaries — which still require classes as of React 18).
- Components must be **pure** with respect to props/state during render — no side effects, no mutating props.

### 1.4 Props
**One-liner:** Props (properties) are read-only inputs passed from a parent component to a child to configure its output.

```jsx
function Button({ label, onClick, variant = 'primary' }) {
  return <button className={`btn btn-${variant}`} onClick={onClick}>{label}</button>;
}

<Button label="Save" onClick={handleSave} variant="secondary" />
```

**Deep notes:**
- Props flow **one-way (top-down)** — a child can never modify its own props. To communicate upward, a parent passes a **callback prop** (e.g., `onClick`).
- `props.children` gives access to nested JSX passed between a component's tags — the foundation of composition/slot patterns.
- Over-passing props through many layers is called **prop drilling** — solved via Context or state managers like Redux.

### 1.5 State
**One-liner:** State is data owned and managed *inside* a component that, when changed, triggers a re-render.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

**Deep notes:**
- State updates in React are **asynchronous and batched** (especially since React 18's automatic batching applies even inside promises, timeouts, and native event handlers).
- Always use the **functional updater form** (`setCount(c => c + 1)`) when the new state depends on the old state, to avoid stale-closure bugs.
- State should be **immutable** — never mutate objects/arrays directly; always create new references (`{...obj}`, `[...arr]`) so React's shallow comparison (`Object.is`) detects the change.

### 1.6 Component Lifecycle (Class-based, conceptual foundation for hooks)
**One-liner:** Lifecycle methods are hooks into three phases of a component's existence: **Mounting**, **Updating**, and **Unmounting**.

| Phase | Class Method | Hook Equivalent |
|---|---|---|
| Mount | `constructor`, `render`, `componentDidMount` | `useState` init, render body, `useEffect(() => {...}, [])` |
| Update | `shouldComponentUpdate`, `render`, `componentDidUpdate` | `React.memo`, render body, `useEffect(() => {...}, [deps])` |
| Unmount | `componentWillUnmount` | `useEffect` cleanup function (`return () => {...}`) |
| Error | `componentDidCatch`, `getDerivedStateFromError` | No hook equivalent — must use a class-based Error Boundary |

```jsx
class Timer extends React.Component {
  componentDidMount() {
    this.id = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.id);
  }
  tick() { this.setState({ time: new Date() }); }
  render() { return <p>{this.state.time?.toString()}</p>; }
}
```

### 1.7 Context API
**One-liner:** Context lets you pass data through the component tree without manually threading props at every level.

```jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = useContext(ThemeContext); // no prop drilling needed
  return <div className={theme}>Toolbar</div>;
}
```

**Deep notes:**
- Context is a **dependency injection** mechanism, not a state management system. It has no built-in concept of actions, reducers, or middleware.
- **Every consumer re-renders** when the Provider's `value` changes — unless you split contexts or memoize the value, this can cause performance issues (see Use Cases below).

---

## 2. Hooks — Deep Dive

### 2.1 useState
**One-liner:** Adds local, re-render-triggering state to a functional component.
```jsx
const [value, setValue] = useState(initialValue);
```
Lazy initialization for expensive computation: `useState(() => computeExpensive())`.

### 2.2 useEffect
**One-liner:** Runs side effects (data fetching, subscriptions, DOM manipulation) after React commits changes to the DOM.
```jsx
useEffect(() => {
  const controller = new AbortController();
  fetch(`/api/user/${id}`, { signal: controller.signal })
    .then(res => res.json())
    .then(setUser);
  return () => controller.abort(); // cleanup
}, [id]); // dependency array
```
**Deep notes:**
- No dependency array → runs after **every** render.
- Empty array `[]` → runs once after mount (like `componentDidMount`).
- `[id]` → runs on mount and whenever `id` changes.
- The **cleanup function** runs before the next effect execution and on unmount — critical for avoiding memory leaks (subscriptions, timers, listeners).
- Runs **asynchronously after paint** (browser has already drawn the frame).

### 2.3 useLayoutEffect
**One-liner:** Same API as `useEffect` but fires **synchronously after DOM mutations, before the browser paints**.
```jsx
useLayoutEffect(() => {
  const { height } = ref.current.getBoundingClientRect();
  setHeight(height); // measure & adjust before paint to avoid visual flicker
}, []);
```
Use only when you must read layout (measure DOM) and synchronously re-render to avoid a visual flash — e.g., tooltips positioning.

### 2.4 useContext
**One-liner:** Subscribes a component to a Context value without a wrapper `<Consumer>`.
```jsx
const user = useContext(UserContext);
```

### 2.5 useRef
**One-liner:** Returns a mutable `.current` object that persists across renders **without** causing re-renders when changed.
```jsx
function TextInput() {
  const inputRef = useRef(null);
  useEffect(() => { inputRef.current.focus(); }, []);
  return <input ref={inputRef} />;
}
```
Also used to store any mutable instance value (previous props, timer IDs, render counts) that shouldn't trigger re-renders.

### 2.6 useMemo
**One-liner:** Memoizes the **result of an expensive computation** so it's only recalculated when dependencies change.
```jsx
const sortedList = useMemo(() => expensiveSort(list), [list]);
```

### 2.7 useCallback
**One-liner:** Memoizes a **function reference** so it doesn't get recreated on every render (prevents unnecessary child re-renders and effect re-runs).
```jsx
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```
**`useMemo` vs `useCallback`:** `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`. `useMemo` memoizes a *value*; `useCallback` memoizes a *function*.

### 2.8 useReducer
**One-liner:** An alternative to `useState` for managing complex state logic via a reducer function `(state, action) => newState` — the same pattern Redux uses, but local to a component.
```jsx
function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + 1 };
    case 'decrement': return { count: state.count - 1 };
    default: throw new Error('Unknown action');
  }
}
function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return <button onClick={() => dispatch({ type: 'increment' })}>{state.count}</button>;
}
```

### 2.9 Custom Hooks
**One-liner:** A JS function starting with `use` that composes other hooks to encapsulate and reuse stateful logic.
```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    setLoading(true);
    fetch(url).then(r => r.json()).then(d => { if (active) { setData(d); setLoading(false); } });
    return () => { active = false; };
  }, [url]);
  return { data, loading };
}
// usage: const { data, loading } = useFetch('/api/posts');
```

### 2.10 Rules of Hooks
1. Only call hooks at the **top level** — never inside loops, conditions, or nested functions.
2. Only call hooks from **React function components** or **other custom hooks**.
These rules exist because React tracks hooks by **call order** via a linked list internally (Fiber) — conditional hooks would desynchronize state between renders.

---

## 3. Redux — Theory & Architecture

### 3.1 What is Redux?
**One-liner:** Redux is a predictable state container that holds an app's entire state in a single, centralized, read-only store, updated only via dispatched actions processed by pure reducer functions.

**Three core principles:**
1. **Single source of truth** — the whole app state lives in one store (object tree).
2. **State is read-only** — the only way to change state is to dispatch an action.
3. **Changes are made with pure functions** — reducers take `(state, action)` and return a new state, never mutating the input.

### 3.2 Store
**One-liner:** The object that holds the application state and exposes `getState()`, `dispatch(action)`, and `subscribe(listener)`.
```js
import { createStore } from 'redux';
const store = createStore(rootReducer);
store.subscribe(() => console.log(store.getState()));
store.dispatch({ type: 'counter/increment' });
```

### 3.3 Actions
**One-liner:** Plain JS objects describing "what happened," always containing a `type` field.
```js
const incrementAction = { type: 'counter/increment', payload: 1 };

// Action creator
function increment(amount) {
  return { type: 'counter/increment', payload: amount };
}
```

### 3.4 Reducers
**One-liner:** Pure functions `(state, action) => newState` that compute the next state based on the current state and an action.
```js
function counterReducer(state = { value: 0 }, action) {
  switch (action.type) {
    case 'counter/increment':
      return { ...state, value: state.value + action.payload };
    case 'counter/decrement':
      return { ...state, value: state.value - action.payload };
    default:
      return state;
  }
}
```
**Deep notes:**
- Must be **pure**: same input → same output, no side effects (no API calls, no `Date.now()`, no mutation).
- `combineReducers()` merges multiple slice reducers into one root reducer, each managing its own slice of state.

### 3.5 Dispatch & Data Flow
**One-liner:** `dispatch(action)` is the *only* way to trigger a state change — it sends the action to the store, which runs it through the reducer(s) and notifies subscribers (typically React-Redux components).

### 3.6 React-Redux Bindings
```jsx
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector(state => state.counter.value);
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(increment(1))}>{count}</button>
  );
}
```
- `useSelector` subscribes the component to the store and re-renders it whenever the selected slice changes (via reference equality by default).
- `<Provider store={store}>` at the app root makes the store available via Context internally.

### 3.7 Middleware
**One-liner:** Middleware sits between `dispatch` and the reducer, intercepting every action to add cross-cutting behavior (logging, async logic, crash reporting) before it reaches the reducer.
```js
const logger = storeAPI => next => action => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', storeAPI.getState());
  return result;
};
```
Redux middleware is the mechanism used to handle **async logic** (thunks, sagas, observables) because plain reducers must be synchronous and pure.

---

## 4. Middleware: Thunk vs Saga

### 4.1 Redux Thunk
**One-liner:** A middleware that lets action creators return a **function** (instead of a plain object), which receives `dispatch` and `getState`, enabling async logic like API calls.
```js
// Thunk action creator
function fetchUser(id) {
  return async (dispatch, getState) => {
    dispatch({ type: 'user/loading' });
    try {
      const res = await fetch(`/api/users/${id}`);
      const data = await res.json();
      dispatch({ type: 'user/loaded', payload: data });
    } catch (err) {
      dispatch({ type: 'user/error', payload: err.message });
    }
  };
}
// component: dispatch(fetchUser(42));
```

### 4.2 Redux Saga
**One-liner:** A middleware using ES6 generator functions to manage complex async flows (race conditions, cancellation, sequencing) as testable, declarative "effects."
```js
import { call, put, takeEvery, cancel, take } from 'redux-saga/effects';

function* fetchUserSaga(action) {
  try {
    const data = yield call(api.getUser, action.payload.id);
    yield put({ type: 'user/loaded', payload: data });
  } catch (err) {
    yield put({ type: 'user/error', payload: err.message });
  }
}

function* watchFetchUser() {
  yield takeEvery('user/fetchRequested', fetchUserSaga);
}
```
**Deep notes:**
- Sagas run as **separate processes** listening for dispatched actions, making complex orchestration (debounce, race, cancel-on-unmount, sequential chains) far cleaner than nested thunks.
- Generators make sagas **highly testable** — you can step through `yield` statements and assert on plain effect objects without mocking `fetch`.
- Steeper learning curve; overkill for simple CRUD apps.

---

## 5. Redux Toolkit (RTK)
**One-liner:** RTK is the official, opinionated toolset that eliminates Redux boilerplate via `configureStore`, `createSlice`, and `createAsyncThunk`, and includes Immer for "mutable-looking" immutable updates.

```js
import { createSlice, configureStore, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fetch', async (id) => {
  const res = await fetch(`/api/users/${id}`);
  return res.json();
});

const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, status: 'idle', error: null },
  reducers: {
    reset(state) { state.data = null; } // Immer lets you "mutate" safely
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUser.pending, state => { state.status = 'loading'; })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const store = configureStore({
  reducer: { user: userSlice.reducer }
});
```
**Deep notes:**
- `createSlice` auto-generates action creators and action types from reducer function names.
- Under the hood uses **Immer**, which lets you write `state.value = 5` inside a reducer — Immer produces a new immutable state tree via a proxy, so no accidental mutation bugs.
- `configureStore` sets up Redux DevTools and includes `redux-thunk` by default — no manual middleware wiring needed.
- RTK Query (built on RTK) is now the recommended tool for **data fetching/caching**, often replacing hand-written thunks entirely.

---

## 6. Diagrams

### 6.1 React Component Hierarchy & One-Way Data Flow
```
                 ┌─────────────┐
                 │   <App/>    │  state lives here
                 └──────┬──────┘
             props down │  │ callback up (onX)
        ┌────────────────┴────────────────┐
        ▼                                  ▼
 ┌─────────────┐                   ┌──────────────┐
 │ <Sidebar/>  │                   │ <MainPanel/>  │
 └──────┬──────┘                   └──────┬────────┘
        │ props                            │ props
        ▼                                  ▼
 ┌─────────────┐                   ┌──────────────┐
 │ <NavItem/>  │                   │ <ArticleList/>│
 └─────────────┘                   └──────────────┘

 Data flows DOWN via props.
 Events/updates flow UP via callback functions passed as props.
```

### 6.2 React Render / Reconciliation Flow
```
 State/Props change
        │
        ▼
 Re-render triggered (function component runs again)
        │
        ▼
 New Virtual DOM tree created
        │
        ▼
 Diffing against previous Virtual DOM tree ("reconciliation")
        │
        ▼
 Minimal set of real DOM mutations computed
        │
        ▼
 Commit phase: DOM updated + useLayoutEffect fires (sync)
        │
        ▼
 Browser paints screen
        │
        ▼
 useEffect fires (async, after paint)
```

### 6.3 Redux Architecture (Unidirectional Data Flow)
```
        ┌─────────────────────────────────────────────┐
        │                                               │
        ▼                                               │
 ┌─────────────┐   dispatch(action)   ┌────────────┐   │
 │  UI / View   │ ───────────────────▶│ Middleware  │   │
 │ (React comp.)│                      │(thunk/saga) │   │
 └─────▲────────┘                      └──────┬──────┘   │
       │                                       │ action    │
       │ re-render via                         ▼           │
       │ useSelector                    ┌─────────────┐    │
       │                                 │  Reducer(s)  │    │
       │                                 │ (state,action)│   │
       │                                 └──────┬───────┘    │
       │                                        │ new state  │
       │                                        ▼            │
       │                                 ┌─────────────┐     │
       └─────────────────────────────────│    Store    │─────┘
                                          │ (single tree)│
                                          └─────────────┘
```

### 6.4 Middleware Chain Flow
```
 dispatch(action)
      │
      ▼
 ┌──────────────┐   next(action)   ┌──────────────┐   next(action)   ┌───────────┐
 │  Middleware 1 │ ────────────────▶│  Middleware 2 │ ────────────────▶│  Reducer  │
 │  (e.g. logger)│                  │ (e.g. thunk)  │                  │           │
 └──────────────┘                  └──────────────┘                  └───────────┘
        ▲                                  │
        │  (can short-circuit, delay,      │ if action is a function,
        │   dispatch more actions, etc.)   │ thunk calls it with
        └──────────────────────────────────┘ (dispatch, getState) instead
                                              of forwarding to reducer
```

### 6.5 Hook Lifecycle Timing (Mount → Update → Unmount)
```
 MOUNT:
   render() runs → DOM committed → useLayoutEffect runs (sync) → paint → useEffect runs (async)

 UPDATE (state/props change):
   render() runs → DOM committed → cleanup of previous useLayoutEffect →
   useLayoutEffect runs → paint → cleanup of previous useEffect → useEffect runs

 UNMOUNT:
   cleanup function of useLayoutEffect runs → cleanup function of useEffect runs → component removed
```

---

## 7. Hard Comparisons

### 7.1 React vs Angular vs Vue
| | **React** | **Angular** | **Vue** |
|---|---|---|---|
| Type | UI Library | Full MVC Framework | Progressive Framework |
| Language | JS/JSX (TS optional) | TypeScript (mandatory) | JS/TS + SFC templates |
| DOM | Virtual DOM diffing | Real DOM + zone.js dirty-checking (Ivy improved this) | Virtual DOM diffing |
| State mgmt | External (Redux/Zustand/Context) | Built-in (services + RxJS) | Built-in (Pinia/Vuex) |
| Learning curve | Moderate | Steep (DI, RxJS, decorators) | Gentle |
| Data binding | One-way | Two-way (`[(ngModel)]`) | Two-way (`v-model`) |
| Bundle size | Small core, grows with ecosystem | Large, batteries-included | Small |
| Best for | Flexible, custom-stack SPAs, large ecosystem needs | Large enterprise apps needing strict structure | Rapid development, smaller-to-mid apps |
| Performance | Excellent with proper memoization | Excellent with OnPush + Ivy | Excellent, fine-grained reactivity |

**Trade-off summary:** React trades built-in structure for flexibility (you assemble your own stack); Angular trades flexibility for enforced consistency at scale; Vue aims for the easiest ramp-up with framework-level conveniences.

### 7.2 Context API vs Redux
| | **Context API** | **Redux** |
|---|---|---|
| Purpose | Dependency injection (avoid prop drilling) | Full state management with time-travel debugging |
| Async handling | None built-in | Middleware (thunk/saga) |
| DevTools | No dedicated tooling | Rich Redux DevTools (action log, time travel) |
| Performance at scale | Re-renders all consumers on value change (unless split/memoized) | Fine-grained via `useSelector` — only re-renders on selected slice change |
| Boilerplate | Minimal | Moderate (less with RTK) |
| Best for | Theming, auth user object, locale — low-frequency updates | Complex, frequently-updating, cross-cutting app state (carts, normalized entities, undo/redo) |

**Use Context when:** the data changes rarely (theme, logged-in user, language) and is consumed broadly.
**Use Redux when:** you need predictable, debuggable, high-frequency state updates shared across many disconnected components, complex async orchestration, or middleware-based cross-cutting concerns.

### 7.3 Redux vs MobX
| | **Redux** | **MobX** |
|---|---|---|
| Paradigm | Functional, immutable, explicit | Reactive, mutable (observables), implicit |
| Boilerplate | More explicit (less with RTK) | Very little |
| Predictability | High — pure reducers, easy to trace | Lower — mutations can happen anywhere observables are touched |
| Debugging | Excellent (action log, time travel) | Harder to trace who mutated what |
| Learning curve | Moderate | Easy to start, hard to scale disciplined patterns |
| Best for | Large teams needing strict conventions and traceability | Smaller teams wanting fast iteration with less ceremony |

### 7.4 useEffect vs useLayoutEffect
| | **useEffect** | **useLayoutEffect** |
|---|---|---|
| Timing | After paint (async) | Before paint (sync, blocks browser) |
| Use for | Data fetching, subscriptions, logging, most side effects | DOM measurements that must be reflected before the user sees a frame (avoiding flicker) |
| Performance | Non-blocking, preferred default | Can hurt performance if overused (blocks paint) |

### 7.5 Redux Thunk vs Redux Saga
| | **Thunk** | **Saga** |
|---|---|---|
| Syntax | Plain async functions | Generator functions + effects |
| Complexity handling | Good for simple async (fetch → dispatch) | Excellent for complex flows (cancellation, debounce, race, sequencing) |
| Testability | Requires mocking `fetch`/promises | Highly testable — assert on plain effect objects |
| Learning curve | Low | Higher (generators, effect creators) |
| Bundle size | Tiny | Larger |

### 7.6 SSR vs CSR vs SSG (Next.js context)
| | **CSR** | **SSR** | **SSG** |
|---|---|---|---|
| Render location | Browser | Server, per request | Server, at build time |
| Initial load speed | Slower (blank until JS loads) | Fast (HTML ready) | Fastest (pre-built HTML) |
| SEO | Poor without extra work | Good | Excellent |
| Data freshness | Always fresh | Always fresh | Stale until rebuild (or ISR) |
| Best for | Dashboards, authenticated apps | News sites, personalized pages | Blogs, marketing pages, docs |

---

## 8. Tricks & Best Practices

### 8.1 Avoiding Unnecessary Re-renders
- Wrap presentational components in `React.memo()` to skip re-render when props are shallow-equal.
- Use `useCallback`/`useMemo` for props passed to memoized children — otherwise a new function/object reference each render defeats `memo`.
- Split large context values into smaller, purpose-specific contexts so unrelated consumers don't re-render.
- In Redux, keep `useSelector` selectors **narrow** (select primitives, not whole objects) to avoid re-renders from unrelated state changes; use `reselect`/`createSelector` for derived/computed data so it's memoized.

### 8.2 Code Splitting & Lazy Loading
```jsx
const Settings = React.lazy(() => import('./Settings'));

function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <Settings />
    </Suspense>
  );
}
```
Route-based code splitting (per-page chunks) is the highest-leverage place to apply this — it directly shrinks the initial bundle.

### 8.3 Key Prop Discipline
- Never use array index as `key` for lists that can reorder/insert/delete — it causes state to attach to the wrong DOM node. Use a stable unique ID.

### 8.4 Redux Best Practices
- Keep state **normalized** (like a database: `{ ids: [], entities: {} }`) instead of nested arrays — avoids deep-clone pain and duplicate data.
- Use RTK's `createEntityAdapter` for CRUD-heavy slices — gives you normalized state + generated selectors for free.
- Don't put everything in Redux — **local UI state** (input focus, hover, modal open/close) usually belongs in `useState`, not the global store.
- Co-locate slice logic ("ducks" pattern / feature folders) instead of splitting by `actions/`, `reducers/`, `types/` folders — reduces file-jumping and matches RTK's slice model.

### 8.5 Debugging Tricks
- Redux DevTools: use the time-travel slider to replay state transitions and catch exactly which action caused a bug.
- React DevTools Profiler: record a session and look for components that re-render without their props/state changing ("wasted renders").
- `why-did-you-render` library flags unnecessary re-renders in dev builds.
- Add `displayName` to custom hooks/HOCs for cleaner DevTools traces.

### 8.6 Performance Checklist
- Virtualize long lists (`react-window`/`react-virtualized`) instead of rendering thousands of DOM nodes.
- Debounce/throttle expensive handlers (search-as-you-type, scroll listeners).
- Use production builds for benchmarking — dev builds include extra warnings/checks that skew numbers.
- Avoid inline object/array/function literals as props to memoized children (`<Child style={{color:'red'}}/>` creates a new object every render).

---

## 9. Advanced Topics

### 9.1 Server-Side Rendering with Next.js
**One-liner:** Next.js renders React components to HTML on the server (or at build time), sending a fully-formed page to the browser, then "hydrates" it into an interactive React app.

```jsx
// app/users/[id]/page.js (App Router, Server Component by default)
export default async function UserPage({ params }) {
  const user = await fetch(`https://api.example.com/users/${params.id}`).then(r => r.json());
  return <Profile user={user} />;
}
```
**Deep notes:**
- **Hydration** = React attaches event listeners to server-rendered HTML on the client without re-rendering the DOM from scratch — mismatches between server/client output cause "hydration errors."
- **React Server Components (RSC)** (Next.js App Router) run *only* on the server, ship zero JS to the client, and can directly access databases/filesystems — reducing bundle size for non-interactive parts of the UI.
- **ISR (Incremental Static Regeneration)** lets statically generated pages be re-built in the background after a `revalidate` interval, blending SSG speed with data freshness.

### 9.2 React Performance Tuning (Systematic Approach)
1. Profile first (React DevTools Profiler) — never optimize blind.
2. Identify **why** a component re-rendered: changed props, changed context, changed parent state.
3. Apply the cheapest fix first: move state down (colocate state closer to where it's used), before reaching for `memo`/`useMemo`.
4. Consider **structural** solutions — e.g., passing `children` as a prop instead of rendering it inline, so the parent's re-render doesn't cascade into the child tree.
5. Only then reach for concurrent features (`useTransition`, `useDeferredValue`) to deprioritize non-urgent renders (e.g., typeahead search results) without blocking input.

```jsx
function SearchResults({ query }) {
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState([]);
  function handleChange(e) {
    const value = e.target.value;
    startTransition(() => {
      setResults(computeExpensiveResults(value)); // low-priority render
    });
  }
}
```

### 9.3 Testing with Jest & React Testing Library (RTL)
**Philosophy:** RTL tests components the way a user interacts with them (queries by role/text, not implementation details like internal state).

```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

test('increments count on click', () => {
  render(<Counter />);
  const button = screen.getByRole('button', { name: /increment/i });
  fireEvent.click(button);
  expect(screen.getByText('1')).toBeInTheDocument();
});
```

**Testing a Redux-connected component:**
```jsx
function renderWithStore(ui, preloadedState) {
  const store = configureStore({ reducer: rootReducer, preloadedState });
  return render(<Provider store={store}>{ui}</Provider>);
}

test('dispatches increment action', () => {
  renderWithStore(<Counter />, { counter: { value: 5 } });
  fireEvent.click(screen.getByRole('button'));
  expect(screen.getByText('6')).toBeInTheDocument();
});
```

**Testing async thunks/reducers in isolation (no rendering needed):**
```js
test('counterReducer handles increment', () => {
  expect(counterReducer({ value: 1 }, increment(2))).toEqual({ value: 3 });
});
```

### 9.4 Code Coverage
- `jest --coverage` generates a report (statements, branches, functions, lines) via Istanbul.
- 100% coverage ≠ bug-free — it just means every line *executed* during tests, not that every edge case/assertion was meaningful. Prioritize covering business-critical reducers, selectors, and thunks over trivial JSX markup.
- Set realistic thresholds in CI (`coverageThreshold` in `jest.config.js`) to prevent regressions rather than chasing 100%.

### 9.5 Scalable Redux Patterns for Large Apps
- **Feature-based slices**: one folder per domain feature (`features/cart/cartSlice.js`), each exporting its own reducer, selectors, and thunks — combined at the root only.
- **RTK Query** for server-state (caching, invalidation, polling) — separates "server cache" concerns from "client UI state" in the store, avoiding hand-rolled loading/error booleans per slice.
- **Selector memoization** via `reselect`'s `createSelector` for any derived data computed from multiple slices (e.g., filtered + sorted lists) to avoid recomputation on unrelated state changes.
- **Normalized entity state** (`createEntityAdapter`) for anything resembling a database table (users, posts, products) to keep updates O(1) instead of scanning arrays.
- Enforce a **single direction of dependency**: features can depend on shared/common code, but not on each other directly — prevents circular imports as the app grows.

---

## 10. Interview Question Bank

### Conceptual / Theory

**Q1. What's the difference between the Virtual DOM and the Real DOM, and why does React use it?**
A: The real DOM is the browser's live tree of nodes; mutating it is expensive (layout, reflow, repaint). The Virtual DOM is a lightweight JS object representation. React diffs the new virtual tree against the previous one and computes the minimal set of real DOM operations, batching them for efficiency. It's not "faster than the DOM" in isolation — it's a way to make *predictable, batched, minimal* updates instead of naive full re-renders.

**Q2. Why can't hooks be called conditionally?**
A: React tracks hook state by the **order** hooks are called on each render (an internal linked list per fiber). If a hook is skipped conditionally, the order shifts on subsequent renders, and React will match the wrong stored state/effect to the wrong hook call — causing bugs that are very hard to trace.

**Q3. Explain the difference between controlled and uncontrolled components.**
A: A controlled component's value is driven entirely by React state (`value={state}` + `onChange`), making React the single source of truth. An uncontrolled component keeps its own internal DOM state, accessed imperatively via `ref` when needed (e.g., on submit). Controlled is preferred for validation/dynamic UI; uncontrolled is simpler for basic forms/file inputs.

**Q4. What causes an infinite loop in `useEffect`, and how do you fix it?**
A: Typically, the effect updates state that is also in its own dependency array, or an object/array/function is recreated every render and listed as a dependency (new reference every time = "changed" every time). Fix: use primitive dependencies, memoize objects/functions with `useMemo`/`useCallback`, or restructure so the effect doesn't need to depend on the value it sets.

**Q5. Why are reducers required to be pure functions in Redux?**
A: Purity guarantees predictability: same `(state, action)` always produces the same output, with no side effects. This is what enables time-travel debugging, action replay, easy testing (no mocking needed), and confident reasoning about state transitions across a large team.

**Q6. What's the actual problem Redux solves that Context doesn't?**
A: Context solves prop drilling for *rarely changing* values. It doesn't provide: a standardized way to update state predictably (dispatch/reducer pattern), middleware for async/side-effects, time-travel debugging, or performance isolation (any context value change re-renders *all* consumers unless manually split/memoized). Redux (with `useSelector`) re-renders only components subscribed to the specific slice that changed.

### Edge Cases / Debugging

**Q7. A list re-renders every item even though only one item's data changed. Why, and how do you fix it?**
A: Likely causes: (1) the parent passes a new inline object/function as a prop to each item every render, breaking `React.memo`'s shallow comparison; (2) the list itself isn't memoized and its parent re-renders for unrelated reasons; (3) `key` is unstable (e.g., array index) causing React to treat items as different instances. Fix: wrap item component in `React.memo`, memoize callbacks/props with `useCallback`/`useMemo`, and use stable unique keys.

**Q8. `useSelector` is causing your component to re-render on every dispatched action, even unrelated ones. Why?**
A: The selector likely returns a **new object/array reference every call** (e.g., `state => ({ ...state.user })` or `state.items.filter(...)` inline), so React-Redux's default reference-equality check always sees it as "changed." Fix: select primitive/stable values, or use `createSelector` from `reselect` to memoize derived data, or pass a custom equality function (`shallowEqual`) as `useSelector`'s second argument.

**Q9. Two async thunks dispatched in quick succession cause a race condition — the older request's response overwrites the newer one's data. How do you solve this in (a) Thunk and (b) Saga?**
A: (a) In Thunk: track a request ID/timestamp and ignore stale responses (`if (requestId !== latestRequestId) return;`), or use RTK Query which handles this via cache/dedupe logic automatically. (b) In Saga: use `takeLatest` instead of `takeEvery` — it automatically cancels the previous in-flight saga when a new action of the same type is dispatched.

**Q10. A `useEffect` with an empty dependency array is using a stale prop value inside its closure. Why, and how do you fix it?**
A: The effect closure captures the prop's value from the render when the effect was first created (mount), and since the dependency array is empty, the effect never re-runs to "see" updated values — classic **stale closure**. Fix: add the prop to the dependency array (correct in most cases), or use a `ref` to always read the latest value without re-triggering the effect, if re-running the effect itself is undesirable.

### System Design (React + Redux)

**Q11. Design the state architecture for a large e-commerce SPA (product catalog, cart, user auth, checkout) using React + Redux. What goes in Redux vs local state, and how do you structure it?**
A: 
- **Redux (global, cross-cutting, shared across routes):** authenticated user/session, cart contents, normalized product/catalog entities (via `createEntityAdapter`), order/checkout flow state, feature flags.
- **RTK Query slice:** all server-fetched data (product listings, search results, order history) — leverages built-in caching, polling, and invalidation instead of hand-rolled loading/error state per feature.
- **Local component state (`useState`/`useReducer`):** form inputs, modal open/close, hover/focus UI state, pagination page number of a currently-viewed list (unless deep-linked via URL).
- **URL/router state:** filters, sort order, search query, current page — anything that should be shareable/bookmarkable belongs in the URL, not Redux.
- **Structure:** feature-folder slices (`features/cart`, `features/catalog`, `features/checkout`), each self-contained with its own selectors/thunks, combined at the root reducer. Use `reselect` for derived data like "cart total price" so it's computed once and cached until cart items change.
- **Performance:** normalize catalog entities to avoid O(n) scans on updates; narrow `useSelector` calls per component to avoid over-rendering; code-split each route/feature so checkout logic isn't loaded on the product browsing page.

**Q12. How would you handle optimistic updates (e.g., "like" button) in Redux, and what happens if the server request fails?**
A: Dispatch an action immediately that updates the UI state optimistically (e.g., `like/optimisticAdd`) before the network call resolves. Fire the actual request; on success, dispatch a confirmation action (often a no-op if state already matches). On failure, dispatch a rollback action that reverts the specific optimistic change (best done by storing enough info — e.g., previous value — in the action payload to undo precisely, rather than refetching everything). RTK Query supports this natively via `onQueryStarted` with manual cache `updateQueryData` + `patchResult.undo()` on error.

**Q13. How do you prevent an entire app re-render when a single deeply-nested Redux value updates?**
A: Ensure `useSelector` calls are as narrow/granular as possible (select the exact leaf value each component needs, not a large slice object). Use `React.memo` on components that receive stable props. Use `shallowEqual` or `createSelector` for any selector returning a derived object/array. Split the store into feature slices so unrelated updates don't touch shared references. Avoid selecting the entire state tree (`state => state`) anywhere.

**Q14. When would you choose NOT to use Redux at all in a new project?**
A: Small-to-medium apps with mostly local/component state and minimal cross-cutting shared state — Context + `useReducer`, or a lighter library (Zustand, Jotai), often suffices with far less boilerplate. Redux earns its cost when: state is shared across many disconnected parts of the tree, you need robust devtools/time-travel debugging, complex async orchestration (sagas) is required, or a large team benefits from Redux's enforced, predictable conventions.

**Q15. Explain a memory leak scenario in a React + Redux app and how you'd detect and fix it.**
A: Common scenario: a component dispatches a thunk that calls `setState`/`dispatch` after the component has unmounted (e.g., a slow API response arrives after navigation away), causing a "can't perform a state update on an unmounted component" warning, or a subscription/listener (WebSocket, `setInterval`, event listener) set up in `useEffect` without a cleanup function. Detection: Chrome DevTools memory profiler (heap snapshots showing detached DOM nodes growing over time), React DevTools warnings, or `AbortController` timeout patterns. Fix: always return a cleanup function from `useEffect` that aborts fetches (`AbortController`), clears intervals/timeouts, and unsubscribes listeners.

---

## Quick-Reference Cheat Sheet

| Need | Reach for |
|---|---|
| Local UI state | `useState` |
| Complex local state logic | `useReducer` |
| Avoid prop drilling for rarely-changing values | Context |
| Global, frequently-updated, cross-cutting state | Redux (RTK) |
| Server data fetching + caching | RTK Query / React Query |
| Expensive computed value | `useMemo` |
| Stable function reference for child/deps | `useCallback` |
| DOM measurement before paint | `useLayoutEffect` |
| Most side effects | `useEffect` |
| Mutable value that shouldn't trigger render | `useRef` |
| Complex async orchestration (cancel/race/sequence) | Redux Saga |
| Simple async (fetch → dispatch) | Redux Thunk |
| SEO-critical, content-heavy pages | Next.js SSR/SSG |
| Authenticated dashboards | CSR (or Next.js with client components) |
