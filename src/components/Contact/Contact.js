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
      <div className="contact-container">
        <p>Name</p>
        <input type="text"></input>
        <p>Email</p>
        <input type="text"></input>
        <p>Message</p>
        <textarea type="text"></textarea>
        <button>SUBMIT</button>
      </div>
    </div>
  );
};

export default Contact;
