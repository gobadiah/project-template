# Devops scripts

## setup

Will create an production like environment. Usage:

```
[ENV=my-env] setup
```

It's generally preferrable not to specify `ENV`, so that the name of the current branch will be
used.

## Privileges needed

* aws `kops` group for creating the k8s cluster.
* vault write access to `secret/clusters[/env]/*` for saving secret about the cluster

### Steps taken

* Creates a kubernetes cluster named `ENV.k8s.local` with 3 nodes and 1 master.
* Applies the kubernetes dashboard resource for convenience, creates and admin token for accessing
it and stores it into `secret/clusters[/env]/CLUSTER_NAME/dashboard@token`.
