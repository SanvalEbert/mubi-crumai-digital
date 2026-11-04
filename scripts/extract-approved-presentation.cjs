'use strict';

const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const project = path.resolve(__dirname, '..');
const archive = path.join(project, 'Mubi-Crumai-Versao-Publicacao-UX.zip');
const destination = path.join(project, 'public', 'apresentacao');
if (!fs.existsSync(archive)) {
  console.log('ZIP aprovado ainda não enviado ao GitHub. Mantendo a página existente.');
  process.exit(0);
}

const data = fs.readFileSync(archive);
let eocd = -1;
for (let i = data.length - 22; i >= Math.max(0, data.length - 65557); i--) {
  if (data.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
}
if (eocd === -1) throw Error('ZIP inválido');
const count = data.readUInt16LE(eocd + 10);
let cursor = data.readUInt32LE(eocd + 16);
if (count === 0 || count > 100) throw Error('Quantidade inesperada de arquivos no ZIP');
const required = new Set([
  'index.html',
  'assets/instagram-3.png',
  'assets/instagram-4.png',
  'anexos/Mubi-Google-Business-Profile.pdf',
  'anexos/Crumai-Google-Business-Profile.pdf',
  'anexos/Proposta-Parceria-Digital.pdf'
]);
const found = new Set();
for (let n = 0; n < count; n++) {
  if (data.readUInt32LE(cursor) !== 0x02014b50) throw Error('Diretório ZIP inválido');
  const method = data.readUInt16LE(cursor + 10);
  const compressedSize = data.readUInt32LE(cursor + 20);
  const nameLength = data.readUInt16LE(cursor + 28);
  const extraLength = data.readUInt16LE(cursor + 30);
  const commentLength = data.readUInt16LE(cursor + 32);
  const localOffset = data.readUInt32LE(cursor + 42);
  const name = data.subarray(cursor + 46, cursor + 46 + nameLength).toString('utf8');
  cursor += 46 + nameLength + extraLength + commentLength;
  if (name.endsWith('/')) continue;
  if (name.startsWith('/') || name.includes('..') || name.includes('\\') || path.isAbsolute(name)) throw Error('Caminho ZIP inseguro: ' + name);
  if (data.readUInt32LE(localOffset) !== 0x04034b50) throw Error('Cabeçalho ZIP inválido: ' + name);
  const offset = localOffset + 30 + data.readUInt16LE(localOffset + 26) + data.readUInt16LE(localOffset + 28);
  const compressed = data.subarray(offset, offset + compressedSize);
  let content;
  if (method === 8) content = zlib.inflateRawSync(compressed);
  else if (method === 0) content = compressed;
  else throw Error('Método ZIP desconhecido: ' + method);
  const file = path.join(destination, name);
  fs.mkdirSync(path.dirname(file), {recursive:true});
  fs.writeFileSync(file, content);
  found.add(name);
}
for (const name of required) if (!found.has(name)) throw Error('Arquivo obrigatório ausente: ' + name);
console.log('Apresentação aprovada extraída com todos os anexos (' + found.size + ' arquivos).');
