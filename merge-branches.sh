#!/bin/bash
# set -eou pipefail

branchName=$1
baselineBranch=$2
repositoryUrl=$3

echo =================================================
echo  MERGING RELEASE $branchName INTO $baselineBranch          
echo =================================================

remoteBranch=$(git branch -r | grep $branchName)
echo $remoteBranch

git fetch
git checkout $baselineBranch
git remote set-url origin $repositoryUrl
git pull origin $baselineBranch
git merge --no-ff $remoteBranch
git push origin $baselineBranch