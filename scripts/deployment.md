# Deployment documentation

There are two parts to deploying this application: the mobile app and the backend
server. The mobile app's deployment is not automated at all at this point. You must
make a build and distribute it manually. The deployment of the backend server, 
on the other hand, can be mostly automated. We'll discuss how to use the tools
provided here to configure a server to host the app's backend.

## Database disclaimer

We have been using MongoDB Atlas to host our database, connecting to the instance
by hardcoding the credentials in `src/server`. This is clearly not ideal, work
needs to be done here. So with that out of the way, the
rest of this documentation will not touch on the database. This is up to you
to extend on.

## Server requirements

This is just what we've worked with so far, so this should work for you, but if
you want to deploy on something other than what we've listed here, we can't 
guarantee this will all work as described!

We have been deploying the server on a basic VPS with a fresh install of Debian 
11 (bullseye). We haven't had a deployment that needed to handle production 
level traffic, so we can't really say what kind of compute you'll require, but 
for development deployments, just a basic VPS from any cloud provider will do.

## Server configuration

So you've got your Debian 11 VPS ready to go. What next? Well, we have a couple
of Ansible playbooks that take care of *almost* everything else. We'll walk 
through the couple of manual steps here.


### Set up SSH so that Ansible can connect

We'll assume that at this point, you have the ip address of the VPS and the 
root password. Currently we run the app as root, you may want to change this.
This step will depend on where you've provisioned your VPS. Essentially,
you need to get to a place where you can connect to the VPS using an SSH key
and not a password. If you're in the situation above, you can just run:

```bash
ssh-copy-id -i PATH_TO_PUBLIC_KEY root@VPS_IP_ADDRESS
```

### Populate Ansible inventory file

```bash
cp inventory_template.yaml inventory.yaml
```

Fill in this file with the IP Address of your VPS. 

One of the powerful features
of Ansible is that you can put multiple hosts into this file and have them
all be configured concurrently! Super easy and convenient.

### Ansible playbook 0

You're now ready to run the first Ansible playbook. You'll need ansible
installed on your machine. We won't get into what 
this script does, you can go look at the playbook if you are interested!

```bash
ansible-playbook -i inventory.yaml playbook0.yaml
```

### In-between steps

This is the annoying part. You need to `ssh` into the VPS, `cat` out the 
host's public ssh key,
```bash
cat .ssh/id.pub
```
copy the public key to your clipboard, and then paste it into the GitHub repo
as a deploy key. This allows the VPS to clone and otherwise interact with
the repository.

### Ansible playbook 1

Once you've got the deploy key set up, you can run playbook 1.

```bash
ansible-playbook -i inventory.yaml playbook1.yaml
```

After this script runs, the BIST App server will be running the contents of the
`prod` branch! Congrats!

### Configuring automated deployments to your new environment

If you want to set up automated deployments, you'll need to do some more 
configuration in GitHub.

1. Create an environment for this deployment (`dev`, `staging`, or `prod`).
1. Create a new ssh keypair to use for this environment.
1. `ssh-copy-id` the new public key onto the host VPS.
1. Populate the environment secrets `SSH_PRIVATE_KEY` with the ssh private key along `SSH_KNOWN_HOSTS` with the known_hosts file contents including your VPS.
1. Populate the environment variables with
```
DEPLOY_COMMAND = cd ~/NAME_OF_REPO_DIRECTORY && ./scripts/deploy.sh
SSH_HOST = root@VPS_IP_ADDRESS
```
### Additional help

If you have any questions or encounter any problems, please don't hesitate to
get in touch with spalmurray at spencer@spalmurray.com

Good luck!