# JS Policy Builder :book:

Di seguito una breve descrizione del funzionamento dello script che permette l'installazione di policy javascript all'interno di keyloak.

# JavaSrcipt Policies in Keycloak :passport_control:
In keycloak e' possibile implementare un sistema  __ABAC__ (attribute based access control) per definire in maniera granulare l'accesso alle risorse basandosi sugli attributi dell'utente che ne fa la richiesta.

Questo controllo avviene tramite __policy__ che possono essere inserite in keycloak nella cartella __providers__ per poi essere applicate nel client desiderato tramite il perscorso Authorization > Policies > create_new_policy.

Di seguito un'esempio relativo alla struttura di base di un file js contenente la policy...
>:warning: all'interno di questo file __let__ e __const__ non sono supportati e' dunque consigliabile l'uso di __var__
``` js
var context = $evaluation.getContext();
var identity = context.getIdentity();
var attributes = identity.getAttributes();
var sede = attributes.getValue('sede').asString(0);

if (sede === 'roma') {
    $evaluation.grant();
}

```
Una policy per essere riconosciuta ha bisogno anche di alcune informazioni aggiuntive, nel nostro caso parliamo della cartella [META-INF](META-INF) che viene gestista dallo script __py__ inserendo alla key __devices__ tanti oggetti json tanti quanti sono i file in [policies](policies).
In ogni caso la struttura che va rispettata e' la seguente:

```json
{
  "policies": [
    //----uno per ogni file in policies
    {
      "name": "<nome_policy>",
      "fileName": "<nome_file>.js",
      "description": "policy Description"
    }
    //-----
  ]
}
```
In fase di compilazione inoltre, e' bene ricordare di aggiungere la feature __scripts__, per esempio in fase di sviluppo e' possibile startare keycloak tramite:
```
./bin/kc.sh start-dev --features scripts  
```
supponendo di aver gia inserito il file jar relativo alle policy nella cartella providers.
# Compilazione :rocket:

dopo aver inserito tutti i file relativi alle policy in js all'interno della cartella [policies](policies) basta eseguire il seguente comando:
```bash
./build.sh <nome_out_file.jar>
```
>:warning: in caso di permesso negato basta eseguire il comando  __sudo chmod +x__

e verra' generata una cartella __target__ con al suo interno il file richiesto.