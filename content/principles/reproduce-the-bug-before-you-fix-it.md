---
title: "Reproduce the bug before you fix it"
category: "testing-debugging"
slug: "reproduce-the-bug-before-you-fix-it"
summary: "Until you can trigger it reliably, you're not ready to fix it."
---
![Reproduce the bug before you fix it](/principles/reproduce-the-bug-before-you-fix-it/comic.png)

### Explanation in layman terms

Imagine you're trying to fix a flickering light in a house. You walk into the room, flip the switch, and it works perfectly. A few hours later, someone else says it's flickering again. You go back, and it's fine. Is the problem the bulb? The switch? The wiring? A power surge? You can't possibly know because you're shooting at a moving target.

This is the exact situation with a bug you can't consistently reproduce. Trying to fix it is like randomly replacing the lightbulb and hoping the problem goes away. You're working based on a hunch, not evidence.

Your first job isn't to fix the code, but to find the "magic recipe" that makes the bug appear every single time. This isn't just about the sequence of user clicks, but about recreating the *exact system conditions*. Maybe the light only flickers when the microwave (a concurrent process) is running and you flip the switch (a user action) within a 2-second window. By isolating these specific variables, you've truly captured and understood the environment that creates the bug.

Once you have this reliable trigger, you can apply a potential fix to the code (like "rewiring the switch"). The real power comes next: you run the exact same steps under the exact same conditions again. If the bug doesn't appear, you have direct proof your fix was successful. This test now becomes a permanent safety net. Every time you make future changes to that area of the code, you can run it again to make sure your fix still holds. This practice is called **regression testing**--it prevents the code from "regressing" back to a broken state.

Creating an automated test for this is the gold standard. It's like building a robot that follows your recipe perfectly every time, eliminating any chance of human error in re-testing. This automation doesn't just verify your initial fix; it turns your documented steps into a permanent regression test. What was once a mysterious, frustrating "ghost in the machine" is now a controlled, repeatable experiment. You haven't just fixed a bug; you've understood it, tamed it, and built a permanent defense to ensure it never comes back unnoticed.

### Gain Deeper Understanding

| Action | What you'll learn |
| :---- | :---- |
| Watch this [video](https://youtu.be/_GxfTfMnwvw?si=5WCKF6u4E1-EgVky) from 21:00 mins | How to record, replay, and trigger bugs systematically using browser tools |
|  Read this [article](https://www.ministryoftesting.com/articles/taming-the-beast-of-irreproducible-bugs-finding-opportunities-in-chaos) | A structured approach and a set of principles for investigating bugs that can't easily be reproduced. |
| Read this [article](https://debugagent.com/cant-reproduce-a-bug) | The two-pronged approach to solving bugs: replicating the environment and user behavior, and using logs to understand the issue when direct reproduction is not possible. |
| Read the section "Disruptive Environments: Exposing Hidden Bugs" in this [article](https://medium.com/javarevisited/debugging-tips-and-tricks-a-comprehensive-guide-8d84a58ca9f2) | How to use "disruption" (e.g., network throttling, changing the environment) as a technique to unearth hard-to-reproduce bugs.  |

### Put it into practice?

| Scenario | What to do |
| :---- | :---- |
| When you think you've found the root cause of an issue but can't trigger it yourself | Don't proceed with a fix until you can reproduce it |
| When a bug is reported but the steps to reproduce are unclear | Ask for detailed steps or use logs to identify a way to consistently reproduce the bug. |
