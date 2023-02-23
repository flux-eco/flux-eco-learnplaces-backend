# Flux Eco Learnplaces Backend

## Installalation

**install dependencies**
install packages according to package-lock.json
```    
    npm ci  
```    

**pm 2**
pm2 is an advanced process manager for Node.js applications that allows to start and monitor applications as daemons.
```    
    npm install pm2 -g 
```

## Configuration
Copy the config-template.mjs file to config.mjs and adapt it for your needs.

Copy the app/definitions/flux-eco-definition-template.json and adapt it for your needs.


## Operate

**Start the server using PM2 and the provided nodejs-manager.sh**

```
   pm2 start learnplaces-frontend-server.sh learnplaces-frontend-server
```

**To stop the Node.js Manager, use the following command:**

```
    pm2 stop learnplaces-frontend-server.sh learnplaces-frontend-server
```

**Log file**

Have a look to the log file for to make sure that the server is running.
```
   
```

**Troubleshooting**

Find running server(s)
```
ps aux | grep node
```

The result will be something like that
```
user     27136  0.0  0.0 1021696 42544 ?       Sl   10:42   0:00 node server.mjs
```

Stop them
```
kill -s SIGTERM 1234
```