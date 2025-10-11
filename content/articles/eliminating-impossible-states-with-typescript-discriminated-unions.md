---
title: "Eliminating Impossible States with TypeScript Discriminated Unions"
expertise: frontend-engineering
slug: eliminating-impossible-states-with-typescript-discriminated-unions
tech: ["typescript", "react", "redux"]
date: 2025-10-10
author: BeautifulCode
keytakeaway: "Discriminated unions leverage TypeScript's type narrowing to eliminate impossible states by modeling mutually exclusive conditions as distinct type shapes with a shared literal discriminator, turning runtime bugs into compile-time errors."
---

### The Problem with Boolean Flags

Traditional async state management relies on multiple boolean flags like "isLoading", "hasError", and "hasData". This creates impossible states where "isLoading" and "hasError" could both be true, or where "data" exists while "isLoading" is still true. These contradictions lead to defensive null checks scattered throughout components and runtime bugs that only surface in production. The root issue is that independent booleans cannot express mutual exclusivity, forcing developers to remember implicit rules about which combinations are valid.

### Type-Safe State with Literal Discriminators

Discriminated unions use a literal type property as a discriminator to represent mutually exclusive states. Instead of combining flags, you define distinct type shapes for each state.

**Code Snippet:**
```typescript
// Before: Impossible states possible
interface BadState {
  isLoading: boolean;
  data: User | null;
  error: string | null;
}
// Can have isLoading=true AND error="timeout" simultaneously

// After: Discriminated union enforces valid states only
type AsyncState<T> = 
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string };

// TypeScript narrows types automatically
function render(state: AsyncState<User>) {
  switch (state.status) {
    case 'loading':
      return <Spinner />;
    case 'success':
      return <Profile user={state.data} />; // data guaranteed present
    case 'error':
      return <Error message={state.error} />; // error guaranteed present
  }
}

// Usage example
const loadingState: AsyncState<User> = { status: 'loading' };
const successState: AsyncState<User> = { 
  status: 'success', 
  data: { id: 1, name: 'Alice' } 
};
// TypeScript error: can't have both error and data
// const invalid = { status: 'error', error: 'Failed', data: user };
```

The compiler prevents accessing "data" when "status" is "error" because that property doesn't exist in the error state type. This eliminates an entire class of runtime null reference errors.

### Exhaustiveness Checking in Reducers

In reducer patterns, discriminated unions for actions provide automatic type inference and compile-time safety. When you add a new action type, TypeScript forces you to handle it everywhere the union is switched upon. The "type" property acts as the discriminator, and TypeScript narrows the action's payload type in each case block without manual assertions.

This exhaustiveness checking catches refactoring mistakes immediately. If you remove an action type from the union, every unhandled switch statement raises a compile error, preventing dead code paths and ensuring consistency across your state management layer.

### Applied Insight

Use discriminated unions when modeling states that are mutually exclusive, especially for async operations, form validation states, or multi-step workflows. The pattern works best when combined with "switch" statements and exhaustive checks. Avoid discriminated unions for genuinely independent flags or when states can overlap legitimately, as forcing them into a union creates awkward intermediate types that complicate rather than clarify your domain model.