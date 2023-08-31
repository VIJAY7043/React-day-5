import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

// Component for List Users
const ListUsers = ({ users, deleteUser }) => (
  <div>
    <h2>List Users</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <Link to={`/edit-user/${user.id}`}>Edit</Link>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Component for Create User
const CreateUser = ({ createUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    createUser({ username, email });
    setUsername('');
    setEmail('');
  };

  return (
    <div>
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

// Component for Edit User
const EditUser = ({ match, users, updateUser }) => {
  const userId = parseInt(match.params.id);
  const user = users.find(user => user.id === userId);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleSubmit = e => {
    e.preventDefault();
    updateUser({ id: userId, username, email });
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

const App = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', email: 'user1@example.com' },
    { id: 2, username: 'user2', email: 'user2@example.com' },
    // ...
  ]);

  const createUser = newUser => {
    newUser.id = users.length + 1;
    setUsers([...users, newUser]);
  };

  const updateUser = updatedUser => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const deleteUser = userId => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <Router>
      <div>
        <h1>CRUD Dashboard</h1>
        <Route
          path="/users"
          render={() => <ListUsers users={users} deleteUser={deleteUser} />}
        />
        <Route path="/create-user" render={() => <CreateUser createUser={createUser} />} />
        <Route
          path="/edit-user/:id"
          render={({ match }) => <EditUser match={match} users={users} updateUser={updateUser} />}
        />
        {}
        <nav>
          <Link to="/users">List Users</Link> |{' '}
          <Link to="/create-user">Create User</Link> |{' '}
          <Link to="/edit-profile/:id">Edit Profile</Link>
        </nav>
      </div>
    </Router>
  );
};

export default App;
