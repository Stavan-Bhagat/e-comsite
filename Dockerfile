# Use the official Redis image from Docker Hub
FROM redis:latest

# Set metadata information like maintainer and version
LABEL maintainer="stavan <bhagatstavan7@gmail.com>"
LABEL version="1.0"

# Expose Redis port (default is 6379)
EXPOSE 6379
