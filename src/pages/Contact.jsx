

function Contact() {

  function handleSubmit(event) {
    event.preventDefault();

    alert("Thank you! Your message has been received.");

    window.location.href = "/";
  }

  return (
    <section className="page">

      <h1>Contact Me</h1>

      <p>Have a question? Feel free to send me a message!</p>

      <form className="contact-form" onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="First Name"
          required
        />

        <input
          type="text"
          placeholder="Last Name"
          required
        />

        <input
          type="tel"
          placeholder="Contact Number"
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          required
        />

        <textarea
          placeholder="Your Message"
          required
        />

        <button type="submit">Send Message</button>

      </form>

    </section>
  );
}

export default Contact;
