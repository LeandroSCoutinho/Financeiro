const ul = document.querySelector('#transactions')
const totalDisplay = document.querySelector('#balance')
const icomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')

const localStorageTransaction = JSON.parse(localStorage.getItem('transaction'))

let transactions = localStorage.getItem('transaction') !== null ? localStorageTransaction : []

const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id !== ID)
    addLocalStorage()
    loadTransactions()
}

const addTransactionInDom = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'
    const valueAbsolute = Math.abs(transaction.amount);
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML =  `
        ${transaction.name} 
        <span> ${operator} R$ ${valueAbsolute}</span>
        <button class="delete-btn" onclick='removeTransaction(${transaction.id})'>x</button>
    `
    ul.prepend(li)
}

const updateTransactionValues = () => {
    const transactiosAmount = transactions
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
    ul.innerHTML = '';
    transactions.forEach(addTransactionInDom)
    updateTransactionValues();
}

loadTransactions()

const addLocalStorage = () => {
    localStorage.setItem('transaction', JSON.stringify(transactions))
}

form.addEventListener('submit', event => {
    event.preventDefault()
    const transactionName = inputTransactionName.value.trim()
    const transactionAmount  = inputTransactionAmount.value.trim()
    const createID = transactions.length + 1

    if( transactionName === '' || transactionAmount === ''){
        alert("Preecha todos os campos")
        return
    }

    const transaction = {
        id: createID,
        name: transactionName,
        amount: Number(transactionAmount)
    }

    transactions.push(transaction)
    loadTransactions()
    addLocalStorage()

    transactionName.value = ''
    transactionAmount.value = ''

})