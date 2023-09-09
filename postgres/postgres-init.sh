#!/usr/bin/env bash

  # --env PGDATA=/var/lib/postgresql/data/pgdata \
  # --volume $(pwd)/data:/var/lib/postgresql/data \

docker run \
  --name postgres-tasks \
  -p 5432:5432 \
  --env POSTGRES_DB=task-management \
  --env POSTGRES_USER=taskuser \
  --env POSTGRES_PASSWORD=34Ta5kUs3r! \
  --detach \
  --restart always \
  postgres
