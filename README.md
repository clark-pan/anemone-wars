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


Prod build and deploy

```
./release.sh
```