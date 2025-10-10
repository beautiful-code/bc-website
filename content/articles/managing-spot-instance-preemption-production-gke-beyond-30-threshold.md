---
title: "Managing Spot Instance Preemption in Production GKE: Beyond the 30% Threshold"
expertise: infrastructure-reliability
slug: managing-spot-instance-preemption-production-gke-beyond-30-threshold
tech: [kubernetes, googlecloud, terraform, grafana]
date: 2025-10-10
author: BeautifulCode
keytakeaway: "GKE Spot preemption rates above 30% require intervention through instance family switches, region shifts, or adjusted Spot-to-on-demand ratios to maintain production reliability."
---

### GKE Spot Node Preemption Mechanics

GKE Spot nodes deliver 60-91% cost savings but can be reclaimed with 30 seconds notice when Google needs capacity for on-demand workloads. When preemption occurs, the node receives a termination signal, the kubelet marks it unschedulable, and triggers graceful pod eviction. The kube-scheduler automatically places evicted pods on available nodes—either remaining Spot nodes or on-demand fallback capacity.

The key is designing for this behavior. Workloads must tolerate interruption through stateless design, checkpointing, or external state management. GKE handles the orchestration; your application handles the fault tolerance.

### Building Preemption-Resilient Deployments

Think of it as:
- Taint = "Keep out unless you have permission"
- Toleration = "I have permission to enter"

GKE automatically taints Spot nodes, preventing pods from scheduling there by default.

```yaml
apiVersion: apps/v1
kind: Deployment
spec:
  replicas: 10
  template:
    spec:
      # Allow scheduling on Spot nodes (GKE adds this taint automatically)
      tolerations:
        - key: "cloud.google.com/gke-spot"
          operator: "Equal"
          value: "true"
          effect: "NoSchedule"
      affinity:
        nodeAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
            - weight: 100
              preference:
                matchExpressions:
                  - key: "cloud.google.com/gke-spot"
                    operator: "In"
                    values: ["true"]
      terminationGracePeriodSeconds: 25
```

Use node taints to prevent critical workloads from landing on Spot nodes. Configure pod affinity to prefer Spot while allowing fallback. Set termination grace periods under 30 seconds to complete shutdown before forced termination. Deploy PodDisruptionBudgets to maintain minimum replica counts during preemptions.

### The 30% Preemption Rate Threshold

Preemption rate is your early warning signal: (nodes preempted per hour / total spot nodes) × 100. When this consistently exceeds 30%, Google is aggressively reclaiming capacity for on-demand customers. At this point, operational overhead from constant rescheduling outweighs the cost savings—pod restarts spike, job queues back up, and your team spends more time firefighting than building.

Track this per instance family and region, not fleet-wide. An n2-standard-4 pool hitting 40% preemption in us-central1 while c2-standard-4 sits at 10% tells you exactly where to act. Export `gke_node_preempted_total` and `gke_node_count` metrics to Grafana or your observability platform. Set tiered alerts: warning at 25%, critical at 30%. Correlate with downstream impact metrics—pod restart rates, P95 job latency, queue depth—to quantify when preemption crosses from acceptable to destructive.

### Response Strategies When Crossing 30%

When preemption rates exceed 30%, take immediate action. First, switch instance families—if n2-standard-4 shows high preemption, try c2-standard-4 or n2d-standard-4. Different families have different availability profiles. Second, shift workloads to underutilized regions—preemption rates vary significantly by geography and time of day.

Third, adjust your Spot-to-on-demand ratio. Move from 80/20 to 70/30 or even 60/40 to add buffer capacity. The cost savings drop but reliability improves. Finally, consider time-shifting non-critical batch jobs to off-peak hours when Spot capacity is more stable. Monitor for 48 hours after changes to validate effectiveness.