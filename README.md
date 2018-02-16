# Installation

## On Macos

* `brew install yarn`

## On linux

### Before (recommended)

These are general tools, not necessarily mandatory for the project, but recommended.

* Aptitude for searching packages

```
sudo apt-get install -y aptitude
```

* Generate ssh key

```
ssh-keygen -t rsa
```

* Use [Oh My Zsh](https://github.com/robbyrussell/oh-my-zsh) for shell configuration (coupled with [Zsh](https://doc.ubuntu-fr.org/zsh) obviously).

```
# Latest version of zsh first
cd /tmp
sudo apt-get install -y ncurses-dev
wget -O zsh-5.4.2.tar.gz "https://downloads.sourceforge.net/project/zsh/zsh/5.4.2/zsh-5.4.2.tar.gz?r=https%3A%2F%2Fsourceforge.net%2Fprojects%2Fzsh%2Ffiles%2Fzsh%2F5.4.2%2Fzsh-5.4.2.tar.gz%2Fdownload&ts=1518718011"
tar xvzf zsh-5.4.2.tar.gz
cd zsh-5.4.2
./configure
make
sudo make install

echo /usr/local/bin/zsh | sudo tee --append /etc/shells
chsh -s /usr/local/bin/zsh

# Reboot 
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

Learn about configuring the shell to your taste on the website. You should at least have `autoenv` : 

Add `autoenv` to the plugins list, and install autoenv : 

```
git clone git://github.com/kennethreitz/autoenv.git ~/.autoenv
```

### After

* [nodejs](https://doc.ubuntu-fr.org/nodejs#installation) (PPA nodesource)

```
# Get the latest version
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs

# Useful tool to run local binaries + neovim
sudo npm install -g npx neovim
```

* [yarn](https://yarnpkg.com/lang/en/docs/install/#linux-tab)

```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update && sudo apt-get install -y yarn
```

* [pyenv](https://github.com/pyenv/pyenv) We need python for `aws` so when there is python, there is `pyenv`

```
git clone https://github.com/pyenv/pyenv.git ~/.pyenv

sudo apt-get install -y make build-essential libssl-dev zlib1g-dev libbz2-dev \
libreadline-dev libsqlite3-dev wget curl llvm libncurses5-dev libncursesw5-dev \
xz-utils tk-dev
git clone https://github.com/pyenv/pyenv-virtualenv.git $(pyenv root)/plugins/pyenv-virtualenv
```
Then add `pyenv` to your plugins list.

* [awscli](https://docs.aws.amazon.com/fr_fr/cli/latest/userguide/installing.html) This is not actually needed for running the web server, but you do need credentials from aws, and we set them up with the cli.

```
# virtualenv for aws
pyenv install 3.6.3
pyenv virtualenv 3.6.3 aws
PYENV_VERSION=aws pip install --upgrade awscli
echo 'alias aws="PYENV_VERSION=aws aws"' >> ~/.zshrc
```

* [neovim](https://neovim.io/)

```
sudo add-apt-repository ppa:neovim-ppa/stable
sudo apt-get update
sudo apt-get install -y python-dev python-pip python3-dev python3-pip neovim

# Set it as default editor
sudo update-alternatives --install /usr/bin/vi vi /usr/bin/nvim 60
sudo update-alternatives --config vi
sudo update-alternatives --install /usr/bin/vim vim /usr/bin/nvim 60
sudo update-alternatives --config vim
sudo update-alternatives --install /usr/bin/editor editor /usr/bin/nvim 60
sudo update-alternatives --config editor
```

* [docker](https://www.docker.com/)

```
sudo apt-get update
sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"
   
sudo apt-get update
sudo apt-get install -y docker-ce

sudo usermod -a -G docker $(whoami)
```

* [postgresql](https://www.postgresql.org/)

```
sudo add-apt-repository 'deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | \
  sudo apt-key add -
sudo apt-get update
sudo apt-get install -y postgresql-10
sudo -u postgres psql -c "CREATE USER $(whoami)"
sudo -u postgres psql -c "CREATE DATABASE $(whoami) OWNER $(whoami)"
sudo -u postgres psql -c "ALTER USER $(whoami) CREATEDB"
sudo vim /etc/postgresql/10/main/pg_hba.conf
```

Set the policy to trust for all user / localhost and 127.0.0.1

```
# Database administrative login by Unix domain socket
local   all             postgres                                peer

# TYPE  DATABASE        USER            ADDRESS                 METHOD

# "local" is for Unix domain socket connections only
local   all             all                                     trust
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
```

Then

```
sudo service postgresql restart
```

* [jq](https://stedolan.github.io/jq/) json processing

```
sudo apt-get install -y jq
```

* [heroku](https://devcenter.heroku.com/articles/heroku-cli#debian-ubuntu)

```
wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh
```

* [git-flow](

```
wget --no-check-certificate -q  https://raw.githubusercontent.com/petervanderdoes/gitflow-avh/develop/contrib/gitflow-installer.sh && sudo bash gitflow-installer.sh install stable; rm gitflow-installer.sh
```
# Configuration

## Environment variables

We suggest you use a `.env` file at the root of your working directory for KinCube, e.g. `~/workspace/kincube/.env` even if the core repo is at `~/workspace/kincube/core`. See above for installing [autoenv](https://github.com/kennethreitz/autoenv).

List of env vars : 

* _AWS\_PROFILE_ : You should use a specific profile for `aws`, see [aws installation](#aws). typically we'll set it to `kincube`.
* _GOOGLE\_CLIENT\_ID_
* _GOOGLE\_CLIENT\_SECRET_ : Both are used for Google OAuth (allowing clients to login with their google account). You can get these from the google console, or from a friend.
* _FACEBOOK\_CLIENT\_ID_
* _FACEBOOK\_CLIENT\_SECRET_ : Same as Google, you can get them from facebook developer page. 

Finally your `.env` file should look like this :

```
AWS_PROFILE=kincube
GOOGLE_CLIENT_ID='google id'
GOOGLE_CLIENT_SECRET='google secret'
FACEBOOK_CLIENT_ID='facebook id'
FACEBOOK_CLIENT_SECRET='facebook secret
```

## Oh My Zsh (optional)

Run

```
 git clone https://github.com/zsh-users/zsh-completions ~/.oh-my-zsh/custom/plugins/zsh-completions
 git clone https://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
 git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

And edit `~/.zshrc` : 

```
plugins=(
  git
  autoenv
  pyenv
  zsh-autosuggestions
  zsh-completions
  zsh-syntax-highlighting
)
autoload -U compinit && compinit
```

## Heroku

```
heroku login
```

## AWS

Ask an administrator for an account, then

```
aws configure --profile kincube
```

With keys, region `eu-west-3` and format `json`.

## Neovim

* Setup python for `neovim` : 

```
pyenv install 2.7.14
pyenv install 3.6.3

pyenv virtualenv 2.7.14 neovim2
pyenv virtualenv 3.6.3 neovim3

PYENV_VERSION=neovim2 pip install neovim
PYENV_VERSION=neovim3 pip install neovim

PYENV_VERSION=neovim3 pip install flake8
```

Other dependencies

```
git clone git://github.com/bartman/git-wip.git /tmp/git-wip
cp /tmp/git-wip/git-wip ~/.local/bin
```

* [vim-plug](https://github.com/junegunn/vim-plug) Plugin manager

```
curl -fLo ~/.local/share/nvim/site/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

* Copy the given configuration file, or use it for inspiration

```
cp init.vim ~/.config/nvim/

# Change python3 and python2 path
let g:python_host_prog = '/usr/local/var/pyenv/versions/neovim2/bin/python2'
let g:python3_host_prog = '/usr/local/var/pyenv/versions/neovim3/bin/python3'

# to whatever the commands 
# PYENV_VERSION=neovim2 pyenv which python
# PYENV_VERSION=neovim3 pyenv which python
# Also change flake8 execution path to point to
# PYENV_VERSION=neovim3 pyenv which flake8
```

* Install the plugins

```
vim # Start the editor

:PlugInstall
:UpdateRemotePlugins
```

## Web

KinCube website in `web`.

* Install node dependencies : 

```
yarn install
```

## Api

KinCube api in `api`.

* Create a virtualenv and install dependencies :

```
pyenv virtualenv 3.6.3 kincube
pyenv local kincube
pip install -r requirements.txt
psql -c "CREATE DATABASE kincube_development"
python manage.py migrate
```

# Running project locally

With two terminals, run the website and the api : 

```
# in api/
python manage.py runserver
```

and

```
# web/
npm run dev
```

# Deploying to a production-like environment

This is the `devops` folder.

To deploy to an environment, you must first set it up : 

```
# in devops/
ENV=staging ./setup
```

Now you have a environment like production available at [https://kincube-web-staging.herokuapp.com]() You can then deploy as you wish

```
ENV=staging ./deploy
```

When you're done, you can destroy it (**NOT PRODUCTION**)

```
ENV=staging ./destroy
```

# Running tests

## web

```
# in dev/
npm run test
```

## api

```
# in api/
python manage.py test
```




