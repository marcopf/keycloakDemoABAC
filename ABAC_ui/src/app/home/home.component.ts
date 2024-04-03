import { AfterViewInit, Component, Inject } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

async function getInfo() {
    
  // effettuo la richesta tramite fetch prestando attenzione all'asincronicita'
  const res = await fetch(`http://localhost:8080/realms/Demo/account/?userProfileMetadata=true`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + sessionStorage.getItem('access_token')
      }
  })

  //parso la risposta come json
  let resJson = [];
  try {
      if (res.ok){
        resJson = await res.json();
        console.log(resJson)
      }
  } catch (e) {
      console.log(e)
  }
  //altrimenti torno un'oggetto vuoto "[]"
  return resJson;
}

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
  dummyClientSecret: 'secret',

  responseType: 'code',

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: 'openid profile',

  showDebugInformation: true,
};


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {
  logged: boolean = false;
  interval: any = null;
  attributes: any = [];

  constructor(private oauthService: OAuthService, @Inject(PLATFORM_ID) private platformId: Object){
    if (isPlatformBrowser(this.platformId)){
      this.oauthService.configure(authCodeFlowConfig);
      this.oauthService.loadDiscoveryDocumentAndTryLogin();
    }
  }

  getUpperCase(string: string){
    return String(string).toUpperCase();
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)){
      this.interval = setInterval(()=>{
        if (sessionStorage.getItem('access_token') != null){
          this.logged = true;
          console.log("hey")
          getInfo().then(el=>{
            console.log(el)
            this.attributes.push({"key": "username", "value": el.username});
            this.attributes.push({"key": "firstName", "value": el.firstName});
            this.attributes.push({"key": "lastName", "value": el.lastName});
            this.attributes.push({"key": "email", "value": el.email});
            Object.keys(el.attributes).forEach(key=>{
              this.attributes.push({"key": key, "value": el.attributes[key]});
            })
            console.log(this.attributes)
          })
          console.log(this.attributes)
          clearInterval(this.interval);
        }
      }, 100)
    }
  }

  login(){
    this.oauthService.initCodeFlow();
  }

  logout(){
    this.oauthService.logOut();
    this.oauthService.revokeTokenAndLogout();
  }

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

}
