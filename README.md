
# Demo ABAC

## Prerequisiti

Per poter utilizzare correttamente questa demo bisogna soddisfare alcuni requisiti.

#### Keycloak

- [ ] [Docker](https://docs.docker.com/get-docker/) 25+

#### SpringBoot :leaves:

- [ ] [Java JDK](https://www.oracle.com/java/technologies/downloads/) 17+
- [ ] [Maven](https://maven.apache.org/download.cgi) 3.8.7+

#### Frontend UI

- [ ] [nodejs](https://nodejs.org/en/download)
- [ ] [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [ ] [angular/cli](https://angular.io/cli#installing-angular-cli)

## Installazione :construction:

Clona la presente repository sul tuo sistema.

```bash
git clone https://github.com/marcopf/keycloakDemoABAC.git
cd keycloakDemoABAC
```

Dopo aver clonato la repo bisogna far partire i tre servizi:
1. **Keycloak** (Authorization Server)
1. **SpringBoot** (Resource Server)
1. **Frontend UI** (Client).

### Keycloak

Per far partire **Keycloak** bisogna creare un .env dove inserire alcune credenziali e creare una cartella per il volume del database.

1. Crea il file `.env` nella root della repo e copia all'interno del file le seguenti variabili d'ambiente.

    ```bash
    KEYCLOAK_ADMIN="admin"
    KEYCLOAK_ADMIN_PASSWORD="admin"
    DB_USER="user"
    DB_PASSWORD="password"
    ```

1. Crea la cartella per il volume del database `data/postgres`.

    ```bash
    mkdir -p data/postgres
    ```

1. Ora siamo pronti per far partire realmente il servizio con _docker_.

    ```bash
    docker compose up
    ```

> INFO: Per maggiori informazioni riguardo **Keycloak** leggete [qui](keycloak/README.me)

### SpringBoot :leaves:

Per far partire il servizio di **SpringBoot** bisogna prima compilare il _jar_ e poi lo si esegue.

Prima di tutto entra nella cartella `ABAC_resource_server`.

```bash
cd ABAC_resource_server
```

1. Compila con _Maven_ il _jar_.

    ```bash
    mvn clean compile package
    ```

2. Esegui il _jar_ con _Java_.

    ```bash
    java -jar target/demo-0.0.1-SNAPSHOT.jar
    ```

> INFO: Per maggiori informazioni riguardo **SpringBoot** leggete [qui](ABAC_resource_server/README.md)

### Frontend UI

Infine, per rendere disponibile il Frontend UI bisogna scaricare le dipendenze necessarie e poi bisogna compilare ed eseguire il server.

Prima di tutto entra nella cartella `ABAC_ui`
```bash
cd ABAC_ui
```

1. Installa le dipendenze necessarie con _npm_.

    ```bash
    npm install
    ```

1. Compila ed esegui il server per il frontend con _ng_.

    ```bash
    ng serve
    ```

> INFO: Per maggiori informazioni riguardo il Frontend UI leggere [qui](ABAC_ui/README.md)



## Utilizzo

Per utilizzare effettivamente la demo ci si deve collegare all'url sottostante tramite browser.
```
http://localhost:4200
```

Ed effettuare il login con uno degli utenti disponibili.

| username | password |
| -------- | -------- |
| mario | mario |
| luigi | luigi |
| paolo | paolo |
| marco | marco |

Infine, cliccando i vari bottoni vengono effettuate delle richieste a diverse risorse, ognuna con dei permessi diversi.

