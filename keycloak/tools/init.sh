#!/bin/bash

/opt/keycloak/bin/kc.sh start-dev --features="scripts,fips" \
	--hostname=localhost --https-key-store-password=passwordpassword --https-key-store-type=bcfks \
	--log-level=INFO,org.keycloak.common.crypto:TRACE,org.keycloak.crypto:TRACE \
	--db postgres --db-url-host postgres --db-username $DB_USER --db-password $DB_PASSWORD \
	--import-realm \
   	-Djava.security.properties=/opt/keycloak/kc.java.security
