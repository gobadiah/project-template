# Vault secrets

## Sentry

Paths:

* `secrets/sentry/api`
* `secrets/sentry/web`

Value: `dsn`

Source: [https://sentry.io]() > Organization > Project > Settings > Client Keys

## k8s

Path: `CLUSTER_NAME/k8s`

Type: pki

Source: The root certificate (public & private key) are those of the k8s corresponding cluster.
They can be found in the s3 bucket container under:

`s3://bucket/CLUSTER_NAME/pki/private/ca/*.key` and `s3://bucket/CLUSTER_NAME/pki/issued/ca/*.crt`

See [https://github.com/gobadiah/devops-toolbox]() / `vault-k8s-config` for further reading.

### Roles

To create a role (which will then translate into a k8s user), issue the following :

```
vault write CLUSTER_NAME/k8s/roles/circleci \
  max_ttl=1h \
  allowed_domains=circleci \
  allow_bare_domains=true
```

This will give the ability to vault token with write access to `CLUSTER_NAME/k8s/issue/circleci`
to generate trusted certificate for common_name `circleci`, which in turn can be used to authenticate
in the k8s corresponding cluster as user `circleci`. After that you still need to configure proper
permissions for this user in the k8s cluster.
