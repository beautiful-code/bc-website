---
title: "Focus on the root cause, not blame."
category: "ownership"
slug: "focus-on-the-root-cause-not-blame"
summary: "When things break, stay calm, learn deeply, and fix forward -- blame doesn't solve anything."
---
![Focus on the root cause, not blame.](/principles/focus-on-the-root-cause-not-blame/comic.png)

### Explanation in layman terms

Think of debugging a software issue like being a detective investigating a crime scene, but instead of looking for "who did it," you're looking for "what went wrong and why."

Imagine you're part of a team building a mobile app, and suddenly user login stops working. Your first instinct might be to ask "Who pushed the last change?" or "Who was supposed to test this?" But this approach is like trying to solve a puzzle by pointing fingers instead of examining the pieces.

The blame approach creates a toxic environment where:

* People hide mistakes instead of reporting them quickly  
* Engineers spend time defending themselves rather than fixing problems  
* The real issues in your systems and processes remain hidden  
* Team members become reluctant to make necessary changes or take risks  
* Knowledge sharing stops because people fear being blamed for revealing problems

The root cause approach transforms your team into problem-solving detectives who:

* Ask "What happened?" and "Why did it happen?" instead of "Who did this?"  
* Trace through logs, configurations, and system interactions to find the real culprit  
* Discover that most "human errors" are actually system design flaws  
* Build safeguards and processes that prevent the same issue from recurring  
* Create a culture where reporting problems quickly is rewarded, not punished

When you focus on root causes, you often discover that what looked like "someone made a mistake" is actually "our deployment process lacks proper validation" or "our monitoring didn't catch this edge case." The person becomes irrelevant--anyone could have made the same "mistake" given the same circumstances and system design.

This principle doesn't mean eliminating accountability. It means shifting accountability from individuals to teams and systems, creating an environment where the best solution emerges quickly because everyone feels safe to contribute their knowledge.

### Gain Deeper Understanding

| Action | What you'll learn |
| :---- | :---- |
| Listen to "Blameless Engineering at ASOS" podcast [apple.co/3blameless-asos](https://podcasts.apple.com/dk/podcast/16-blameless-engineering-at-asos/id1535752959?i=1000544260124) | Real-world case study of how ASOS tech teams transitioned to a blameless postmortem culture. |
| Study "A Beginners Guide To Root Cause Analysis (RCA)" [reliability.com/resources/articles/beginners-guide-to-root-cause-analysis](https://reliability.com/resources/articles/beginners-guide-to-root-cause-analysis/) | Basic steps of RCA methodology  |
| Explore "Postmortem Documentation Guide" [pagerduty.com/resources/insights/learn/how-to-write-postmortem](https://www.pagerduty.com/resources/insights/learn/how-to-write-postmortem/) | Guide on writing effective postmortems andbest practices for blameless analysis. |

### Put it into practice?

| Scenario | What to do |
| :---- | :---- |
| When a colleague makes a mistake that causes a bug in production | Approach them privately with curiosity, not accusation: "I see there was an issue with the recent change. Can you walk me through what happened? I want to understand the context so we can prevent similar issues." Then focus on process improvements. |
| When you discover a critical bug that could have been caught earlier | Instead of blaming the person who missed it, ask: "What tools, processes, or checks could have caught this earlier? Should this be part of our automated testing? Do we need better code review guidelines for this type of change?" |
