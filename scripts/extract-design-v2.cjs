'use strict';

// Reconstructs the exact reviewed design V2 bundle at build time.
// The original PPT-derived presentation and annexes remain in public/apresentacao.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const root = path.resolve(__dirname, '..');
const input = path.join(root, 'design-v2', 'site.br64');
const output = path.join(root, 'public', 'v2');
if (!fs.existsSync(input)) throw new Error('O pacote do design V2 não foi encontrado.');

const compressed = Buffer.from(fs.readFileSync(input, 'utf8').trim(), 'base64');
const files = JSON.parse(zlib.brotliDecompressSync(compressed).toString('utf8'));
for (const filename of ['index.html', 'styles.css', 'app.js']) {
  if (!files[filename] || typeof files[filename] !== 'string') {
    throw new Error('Arquivo V2 ausente: ' + filename);
  }
}
let html = files['index.html'];
html = html.replaceAll('src="assets/', 'src="../apresentacao/assets/');
html = html.replaceAll('href="anexos/', 'href="../apresentacao/anexos/');
html = html.replaceAll('href="assets/', 'href="../apresentacao/assets/');

fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'index.html'), html, 'utf8');
fs.writeFileSync(path.join(output, 'styles.css'), files['styles.css'], 'utf8');
fs.writeFileSync(path.join(output, 'app.js'), files['app.js'], 'utf8');
for (const annex of ['Mubi-Google-Business-Profile.pdf', 'Crumai-Google-Business-Profile.pdf', 'Proposta-Parceria-Digital.pdf']) {
  if (!fs.existsSync(path.join(root,'public','apresentacao','anexos',annex))) {
    throw new Error('Anexo original ausente: ' + annex);
  }
}
console.log('Mubi + Crumaí V2 gerada: conteúdo e anexos originais preservados.');
