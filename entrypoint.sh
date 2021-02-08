#!/bin/bash

createdb -E UTF8 $PGDATABASE -l en_US.UTF-8 -T template0
mix ecto.create
echo "Database $PGDATABASE created."

exec mix start
