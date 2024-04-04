# Configurazione resource server in spring-boot 🍃
In questo piccolo progetto costruiremo un resource server in java utilizzando
**spring-boot** come resource server e **keycloak** come authorization server,
sfruttando i policy enforcers messi a disposizione da **keycloak**. 

## Prerequisiti 📦
- java 17
- Keycloak 24.0.2
- Spring-boot 3.2.4

Per le dependecies guardare direttamente il [pom](ABAC_resource_server/pom.xml).

## Configurazione sicurezza 🚧
Per configurare l'applicazione come resource server è necessario creare un __Bean__ che ritorni
un'implementazione di **SecurityFilterChain**:
```java
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((auth) -> auth
                        .anyRequest().authenticated());
        http.oauth2ResourceServer((oauth2) -> oauth2
                .jwt(Customizer.withDefaults()));

        http.addFilterAfter(policyEnforcerFilter(), BearerTokenAuthenticationFilter.class);
        return http.build();
    }
```
Dove la funzione **policyEnforcerFilter** è definita nel seguente modo:
```java
    private ServletPolicyEnforcerFilter policyEnforcerFilter() {
        PolicyEnforcerConfig config;

        try {
            config = JsonSerialization.readValue(getClass().getResourceAsStream("/enforce-policy.json"), PolicyEnforcerConfig.class);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        return new ServletPolicyEnforcerFilter(new ConfigurationResolver() {
            @Override
            public PolicyEnforcerConfig resolve(HttpRequest httpRequest) {
                return config;
            }
        });
    }
```
Questa funzione carica nel filtro del __PolicyEnforcer__ la configurazione del client definito su **keycloak**,
tale configurazione è presente nel file [enforce-policy.json](ABAC_resource_server/src/main/resources/enforce-policy.json).

## Risorse 📖
Nelle risorse sono presenti due file:
- enforce-policy.json
- application.yaml

Del primo se ne è già discusso sopra, mentre per l'__application.yaml__, oltre alle normali configurazioni, è necessario
specificare il seguenti campo:
```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
        issuer-uri: <INSERISCI QUI L'ISSUER-URI LINK>
```

## Altro 🔧
Per il resto si tratta della normale configurazione di un __RESTController__ in java **spring-boot**




