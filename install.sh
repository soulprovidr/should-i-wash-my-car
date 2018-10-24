#!/bin/bash

# node.js repo.
wget -qO- https://deb.nodesource.com/setup_8.x | sudo -E bash -

# yarn repo.
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

# certbot repo.
sudo add-apt-repository ppa:certbot/certbot

# Install project dependencies.
sudo apt update
sudo apt -y install \
  yarn \
  nodejs \
  nginx \
  software-properties-common \
  certbot
