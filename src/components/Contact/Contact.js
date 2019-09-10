import React, { Component } from "react";
import "./contact.css";
import NetlifyForm from "react-netlify-form";

const Contact = () => {
  return (
    <div className="contact-page-container">
      <div className="contact-header">CONTACT ME</div>
      <div className="contact-subheading">
        Have any questions? Want to hire me? Send a message, I'd love to hear
        from you.
      </div>
      <NetlifyForm name="Contact Form">
        {({ loading, error, success }) => (
          <div>
            {loading && <div>Loading...</div>}
            {error && (
              <div>Your information was not sent. Please try again later.</div>
            )}
            {success && <div>Thank you for contacting us!</div>}
            {!loading && !success && (
              <form
                className="contact-container"
                name="contact"
                method="post"
                data-netlify="true"
              >
                <input type="hidden" name="contact" value="contact" />
                <p>Name</p>
                <input type="text" name="name"></input>
                <p>Email</p>
                <input type="text" name="email"></input>
                <p>Message</p>
                <textarea type="text" name="message"></textarea>
                <button type="submit">SUBMIT</button>
              </form>
            )}
          </div>
        )}
      </NetlifyForm>
    </div>
  );
};

export default Contact;
