const fs = require('fs');
const core = require('@actions/core');
const execSync = require('child_process').execSync;

try {
  // check it CycloneDX is installed
  try {
    execSync('composer make-bom -h');
  } catch (error) {
    console.log('Installing CycloneDX...');
    let output = execSync('composer require --dev --no-interaction cyclonedx/cyclonedx-php-composer', { encoding: 'utf-8' });
    console.log(output);
  }

  let command = `composer make-bom`

  console.log(`Running: ${command}`);

  output = execSync(command, { encoding: 'utf-8' });
  console.log(output);

  console.log('BOM Contents:');
  let bomContents = fs.readFileSync(`bom.xml`).toString('utf8');
  console.log(bomContents);
} catch (error) {
  core.setFailed(error.message);
}