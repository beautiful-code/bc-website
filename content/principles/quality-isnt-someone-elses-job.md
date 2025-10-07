---
title: "Quality isn't someone else's job."
category: "ownership"
slug: "quality-isnt-someone-elses-job"
summary: "If you write the code, you're responsible for making sure it works."
---
![Quality isn't someone else's job.](/principles/quality-isnt-someone-elses-job/comic.png)

### Explanation in layman terms

Imagine you're a chef crafting a new dish. You wouldn't just chop the ingredients, throw them in a pan, and send it out to a customer without tasting it first, would you? You'd taste it as you cook to make sure the seasoning is right and everything is cooked perfectly.

That's exactly what this principle is about. Writing tests is the developer's way of "tasting the code." You, the engineer, are in the best position to check if your code works as expected because you have the most context about what it's supposed to do.

Waiting for someone else (like a Quality Assurance or 'QA' team) to find a bug is like letting a customer discover your dish is too salty. It's much slower and more expensive to fix it then. It's far more efficient to catch and fix issues immediately while you're still "in the kitchen".

By writing your own tests, you get an immediate feedback loop on your work. It shifts the mindset from "someone else will find my mistakes" to "I am responsible for the quality of my craft"

### Gain Deeper Understanding

| Action | What you'll learn |
| :---- | :---- |
| Read the answer given by [Jez Humble and Dave Farley](https://www.infoq.com/articles/humble-farley-continuous-delivery/) for the question "Can you define "Continuous Delivery" concept and how it differs from other practices like Continuous Integration or traditional QA (Testing) tasks?" | How developer testing can reduce the feedback loop which in turns improves the feature delivery. |
| Read this article "[Test Pyramid](https://martinfowler.com/bliki/TestPyramid.html)" by Martin Fowler | The impact of developers writing more unit tests w.r.t speed of delivery and costs involved in delivering  |
| Go through the [slides](https://www.slideshare.net/Urbancode/shift-left) prepared by Paul Bahrs | The 'shift left' approach in software development, emphasizing early testing and collaboration among stakeholders to improve software quality |
| Read the section "[The whole team is responsible for quality](https://arc.net/l/quote/gbhxyavo)" from article | How everything falls in place if everyone takes responsibility for the quality of the code. |

### Put it into practice?

| Scenario | What to do |
| :---- | :---- |
| When you're fixing a bug in production | Write a test to ensure that the bug is fixed in the test suite. |
| When you're reviewing someone else's code | Check if they have written tests and leave feedback if tests are missing. |
