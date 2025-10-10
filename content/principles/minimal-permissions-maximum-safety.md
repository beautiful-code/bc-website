---
title: "Minimal permissions, maximum safety"
category: "security-access-control"
slug: "minimal-permissions-maximum-safety"
summary: "Grant access only when necessary -- and only as much as needed."
---
![Minimal permissions, maximum safety](/principles/minimal-permissions-maximum-safety/comic.png)

### Explanation in layman terms

Think of it as giving out keys to a large, important building.

Instead of giving everyone a master key that opens every single door (like giving a process `root` or `admin` access), you issue keys that only open the specific doors a person needs to do their job.

A janitor gets a key that opens the supply closets, but not the CEO's office or the server room. An IT technician gets a key for the server room, but not for the accounting department's file cabinets.

This is the Principle of Least Privilege. In software terms:

-   A microservice that handles user profile pictures only needs permissions to read from and write to its designated storage area. It absolutely does not need access to the user credentials database.  
-   An analyst who only needs to run reports should have read-only access to the data. They shouldn't be able to change or delete anything.  
-   A user account for your application's database should only have `SELECT` and `INSERT` permissions on the specific tables it needs, and never `DROP TABLE` permissions.

Why do we do this? It's about security containment, or limiting the "blast radius"--a term for how far-reaching the damage would be if a component were compromised. If attackers exploit the picture service, they can only access pictures. They can't steal passwords or delete databases because the service simply never had the permissions to do so. It's like building bulkheads in a ship; a breach in one compartment doesn't sink the whole vessel.

In practice, this is often implemented using systems like Role-Based Access Control (RBAC). This directly mirrors our key analogy; you create predefined roles like 'Analyst' or 'ImageProcessorService'--much like a job title--and assign a specific, minimal set of permissions to each one. Users and services are then assigned a role, ensuring they only get the "keys" they absolutely need to function.

### Gain Deeper Understanding

| Action | What you'll learn |
| :---- | :---- |
| Read this article (https://www.strongdm.com/blog/principle-of-least-privilege)  | The definition of the Principle of Least Privilege (PoLP) through a clear analogy, understand its importance, and see practical examples of how it prevents and mitigates damage from common issues like "privilege creep" and phishing attacks. |

### Put it into practice?

| Scenario | What to do? |
| :---- | :---- |
| When an employee needs temporary privileges to perform an action | Grant temporary access with an automatic expiration. |
| When you're onboarding a new team member | Give access incrementally, based on what they need right now, not all at once. |
