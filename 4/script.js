function htmlTree(node) {
    let htmlString = `<${node.tagName}`;
    if (node.attrs) {
        for (const [key, value] of Object.entries(node.attrs)) {
            htmlString += ` ${key}='${value}'`;
        }
    }
    htmlString += '>';

    if (node.children) {
        for (const child of node.children) {
            htmlString += htmlTree(child);
        }
    }

    htmlString += `</${node.tagName}>`;
    return htmlString;
}

// Перевірка результату
const table = {
    tagName: 'table',
    attrs: {
        border: "1",
    },
    children: [
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["1x1"],
                },
                {
                    tagName: "td",
                    children: ["1x2"],
                },
            ]
        },
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["2x1"],
                },
                {
                    tagName: "td",
                    children: ["2x2"],
                },
            ]
        }
    ]
};

const resultHTML = htmlTree(table);
document.write(resultHTML);

function domTree(parent, node) {
    const element = document.createElement(node.tagName);

    if (node.attrs) {
        for (const [key, value] of Object.entries(node.attrs)) {
            element.setAttribute(key, value);
        }
    }

    if (node.children) {
        for (const childNode of node.children) {
            const childElement = domTree(element, childNode);
            element.appendChild(childElement);
        }
    }

    parent.appendChild(element);
    return element;
}

// Перевірка результату
const table = {
    tagName: 'table',
    attrs: {
        border: "1",
    },
    children: [
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["1x1"],
                },
                {
                    tagName: "td",
                    children: ["1x2"],
                },
            ]
        },
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["2x1"],
                },
                {
                    tagName: "td",
                    children: ["2x2"],
                },
            ]
        }
    ]
};

domTree(document.body, table);



function deepCopy(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    let copy;
    if (Array.isArray(obj)) {
        copy = [];
        for (let i = 0; i < obj.length; i++) {
            copy[i] = deepCopy(obj[i]);
        }
    } else {
        copy = {};
        for (const key in obj) {
            if (Object.hasOwnProperty.call(obj, key)) {
                copy[key] = deepCopy(obj[key]);
            }
        }
    }

    return copy;
}

// Перевірка результату
const arr = [1, "string", null, undefined, { a: 15, b: 10, c: [1, 2, 3, 4], d: undefined, e: true }, true, false];
const arr2 = deepCopy(arr);
console.log(arr2);

const table = {
    tagName: 'table',
    attrs: {
        border: "1",
    },
    children: [
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["1x1"],
                },
                {
                    tagName: "td",
                    children: ["1x2"],
                },
            ]
        },
        {
            tagName: 'tr',
            children: [
                {
                    tagName: "td",
                    children: ["2x1"],
                },
                {
                    tagName: "td",
                    children: ["2x2"],
                },
            ]
        }
    ]
};

const table2 = deepCopy(table);
console.log(table2);


function stringify(data) {
    if (typeof data === 'undefined') {
        return 'undefined';
    }
    if (typeof data === 'function') {
        return undefined;
    }
    if (typeof data === 'symbol') {
        return undefined;
    }
    if (typeof data === 'bigint') {
        return undefined;
    }
    if (data === null || typeof data !== 'object') {
        return JSON.stringify(data);
    }

    if (Array.isArray(data)) {
        const arrayValues = data.map(item => stringify(item));
        return `[${arrayValues.join(',')}]`;
    }

    const objectEntries = Object.entries(data).map(([key, value]) => {
        if (typeof value === 'undefined') {
            return `"${key}": undefined`;
        }
        if (typeof value === 'function') {
            return undefined;
        }
        if (typeof value === 'symbol') {
            return undefined;
        }
        if (typeof value === 'bigint') {
            return undefined;
        }
        return `"${key}":${stringify(value)}`;
    }).filter(entry => entry !== undefined);

    return `{${objectEntries.join(',')}}`;
}

// Перевірка результату
const arr = [1, "string", null, undefined, { a: 15, b: 10, c: [1, 2, 3, 4], d: undefined, e: true }, true, false];
const jsonString = stringify(arr);
console.log(jsonString);

const jsonString2 = stringify(table);
console.log(jsonString2);

console.log(JSON.parse(jsonString));
console.log(jsonString === JSON.stringify(arr));
console.log(jsonString2 === JSON.stringify(table));


function getElementById (idToFind) {
    function walker(parent) {
        if (parent.id === idToFind) {
            throw parent;
        }
        if (parent.children) {
            for (const child of parent.children) {
                walker(child);
            }
        }
    }

    walker(document.body);
}

// Перевірка результату
try {
    const element = getElementById ('myId');
    console.log('Element found:', element);
} catch (error) {
    console.log('Element not found with id:', error.id);
}
