document.addEventListener('DOMContentLoaded', () => {
const table = document.getElementById('table-body')
const form = document.getElementById('dog-form')

document.addEventListener('click', event => {
  if (event.target.classList.contains('dog-btn')) {
    const dogRow = document.querySelector(`[data-row-id='${event.target.dataset.id}']`)
    editDog(dogRow)
  }
})

fetch('http://localhost:3000/dogs')
.then(r => r.json())
.then(dogs => createTable(dogs))

function createTable(dogs){
  dogs.forEach(dog => {
  const row = document.createElement('tr')
  row.innerHTML =
  `
    <td class='center margin'> ${dog.name} </td>
    <td class='center margin'> ${dog.breed} </td>
    <td class='center margin'> ${dog.sex} </td>
    <td class='center margin'> <button data-id='${dog.id}' class='dog-btn center margin'>Edit</button> </td>
  `
  row.dataset.rowId = dog.id
  table.append(row)
  })
}

function editDog(dog) {
  form.children[0].placeholder = `${dog.children[0].innerText}`
  form.children[1].placeholder = `${dog.children[1].innerText}`
  form.children[2].placeholder = `${dog.children[2].innerText}`

  form.addEventListener('submit', event => {
    event.preventDefault()
    const data = {
      name: `${form.children[0].value}`,
      breed: `${form.children[1].value}`,
      sex: `${form.children[2].value}`
    }

    fetch(`http://localhost:3000/dogs/${dog.dataset.rowId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })

    dog.innerHTML =
    `
      <td class='center margin'> ${form.children[0].value} </td>
      <td class='center margin'> ${form.children[1].value} </td>
      <td class='center margin'> ${form.children[2].value} </td>
      <td class='center margin'> <button data-id='${dog.id}' class='dog-btn center margin'>Edit</button> </td>
    `
  })
}
})
