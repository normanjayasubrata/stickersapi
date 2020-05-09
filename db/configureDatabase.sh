#!/bin/bash

source ./secrets/config.sh
export PGPASSWORD=$pgpassword

echo "DATABASE CONFIGURATION START"
dropdb -U $username --if-exist logostore
createdb -U $username logostore

echo "CONFIGURATION FINISH"
