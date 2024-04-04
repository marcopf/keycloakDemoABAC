FROM quay.io/keycloak/keycloak:24.0.2 as builder

COPY --chown=keycloak:keycloak ./conf/policies/*.jar /opt/keycloak/providers/.
COPY --chown=keycloak:keycloak ./conf/providers/*.jar /opt/keycloak/providers/.
COPY --chown=keycloak:keycloak ./conf/security/kc.java.security /opt/keycloak/kc.java.security

# generating keystore
RUN keytool -keystore /opt/keycloak/conf/server.keystore \
  -storetype bcfks \
  -providername BCFIPS \
  -providerclass org.bouncycastle.jcajce.provider.BouncyCastleFipsProvider \
  -provider org.bouncycastle.jcajce.provider.BouncyCastleFipsProvider \
  -providerpath /opt/keycloak/providers/bc-fips-*.jar \
  -alias localhost \
  -genkeypair -sigalg SHA512withRSA -keyalg RSA -storepass passwordpassword \
  -dname CN=localhost -keypass passwordpassword \
  -J-Djava.security.properties=/opt/keycloak/kc.java.security

RUN /opt/keycloak/bin/kc.sh build


FROM quay.io/keycloak/keycloak:24.0.2

COPY --from=builder /opt/keycloak/ /opt/keycloak/

RUN mkdir -p /opt/keycloak/init

COPY --chown=keycloak:keycloak ./conf/backup.json /opt/keycloak/data/import/backup.json
COPY ./tools/init.sh /opt/keycloak/init/init.sh

ENTRYPOINT ["/bin/bash", "/opt/keycloak/init/init.sh"]
