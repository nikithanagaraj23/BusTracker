#!/bin/bash

export PORT=5660

cd ~/www/bustracker
./bin/bustracker stop || true
./bin/bustracker start
