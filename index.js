const core = require('@actions/core');
const exec = require('@actions/exec');

const src = __dirname;

try {
  const branchPrefix = core.getInput('branch-prefix');
  const releaseVersion = core.getInput('release-version');
  const branchName = branchPrefix + releaseVersion;
  const baselineBranch = core.getInput('baseline-branch');
  const regexp = /^[\.A-Za-z0-9_-]*$/;

  console.log(`branchPrefix ${branchPrefix}`);
  console.log(`releaseVersion ${releaseVersion}`);
  console.log(`baselineBranch ${baselineBranch}`);

  if (regexp.test(branchName)) {
    mergeBranches(branchName, baselineBranch, repositoryUrl);
  } else {
    const regexError = "Branch prefix and semantic version must contain only numbers, strings, underscores, periods, and dashes.";
    core.setFailed(regexError);
  }

} catch (error) {
  core.setFailed(error.message);
}

async function mergeBranches(branchName, baselineBranch) {
    try {
      let output = '';
      let err = '';
  
      const options = {};
      options.listeners = {
        stdout: (data) => {
          output += data.toString();
        },
        stderr: (data) => {
          err += data.toString();
        }
      };
      options.cwd = './';
  
      await exec.exec(`${src}/merge-branches.sh`, [branchName, baselineBranch], options);
  
      if (output) {
        console.log('\x1b[32m%s\x1b[0m', `Github Output: ${output}`);
      } else {
        core.setFailed(err);
        process.exit(1);
      }
    } catch (err) {
      core.setFailed(`Could not merge branches because: ${err.message}`);
      process.exit(0);
    }
  }