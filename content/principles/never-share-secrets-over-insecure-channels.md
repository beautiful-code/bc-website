---
title: "Never share secrets over insecure channels."
category: "security-access-control"
slug: "never-share-secrets-over-insecure-channels"
summary: "Use end-to-end encrypted methods -- not email, not Slack."
---
![Never share secrets over insecure channels.](/principles/never-share-secrets-over-insecure-channels/comic.png)

### Explanation in layman terms

Think of sharing secrets over insecure channels like shouting your credit card number across a crowded room. You might think you're only talking to your friend, but everyone in between can hear you.

When you send sensitive information through email or Slack, it's like passing a note through a chain of strangers. Each person in the chain -- your email provider, network administrators, third-party app integrations, and potentially malicious actors -- can read your message.

End-to-end encryption is like having a special lockbox that only you and your intended recipient have keys to. Even if someone intercepts the lockbox, they can't open it without the specific key. The message stays scrambled (encrypted) from the moment it leaves your device until it reaches your recipient's device.

Popular services like email and Slack don't provide this level of protection. While they encrypt messages in transit, they can still be read by service providers, administrators, and hackers who gain access to their servers. This is why API keys, passwords, database credentials, and other secrets should never be shared through these channels.

### Gain Deeper Understanding

| Action | What you'll learn |
| :---- | :---- |
| Read this article on [End-to-End Encryption by PreVeil](https://www.preveil.com/blog/end-to-end-encryption/) | Difference between encryption in transit vs. at rest, and why E2EE provides the highest level of security for sensitive communications. |
| Review [Secure File Sharing Methods](https://blog.mailfence.com/securing-file-transfer/) by Mailfence | Five secure methods for sharing sensitive files plus their respective tradeoffs. |
| Read this IBM explainer on [End-to-End Encryption](https://www.ibm.com/think/topics/end-to-end-encryption) | The four-step process of E2EE, symmetric vs. asymmetric encryption schemes |

### Put it into practice?

| Scenario | What to do |
| :---- | :---- |
| When you need to share API keys or database credentials with a team member | Use a password manager like 1Password, Bitwarden, or a secure sharing tool like Signal instead of email or Slack |
| When a contractor requests access to staging server passwords | Create a one-time secret using tools like OneTimeSecret.com or 1Password's Psst feature. Share the self-destructing link through a separate channel and ensure it expires after first access. |
