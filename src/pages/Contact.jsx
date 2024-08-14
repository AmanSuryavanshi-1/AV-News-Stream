import React, { useRef, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { BsWhatsapp, BsSend } from 'react-icons/bs';
import emailjs from 'emailjs-com';
import { Link } from 'react-router-dom';

const Contact = () => {
  const form = useRef();
  const [isMessageSent, setIsMessageSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_ugqrpcu', 'template_iz5pcva', form.current, 'I0BXSqsH7YBt5ciXX')
      .then(() => {
        setIsMessageSent(true);
        setTimeout(() => setIsMessageSent(false), 5000);
        e.target.reset();
      }, (error) => {
        console.error('Email sending failed:', error);
      });
  };

  return (
    <div className="flex items-start justify-center mt-8 min-h-[calc(100vh-6rem)] py-8 px-4 sm:px-8 font-sans bg-primary-bgColor">
      <div className="w-full max-w-[58rem] shadow-2xl">
        <div className="w-full h-full transition-all ease-in-out duration-600">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-0">
            {/* Contact Info */}
            <div className="flex flex-col px-6 py-8 sm:px-12 bg-gradient-to-br from-primary-yellow to-primary-light text-primary-dark rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
              <h2 className="mb-6 font-serif text-2xl font-bold text-center sm:text-3xl">Get in Touch</h2>
              <div className="flex flex-col justify-center flex-grow space-y-6 sm:space-y-10">
                <ContactCard
                  icon={<HiOutlineMail className="text-3xl sm:text-4xl" />}
                  title="Email"
                  content="adude890@gmail.com"
                  link="mailto:adude890@gmail.com"
                  linkText="Send an email"
                />
                <ContactCard
                  icon={<BsWhatsapp className="text-3xl sm:text-4xl" />}
                  title="WhatsApp"
                  content="+91 8745030106"
                  link="https://api.whatsapp.com/send?phone=+918745030106&text=Hello%20there!"
                  linkText="Chat on WhatsApp"
                />
              </div>
            </div>

            {/* Contact Form */}
            <form ref={form} onSubmit={sendEmail} className="flex flex-col px-6 py-8 sm:px-12 bg-primary-dark rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none">
              <h2 className="mb-6 font-serif text-2xl font-bold text-center sm:text-3xl text-primary-white">Send us a message</h2>
              <div className="flex flex-col justify-center flex-grow">
                <Input name="name" placeholder="Your Full Name" />
                <Input name="email" type="email" placeholder="Your Email" />
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Your Message"
                  required
                  className="w-full px-4 py-4 mb-4 text-sm transition-all duration-300 border-2 border-transparent rounded-lg outline-none resize-none bg-primary-grey text-primary-white focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                ></textarea>
                <button
                  type="submit"
                  className="flex items-center justify-center px-8 py-2 mx-auto mt-2 text-xs font-semibold tracking-wide uppercase transition-all duration-300 rounded-lg cursor-pointer text-primary-dark bg-primary-yellow hover:bg-yellow-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Send Message
                  <BsSend className="ml-2 text-base" />
                </button>
                {isMessageSent && (
                  <p className="mt-4 text-sm text-center text-green-400 animate-pulse">Message sent successfully!</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};


const ContactCard = ({ icon, title, content, link, linkText }) => (
  <div className="flex items-center p-4 space-x-3 transition-all duration-300 bg-white shadow-md sm:p-5 sm:space-x-4 rounded-xl hover:shadow-lg hover:transform hover:scale-105">
    <div className="p-3 rounded-full sm:p-4 text-primary-yellow bg-primary-dark">{icon}</div>
    <div>
      <h4 className="text-base font-semibold sm:text-lg">{title}</h4>
      <p className="mb-1 text-xs text-gray-600 sm:text-sm">{content}</p>
      <Link to={link} className="block text-xs font-semibold transition-colors duration-300 sm:text-sm text-primary-yellow hover:text-primary-dark hover:underline">
        {linkText}
      </Link>
    </div>
  </div>
);

const Input = ({ name, type = "text", placeholder }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    required
    className="w-full px-4 py-2 mb-4 text-sm transition-all duration-300 border-2 border-transparent rounded-lg outline-none bg-primary-grey text-primary-white focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
  />
);

export default Contact;