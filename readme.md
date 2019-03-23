#RE-20
##Installation:
First install dependencies:<br>
```
docker
mysql
node
```
Then install node modules:<br>
`npm i`

Add database config to project root.<br>
Example config (`db-config.json`):<br>
```
{
  "host": "localhost",
  "user": "root",
  "password": "password",
  "database": "Hackathon"
}
```

Add `secret.json` to project root. Example:
```
{
  "secret": "mySecretString"
}
```

Start mysql docker container and create database:<br>
```

```

