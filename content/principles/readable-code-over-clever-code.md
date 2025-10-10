---
title: "Readable code > clever code."
category: "code-quality-maintainability"
slug: "readable-code-over-clever-code"
summary: "Write for the next person, reading it not to impress, but to communicate. Clarity beats cleverness every time."
---
![Readable code > clever code.](/principles/readable-code-over-clever-code/comic.png)

### Explanation in layman terms

Think of code like writing instructions for assembling furniture. You have two approaches: you can write instructions that sound incredibly sophisticated and use technical jargon that impresses other furniture designers, or you can write clear, step-by-step instructions that anyone can follow.

Clever code is like instructions that say: "Utilize the hexagonal fastening mechanism in conjunction with the perpendicular structural component to achieve optimal load distribution." It sounds impressive, but when you're trying to put together a chair at midnight, you just want to know which screw goes where.

Readable code is like instructions that say: "Attach the back leg to the seat using the long screw. Turn clockwise until tight." It's straightforward, clear, and gets the job done.

Here's a real programming example. Clever code might look like this:

```python
# Clever code
result = [x for x in data if x % 2 == 0 and x > 10]
```

```python
# Readable code
large_even_numbers = []
for number in data:
    if number > 10 and number % 2 == 0:
        large_even_numbers.append(number)
```

The clever version might impress other programmers for 30 seconds, but the readable version will save hours of confusion when someone (including future you) needs to understand or modify it later. As Brian Kernighan wisely said: "Debugging code is twice as hard as writing the code in the first place. Therefore, if you write code as cleverly as possible, you are, by definition, not smart enough to debug it".

Remember, you write code once, but you read it many times. Studies show developers spend over 10 times more time reading code than writing it. Every minute you save making code "clever" costs hours when that code needs to be understood, debugged, or extended.

### Gain Deeper Understanding

| Action | What you'll learn |
| :---- | :---- |
| Study the article "Clear is Better Than Clever" by Dave Cheney ([https://dave.cheney.net/2019/07/09/clear-is-better-than-clever](https://dave.cheney.net/2019/07/09/clear-is-better-than-clever)) | The difference between code that works and code that communicates. |
| Read the article ["The Complete Guide to Readable Code: 11 Principles"](https://fellow.ai/blog/the-complete-guide-to-readable-code/) | Principles like naming, single responsibility, and feedback loops to ensure code is easy for anyone to understand and change |
| Read the opinion post ["Clever code is probably the worst code you could write"](https://read.engineerscodex.com/p/clever-code-is-probably-the-worst) | Practical evidence on why clever code is often less maintainable and why teams should value clarity highly |

### Put it into practice?

| Scenario | What to do |
| :---- | :---- |
| When you're tempted to show off your deep knowledge of the programming language | Remember that impressive code and effective code are often opposites. Your goal is communication, not demonstration of expertise |
| When debugging code you wrote months ago and can't understand it | Take this as a sign to immediately refactor it for readability before fixing the bug |
| When choosing between a compact solution and a step-by-step solution | Choose the step-by-step approach. Modern compilers optimize readable code effectively, and the performance difference is rarely meaningful compared to the maintenance cost |
