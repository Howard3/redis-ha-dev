# Introduction
The purpose of this docker image is to allow easier development against a Redis High Availability Master/Slave/Sentinel/Sentinel/Sentinel setup without worrying about setting one up.

**Warning**
This image breaks traditional Docker paradigms by running multiple instances of redis in a single container. Running multiple applications in a single container shouldn't be practiced in production and as such this image is not meant for production. There is no benefit other than development to utilize this image.

# Running The Container
Run the following command to run the Redis HA Sentinel Example:
```
docker run -p 26379:26379 -p 26380:26380 -p 26381:26381 -p 6379:6379 -p 6380:6380 -it hlince/redis-ha-dev
```

# Entering Redis CLI
After the docker container is running execute the following command:
**Connect to a sentinel**
```
docker run --net=host -it hlince/redis-ha-dev redis-cli -p 26379
```
**Connect to a Master or Slave Server**
```
docker run --net=host -it hlince/redis-ha-dev redis-cli -p 6379
```

# Sentinel Ports
* _Sentinel.1_ - 26379
* _Sentinel.2_ - 26380
* _Sentinel.3_ - 26381

# Individual Redis Instance Ports
* _Initial Master_ - 6379
* _Initial Slave_ - 6380

# Sentinel Setup
In this container, masters are called `dev-example-redis-master` while slaves are called `redis-dev-example-slave`. It's necessary to know this when working with Redis to ensure that you can resolve the correct master via the driver when connecting to a sentinel.

It's necessary to ensure that the application being developed supports the ability to configure the master name as it's going to be different in your production environment.

More information as follows:
* *Python* - https://pypi.python.org/pypi/redis/#sentinel-support
* *Node.JS* - https://github.com/luin/ioredis#sentinel