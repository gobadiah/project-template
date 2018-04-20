# Setting up a vault cluster

This is should be done very infrequently, ideally only once.

The purpose is to get a consul-backed vault cluster hosted in k8s on aws. This is where we store
secrets.

## Instructions

Create a cluster using:

```
NODE_SIZE=t2.small NODE_COUNT=3 create_cluster --cluster-name vault.k8s.local
```

Follow [these instructions](https://github.com/drud/vault-consul-on-kube).

A few changes:

Since we use aws, create the ebs volumes for the consul instances:

```
aws ec2 create-volume --availability-zone eu-west-1a --size 50 --tag-specifications 'ResourceType=volume,Tags=[{Key=VolumeFor,Value=consul-1},{Key=KubernetesCluster,Value=vault.k8s.local}]'
aws ec2 create-volume --availability-zone eu-west-1a --size 50 --tag-specifications 'ResourceType=volume,Tags=[{Key=VolumeFor,Value=consul-2},{Key=KubernetesCluster,Value=vault.k8s.local}]'
aws ec2 create-volume --availability-zone eu-west-1a --size 50 --tag-specifications 'ResourceType=volume,Tags=[{Key=VolumeFor,Value=consul-3},{Key=KubernetesCluster,Value=vault.k8s.local}]'
```

Use the VolumeId in the output of the commands above to replace in each deployments/consul-x.yml:

```
-          gcePersistentDisk:
-            pdName: consul-x
+          awsElasticBlockStore:
+            volumeID: vol-id-for-consul-x
```
