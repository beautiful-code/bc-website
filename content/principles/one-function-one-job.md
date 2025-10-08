---
title: "One Function, One Job"
category: "code-quality-maintainability"
slug: "one-function-one-job"
summary: "Each function should do a single thing -- it keeps code testable, debuggable, and extendable."
---
![One Function, One Job](/principles/one-function-one-job/comic.png)

### Explanation in layman terms

Think of it this way: imagine you have a kitchen appliance that's supposed to toast bread, make coffee, and blend smoothies all at once. When something goes wrong, you wouldn't know if the toaster, coffee maker, or blender part is broken, making repairs much harder.

In programming, a function should be like a single kitchen appliance - it should do one thing really well. This makes your code easier to:

* Understand: You can read the function name and immediately know what it does  
* Test: You only need to verify one specific behavior  
* Debug: When something breaks, you know exactly where to look  
* Reuse: You can use the same function in different parts of your program  
* Modify: Changes to one responsibility won't accidentally break others

### Gain Deeper Understanding

| Action | What you'll learn |
| :---- | :---- |
| [Watch this Video](https://www.youtube.com/watch?v=rXjf8eiGsSI) by Uncle Bob | How tiny a function should be. |
| [Read this article](https://dev.to/56_kode/the-golden-rule-of-clean-code-functions-should-do-one-thing-3lf7) | Difference between multi-responsibility and single-responsibility functions  |

### Put it into practice?

| Scenario | What to do? |
| :---- | :---- |
| When you find yourself writing a function name with "and" in it (like validateAndSaveUser()) | Refactor the function by extracting each logical operation into its own function with a descriptive name. |
| When you need to reuse part of a function's logic in another part of your codebase | Split the function so each part can be reused independently |
