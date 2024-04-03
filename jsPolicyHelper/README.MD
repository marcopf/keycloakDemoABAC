# Javascript Based policies in KEYCLOAK

Un semplice promemoria della struttura che permette la creazione di JavaScript based policy in keycloak, in <strong>META-INF/keycloak-scripts.json</strong> sara' presente una struttura del genere, abbastanza autoesplicativa.

```
{
  "policies": [
    {
    "name": "My Best Policy Ever",
    "filename": "policy.js",
    "Description": "policy Description"
    }
  ]
}
```
Una volda definiti i parametri desiderati si potra' procedere nello sviluppo della policy vera e propria all'interno del file <strong>policy.js</strong>
> :warning: <strong>const</strong> e <strong>let</strong> sembrano non essere piu' supportate e' consigliabile dunque procedere con <strong>var</strong>.

```
var context = $evaluation.getContext();
var identity = context.getIdentity();
var attributes = identity.getAttributes();
var email = attributes.getValue('email').asString(0);

if (email.endsWith('@keycloak.org')) {
    $evaluation.grant();
}

```

# Installazione :floppy_disk:
Una volta definito il codice JavaScript in policy.js si puo' procedere alla generazione del <strong>.jar</strong> tramite ./build.sh (eseguire sudo chmod +x build.sh in caso di mancato permesso).
Ottenuto il file .jar questo va inserito nella cartella providers di keycloak e il server va "startato" abilitando la feature scripts per esempio da dentro la cartella keycloak basta eseguire
```
./bin/kc.sh start-dev --features scripts  
```
In seguito basta creare un client con il toggle <strong>Authorization</strong> abilitato e nelle impostazioni del client selezionare il tab Authorization e poi Policies, da li potremo inserire la nostra policy che verra' listata tra quelle disponibili, verra' aperto un menu che permette di assegnare un nome e una descrizione, fatto cio' e lasciando il campo code in bianco basta salvare la policy e il codice che avevamo importato appirara'. Il "flow" di registrazione della nuova policy e' simile anche in caso di aggiunta per proteggere l'accesso al <strong>Resource Server</strong>.

# Testing :construction:
Fatto tutto sara' possibile testare la policy in modo semplice e veloce creando una risorsa in: client_details > Authorization > Resource > Create_resource.
si potra' cosi aggiungere una policy tramite il link Create permission e in seguito testare tramite il tab Evaluate definendo l'utente e la risorsa con la policy che vogliamo testare