#!/bin/bash
set -eou pipefail

branchName=$1
baselineBranch=$2

echo =================================================
echo  MERGING RELEASE $branchName INTO $baselineBranch          
echo =================================================

git checkout $baselineBranch
git pull origin $baselineBranch
git merge $branchName
git push origin $baselineBranch