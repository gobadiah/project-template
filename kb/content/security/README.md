# Security

Here are a list of different resources requiring access.

## Aws

User and apps may require access to aws resources.

Currently, _Nicolas_ and _Michaël_ have administrative access.

Most sensitive resource:

* _s3://clusters.project.com_: this bucket contains all k8s clusters certificates and admin 
credentials, including for production. 

Currently the `kops` aws group has very broad access, and therefore having the ability to create
new clusters means the ability to destroy the production cluster. This should be changed by denying
access to some part of the bucket, and refining the kops group policies to the minimum (this issue
has already been addressed by the kops team it seems).

* _hosted zone_: In order to create and destroy subdomain on the fly, as well as automating the
creation and renewal of ssl certificates using let's encrypt, a _hosted zone_ (aws) is managing the
project dns.

Access to this hosted zone is highly sensitive since anyone with access can take over the domain
name.

Ideally only the ability to create and destroy certain domain names should be granted to users and
certification scripts, and the officials subdomain (root and some others) should be only changed by
senior staff.

## Kubernetes

Kubernetes access allows for modifying a cluster resources, deploying new app versions, scaling up
and down, access pod logs and direct access.

k8s access is automically available for those having avec to the corresponding path in the kops
state store, which contains full admin access (as well as ca certificates).

Anyone creating a new cluster has de facto admin privilege to that cluster. For production-like
environment this should be okay (although some environment might require production-like security,
for example if made available to beta testers).

## Vault

Vault contains sensitive data required to run properly the project.
This includes among other things :
* 3rd party token access (external logging service, crash report, ...)
* The ability to generate limited aws access
* SSL certificates
* Custom secrets

Access to vault is provided through tokens. The initial root token should be stored somewhere safe,
 and other tokens should be created for user and apps.

Access to vault is the only way to access these data, since it is encrypted in the backend (consul).
