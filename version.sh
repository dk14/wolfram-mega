export REPOVERSION=$(echo $(npm pkg get version) | sed 's/.$//' | sed 's/^.//')
echo "REPOVERSION="$REPOVERSION >> $GITHUB_ENV