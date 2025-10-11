import React from "react";
import aboutImage from "../assets/assets_frontend/about_image.png"; // replace with your image path

const About = () => {
    return (
        <section className="max-w-6xl mx-auto px-6 py-12">
            {/* About Us Section */}
            <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
                {/* Image */}
                <div>
                    <img
                        src={aboutImage}
                        alt="About Us"
                        className="rounded-2xl shadow-lg w-full object-cover"
                    />
                </div>

                {/* Text */}
                <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        About Us
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Our medical appointment booking platform is designed to make healthcare
                        more accessible, reliable, and convenient for everyone. We connect patients
                        with trusted doctors, specialists, and healthcare providers in just a few clicks.
                        With a simple and user-friendly interface, patients can search for doctors
                        by specialty, location, or availability, and book appointments instantly
                        without waiting in long queues or making multiple calls.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        Our mission is to empower patients with the ability to manage their healthcare
                        easily, while helping doctors provide better, more organized care. We value trust,
                        transparency, and convenience — ensuring that every appointment is secure, reliable,
                        and tailored to the patient’s needs.
                    </p>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="bg-white shadow-lg rounded-2xl p-10">
                <h3 className="text-2xl font-semibold text-gray-900 mb-10 text-center">
                    Why Choose Us
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Card 1 */}
                    <div className="p-6 border rounded-xl shadow hover:shadow-lg transition duration-300 text-center bg-gray-50">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Easy Booking</h4>
                        <p className="text-gray-600 text-sm">
                            Book your doctor’s appointment in just a few clicks without any hassle.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-6 border rounded-xl shadow hover:shadow-lg transition duration-300 text-center bg-gray-50">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Verified Doctors</h4>
                        <p className="text-gray-600 text-sm">
                            All healthcare providers are licensed, trusted, and verified for your safety.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-6 border rounded-xl shadow hover:shadow-lg transition duration-300 text-center bg-gray-50">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">24/7 Access</h4>
                        <p className="text-gray-600 text-sm">
                            Schedule appointments anytime, anywhere with real-time availability.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="p-6 border rounded-xl shadow hover:shadow-lg transition duration-300 text-center bg-gray-50">
                        <h4 className="text-lg font-bold text-gray-900 mb-2">Secure & Private</h4>
                        <p className="text-gray-600 text-sm">
                            Your health data and personal information are fully encrypted and safe.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
