# ABAC_ui Demo :book:
Di seguito alcune specifiche sul codice __Frontend__ relativo alla demo __ABAC__ in keycloak

# Prerequisiti :package:
per "runnare" il __Frontend__ e' necessario installare:
- nodejs
- npm
- @angular/cli

# OAUTH2 Config :lock:
In <strong>/src/app/home/home.component.ts</strong> e' presente la configurazione relativa all' OAUTH2 che verra poi utilizzata dal frontend per eseguire l'autenticazione.

```javascript
const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: 'http://localhost:8080/realms/Demo',

  // URL of the SPA to redirect the user to after login
  redirectUri: 'http://localhost:4200',

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: 'leonardo',

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  dummyClientSecret: '<client_secret>',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile',

  showDebugInformation: true,
};
```

# User Info :bust_in_silhouette:
Per ottenere le informazioni utente viene chiamata l'endpoint di keycloak che restituisce le informazioni relative agli attributi (attributi custom compresi),
```
{protocol}://{domain}:{port}/realms/{realm}/account/?userProfileMetadata=true
```
>:warning: per poter chiamare quest'endpoint e' necessario essere loggati e avere un'access_token valido

potendo cosi poi creare un lista dinamica utilizzando <strong>@for</strong> di Angular
```html
<div class="col-4 rounded-3 shadow p-4">
    <h1 class="text-primary mb-3">Credenziali</h1>
    @for(attribute of attributes; track attribute){
        <div class="form-group mt-4">
            <label for="exampleInputText" class="active">{{attribute.key}}</label>
            @if (attribute.key == "sede"){
              <input readonly type="text" class="form-control" id="exampleInputText" value="{{getUpperCase(attribute.value)}}">
            }@else{
              <input readonly type="text" class="form-control" id="exampleInputText" value="{{attribute.value}}">
            }
        </div>
    }
</div>
```

# Le Richieste :mega:

Nel riquadro di destra sono presenti dei pulsanti che fanno partire speficihe richieste definite all'interno di <strong>/src/app/home/home.component.html</strong>
```html
<button (click)="getInfo('http://localhost:4242/sede')" class="btn btn-success w-100">Risorsa Aperta</button>

```

che al click effettuera' la chiamata al resource server tramite la funzione
```js
getInfo(url: string){
  fetch(url, {
    method: 'GET',
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem('access_token')
    }
  }).then(el=>{
    if (el.ok){
      return el.json()
    }
    console.log(el)
    return {value: `<h1 class="text-danger">Error: ${el.statusText} ${el.status}</h1>`}
  })
  .then(parsed=>{
    if (document.querySelector('.display') && document.querySelector('.display')!.innerHTML)
      document.querySelector('.display')!.innerHTML = `<h3 class="text-primary" style="text-align: start;">Risorsa Protetta:</h3><br><span>${parsed.value}</span>`
  })
}

```
inoltre a puro scopo dimostrtivo la funzione si occupa anche di mostrare i dati ricevuti all'interno del display sottostante.
