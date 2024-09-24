## Manning Press: Getting Mean 2
To start the server, run:
```
$ DEBUG=MeanManning:* npm start
```

To run mongo in a docker container:
```
$ docker run --name mongodb -d -p 27017:27017 mongodb/mongodb-community-server:6.0-ubi8
```

For the map, you need to have a Google Maps API key.  The application expects this in a .env file in the root of the application.

```
API=[YOUR KEY HERE]
```