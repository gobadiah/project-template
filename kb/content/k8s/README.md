# Kubernetes

To create k8s clusters we use [kops](https://github.com/kubernetes/kops) on
[aws](https://aws.amazon.com/).

## Create a cluster

```
[NODE_COUNT=6] [NODE_SIZE=m5.large] [MASTER_SIZE=t2.nano] [ZONES=us-west-1b] create_cluster [--dev] --cluster-name example
```

## Destroying a cluster

```
delete_cluster --cluster-name example
```

## Cluster administration

Kubernetes administration is done using the `kubectl` command, which uses what's called _context_.
It's just basically a set of information (including cluster api domain name, username / password
and other stuff) stored in a file. By default this file is stored at `~/.kube/config`, however
using `direnv` and `<project root>/.envrc` we define the env var `KUBECONFIG` to point to
`<project root>/.kube/config`, so as to clearly isolate the project contexts.

Each k8s context correponds to a k8s cluster. This cluster can be anywhere, in aws, google cloud or
on your workstation (using minikube).

In order to access one of the project cluster, you'll need one of the following:
* If you have access to the kops state store (env var `$KOPS_STATE_STORE`, which is usually a s3
bucket), you can the kubectl context by using the following command:

```
kops export kubecfg --name example
```

This command will store the kubectl context in the `$KUBECONFIG` file.

* If you don't have access to the kops state store, you should ask someone who has access for
credentials.

* When you create a new cluster, kops will automatically add the cluster context to your config
and set it to be the current-context (you need access to the kops state store to create a new
cluster).
