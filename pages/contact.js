import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import style from "../styles/contact/contact.module.scss"

export default function Contact() {
  const form = useRef();
  const button = useRef();
  const loading = useRef();
  const [userMessage, setUserMessage] = useState(null);
 

  const sendEmail = (e) => {
    e.preventDefault();
    loading.current.style.visibility = "visible";
    button.current.disabled = "true";

    emailjs.sendForm(process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID, 'template_ezprj3c', form.current, process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setUserMessage(<p className={style.successMessage}>Your message has been successfully sent</p>);
          loading.current.style.visibility = "hidden";
          button.current.style.backgroundColor = "#558250";        
      }).catch((error) => {
          console.log(error);
          setUserMessage(<p className={style.error}>Failed to send the message, try again later or write to us on Facebook.</p>);
          loading.current.style.visibility = "hidden";
          button.current.style.backgroundColor = "#B22222";  
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
        <textarea rows={5} name="message" />
        <button ref={button} className={style.sendButton} type="submit">
            Send
            <div ref={loading} className={style.loadingContainer}>
                <div className={style.loading}/>
            </div>
        </button>
      </form>
      {userMessage}
    </section>
  );
};