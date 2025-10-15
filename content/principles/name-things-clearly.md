---
title: "Name things clearly."
category: "code-quality-maintainability"
slug: "name-things-clearly"
summary: "Variables, functions, and classes should reflect what they are or do -- your future teammates (and self) will thank you."
---
![Name things clearly.](/principles/name-things-clearly/comic.png)

### Explanation in layman terms

Imagine building or repairing a complex piece of machinery. You open the control panel and are faced with dozens of buttons, switches, and wires. Some labels are crystal clear: "Main Power," "Cooling Fan," or "Emergency Stop." Others are obscure, labeled only as "X12," "Temp1," or "Data3." When something needs to change, it becomes a major challenge if it's unclear what each control does.

That sense of uncertainty is exactly what happens when reading code with unclear names. Every adjustment takes longer, simple fixes can lead to mistakes, and even routine checks require extra caution. Now think about how much smoother things go when each button and wire is labeled exactly for its function, with no need to guess or hesitate.

Choosing strong names for your code is like labeling every critical part of your system so anyone, months from now can understand, update, or fix things with confidence. When variable and function names are explicit, such as paymentStatus, calculateShippingCost, or userProfile, you avoid turning simple tasks into frustrating puzzles. In every branch of engineering, clear labeling is a necessity for safety and speed, not just a nice-to-have. Code benefits from this mentality just as much.

### Gain Deeper Understanding

| Action | What you'll learn |
| :---- | :---- |
| Read [101: Function and Variable Naming](https://engineering.corzent.com/101-function-and-variable-naming-8cde11bdedbc) | Tips on naming functions and variables |
| Read this [article](https://www.freecodecamp.org/news/how-to-write-better-variable-names/) | Difference between bad way of naming & good way of naming functions, variables, & classes. |

### Put it into practice?

| Scenario | What to do |
| :---- | :---- |
| When maintaining old code with unclear names | Refactor variable/function/class names to be descriptive, even if there are no obvious errors |
| When reviewing pull requests or code from others | Suggest renaming unclear names and explain the rationale in review comments. |
| When implementing an experimental feature or temporary solution | Indicate both the intent and timeframe (e.g., temporaryApiFlagUntilV2Rollout) so others know what it does and when to revisit. |
