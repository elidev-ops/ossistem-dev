const filterUsers = async (name) => 
  fetch(`https://jsonplaceholder.typicode.com/users?name_like=${name}`)
  .then(response => response.json())

const debaunceEvent = (fn, wait = 1000, time) => (...args) => {
  clearTimeout(time, time = setTimeout(() => fn(...args), wait))}

function handleKeyUp(event) {
    filterUsers(event.target.value)
    .then(users => console.log(users.map(user => user.name)))
}

document.addEventListener('keyup', debaunceEvent(handleKeyUp, 500))