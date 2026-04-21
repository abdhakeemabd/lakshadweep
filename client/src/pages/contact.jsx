import React, { useState } from "react";
import { showSuccess, showError } from '../admin-panel/component/swal-delete';

export default function ContactPage() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch("homepage-api/homepage/contact-us/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        })
      });

      const data = await response.json();

      if (response.ok) {
        showSuccess('Success!', 'Message sent successfully!');
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        showError('Oops...', data.message || "Something went wrong");
      }

    } catch (error) {
      console.error(error);
      showError('Failed!', 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full bg-white py-10 md:py-16 px-4">
      <div className="container-fluid mx-auto px-3 lg:px-20">
        <div className="md:text-center mb-14">
          <h1 className="text-[clamp(42px,5.5vw+0.5rem,60px)] font-semibold text-[#0F2446] mb-4">
            Get in Touch
          </h1>
          <p className="text-[clamp(12px,3vw,17px)] text-[#0F2446]/80 max-w-2xl mx-auto leading-relaxed">
            We'd love to hear from you. Whether you have a question about our adventures, pricing, or anything else, our team is ready to answer all your questions.
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-5 md:p-8 shadow-sm">
            <h3 className="text-[clamp(20px,2vw,26px)] font-semibold text-[#0F2446] mb-6">
              Send us a Message
            </h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#0F2446] mb-2"> Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Full Name" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#122544] focus:ring-1 focus:ring-[#122544]" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#0F2446] mb-2"> Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#122544] focus:ring-1 focus:ring-[#122544]"
                  required />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#0F2446] mb-2"> Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Question about package" className="w-full h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none focus:border-[#122544] focus:ring-1 focus:ring-[#122544]" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#0F2446] mb-2">Message</label>
                <textarea rows="5" name="message" value={formData.message} onChange={handleChange} placeholder="Your message here" className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#122544] focus:ring-1 focus:ring-[#122544] resize-none" required />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <button type="submit" disabled={loading} className="flex items-center gap-2 bg-[#122544] text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-[#0f1e36] transition-all duration-300">
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h4 className="font-semibold text-[#0F2446] mb-1">Our Office</h4>
              <p className="text-sm text-gray-600">
                Cyberpark, Park Centre, Kozhikode,
                Kerala 673016, India
              </p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h4 className="font-semibold text-[#0F2446] mb-1">Email Us</h4>
              <p className="text-sm text-gray-600">contact@gorogue.com</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h4 className="font-semibold text-[#0F2446] mb-1">Call Us</h4>
              <p className="text-sm text-gray-600">+91 123 456 7890</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}