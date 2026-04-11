import styles from './PublicPages.module.css';

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for reaching out! We will get back to you soon.');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.heroSection}>
        <h1 className={styles.title}>Contact Us</h1>
        <p className={styles.subtitle}>
          Have any questions or need support integrating QueueSewa into your clinic? We are here to help.
        </p>
      </div>

      <div className={styles.contentCard}>
        <div className={styles.contactGrid}>
          {/* Contact Details */}
          <div className={styles.contactInfo}>
            <div className={styles.infoBlock}>
              <h3>Email</h3>
              <p>support@queuesewa.com</p>
            </div>
            <div className={styles.infoBlock}>
              <h3>Phone</h3>
              <p>+91 (800) 123-4567</p>
            </div>
            <div className={styles.infoBlock}>
              <h3>Address</h3>
              <p>
                123 Innovation Drive<br />
                Tech Park, Sector 4<br />
                New Delhi, 110001
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              <div className={styles.formGroup}>
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>
              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you today?" required></textarea>
              </div>
              <button type="submit" className={styles.submitBtn}>Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;