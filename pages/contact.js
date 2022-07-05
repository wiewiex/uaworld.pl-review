import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import style from "../styles/contact/contact.module.scss"

export default function Contact() {
  const form = useRef();
  const [userMessage, setUserMessage] = useState(null);


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 'template_ezprj3c', form.current, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setUserMessage("Your message has been successfully sent");         
      }, (error) => {
          console.log(error.text);
          setUserMessage(error.text);
      });
  };

  return (
    <section className={style.contactContainer}>
      <form ref={form} onSubmit={sendEmail} className={style.contactContainer}>
        <label>Name</label>
        <input type="text" name="user_name" />
        <label>Email</label>
        <input type="email" name="user_email" />
        <label>Message</label>
        <textarea name="message" />
        <input className={style.sendButton} type="submit" value="Send" />
      </form>
      <p className={style.userMessage}>{userMessage}</p>
    </section>
  );
};