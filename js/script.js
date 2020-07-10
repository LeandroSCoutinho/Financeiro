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

const addTransactionInDom = ({id,name,amount}) => {
    const operator = amount < 0 ? '-' : '+'
    const CSSClass = amount < 0 ? 'minus' : 'plus'
    const valueAbsolute = Math.abs(amount);
    const li = document.createElement('li')

    li.classList.add(CSSClass)
    li.innerHTML =  `
        ${name} 
        <span> ${operator} R$ ${valueAbsolute}</span>
        <button class="delete-btn" onclick='removeTransaction(${id})'>x</button>
    `
    ul.prepend(li)
}

const getExpense = transactionAmount => Math.abs(transactionAmount
    .filter((value) => value < 0)
    .reduce((accumulator,value) => accumulator + value, 0))
    .toFixed(2) 

const getIncome = transactionAmount => transactionAmount
    .filter((value) => value > 0)
    .reduce((accumulator,value) => accumulator + value, 0)
    .toFixed(2)

const getTotal = transactionAmount => transactionAmount
    .reduce((accumulator, transaction) => accumulator + transaction, 0)
    .toFixed(2)

const updateTransactionValues = () => {
    const transactionAmount = transactions.map(({amount}) => amount)
    const total = getTotal(transactionAmount)
    const income = getIncome(transactionAmount) 
    const expense = getExpense(transactionAmount)
    
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

const addToTransactionArray = (transactionName,transactionAmount) => {
    const createID = transactions.length + 1
    const transaction = {
        id: createID,
        name: transactionName,
        amount: Number(transactionAmount)
    }

    transactions.push(transaction)
}

const cleanInput = () => {
    inputTransactionName.value = ''
    inputTransactionAmount.value = ''

}
const hadleFormSubmit = event => {
    event.preventDefault()
    const transactionName = inputTransactionName.value.trim()
    const transactionAmount  = inputTransactionAmount.value.trim()
    
    const isSomeInputEmpty = transactionName === '' || transactionAmount === '' 

    if(isSomeInputEmpty ){
        alert("Preecha todos os campos")
        return
    }

     addToTransactionArray(transactionName,transactionAmount)

    loadTransactions()
    addLocalStorage()
    cleanInput();


}

form.addEventListener('submit', hadleFormSubmit)