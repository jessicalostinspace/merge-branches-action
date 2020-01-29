#!/bin/bash
set -ex

branchName=$1
baselineBranch=$2
repositoryUrl=$3

echo =================================================
echo  MERGING RELEASE $branchName INTO $baselineBranch          
echo =================================================

numberOfMatches=$(git branch -r | grep -c $branchName)
if [[ numberOfMatches -gt 1 ]]; then
    trap 'last_command=$current_command; current_command=$numberOfMatches' DEBUG
    trap 'echo "\"${last_command}\" command filed with exit code 1."' EXIT
    exit 2
fi
remoteBranch=$(git branch -r | grep $branchName)
echo $remoteBranch

git fetch
git checkout $baselineBranch
git config --global user.email "github-actions@noreply.github.com"
git config --global user.name "github-actions"
git remote set-url origin $repositoryUrl
git pull origin $baselineBranch
git merge --no-ff $remoteBranch
git push origin $baselineBranch
