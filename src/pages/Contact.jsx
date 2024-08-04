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
    <div className="flex items-center justify-center min-h-[90%] p-4 font-sans bg-primary-bgColor">
      <div className="relative overflow-hidden mt-8 rounded-3xl shadow-2xl w-full max-w-[58rem] md:h-[28rem]">
        <div className="absolute top-0 w-full h-full transition-all ease-in-out duration-600">
          <div className="grid h-full grid-cols-1 md:grid-cols-2">
            {/* Contact Info */}
            <div className="flex flex-col px-12 py-8 bg-gradient-to-br from-primary-yellow to-primary-light text-primary-dark md:rounded-l-4xl">
              <h2 className="mb-6 font-serif text-3xl font-bold text-center">Get in Touch</h2>
              <div className="flex flex-col justify-center flex-grow space-y-10">
                <ContactCard
                  icon={<HiOutlineMail className="text-4xl" />}
                  title="Email"
                  content="adude890@gmail.com"
                  link="mailto:adude890@gmail.com"
                  linkText="Send an email"
                />
                <ContactCard
                  icon={<BsWhatsapp className="text-4xl" />}
                  title="WhatsApp"
                  content="+91 8745030106"
                  link="https://api.whatsapp.com/send?phone=+918745030106&text=Hello%20there!"
                  linkText="Chat on WhatsApp"
                />
              </div>
            </div>

            {/* Contact Form */}
            <form ref={form} onSubmit={sendEmail} className="flex flex-col px-12 py-8 bg-primary-dark md:rounded-r-3xl">
              <h2 className="mb-6 font-serif text-3xl font-bold text-center text-primary-white">Send us a message</h2>
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
                  className="flex items-center justify-center px-4 py-2 mt-2 text-xs font-semibold tracking-wide uppercase transition-all duration-300 rounded-lg cursor-pointer text-primary-dark bg-primary-yellow hover:bg-yellow-400 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
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
  <div className="flex items-center p-5 space-x-4 transition-all duration-300 bg-white shadow-md rounded-xl hover:shadow-lg hover:transform hover:scale-105">
    <div className="p-4 rounded-full text-primary-yellow bg-primary-dark">{icon}</div>
    <div>
      <h4 className="text-lg font-semibold">{title}</h4>
      <p className="mb-1 text-sm text-gray-600">{content}</p>
      <Link to={link} className="block text-sm font-semibold transition-colors duration-300 text-primary-yellow hover:text-primary-dark hover:underline">
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