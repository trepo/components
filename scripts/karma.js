#! /usr/bin/env node
const fs = require('fs');
const path = require('path');
const {execSync} = require('child_process');

const component = process.argv[2];
const componentPath = path.join(__dirname, '../components', component);

// Ensure our component is valid
try {
  if (!component) {
    throw new Error();
  }
  const stats = fs.statSync(componentPath);
  if (!stats.isDirectory()) {
    throw new Error();
  }
} catch (error) {
    console.log(error);
    console.error(`invalid component: ${component}`);
    process.exit(1);
}

// Start webpack server
execSync(`../../node_modules/.bin/karma start`, {
  cwd: componentPath,
  stdio: 'inherit',
});
