---
title: "Duplicate logic is a liability."
category: "code-quality-maintainability"
slug: "duplicate-logic-is-a-liability"
summary: "If you're writing the same logic a second time, pause and think DRY."
---
![Duplicate logic is a liability.](/principles/duplicate-logic-is-a-liability/comic.png)

### Explanation in layman terms

Think about updating your address with every service you use.  
If you change homes and only update the bank but forget the insurance, one day a crucial letter goes to the old place--now you're cleaning up a mess you didn't plan for.

Duplicated code creates that same mess in software.  
When the same rule lives in two or three places, any change means hunting all the copies and fixing them perfectly every time--miss one, and you get bugs that only show up "over there". It also means running extra tests, doing extra reviews, and keeping extra mental notes--work that doesn't add new value, just risk.

The DRY habit (Don't Repeat Yourself) is like having a single, official address book: update it once, and everything stays in sync automatically. So when typing the same logic again feels convenient, pause and pull it into one shared spot--future changes become one-and-done instead of a scavenger hunt

### Gain Deeper Understanding

| Action | What you'll learn |
| :---- | :---- |
| [Study "Duplicate Code" refactoring techniques on Refactoring.Guru](https://refactoring.guru/smells/duplicate-code) | Learn systematic approaches to identify different types of code duplication and specific refactoring patterns like Extract Method, Pull Up Field, and Template Method |
| [Read "DRY Revisited" blog post on Enterprise Craftsmanship](https://enterprisecraftsmanship.com/posts/dry-revisited/) | Deep dive into what DRY really means beyond just code duplication - focusing on knowledge duplication vs. coincidental similarities |

### Put it into practice?

| Scenario | What to do |
| :---- | :---- |
| When you see similar validation logic scattered across multiple forms in your application | Create a centralized validation service or utility that all forms can use. |
| When you're debugging and discover the same bug exists in multiple places | Before fixing each instance individually, first extract the buggy logic into a single function, fix it once, then replace all duplicates with calls to the fixed function |
| When adding a new feature that seems similar to existing functionality | First check if existing code can be generalized and reused rather than writing new duplicate logic |
