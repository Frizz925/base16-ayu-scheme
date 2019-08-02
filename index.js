const fs = require('fs');
const { light, mirage, dark } = require('ayu');
const author = 'Izra Faturrahman (https://github.com/Frizz925)';

const colorsSchemes = {
    'light': light,
    'mirage': mirage,
    'dark': dark,
};
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

Object.keys(colorsSchemes).forEach((name) => {
    const scheme = colorsSchemes[name];
    const schemeName = name.substring(0, 1).toUpperCase() + name.substring(1);
    const outputMap = [
        '',
        ['scheme', 'Ayu-' + schemeName],
        ['author', author],
    ];
    Object.keys(colorMap).forEach((key) => {
        const query = colorMap[key];
        const colorHex = traverse(scheme, query).hex()
            .substring(1, 7)
            .toUpperCase();
        outputMap.push(['base' + key, colorHex]);
    });
    const output = outputMap.reduce((curry, map) => {
        return curry + map[0] + ': "' + map[1] + '"\n'
    });

    const filename = 'ayu-' + name + '.yaml';
    fs.writeFile(filename, output, (err) => {
        if (err) {
            console.error(err);
        }
    });
});
