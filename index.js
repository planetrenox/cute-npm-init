#!/usr/bin/env node
import packageJson from './package.json' assert { type: 'json' };
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { _ } from 'cute-con';
import URL from 'cute-fs';

let packageName;
let cwd;
let srcDirPath;
let githubDirPath;
let god = '';
let isPR = false;

const whoami = () =>
{
    try {
        god = execSync('npm whoami', {stdio: 'pipe'}).toString().trim();
        if (god === 'planetrenox') isPR = true;
    }
    catch {}
};

function main()
{
    whoami();
    cwd = process.cwd();
    packageName = path.basename(cwd);
    srcDirPath = path.join(cwd, 'src');
    githubDirPath = path.join(cwd, '.github/workflows');
    fs.mkdirSync(srcDirPath, {recursive: true});
    fs.mkdirSync(githubDirPath, {recursive: true});
    createPackageJson();
    createIndexJs();
    createCliJs();
    //createRollupConfig();
    createGitIgnore();
    createReadMe();
    createIndexHtml();
    createTestJs();
    createGithubDir();

    _(`Project initialization completed with cute-npm-init`);
}

function createPackageJson()
{
    _("cute-npm-init v" + packageJson.version);
    const packageJsonPath = path.join(cwd, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
        const packageJson = {
            name: packageName,
            version: "0.1.0",
            description: "Experimental.",
            main: `./dist/uniport.js`,
            browser: './dist/uniport.mjs',
            bin: {[packageName]: "src/cli.js"},
            scripts: {
                "cli": "node ./src/cli.js",
                "prepublishOnly": ""
            },
            author: `${god}`,
            license: isPR ? "CC-BY 4.0" : "MIT",
            homepage: isPR ? `https://planetrenox.github.io/${packageName}` : '',
            repository: `git+https://github.com/${god}/${packageName}.git`,
            funding: isPR ? "https://bit.ly/incessant-vibration" : "",
            keywords: ["front-end", "cli", "frameworks"],
            files: ["src, dist"]
        };
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        _("Generated package.json with cute defaults.");
    }
}

function createIndexJs()
{
    const indexJsPath = path.join(srcDirPath, 'index.js');
    if (!fs.existsSync(indexJsPath)) {
        fs.writeFileSync(indexJsPath, `// import { _ } from 'cute-con';
// export const main = () => _("test.");
`);
        _("Generated index.js with cute defaults. For quick testing: npm run test");
    }
}

function createCliJs()
{
    const cliJsPath = path.join(srcDirPath, 'cli.js');
    if (!fs.existsSync(cliJsPath)) {
        const cliJsContent = `#!/usr/bin/env node
// import yargs from 'yargs';
// import { _ } from 'cute-con';
// _(\`${packageName}!!\`);
// if (yargs.argv['-f'] === true) _(yargs.argv._[0]);
`;
        fs.writeFileSync(cliJsPath, cliJsContent);
        _("Generated cli.js with CLI functionality. For placeholder testing: npm run cli");
    }
}

function createRollupConfig()
{
    const rollupConfigPath = path.join(srcDirPath, 'rollup.config.js');
    if (!fs.existsSync(rollupConfigPath)) {
        const rollupConfigContent = `import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    output: [
        { file: 'src/index.cjs', format: 'cjs' },
        { file: 'src/index.mjs', format: 'es' }
    ],
    plugins: [
        resolve()
    ]
};
`;
        fs.writeFileSync(rollupConfigPath, rollupConfigContent);
        _("Generated rollup.config.js with cute defaults.");
    }
}

function createGitIgnore()
{
    const gitIgnorePath = path.join(cwd, '.gitignore');
    if (!fs.existsSync(gitIgnorePath)) {
        const gitIgnoreContent = `**/.git
**/.DS_Store
**/Thumbs.db
**/.idea
**/package-lock.json
**/node_modules
**/dist
**/build
**/*.env
**/.cache
**/.vscode
**/coverage
**/logs
**/*.log
**/npm-debug.log*
**/yarn-debug.log*
**/yarn-error.log*
**/lerna-debug.log*
**/.pnpm-debug.log*
**/report.[0-9]*.[0-9]*.[0-9]*.[0-9]*.json
**/pids
**/*.pid
**/*.seed
**/*.pid.lock
**/lib-cov
**/*.lcov
**/.nyc_output
**/.grunt
**/bower_components
**/.lock-wscript
**/jspm_packages/
**/web_modules/
**/*.tsbuildinfo
**/.npm
**/.eslintcache
**/.stylelintcache
**/.rpt2_cache/
**/.rts2_cache_cjs/
**/.rts2_cache_es/
**/.rts2_cache_umd/
**/.node_repl_history
**/*.tgz
**/.yarn-integrity
**/.yarn/cache
**/.yarn/unplugged
**/.yarn/build-state.yml
**/.yarn/install-state.gz
**/.pnp.*
**/.next
**/out
**/.nuxt
**/.vuepress/dist
**/.temp
**/.docusaurus
**/.serverless/
**/.fusebox/
**/.dynamodb/
**/.tern-port
**/.vscode-test
`;
        fs.writeFileSync(gitIgnorePath, gitIgnoreContent);
        _("Generated .gitignore with cute npm defaults.");
    }
}

