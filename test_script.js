import { readFileSync } from 'fs';
const content = readFileSync('nuxt.config.ts', 'utf-8');
console.log(content);
