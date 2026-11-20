
import { useEffect, useState } from 'react';
import API from '../../api/axiosConfig';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [title, setTitle] = useState('');
    const [completion, setCompletion] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        getProjects();
    }, []);

    const getProjects = async () => {
        try {
            const response = await API.get('/projects');
            setProjects(response.data.data);
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const projectData = {
            title,
            completion,
            description,
            image
        };

        try {
            if (editId) {
                await API.put(`/projects/${editId}`, projectData);
                alert('Project updated successfully!');
            } else {
                await API.post('/projects', projectData);
                alert('Project added successfully!');
            }

            clearForm();
            getProjects();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Unable to save project.');
        }
    };

    const handleEdit = (project) => {
        setTitle(project.title || '');
        setCompletion(
            project.completion
                ? project.completion.substring(0, 10)
                : ''
        );
        setDescription(project.description || '');
        setImage(project.image || '');
        setEditId(project.id || project._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await API.delete(`/projects/${id}`);
                getProjects();
                alert('Project deleted successfully!');
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('Unable to delete project.');
            }
        }
    };

    const clearForm = () => {
        setTitle('');
        setCompletion('');
        setDescription('');
        setImage('');
        setEditId(null);
    };

    return (
        <div className="container mt-5">
            <h2>Project Management</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Project Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Completion Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={completion}
                        onChange={(e) => setCompletion(e.target.value)}
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

                <div className="mb-3">
                    <label className="form-label">Image URL</label>
                    <input
                        type="text"
                        className="form-control"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary me-2">
                    {editId ? 'Update Project' : 'Add Project'}
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={clearForm}
                >
                    Clear
                </button>
            </form>

            <h3>Projects List</h3>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Completion Date</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id || project._id}>
                            <td>{project.title}</td>
                            <td>
                                {project.completion
                                    ? project.completion.substring(0, 10)
                                    : ''}
                            </td>
                            <td>{project.description}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => handleEdit(project)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() =>
                                        handleDelete(project.id || project._id)
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

export default Projects;
