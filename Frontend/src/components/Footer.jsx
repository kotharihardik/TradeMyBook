import React from 'react';

const Footer = () => {
  return (


    <footer class="bg-gray-900 text-gray-400 py-8">
      <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 class="text-dark-yellow font-semibold text-lg">Quick Links</h4>
          <ul class="mt-4 space-y-2">
            <li><a href="#" class="hover:text-white">About Us</a></li>
            <li><a href="#" class="hover:text-white">Terms of Service</a></li>
            <li><a href="#" class="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" class="hover:text-white">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-dark-yellow font-semibold text-lg">Follow Us</h4>
          <div class="flex space-x-4 mt-4">
            <a href="#" class="text-dark-yellow hover:text-white">
              <i class="fab fa-facebook fa-lg"></i>
            </a>
            <a href="#" class="text-dark-yellow hover:text-white">
              <i class="fab fa-twitter fa-lg"></i>
            </a>
            <a href="#" class="text-dark-yellow hover:text-white">
              <i class="fab fa-instagram fa-lg"></i>
            </a>
          </div>
        </div>
        <div>
          <h4 class="text-dark-yellow font-semibold text-lg">Newsletter</h4>
          <p class="text-gray-300 mt-2">Subscribe to our newsletter for updates.</p>
          <div class="mt-4">
            <input
              type="email"
              placeholder="Enter your email"
              class="rounded-lg py-2 px-4 text-black w-full"
            />
            <button class="mt-2 w-full px-6 py-2 bg-dark-yellow text-black font-semibold rounded-lg hover:bg-yellow-600 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>
      <div class="mt-8 text-center text-sm text-gray-500">
        &copy; 2024 Book Exchange Platform. All rights reserved.
      </div>
    </footer>


  );
};

export default Footer;
