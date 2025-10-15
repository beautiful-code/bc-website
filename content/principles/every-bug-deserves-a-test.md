---
title: "Every bug deserves a test"
category: "testing-debugging"
slug: "every-bug-deserves-a-test"
summary: "Write one before or after -- but don't leave a bug fix unguarded. That's how we prevent reruns."
---
![Every bug deserves a test](/principles/every-bug-deserves-a-test/comic.png)

### Explanation in layman terms

Imagine patching a leaky pipe by wrapping tape around it. If you never pressure-test the fix, the moment water flows hard again, the leak reappears. A test is that pressure test for software: it forces the code to prove the bug is gone--every build, forever. Writing the test right after (or before) the fix means you lock the door behind the escaping bug so it can't re-enter the house.

### Gain Deeper Understanding

| Action | What you'll learn |
| :---- | :---- |
| Read Martin Fowler's [Test Pyramid article](https://martinfowler.com/bliki/TestPyramid.html) | The strategic approach to testing that balances different types of tests and why unit tests form the foundation for catching bugs quickly |
| Watch the [video](https://youtu.be/4SIpyrko-x4) "Why you should write tests first" by Uncle Bob | The psychological and practical reasons why writing tests after the fact often leads to untested code and hidden bugs |
| Read the [article](https://evolveum.com/test-driven-bugfixing/) "Test-Driven Bugfixing" | A practical approach for applying TDD principles when fixing bugs |

### Put it into practice?

| Scenario | What to do |
| :---- | :---- |
| When you identify a null-pointer crash in production | First reproduce it in a failing unit test, then commit both the fix and the passing test in one PR. |
| When a teammate submits a bug-fix PR without tests | Request a regression test before approval |
