const fs = require('fs');
const path = require('path');

const tsickle_main = require('../node_modules/tsickle/built/src/main.js');
const tsickle = require('tsickle');
const typescript = require('typescript');

const CONFIG_FILENAME = 'tsconfig.json';

module.exports = function(source) {
  let diagnostics = [];
  let configPath = "";

  const config = typescript.readConfigFile(CONFIG_FILENAME, pathValue => { 
    configPath = path.resolve(__dirname, '..', pathValue);
    fs.readFileSync(configPath, 'utf-8');
  });
  const options = typescript.parseJsonConfigFileContent(config.config, typescript.sys, '.', [], CONFIG_FILENAME);

  const result = tsickle_main.toClosureJS(options.options, [this.resourcePath], {}, diagnostics, {tsickleCompilerHostOptions: {googmodule: false}});

  console.log("---");
  console.log(`tsickle-loader: Using TypeScript@${typescript.version} and ${configPath}`);
  console.log("---");

  // For passing the sourcemap later.
  //emitFile(name: string, content: Buffer|string, sourceMap: {...})
  
  if (diagnostics.length) {
    this.emitError(tsickle.formatDiagnostics(diagnostics));
  }

  let resultJSFile = "";
  result.jsFiles.forEach(function(jsFile, key) {
    if (!key.endsWith('.map')) {
      resultJSFile = jsFile;
    }
  });

  return resultJSFile;
}