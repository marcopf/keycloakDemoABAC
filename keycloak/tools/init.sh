#!/bin/bash

#/opt/keycloak/bin/kc.sh import --file /opt/keycloak/backup/backup.json
/opt/keycloak/bin/kc.sh start-dev --features scripts --db postgres --db-url-host postgres --db-username $DB_USER --db-password $DB_PASSWORD
