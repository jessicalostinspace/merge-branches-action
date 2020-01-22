const core = require('@actions/core');
const github = require('@actions/github');

try {
  const branchPrefix = core.getInput('branch-prefix');
  const releaseVersion = core.getInput('release-version');
  const baselineBranch = core.getInput('baseline-branch');
  console.log(`branchPrefix ${branchPrefix}`);
  console.log(`releaseVersion ${releaseVersion}`);
  console.log(`baselineBranch ${baselineBranch}`);

//   core.setOutput("time", time);
} catch (error) {
  core.setFailed(error.message);
}