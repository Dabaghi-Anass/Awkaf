import React from "react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white text-[#035116] font-sans">
      {/* Hero Section */}
      <header className="bg-[#035116] text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to the Awqaf Management Platform</h1>
        <p className="text-lg md:text-xl mb-6">Empowering sustainable charity through transparent and efficient Waqf fund management.</p>
        <button className="bg-white text-[#035116] hover:bg-gray-100 px-6 py-2 text-lg font-semibold rounded-full">
          Get Started
        </button>
      </header>

      {/* About Section */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">What is Awqaf?</h2>
        <p className="text-lg text-gray-700 text-center mb-10">
          Awqaf is a charitable endowment under Islamic law, typically involving donating a building, plot of land, or other assets for religious or charitable purposes. This app helps manage, track, and analyze these projects effectively.
        </p>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-50 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">🔍 Transparent Tracking</h3>
            <p className="text-gray-600">Track donations, fund usage, and project progress in real-time.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">📈 Data Insights</h3>
            <p className="text-gray-600">Gain insights into Waqf project performance and Zakat calculations.</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl shadow">
            <h3 className="text-xl font-semibold mb-2">🛡️ Secure & Private</h3>
            <p className="text-gray-600">Your data is protected with modern authentication and encryption methods.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="bg-[#035116] text-white py-10 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to manage your Awqaf projects?</h2>
        <button className="bg-white text-[#035116] hover:bg-gray-100 px-6 py-2 text-lg font-semibold rounded-full">
          Explore Projects
        </button>
      </footer>
    </div>
  );
};

export default HomePage;
