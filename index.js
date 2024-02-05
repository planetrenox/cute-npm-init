#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function initializeProject() {
    const cwd = process.cwd();
    createPackageJson(cwd);
    createIndexJs(cwd);
    createCliJs(cwd);
    createNpmIgnore(cwd);
    createGitIgnore(cwd);
    console.log("Project initialization completed with cute-npm-init.");
}

function createPackageJson(cwd) {
    const projectName = path.basename(cwd);
    const packageJsonPath = path.join(cwd, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
        const packageJson = {
            name: projectName,
            version: "0.1.0",
            description: "Experimental piercer stronghold. No tests.",
            main: "src/index.js",
            bin: {
              [projectName]: "./src/cli.js"
            },
            scripts: {"postinstall": "echo 'Customize this postinstall string in package.json'"},
            keywords: ["cute", "development", "deployment", "utility"],
            author: "",
            license: "CC-BY-4.0"
        };
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log("Generated package.json with cute defaults.");
    }
}

function createIndexJs(cwd) {
    const indexJsPath = path.join(cwd, 'index.js');
    if (!fs.existsSync(indexJsPath)) {
        const indexJsContent = `// require('dotenv').config(); // parses .env - use process.env.EDIT_THIS_KEY
        
module.exports = {  };
`;
        fs.writeFileSync(indexJsPath, indexJsContent);
        console.log("Generated index.js with CLI functionality.");
    }
}
