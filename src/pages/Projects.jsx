

function Projects() {
  return (
    <section className="page">

      <h1>My Projects</h1>

      <p>Here are some of the projects I have worked on.</p>

      <div className="project-container">

        <div className="project-card">
          <img src="/images/hospital.png" alt="Hospital Management System" />

          <h2>Hospital Management System</h2>
          <p>
            A Java application designed to manage
            patient registration and hospital records.
          </p>
          <p>Completion Date: November 2026</p>
        </div>

        <div className="project-card">
          <img src="/images/student.png" alt="Student Registration System" />

          <h2>Student Registration System</h2>
          <p>
            A JavaFX application that allows users
            to register and manage student information.
          </p>
          <p>Completion Date: November 2026</p>
        </div>

        <div className="project-card">
          <img src="/images/portfolio.png" alt="Personal Portfolio Website" />

          <h2>Personal Portfolio Website</h2>
          <p>
            A React website showcasing my skills,
            projects and programming experience.
          </p>
          <p>Completion Date: In Progress</p>
        </div>

      </div>

    </section>
  );
}

export default Projects;
