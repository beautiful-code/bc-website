---
title: "CPU-Bound Work in Async Functions Stalls the Event Loop"
expertise: "backend-engineering"
slug: cpu-bound-async-event-loop
tech: [python, asyncio]
date: 2025-10-09
author: BeautifulCode
keytakeaway: Async/await coordinates I/O concurrency on a single thread, but CPU-bound tasks and blocking I/O calls prevent the event loop from yielding, eliminating concurrency entirely.
---

### The Single-Threaded Illusion

Python's asyncio event loop operates in a single thread, which creates a critical misconception: async/await magically enables parallelism. In reality, async/await only coordinates concurrency for I/O-bound operations. CPU-bound tasks block the event loop entirely, stalling all pending coroutines regardless of whether you've wrapped them in async functions. When a CPU-intensive operation runs inside an async function, it monopolizes the thread until completion, preventing the event loop from switching to other waiting tasks. This is fundamentally different from operating system threads, which allow true preemptive multitasking. Understanding this distinction is crucial because naive async code that includes CPU-bound work can actually perform worse than synchronous equivalents.

### I/O Mixing Defeats Concurrency

The most common mistake is mixing blocking I/O calls directly into async functions. Libraries that don't natively support asyncio, such as standard database drivers or HTTP clients, perform synchronous blocking I/O. When you call these directly from an async context, they block the entire event loop, preventing any other coroutines from executing. The async/await syntax provides no protection here, the event loop stalls, and you lose all concurrency benefits.

**Common Patterns and Their Impact:**

| Operation | Blocks Event Loop? | Example |
|-----------|-------------------|---------|
| `requests.get()` in async function | Yes | `await requests.get(url)` |
| `time.sleep()` | Yes | Blocks all pending tasks |
| `asyncio.gather()` with awaitable coroutines | No | Enables true concurrency |
| `asyncio.create_task()` | No | Non-blocking task scheduling |
| `asyncio.sleep()` | No | Yields control to event loop |

The solution is to use async-compatible libraries or bridge synchronous operations with `loop.run_in_executor()`, which offloads blocking work to a thread pool without stalling the event loop.

### Gathering and Scheduling Concurrently

`asyncio.gather()` and `asyncio.create_task()` are your primary tools for managing concurrent I/O. `asyncio.gather()` awaits multiple coroutines and returns their results once all complete, while `asyncio.create_task()` schedules a coroutine to run on the event loop and returns immediately with a Task object. The key difference: `gather()` waits at the call site, whereas `create_task()` schedules background work that proceeds while you continue execution. For proper concurrency, both require that the underlying operations are truly asynchronous (I/O-bound operations using async-native libraries like `aiohttp` or `asyncpg`).

Resource cleanup becomes critical in async contexts. Using `async with` ensures that context managers properly handle exception cases and guarantees cleanup code runs, even if a coroutine is cancelled or raises an exception. This prevents resource leaks like unclosed connections or pending file handles that commonly occur when managing multiple concurrent operations.

### Applied Insight: Executor Wrapping for Legacy Code

When integrating with synchronous libraries in an async application, use `loop.run_in_executor()` to delegate blocking operations to a ThreadPoolExecutor. This offloads the work without stalling the event loop, allowing other coroutines to continue. However, this approach adds overhead and doesn't scale for heavily CPU-bound workloads. For genuinely parallelizable CPU tasks, consider multiprocessing or moving computation to separate services. The design decision depends on whether your bottleneck is truly I/O latency (async is ideal), blocking library calls (use executor), or CPU utilization (parallelism is needed). Mixing async with synchronous blocking code without proper executor usage is a common performance regression that appears correct on the surface but fails under realistic concurrent load.