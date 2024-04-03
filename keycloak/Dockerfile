FROM quay.io/keycloak/keycloak:24.0.2

#RUN mkdir -p /opt/keycloak/backup
RUN mkdir -p /opt/keycloak/init

COPY --chown=keycloak:keycloak ./conf/policy.jar /opt/keycloak/providers/policy.jar
COPY --chown=keycloak:keycloak ./conf/backup.json /opt/keycloak/data/import/backup.json

COPY ./tools/init.sh /opt/keycloak/init/init.sh

ENTRYPOINT ["/bin/bash", "/opt/keycloak/init/init.sh"]
