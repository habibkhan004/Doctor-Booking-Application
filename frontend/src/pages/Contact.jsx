import React from "react";

const Contact = () => {
    return (
        <div className="px-6 md:px-20 py-16">
            {/* Heading */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Contact Us</h2>
                <p className="text-gray-600 mt-3">
                    Have questions or need assistance? Get in touch with us—we’re here to help you.
                </p>
            </div>

            {/* Contact Section */}
            <div className="grid md:grid-cols-2 gap-10 items-center">
                {/* Contact Info */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-semibold text-gray-800">Get in Touch</h3>
                    <p className="text-gray-600">
                        Reach out to our support team for inquiries about appointments, doctors, or technical issues.
                    </p>

                    <div>
                        <p className="text-gray-800 font-medium">📍 Address</p>
                        <p className="text-gray-600">123 Health Street, Peshawar, Pakistan</p>
                    </div>

                    <div>
                        <p className="text-gray-800 font-medium">📞 Phone</p>
                        <p className="text-gray-600">+92 300 1234567</p>
                    </div>

                    <div>
                        <p className="text-gray-800 font-medium">📧 Email</p>
                        <p className="text-gray-600">support@medapp.com</p>
                    </div>
                </div>

                {/* Contact Form */}
                <div>
                    <form className="bg-white shadow-md rounded-lg p-8 space-y-6">
                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-2">Message</label>
                            <textarea
                                rows="4"
                                placeholder="Write your message"
                                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Contact;
