import { useEffect, useState } from 'react';
import API from '../../api/axiosConfig';

function References() {
    const [references, setReferences] = useState([]);
    const [name, setName] = useState('');
    const [testimonial, setTestimonial] = useState('');
    const [position, setPosition] = useState('');
    const [company, setCompany] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        getReferences();
    }, []);

    const getReferences = async () => {
        try {
            const response = await API.get('/references');
            setReferences(response.data.data);
        } catch (error) {
            console.error('Error loading references:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const referenceData = {
            name,
            testimonial,
            position,
            company
        };

        try {
            if (editId) {
                await API.put(`/references/${editId}`, referenceData);
                alert('Reference updated successfully!');
            } else {
                await API.post('/references', referenceData);
                alert('Reference added successfully!');
            }

            clearForm();
            getReferences();
        } catch (error) {
            console.error('Error saving reference:', error);
            alert('Unable to save reference.');
        }
    };

    const handleEdit = (reference) => {
        setName(reference.name || '');
        setTestimonial(reference.testimonial || '');
        setPosition(reference.position || '');
        setCompany(reference.company || '');
        setEditId(reference.id || reference._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this reference?')) {
            try {
                await API.delete(`/references/${id}`);
                getReferences();
                alert('Reference deleted successfully!');
            } catch (error) {
                console.error('Error deleting reference:', error);
                alert('Unable to delete reference.');
            }
        }
    };

    const clearForm = () => {
        setName('');
        setTestimonial('');
        setPosition('');
        setCompany('');
        setEditId(null);
    };

    return (
        <div className="container mt-5">
            <h2>Reference Management</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Testimonial</label>
                    <textarea
                        className="form-control"
                        value={testimonial}
                        onChange={(e) => setTestimonial(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Position</label>
                    <input
                        type="text"
                        className="form-control"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Company</label>
                    <input
                        type="text"
                        className="form-control"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary me-2">
                    {editId ? 'Update Reference' : 'Add Reference'}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={clearForm}
                >
                    Clear
                </button>
            </form>

            <h3>References List</h3>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Testimonial</th>
                        <th>Position</th>
                        <th>Company</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {references.map((reference) => (
                        <tr key={reference.id || reference._id}>
                            <td>{reference.name}</td>
                            <td>{reference.testimonial}</td>
                            <td>{reference.position}</td>
                            <td>{reference.company}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(reference)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        handleDelete(reference.id || reference._id)
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

export default References;
