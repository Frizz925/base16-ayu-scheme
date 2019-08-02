if (process.argv.length < 4) {
    console.error('Usage: index.js <color> <scheme-name>');
    process.exit(1);
}
const colorName = process.argv[2];
const schemeName = process.argv[3];
const author = 'Izra Faturrahman (https://github.com/Frizz925)';

const ayu = require('ayu');
if (!ayu.hasOwnProperty(colorName)) {
    console.error('Unknown color ' + colorName);
    process.exit(1);
}
const ayuColor = ayu[colorName];

const colorMap = {
    '00': 'common.bg',
    '01': 'ui.panel.bg',
    '02': 'ui.selection.bg',
    '03': 'syntax.comment',
    '04': 'common.ui',
    '05': 'common.fg',
    '06': 'common.accent',
    '07': 'common.ui',
    '08': 'syntax.markup',
    '09': 'syntax.error',
    '0A': 'syntax.special',
    '0B': 'syntax.string',
    '0C': 'syntax.regexp',
    '0D': 'syntax.tag',
    '0E': 'syntax.constant',
    '0F': 'common.accent',
};

function traverse(obj, query) {
    const keys = query.split('.');
    while (keys.length > 0) {
        const key = keys.shift();
        if (!obj.hasOwnProperty(key)) {
            return null;
        }
        obj = obj[key];
    }
    return obj;
}

console.log('scheme: "' + schemeName + '"');
console.log('author: "' + author + '"');
for (const key in colorMap) {
    if (!colorMap.hasOwnProperty(key)) {
        continue;
    }
    const query = colorMap[key];
    const colorHex = traverse(ayuColor, query).hex()
        .substring(1, 7)
        .toUpperCase();
    console.log('base' + key + ': "' + colorHex + '"');
}
