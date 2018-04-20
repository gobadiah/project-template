# Kubernetes

To create k8s clusters we use [kops](https://github.com/kubernetes/kops) on
[aws](https://aws.amazon.com/).

## Create a cluster

```
[NODE_COUNT=6] [NODE_SIZE=m5.large] [MASTER_SIZE=t2.nano] [ZONES=us-west-1b] create_cluster [--dev] --cluster-name example
```

## Destroying a cluster

```

```
