
# Demo ABAC

## Prerequisiti 🗃️

Per poter utilizzare correttamente questa demo bisogna soddisfare tutti i requisiti riportati qui sotto.

#### Keycloak 🔑

- [ ] [Docker](https://docs.docker.com/get-docker/) 25+

#### SpringBoot :leaves:

- [ ] [Java](https://www.oracle.com/java/technologies/downloads/) 17+
- [ ] [Maven](https://maven.apache.org/download.cgi) 3.8+

#### Frontend UI 🖥️

- [ ] [nodejs](https://nodejs.org/en/download) 18+
- [ ] [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) 9+
- [ ] [angular/cli](https://angular.io/cli#installing-angular-cli) 17+

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

### Keycloak 🔑

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

> [!NOTE]
> Per maggiori informazioni riguardo **Keycloak** leggere [qui](keycloak/README.md)

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

> [!NOTE]
> Per maggiori informazioni riguardo **SpringBoot** leggere [qui](ABAC_resource_server/README.md)

### Frontend UI 🖥️

Infine, per rendere disponibile il Frontend UI bisogna scaricare le dipendenze necessarie e poi bisogna compilare ed eseguire il server.

> [!WARNING]
> Prima di proseguire controllare di aver installato tutti i [requisiti](#prerequisiti), leggere [qui](ABAC_ui/README.md) per istruzioni più dettagliate.

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

> [!NOTE]
> Per maggiori informazioni riguardo il Frontend UI leggere [qui](ABAC_ui/README.md)



## Utilizzo 🚀

Una volta completata l'installazione e aver fatto partire tutti i servizi, si può procedere al test della demo.
Prima di tutto bisogna collegarsi al `localhost:4200` da browser e poi si può effettuare il login con uno degli utenti disponibili riportati nella tabella sottostante.

| username | password |
| -------- | -------- |
| mario | mario |
| luigi | luigi |
| paolo | paolo |
| marco | marco |

Infine, cliccando i vari bottoni vengono effettuate delle richieste _GET_ a diverse risorse, ognuna con dei permessi diversi.



