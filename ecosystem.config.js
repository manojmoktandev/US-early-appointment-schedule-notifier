module.exports = {
    "apps": [{
        "name": "App",
        "script": "src/cron/cronjob.js",
        "instances": 1,
        "autorestart": true,
        "watch": true,
        "time": false,
        "env": {
            "NODE_ENV": "prod"
        },
        "env_production": {
            "NODE_ENV": "prod"
        }
    }]
}
  