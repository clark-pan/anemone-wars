# anemone-wars
Engage in all out tentacle warfare against your fellow Actiniaria. Make your anemone the smartest and most adaptive species around to dominate the seas.


## Proper docs incoming ##

For now, install NodeJS, then run (in the directory)
```
npm install -g jspm pm2
npm install
jspm install
pm2 start ecosystem.json
```

that should install dependencies and open a webserver on localhost:3000


Deployment:

```
git checkout master
rm -rf jspm_packages
rm -rf node_modules
npm install && jspm install
jspm bundle-sfx client client/bundle.js --minify
git checkout --detach
git add -f jspm_packages
git add -f node_modules
git add -f client
git push --force origin HEAD:refs/heads/deploy
pm2 deploy production
```