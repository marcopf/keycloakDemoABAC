FROM quay.io/keycloak/keycloak:24.0.2

RUN mkdir -p /opt/keycloak/backup
RUN mkdir -p /opt/keycloak/init

COPY ./conf/policy.jar /opt/keycloak/providers/policy.jar
COPY ./conf/backup.json /opt/keycloak/backup/backup.json

COPY ./tools/init.sh /opt/keycloak/init/init.sh

ENTRYPOINT ["/bin/bash", "/opt/keycloak/init/init.sh"]
