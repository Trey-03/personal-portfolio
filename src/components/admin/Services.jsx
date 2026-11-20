
import { useEffect, useState } from 'react';
import API from '../../api/axiosConfig';

function Services() {
    const [services, setServices] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        getServices();
    }, []);

    const getServices = async () => {
        try {
            const response = await API.get('/services');
            setServices(response.data.data);
        } catch (error) {
            console.error('Error loading services:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const serviceData = { title, description };

        try {
            if (editId) {
                await API.put(`/services/${editId}`, serviceData);
                alert('Service updated successfully!');
            } else {
                await API.post('/services', serviceData);
                alert('Service added successfully!');
            }

            clearForm();
            getServices();
        } catch (error) {
            console.error('Error saving service:', error);
            alert('Unable to save service.');
        }
    };

    const handleEdit = (service) => {
        setTitle(service.title || '');
        setDescription(service.description || '');
        setEditId(service.id || service._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await API.delete(`/services/${id}`);
                getServices();
                alert('Service deleted successfully!');
            } catch (error) {
                console.error('Error deleting service:', error);
                alert('Unable to delete service.');
            }
        }
    };

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setEditId(null);
    };

    return (
        <div className="container mt-5">
            <h2>Service Management</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Service Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary me-2">
                    {editId ? 'Update Service' : 'Add Service'}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={clearForm}
                >
                    Clear
                </button>
            </form>

            <h3>Services List</h3>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {services.map((service) => (
                        <tr key={service.id || service._id}>
                            <td>{service.title}</td>
                            <td>{service.description}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(service)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        handleDelete(service.id || service._id)
                                    }
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

export default Services;
