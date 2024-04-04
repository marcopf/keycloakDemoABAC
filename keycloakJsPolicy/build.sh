if [ $# -lt 1 ]; then
    echo "Usage: $0 <outfile_name.jar>"
    exit 1
fi

python3 build.py

if ! [ -d target ]; then
  mkdir target
fi
cp -r ./policies/* META-INF target/.
cd target

if ls *.jar 1> /dev/null 2>&1; then
    rm *.jar
fi

jar cf $1 META-INF *.js
rm -r *.js META-INF
