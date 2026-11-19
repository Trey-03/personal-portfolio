
function About() {
  return (
    <section className="page">

      <h1>About Me</h1>

      <div className="about-content">

        <div className="about-image">
          <img src="/images/profile.png" alt="My profile" />
        </div>

        <div className="about-text">

          <h2>Hello, I'm Trey!</h2>

          <p>
            My name is Trey Edosuyi.
            I am an Artificial Intelligence Software
            Engineering Technology student at
            Centennial College.
          </p>

          <p>
            I am interested in software development,
            programming and technology. I enjoy
            learning new skills and working on
            projects that help me improve my
            programming knowledge.
          </p>

          <a href="/resume.pdf" target="_blank">
            View My Resume
          </a>

        </div>
      </div>

    </section>
  );
}

export default About;
