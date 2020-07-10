const ul = document.querySelector('#transactions')

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


addTransactionInDom(typeTransactions[1])
addTransactionInDom(typeTransactions[0])