#!/bin/bash

source ./secrets/config.sh
export PGPASSWORD = $pgpassword

echo "DATABASE CONFIGURATION START"
dropdb -U $username --if-exist logostore
createdb -U $username logostore

echo "MIGRATING TABLES"
psql -U $username logostore < db/migration/logo.sql
psql -U $username logostore < db/migration/account.sql

echo "SEEDING TABLE DATA"
node ./db/seed/logo.js
node ./db/seed/account.js

echo "CONFIGURATION FINISH"
