---
title: "All external data is untrusted"
category: "security-access-control"
slug: "all-external-data-is-untrusted"
summary: "Validate and sanitize everything -- forms, APIs, query params -- before using it."
---
![All external data is untrusted](/principles/all-external-data-is-untrusted/comic.png)

### Explanation in layman terms

Think of your application like a nightclub with a strict bouncer at the door. Every piece of data coming from outside your application -- whether it's from user forms, API calls, file uploads, or even other systems -- is like a stranger trying to get in. You wouldn't let anyone walk into your club without checking their ID, searching for weapons, and making sure they meet your dress code, right?

External data is untrusted means that any information coming from outside your direct control could potentially be malicious or malformed. A user might type `<script>alert('hack!')</script>` in a comment field hoping to run malicious JavaScript. Someone could try to input `'; DROP TABLE users; --` in a search box to delete your entire user database. Another person might upload a file that looks like an innocent image but contains hidden executable code.

Just like that nightclub bouncer, your code needs to be the security checkpoint. Before you let any external data interact with your database, display it on web pages, or use it in calculations, you need to:

* Validate it - Check if it matches what you expect (like verifying an email actually looks like an email)  
* Sanitize it - Clean it up by removing or escaping dangerous characters  
* Reject bad data - Don't try to "fix" suspicious input; just throw it out

### Gain Deeper Understanding

| Action | What you'll learn |
| :---- | :---- |
| Read the [OWASP Input Validation Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) | Guidelines for implementing input validation. |
| Study Martin Fowler's article "[The Basics of Web Application Security](https://martinfowler.com/articles/web-security-basics.html)" | Deep dive into input validation philosophy |
| Read [GitHub Security Lab's "Validate all the things"](https://github.blog/security/application-security/validate-all-things-input-validation/) article | Understanding how validation fits into broader security architecture |

### Put it into practice?

| Scenario | What to do |
| :---- | :---- |
| When building a form | Implement both client-side (for UX) and server-side validation. |
| When receiving JSON data from an external API | Parse JSON safely with proper error handling and reject any requests with unexpected additional fields |
| When handling search queries or database lookups | Use parameterized queries or prepared statements to prevent SQL injection and sanitize special characters |
