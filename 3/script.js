function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fatherName = '';

    this.getFullName = function() {
        return `${this.firstName} ${this.fatherName ? this.fatherName + ' ' : ''}${this.lastName}`;
    }
}

const a = new Person("Вася", "Пупкін");
const b = new Person("Ганна", "Іванова");
const c = new Person("Єлизавета", "Петрова");

console.log(a.getFullName());
a.fatherName = 'Іванович';
console.log(a.getFullName());

console.log(b.getFullName());


function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.fatherName = '';
}

Person.prototype.getFullName = function() {
    return `${this.firstName} ${this.fatherName ? this.fatherName + ' ' : ''}${this.lastName}`;
}

const a = new Person("Вася", "Пупкін");
const b = new Person("Ганна", "Іванова");
const c = new Person("Єлизавета", "Петрова");

console.log(a.getFullName());
a.fatherName = 'Іванович';
console.log(a.getFullName());

console.log(b.getFullName());


function Store(reducer) {
    let state = reducer(undefined, {});
    const cbs = [];

    this.subscribe = function(cb) {
        cbs.push(cb);
        return () => {
            const index = cbs.indexOf(cb);
            if (index !== -1) cbs.splice(index, 1);
        };
    };

    this.dispatch = function(action) {
        state = reducer(state, action);
        cbs.forEach(cb => cb());
    };

    this.getState = function() {
        return state;
    };
}


const store = new Store(rootReducer);


function Password(parent, open) {
    const input = document.createElement('input');
    input.type = open ? 'text' : 'password';
    parent.appendChild(input);
    let value = '';

    input.addEventListener('input', () => {
        value = input.value;
        if (this.onChange) this.onChange(value);
    });

    this.getValue = function() {
        return value;
    };

    this.setValue = function(newValue) {
        value = newValue;
        input.value = newValue;
    };

    this.getOpen = function() {
        return input.type === 'text';
    };

    this.setOpen = function(newOpen) {
        input.type = newOpen ? 'text' : 'password';
        if (this.onOpenChange) this.onOpenChange(newOpen);
    };

    this.setStyle = function(style) {
        Object.assign(input.style, style);
    };

    this.onChange = null;
    this.onOpenChange = null;
}

// Usage
const p = new Password(document.body, true);

p.onChange = data => console.log(data);
p.onOpenChange = open => console.log(open);

p.setValue('qwerty');
console.log(p.getValue());

p.setOpen(false);
console.log(p.getOpen());


function LoginForm(parent) {
    const usernameInput = document.createElement('input');
    usernameInput.placeholder = 'Username';
    parent.appendChild(usernameInput);

    const password = new Password(parent, true);

    const loginButton = document.createElement('button');
    loginButton.textContent = 'Login';
    parent.appendChild(loginButton);

    this.enableLogin = function() {
        return !!usernameInput.value && !!password.getValue();
    };

    usernameInput.addEventListener('input', () => {
        loginButton.disabled = !this.enableLogin();
    });

    password.onChange = () => {
        loginButton.disabled = !this.enableLogin();
    };
}


const loginForm = new LoginForm(document.body);


function PasswordVerify(parent) {
    const password1 = new Password(parent, true);
    const password2 = new Password(parent, true);

    password1.onChange = () => {
        if (password1.getValue() !== password2.getValue()) {
            password1.setStyle({ border: '1px solid red' });
            password2.setStyle({ border: '1px solid red' });
        } else {
            password1.setStyle({ border: '1px solid black' });
            password2.setStyle({ border: '1px solid black' });
        }
    };

    password2.onChange = () => {
        if (password1.getValue() !== password2.getValue()) {
            password1.setStyle({ border: '1px solid red' });
            password2.setStyle({ border: '1px solid red' });
        } else {
            password1.setStyle({ border: '1px solid black' });
            password2.setStyle({ border: '1px solid black' });
        }
    };

    password1.onOpenChange = open => {
        if (open) password2.setStyle({ display: 'none' });
        else password2.setStyle({ display: '' });
    };
}


const passwordVerify = new PasswordVerify(document.body);

