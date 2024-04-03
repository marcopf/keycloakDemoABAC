# Policies
E' possibile creare un file jar contentente tutte le policy desiderate, specicandole all'interno della cartella <strong>META-INF/keycloak-scripts.json</strong> la seguente struttura:
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
> :warning: Nei file js che determinano la policy <strong>const</strong> e <strong>let</strong> sembrano non essere piu' supportate e' consigliabile dunque procedere con <strong>var</strong>.

aggiungendo un oggetto json all'array policies per ogni policy richiesta.
Si procede poi alla compressione della cartella utilizzando il comando:
```
jar -cf <nome_file.jar> <file_che_si_vogliono_comprimere>
```


Ottenuto il file .jar questo va inserito nella cartella providers di keycloak e il server va "startato" abilitando la feature scripts per esempio da dentro la cartella keycloak basta eseguire

```
./bin/kc.sh start-dev --features scripts  
```
In seguito basta creare un client con il toggle Authorization abilitato e nelle impostazioni del client selezionare il tab Authorization e poi Policies, da li potremo inserire la nostra policy che verra' listata tra quelle disponibili, verra' aperto un menu che permette di assegnare un nome e una descrizione, fatto cio' e lasciando il campo code in bianco basta salvare la policy e il codice che avevamo importato appirara', sara' poi possibile utilizzare la nuova policy per definire le "permission" desiderate.