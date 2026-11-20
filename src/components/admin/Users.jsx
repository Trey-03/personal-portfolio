
import { useEffect, useState } from 'react';
import API from '../../api/axiosConfig';

function Users() {
    const [users, setUsers] = useState([]);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await API.get('/users');
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = {
            firstname,
            lastname,
            email
        };

        if (password) {
            userData.password = password;
        }

        try {
            if (editId) {
                await API.put(`/users/${editId}`, userData);
                alert('User updated successfully!');
            } else {
                if (!password) {
                    alert('Please enter a password.');
                    return;
                }

                await API.post('/users', userData);
                alert('User added successfully!');
            }

            clearForm();
            getUsers();

        } catch (error) {
            console.error('Error saving user:', error);
            alert('Unable to save user.');
        }
    };

    const handleEdit = (user) => {
        setFirstname(user.firstname || '');
        setLastname(user.lastname || '');
        setEmail(user.email || '');
        setPassword('');
        setEditId(user.id || user._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await API.delete(`/users/${id}`);
                getUsers();
                alert('User deleted successfully!');
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Unable to delete user.');
            }
        }
    };

    const clearForm = () => {
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setEditId(null);
    };

    return (
        <div className="container mt-5">
            <h2>User Management</h2>

            <form onSubmit={handleSubmit} className="mb-4">

                <div className="mb-3">
                    <label>First Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Last Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={!editId}
                        placeholder={editId ? 'Leave blank to keep current password' : ''}
                    />
                </div>

                <button type="submit" className="btn btn-primary me-2">
                    {editId ? 'Update User' : 'Add User'}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={clearForm}
                >
                    Clear
                </button>

            </form>

            <h3>Users List</h3>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.id || user._id}>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.email}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(user)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDelete(user.id || user._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Users;
