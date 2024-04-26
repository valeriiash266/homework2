const BUY_ITEM = 'BUY_ITEM';


const buyItem = (itemName, quantity, money) => ({
    type: BUY_ITEM,
    payload: { itemName, quantity, money }
});


const initialState = {
    кіоск: {
        пиво: { кількість: 100, ціна: 30 },
        чіпси: { кількість: 50, ціна: 20 },
        шоколад: { кількість: 30, ціна: 25 }
    },
    каса: 0
};


const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case BUY_ITEM: {
            const { itemName, quantity, money } = action.payload;
            const item = state.кіоск[itemName];


            if (item && item.кількість >= quantity && money >= item.ціна * quantity) {
                return {
                    ...state,
                    кіоск: {
                        ...state.кіоск,
                        [itemName]: {
                            ...item,
                            кількість: item.кількість - quantity
                        }
                    },
                    каса: state.каса + item.ціна * quantity
                };
            } else {

                return state;
            }
        }
        default:
            return state;
    }
};

const store = Redux.createStore(rootReducer);

function renderItems(items) {
    const itemsContainer = document.getElementById('items');
    itemsContainer.innerHTML = '';
    for (const itemName in items) {
        const item = items[itemName];
        const itemElement = document.createElement('div');
        itemElement.textContent = `${itemName}: ${item.кількість} за ${item.ціна} грн`;
        itemsContainer.appendChild(itemElement);


        const option = document.createElement('option');
        option.value = itemName;
        option.textContent = itemName;
        document.getElementById('item-select').appendChild(option);
    }
}


function renderCash(cash) {
    document.getElementById('cash').textContent = `Каса: ${cash} грн`;
    document.title = `Каса: ${cash} грн`;
}


renderItems(initialState.кіоск);
renderCash(initialState.каса);


document.getElementById('buy-btn').addEventListener('click', () => {
    const itemName = document.getElementById('item-select').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const money = parseInt(prompt('Введіть кількість грошей'));

    store.dispatch(buyItem(itemName, quantity, money));
});


store.subscribe(() => {
    const state = store.getState();
    renderItems(state.кіоск);
    renderCash(state.каса);
});