import fs from 'fs';
const nodeModulesPath = './node_modules/';
fs.rmSync(nodeModulesPath + 'react', { recursive: true, force: true });
fs.rmSync(nodeModulesPath + 'react-dom', { recursive: true, force: true });
