# Introduction
This is a repository meant for making development with High Availability Redis easy. Please read the documentation at [README.Docker.md](README.Docker.md) for more information.

You can find this image in Docker Hub at [hlince/redis-ha-dev](https://hub.docker.com/r/hlince/redis-ha-dev/)

# Compiling & Building this project
## Compile Node.js Code
1. Ensure that [pkg](https://www.npmjs.com/package/pkg) is installed globally. 
2. Run `npm run-script compile` in the root of the directory.

If the above two conditions are met a new file should exist in `/dist` called `redis-ha-dev`.

## Build Docker Image
After the Node.JS code is compiled you will need to run the following build command:

`docker build -t hlince/redis-ha-dev:latest .`
