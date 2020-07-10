const ul = document.querySelector('#transactions')
const totalDisplay = document.querySelector('#balance')
const icomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')


const typeTransactions = [
    {id: 1, name:"Camisa", amount: -50},
    {id: 2, name:"Freelance", amount: 250},
    {id: 3, name:"Almoço", amount: -50},
    {id: 4, name:"Salário", amount: 600},
]

const addTransactionInDom = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const valueAbsolute = Math.abs(transaction.amount);
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML =  `
        ${transaction.name} <span> ${operator} R$ ${valueAbsolute}</span><button class="delete-btn">x</button>
    `
    ul.prepend(li)
}

const updateTransactionValues = () => {
    const transactiosAmount = typeTransactions
        .map(transaction => transaction.amount)
    const total = transactiosAmount
        .reduce((accumulator, transaction) => accumulator + transaction, 0)
        .toFixed(2)
    const income = transactiosAmount
        .filter((value) => value > 0)
        .reduce((accumulator,value) => accumulator + value, 0)
        .toFixed(2)
    const expense = Math.abs(transactiosAmount
        .filter((value) => value < 0)
        .reduce((accumulator,value) => accumulator + value, 0))
        .toFixed(2)
    
    totalDisplay.textContent =` R$ ${total}`
    icomeDisplay.textContent = ` R$ ${income}`
    expenseDisplay.textContent = ` R$ ${expense}`
}

const loadTransactions = () => {
    typeTransactions.forEach(addTransactionInDom)
    updateTransactionValues();
}

loadTransactions()