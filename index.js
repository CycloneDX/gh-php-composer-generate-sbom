// This file is part of CycloneDX GitHub Action for PHP Composer
//
// Licensed under the Apache License, Version 2.0 (the “License”);
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//   http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an “AS IS” BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// SPDX-License-Identifier: Apache-2.0
// Copyright (c) Patrick Dwyer. All Rights Reserved.

const fs = require('fs');
const core = require('@actions/core');
const execSync = require('child_process').execSync;

try {
  // check it CycloneDX is installed
  try {
    execSync('composer make-bom -h');
  } catch (error) {
    console.log('Installing CycloneDX...');
    try {
      // try to enable the plugin
      execSync("composer config --no-plugins allow-plugins.cyclonedx/cyclonedx-php-composer true");
    } catch (error) {
      // pass - just try to continue
    }
    let output = execSync("composer require --dev --no-interaction 'cyclonedx/cyclonedx-php-composer:<4'", { encoding: 'utf-8' });
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