// Fetch basic
fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => console.log(luke));

// Функція для відображення JSON у формі таблиці
function displayJSONAsTable(DOMElement, JSONData) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (const key in JSONData) {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = key;
        const td = document.createElement('td');
        if (typeof JSONData[key] === 'object') {
            td.textContent = JSON.stringify(JSONData[key]);
        } else {
            td.textContent = JSONData[key];
        }
        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    DOMElement.appendChild(table);
}

// Використання функції для відображення інформації про Люка Скайвокера
fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => displayJSONAsTable(document.body, luke));



// Fetch improved

function displayJSONAsTableWithFetch(DOMElement, JSONData) {
    const table = document.createElement('table');
    const tbody = document.createElement('tbody');

    for (const key in JSONData) {
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        th.textContent = key;
        const td = document.createElement('td');
        if (typeof JSONData[key] === 'string' && JSONData[key].includes('https://swapi.dev/api/')) {
            const button = document.createElement('button');
            button.textContent = JSONData[key];
            button.addEventListener('click', () => {
                fetch(JSONData[key])
                    .then(res => res.json())
                    .then(data => displayJSONAsTableWithFetch(DOMElement, data));
            });
            td.appendChild(button);
        } else if (typeof JSONData[key] === 'object') {
            td.textContent = JSON.stringify(JSONData[key]);
        } else {
            td.textContent = JSONData[key];
        }
        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }

    table.appendChild(tbody);
    DOMElement.appendChild(table);
}

// Використання функції для відображення інформації про Люка Скайвокера
fetch('https://swapi.dev/api/people/1/')
    .then(res => res.json())
    .then(luke => displayJSONAsTableWithFetch(document.body, luke));


// Race
const fetchPromise = fetch('https://swapi.dev/api/people/1/');
const delayPromise = new Promise(resolve => setTimeout(resolve, 2000));

Promise.race([fetchPromise, delayPromise])
    .then(result => {
        if (result instanceof Response) {
            console.log('Fetch was faster');
        } else {
            console.log('Delay was faster');
        }
    });

// Promisify: confirm
function confirmPromise(text) {
    return new Promise((resolve, reject) => {
        const result = confirm(text);
        if (result) {
            resolve();
        } else {
            reject();
        }
    });
}

// Використання функції для підтвердження
confirmPromise('Проміси це складно?')
    .then(() => console.log('Не так вже й складно'))
    .catch(() => console.log('Respect за посидючість і уважність'));


// Promisify: prompt
function promptPromise(text) {
    return new Promise((resolve, reject) => {
        const result = prompt(text);
        if (result === null) {
            reject();
        } else {
            resolve(result);
        }
    });
}

// Використання функції для отримання імені користувача
promptPromise("Як тебе звуть?")
    .then(name => console.log(`Тебе звуть ${name}`))
    .catch(() => console.log('Ну навіщо морозитися, нормально ж спілкувалися'));

// Promisify: LoginForm
function loginPromise(parent) {
    return new Promise((resolve, reject) => {
        const form = new LoginForm(parent);
        form.onSubmit((login, password) => {
            resolve({ login, password });
        });
    });
}

// Використання функції для отримання логіна та пароля з форми
loginPromise(document.body)
    .then(({ login, password }) => console.log(`Ви ввели ${login} та ${password}`));
