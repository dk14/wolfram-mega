export REPOVERSION=$(echo $(npm pkg get version) | sed 's/.$//' | sed 's/^.//')
echo ::set-output name=REPOVERSION::"$REPOVERSION"