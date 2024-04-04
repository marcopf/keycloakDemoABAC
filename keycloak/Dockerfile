FROM quay.io/keycloak/keycloak:24.0.2 as builder

COPY --chown=keycloak:keycloak ./conf/policies/*.jar /opt/keycloak/providers/.

RUN /opt/keycloak/bin/kc.sh build


FROM quay.io/keycloak/keycloak:24.0.2

COPY --from=builder /opt/keycloak/ /opt/keycloak/

RUN mkdir -p /opt/keycloak/init

COPY --chown=keycloak:keycloak ./conf/backup.json /opt/keycloak/data/import/backup.json
COPY ./tools/init.sh /opt/keycloak/init/init.sh

ENTRYPOINT ["/bin/bash", "/opt/keycloak/init/init.sh"]
