#!/bin/bash

git checkout master
rm -rf jspm_packages
rm -rf node_modules
npm install && jspm install
jspm bundle client client/bundle.js --minify
git checkout --detach
git add -f jspm_packages
git add -f node_modules
git add -f client
git commit -m "Build"
git push --force origin HEAD:refs/heads/deploy
pm2 deploy production
git checkout --