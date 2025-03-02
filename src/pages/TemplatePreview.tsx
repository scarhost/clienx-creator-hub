
import React from 'react';
import { MainLayout } from "@/components/layout/MainLayout";

// This is a placeholder template preview
// In a real app, you'd load different templates based on selection
const TemplatePreview = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Company Name</h1>
          <p className="text-xl text-gray-400">Your tagline goes here</p>
        </header>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Service {item}</h3>
                <p className="text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">About Us</h2>
          <div className="bg-gray-800 p-8 rounded-lg">
            <p className="text-gray-300 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-gray-300">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
              nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
              deserunt mollit anim id est laborum.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
          <div className="bg-gray-800 p-8 rounded-lg">
            <p className="text-center text-gray-300 mb-6">
              Get in touch with us through the following methods:
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="text-center">
                <h4 className="font-semibold mb-2">Email</h4>
                <p className="text-gray-400">contact@example.com</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Phone</h4>
                <p className="text-gray-400">+1 (555) 123-4567</p>
              </div>
              <div className="text-center">
                <h4 className="font-semibold mb-2">Address</h4>
                <p className="text-gray-400">123 Business St, City, State</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default TemplatePreview;
