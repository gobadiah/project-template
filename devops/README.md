# Devops

This component is a set of tools to ease setting up a new environment, which is a production-like
set of resources, used to stage changes before deploying to production.

It also provides other commands that can be used during continuous integration runs, or for
onboarding new users.

## Install

We'll need [aws cli](https://docs.aws.amazon.com/cli/latest/userguide/awscli-install-linux.html),
[kubernetes](https://kubernetes.io/docs/tasks/tools/install-kubectl/) and
[kops](https://github.com/kubernetes/kops/blob/master/docs/install.md).

### Macos

```
brew update && brew install awscli kubernetes-cli kops
```

### Linux

```
# aws
# follow link instructions to add to aws to your $PATH
pip install awscli --upgrade --user

# Kubernetes
apt-get update && apt-get install -y apt-transport-https
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb http://apt.kubernetes.io/ kubernetes-xenial main
EOF
apt-get update
apt-get install -y kubectl

# Kops
wget -O kops https://github.com/kubernetes/kops/releases/download/$(curl -s https://api.github.com/repos/kubernetes/kops/releases/latest | grep tag_name | cut -d '"' -f 4)/kops-linux-amd64
chmod +x ./kops
sudo mv ./kops /usr/local/bin/
```
