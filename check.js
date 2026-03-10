const { execSync } = require('child_process');
try {
  let installOutput = execSync('npm install', { encoding: 'utf-8' });
  console.log("INSTALL OK:\n" + installOutput);
  let buildOutput = execSync('npm run build', { encoding: 'utf-8' });
  console.log("BUILD OK:\n" + buildOutput);
  let gitStatus = execSync('git status --porcelain', { encoding: 'utf-8' });
  console.log("GIT STATUS:\n" + gitStatus);
} catch (e) {
  console.log("ERROR:\n" + e.stdout + "\n" + e.stderr);
}
