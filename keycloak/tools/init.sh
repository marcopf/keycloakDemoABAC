#!/bin/bash

/opt/keycloak/bin/kc.sh start-dev \
	--features="scripts" \
	--http-port 8081 \
	--hostname-port=8081 \
	--hostname-strict=false \
	--db postgres \
	--db-url-host postgres \
	--db-username $DB_USER \
	--db-password $DB_PASSWORD \
	--import-realm
