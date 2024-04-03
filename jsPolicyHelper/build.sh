if [ $# -lt 2 ]; then
    echo "Usage: $0 <policy name> <outfile_name.jar>"
    exit 1
fi

cp -r META-INF_source META-INF
sed -i "s/policyNameReplace/$1/g" META-INF/keycloak-scripts.json
jar cf ./generated_policies/$2 META-INF policy.js
if [ -d META-INF ]; then
  rm -rf META-INF
fi
