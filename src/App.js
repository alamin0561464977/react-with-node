import { useEffect, useState } from 'react';
import './App.css';



function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])
  const handleAddUser = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email }

    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        const newUsers = [...users, data]
        setUsers(newUsers)
        console.log(data)
      })

  }


  return (
    <div>
      <h1>My Own data: {users.length}</h1>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='You name' required />
        <input type="email" name="email" id="" placeholder='You Email' required />
        <input type="submit" value="click" />
      </form>
      {
        users.map(user => <ul key={user.id}>Name:{user.name} id:{user.id}</ul>)
      }
    </div>
  );
}

export default App;
