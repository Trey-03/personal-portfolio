
import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
        <div className="container mt-5">
            <h1>Admin Dashboard</h1>
            <p>Manage your portfolio information below.</p>

            <div className="row mt-4">

                <div className="col-md-3 mb-3">
                    <div className="card p-3">
                        <h4>Users</h4>
                        <p>Manage users</p>
                        <Link to="/admin/users" className="btn btn-primary">
                            Manage Users
                        </Link>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card p-3">
                        <h4>Projects</h4>
                        <p>Manage projects</p>
                        <Link to="/admin/projects" className="btn btn-primary">
                            Manage Projects
                        </Link>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card p-3">
                        <h4>Services</h4>
                        <p>Manage services</p>
                        <Link to="/admin/services" className="btn btn-primary">
                            Manage Services
                        </Link>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card p-3">
                        <h4>References</h4>
                        <p>Manage references</p>
                        <Link to="/admin/references" className="btn btn-primary">
                            Manage References
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default AdminDashboard;
