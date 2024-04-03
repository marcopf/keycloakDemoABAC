//
//https://www.keycloak.org/docs/24.0.1/authorization_services/#_policy_js
//
var context = $evaluation.getContext();
var identity = context.getIdentity();
var attributes = identity.getAttributes();
var sede = attributes.getValue('sede').asString(0);

if (sede === 'chieti') {
    $evaluation.grant();
}
