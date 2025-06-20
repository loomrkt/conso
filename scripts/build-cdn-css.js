const fs = require('fs');
const path = require('path');

const componentsPath = path.resolve(__dirname, '../components.json');
const tempHtmlPath = path.resolve(__dirname, '../temp/tailwind-content.html');

const components = JSON.parse(fs.readFileSync(componentsPath, 'utf-8'));

let html = '<!DOCTYPE html><html><body>\n';

components.forEach(({ jsx }) => {
  const matches = jsx.match(/className="([^"]+)"/g) || [];
  matches.forEach(match => {
    const classList = match.replace(/className="|"/g, '').split(/\s+/);
    html += `<div class="${classList.join(' ')}"></div>\n`;
  });
});

html += '</body></html>';

fs.mkdirSync(path.dirname(tempHtmlPath), { recursive: true });
fs.writeFileSync(tempHtmlPath, html);

console.log(`✅ Fichier HTML généré pour Tailwind : ${tempHtmlPath}`);
