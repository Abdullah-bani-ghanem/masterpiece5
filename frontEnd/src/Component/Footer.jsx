import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, Star, Clock, Settings } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="dark:bg-[#FBBF24] text-black py-10 ">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/4 px-4 mb-8">
            <div className="mb-6">

              {/* logo */}
              <a href="/" className="block">
                <img width={200} src="/classic-cars-high-resolution-logo-transparent.png" className="mr-28" />
              </a>

            </div>


            <p className="font-[Playfair Display] text-black-300 mb-4">
              We specialize in buying, selling, and restoring rare classic cars since 1995,
              committed to providing exceptional service and deep expertise in the classic car field.
            </p>

            <div className="flex mt-4">
              <a href="https://www.facebook.com/abodalhop/" className="text-black hover:text-white  mr-5">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-black hover:text-white  mr-5">
                <Instagram size={20} />
              </a>
              <a href="https://x.com/classic_ca?lang=ar" className="text-black hover:text-white mr-5">
                <Twitter size={20} />
              </a>
              <a href="https://www.youtube.com/watch?v=fGt2a7UnJ6s" className="text-black hover:text-white ">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          <div className="w-full md:w-1/4 px-4 mb-8">
            <h3 className="font-[Playfair Display] text-xl font-bold mb-4">Quick Links</h3>
            <ul className='font-[Playfair Display]'>
              {[
                { name: "Home", link: "/" },
                { name: "Cars", link: "/cars" },
                { name: "Bikes", link: "/bikes" },
                { name: "Contact Us", link: "/contact" },
                { name: "About Us", link: "/about" },
              ].map((item, index) => (
                <li key={index} className="mb-2">
                  <a href={item.link} className="text-black-300 hover:text-white transition duration-300">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/4 px-4 mb-8">
            <h3 className="font-[Playfair Display] text-xl font-bold mb-4">Why Choose Us</h3>
            <ul className='font-[Playfair Display]'>
              {[
                { icon: <Star size={20} />, title: "Over 25 Years of Experience", desc: "In the classic car industry" },
                { icon: <Settings size={20} />, title: "Specialized Technical Team", desc: "Following top global quality standards" },
                { icon: <Clock size={20} />, title: "24/7 Service", desc: "Complete technical and logistics support" }
              ].map((item, index) => (
                <li key={index} className="mb-4 flex items-start">
                  <span className="text-black mt-1 ml-2 ">{item.icon}</span>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <span className="text-black-400 text-sm">{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full md:w-1/4 px-4 mb-8">
            <h3 className="font-[Playfair Display] text-xl font-bold mb-4">Contact Us</h3>
            <ul className='font-[Playfair Display]'>
              <li className="flex items-start mb-4">
                <MapPin size={20} className="text-black-400 mt-1 ml-2" />
                <a href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.3895895885753!2d36.08776962490851!3d32.05870992034881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b65cd4d8f17e1%3A0x30e86b8a97e4ac7d!2sOrange%20Digital%20Village%20Zarqa!5e0!3m2!1sar!2sjo!4v1742754671002!5m2!1sar!2sjo" target="_blank" rel="noopener noreferrer" className="text-black">
                  Online
                </a>
              </li>
              <li className="flex items-center mb-4">
                <Phone size={20} className="text-black ml-2" />
                <a href="tel:+962787491703" className="text-black">
                  +962787491703
                </a>
              </li>
              <li className="flex items-center mb-4">
                <Mail size={20} className="text-black ml-2" />
                <a href="mailto:Abdullahbainghanem@gmail.com" className="text-black">
                  Abdullahbainghanem@gmail.com
                </a>
              </li>
            </ul>
          </div>


        </div>

        <div className="border-t border-green-800 pt-8 mt-8 text-center text-black">
          <p>© {new Date().getFullYear()} Classic Cars Company. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
