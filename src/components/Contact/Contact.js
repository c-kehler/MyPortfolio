import React, { Component } from "react";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-page-container">
      <div className="contact-header">CONTACT ME</div>
      <div className="contact-subheading">
        Have any questions? Want to hire me? Send a message, I'd love to hear
        from you.
      </div>
      <form
        className="contact-container"
        name="contact"
        method="POST"
        data-netlify="true"
      >
        <p>Name</p>
        <input type="text" name="name"></input>
        <p>Email</p>
        <input type="text" name="email"></input>
        <p>Message</p>
        <textarea type="text" name="message"></textarea>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default Contact;
