import './styles.css';

export default function Contact() {
  return (
    <div className="contact-page">

      {/* LEFT SIDE */}
      <div className="contact-info">

        <h2>Get in Touch</h2>
        <p>We’re here to help you plan your perfect trip ✈️</p>

        <div className="contact-item">
          <img src="/gmail-icon.png" className="icon-img" />
          <span>orbit@fmail.com</span>
        </div>

        <div className="contact-item">
          <img src="/phone-icon.png" className="icon-img" />
          <span>+91 98765 43210</span>
        </div>

        <div className="contact-item">
          <img src="/location-icon.png" className="icon-img" />
          <span>Hyderabad, India</span>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="contact-form">

        <h3>Send us a message</h3>

        <input type="text" placeholder="Your Name" className="form-control mb-3" />
        <input type="email" placeholder="Your Email" className="form-control mb-3" />

        <textarea
          rows="4"
          placeholder="Your Message"
          className="form-control mb-3"
        />

        <button className="btn btn-primary w-100">Send Message</button>

      </div>

    </div>
  );
}
``