function createReadMe()
{
    const readMePath = path.join(cwd, 'readme.md');
    if (!fs.existsSync(readMePath)) {
        const readMeContent = `available on [npm](https://www.npmjs.com/package/${packageName})
\`\`\`⢸⠉⣹⠋⠉⢉⡟⢩⢋⠋⣽⡻⠭⢽⢉⠯⠭⠭⠭⢽⡍⢹⡍⠙⣯⠉⠉⠉⠉⠉⣿⢫⠉⠉⠉⢉⡟⠉⢿⢹⠉⢉⣉⢿⡝⡉⢩⢿⣻⢍⠉⠉⠩⢹⣟⡏⠉⠹⡉⢻⡍⡇
⢸⢠⢹⠀⠀⢸⠁⣼⠀⣼⡝⠀⠀⢸⠘⠀⠀⠀⠀⠈⢿⠀⡟⡄⠹⣣⠀⠀⠐⠀⢸⡘⡄⣤⠀⡼⠁⠀⢺⡘⠉⠀⠀⠀⠫⣪⣌⡌⢳⡻⣦⠀⠀⢃⡽⡼⡀⠀⢣⢸⠸⡇
⢸⡸⢸⠀⠀⣿⠀⣇⢠⡿⠀⠀⠀⠸⡇⠀⠀⠀⠀⠀⠘⢇⠸⠘⡀⠻⣇⠀⠀⠄⠀⡇⢣⢛⠀⡇⠀⠀⣸⠇⠀⠀⠀⠀⠀⠘⠄⢻⡀⠻⣻⣧⠀⠀⠃⢧⡇⠀⢸⢸⡇⡇
⢸⡇⢸⣠⠀⣿⢠⣿⡾⠁⠀⢀⡀⠤⢇⣀⣐⣀⠀⠤⢀⠈⠢⡡⡈⢦⡙⣷⡀⠀⠀⢿⠈⢻⣡⠁⠀⢀⠏⠀⠀⠀⢀⠀⠄⣀⣐⣀⣙⠢⡌⣻⣷⡀⢹⢸⡅⠀⢸⠸⡇⡇
⢸⡇⢸⣟⠀⢿⢸⡿⠀⣀⣶⣷⣾⡿⠿⣿⣿⣿⣿⣿⣶⣬⡀⠐⠰⣄⠙⠪⣻⣦⡀⠘⣧⠀⠙⠄⠀⠀⠀⠀⠀⣨⣴⣾⣿⠿⣿⣿⣿⣿⣿⣶⣯⣿⣼⢼⡇⠀⢸⡇⡇⠇
⢸⢧⠀⣿⡅⢸⣼⡷⣾⣿⡟⠋⣿⠓⢲⣿⣿⣿⡟⠙⣿⠛⢯⡳⡀⠈⠓⠄⡈⠚⠿⣧⣌⢧⠀⠀⠀⠀⠀⣠⣺⠟⢫⡿⠓⢺⣿⣿⣿⠏⠙⣏⠛⣿⣿⣾⡇⢀⡿⢠⠀⡇
⢸⢸⠀⢹⣷⡀⢿⡁⠀⠻⣇⠀⣇⠀⠘⣿⣿⡿⠁⠐⣉⡀⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠉⠓⠳⠄⠀⠀⠀⠀⠋⠀⠘⡇⠀⠸⣿⣿⠟⠀⢈⣉⢠⡿⠁⣼⠁⣼⠃⣼⠀⡇
⢸⠸⣀⠈⣯⢳⡘⣇⠀⠀⠈⡂⣜⣆⡀⠀⠀⢀⣀⡴⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢽⣆⣀⠀⠀⠀⣀⣜⠕⡊⠀⣸⠇⣼⡟⢠⠏⠀⡇
⢸⠀⡟⠀⢸⡆⢹⡜⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠋⣾⡏⡇⡎⡇⠀⡇
⢸⠀⢃⡆⠀⢿⡄⠑⢽⣄⠀⠀⠀⢀⠂⠠⢁⠈⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠂⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡀⠀⠄⡐⢀⠂⠀⠀⣠⣮⡟⢹⣯⣸⣱⠁⠀⡇
⠈⠉⠉⠉⠉⠉⠉⠉⠉⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠉⠉⠉⠉⠉⠉⠁
\`\`\`
\`\`\`
npm install ${packageName}
\`\`\`


A tiny description.


### Usage


\`\`\`JavaScript
import {} from '${packageName}';
\`\`\`
`;
        fs.writeFileSync(readMePath, readMeContent);
        _("Generated readme.md with cute defaults.");
    }
}

function createIndexHtml()
{
    const indexHtmlPath = path.join(cwd, 'index.htm');
    if (!fs.existsSync(indexHtmlPath)) {
        fs.writeFileSync(indexHtmlPath, `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${packageName}</title>
  ${isPR ? '<script data-goatcounter="https://ibetyoucountsheep.goatcounter.com/count" async src="//gc.zgo.at/count.js"></script>' : ''}
</head>
<body>
</body>
</html>
`);
        _("Generated index.html with cute defaults.");
    }
}

function createTestJs()
{

    const testJsPath = path.join(srcDirPath, 'test.js');
    if (!fs.existsSync(testJsPath)) {
        const testJsContent = `import { main } from './index.js';
main();
`;
        fs.writeFileSync(testJsPath, testJsContent);
        _("Generated test.js with test: npm run test");
    }
}

function createGithubDir()
{
    const cuteInitPath = path.join(githubDirPath, 'cute-npm-init');
    const npmPublish = path.join(githubDirPath, 'npm publish');
    URL(cuteInitPath).soft.write(`name: cute-npm-init
on:
  workflow_dispatch:
  
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install -g cute-npm-init
      - run: cute-npm-init
      - run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .
          git commit -m "Bot commit" -a || echo "No changes to commit"
          git pull --rebase
          git push`);
    URL(npmPublish).soft.write(`name: npm publish

on:
  release:
    types: [created]
  workflow_dispatch:

jobs:
  publish-npm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: https://registry.npmjs.org/
      - run: npm cache clean --force
      - run: rm -rf package-lock.json
      - run: npm install
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: \${{secrets.npm_token}}`);
    _("Generated workflows.");

}

main();

