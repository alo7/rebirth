#!/bin/bash

# open virtual desktop
xvfb-run --listen-tcp --server-num=76 --server-arg="-screen 0 2048x1024x24" --auth-file=$XAUTHORITY node index.js &

# xvfb-run startup takes some time, waiting for a while
sleep 5s

# forward chrome remote debugging protocol port
socat tcp-listen:9223,fork tcp:localhost:9222 &

# start VNC service
if [[ $START_VNC == "yes" ]]; then
  x11vnc -display :76 -passwd $VNC_PASSWORD -forever -autoport 5920 &
fi;

# get nodejs process pid
NODE_PID=$(lsof -i:80 | grep node | awk 'NR==1,$NF=" "{print $2}')

# forward SIGINT/SIGKILL/SIGTERM to nodejs process
trap 'kill -n 15 ${NODE_PID}' 2 9 15

# waiting nodejs exit
while [[ -e /proc/${NODE_PID} ]]; do sleep 1; done
