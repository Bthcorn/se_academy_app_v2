import React from "react";
import Button from "../components/Button";
import { Mail, MapPin, Phone } from "lucide-react";

function Contact() {
  return (
    <section className="relative flex w-full flex-col items-start justify-start gap-2 rounded-md px-4 py-8 sm:items-center md:py-12 md:pb-8 lg:py-12 lg:pb-10">
      <div className="flex w-full flex-col items-center justify-center gap-2 md:pb-8 lg:pb-10">
        <h1 className="text-3xl font-semibold leading-relaxed text-foreground md:text-5xl">
          Contact Us
        </h1>
        <p className="text-sm font-light text-accent-foreground md:text-base">
          We are here to help you with any queries you may have.
        </p>
      </div>
      <div className="flex w-full flex-col items-start gap-4 px-4 py-8 md:flex-row">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.8220465471154!2d100.77299367467117!3d13.729221297816732!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d664a2458d53d%3A0xd323a50b1d5b5562!2z4Lit4Liy4LiE4Liy4Lij4Lib4LiP4Li04Lia4Lix4LiV4Li04LiB4Liy4Lij4Lin4Li04Lio4Lin4LiB4Lij4Lij4Lih4Lio4Liy4Liq4LiV4Lij4LmMIDI!5e0!3m2!1sth!2sth!4v1726740777397!5m2!1sth!2sth"
          width="600"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen="true"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="flex w-full flex-col items-center justify-center gap-2 md:w-1/2">
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="name" className="text-accent-foreground">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="John Doe"
              className="h-10 w-full rounded-md border border-none border-gray-300 bg-secondary-color4/50 p-2 text-foreground"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="email" className="text-accent-foreground">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="mail@email.com"
              className="h-10 w-full rounded-md border border-none border-gray-300 bg-secondary-color4/50 p-2 text-foreground"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="subject" className="text-accent-foreground">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder="Subject"
              className="h-10 w-full rounded-md border border-none border-gray-300 bg-secondary-color4/50 p-2 text-foreground"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="message" className="text-accent-foreground">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your message here..."
              className="h-32 w-full rounded-md border border-none border-gray-300 bg-secondary-color4/50 p-2 text-foreground"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label htmlFor="date-submit" className="text-accent-foreground">
              Date & Time Submission
            </label>
            <input
              type="datetime-local"
              id="date-submit"
              onChange={(e) => console.log(e.target.value)}
              className="h-10 w-full rounded-md border border-none border-gray-300 bg-secondary-color4/50 p-2 text-foreground"
            />
          </div>
          <Button label="Send Message" variant="gradient" />
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 rounded-md bg-secondary/50 px-4 py-8 backdrop:blur supports-[backdrop-filter]:bg-secondary/20">
        <div className="inline-flex rounded-md border p-2 duration-200 hover:scale-105">
          <Mail size={16} className="mr-2" />
          <p className="inline-flex text-xs">Email: sample@email.com</p>
        </div>
        <div className="inline-flex gap-2 rounded-md border p-2 duration-200 hover:scale-105">
          <Phone size={16} />
          <p className="inline-flex text-xs">Phone: +12345</p>
        </div>
        <div className="inline-flex gap-2 rounded-md border p-2 duration-200 hover:scale-105">
          <MapPin size={16} />
          <p className="inline-flex text-xs">Address: 1234, Sample Address</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
