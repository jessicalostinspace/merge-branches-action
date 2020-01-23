#!/bin/bash
set -eou pipefail

branchName=$1
baselineBranch=$2

echo =================================================
echo  MERGING RELEASE $branchName INTO $baselineBranch          
echo =================================================

remoteBranch=$(echo $(git branch -r | grep $branchName))

git fetch
git checkout $baselineBranch
git pull origin $baselineBranch
git merge $remoteBranch
git push origin $baselineBranch