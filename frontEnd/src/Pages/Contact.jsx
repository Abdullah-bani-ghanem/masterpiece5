import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Map, ArrowUp, ChevronUp, ChevronDown } from 'lucide-react';
import { FaComments, FaTimes } from 'react-icons/fa';
import Swal from 'sweetalert2';
import Mapp from '../Component/Map';
import WhatsAndButton from '../Component/WhatsAndButton';

const ContactPage = () => {
  // إدارة الحالة للمدخلات
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // إضافة حالة لزر العودة للأعلى
  const [showBackToTop, setShowBackToTop] = useState(false);

  // حالة لأسئلة الـ FAQ - تغيير المتغير ليتوافق مع الستايل الجديد
  const [expandedFaq, setExpandedFaq] = useState(null);

  // Chatbot states
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    { sender: 'bot', message: 'Hello! How can I help you with our classic cars today?' }
  ]);

  // Reference for auto-scrolling chat
  const chatContainerRef = useRef(null);

  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // Handle chat submission
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    // Add user message to chat
    const newChatHistory = [
      ...chatHistory,
      { sender: 'user', message: chatMessage }
    ];

    setChatHistory(newChatHistory);
    setChatMessage('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "Thank you for your interest! Our classic car experts will get back to you soon.",
        "We have a wide selection of classic cars available. Can you tell me what you're looking for?",
        "Our restoration services are top-notch. Would you like to schedule a consultation?",
        "We offer worldwide shipping for all our classic cars. Shipping costs depend on the destination.",
        "Yes, we do offer financing options for qualified buyers through our partner institutions."
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      setChatHistory([...newChatHistory, { sender: 'bot', message: randomResponse }]);
    }, 1000);
  };

  // دالة لتحديث القيم عند التغيير
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Function to scroll back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent',
          text: 'Your message has been sent successfully!',
          confirmButtonText: 'OK'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed to Send',
          text: data.message || 'Something went wrong!',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while sending the message. Please try again!',
        confirmButtonText: 'OK'
      });
    }
  };

  // دالة للتعامل مع فتح وإغلاق الأسئلة الشائعة - تغيير اسم الدالة ليتوافق مع الستايل الجديد
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // مراقبة التمرير لإظهار زر العودة للأعلى
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // تنظيف event listener عند إزالة المكون
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // بيانات الاسئلة الشائعة
  const faqData = [
    {
      question: "Do you ship classic cars internationally?",
      answer: "Yes, we offer international shipping services for our classic cars. Shipping costs and timeframes vary depending on the destination. Please contact us for a personalized quote."
    },
    {
      question: "Do you offer financing options for classic car purchases?",
      answer: "We work with several specialized classic car financing partners who understand the unique value of vintage vehicles. We can help arrange financing terms that work for your specific situation."
    },
    {
      question: "How do I know if a classic car has been restored properly?",
      answer: "All our vehicles come with detailed restoration documentation and history reports. We also welcome independent inspections and can arrange virtual tours of specific vehicles with our classic car experts."
    },
    {
      question: "Can you help me sell my classic car?",
      answer: "Absolutely! We offer consignment services with competitive rates and access to our global network of classic car collectors. Contact us with details about your vehicle for a free valuation."
    },
    {
      question: "Do you offer classic car maintenance services?",
      answer: "Yes, our specialty garage offers comprehensive maintenance and restoration services for classic vehicles of all makes and models. Our technicians specialize in vintage cars and use period-correct methods."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#2d2d2e] relative mt-18">
      {/* Hero Section */}
      <div className="bg-gray-500 bg-opacity-70 bg-blend-overlay bg-center bg-cover py-25"
        style={{ backgroundImage: 'url("https://png.pngtree.com/background/20230522/original/pngtree-classic-cars-parked-on-a-street-with-rain-and-clouds-picture-image_2696052.jpg")' }}>
        <div className="container mx-auto px-4 text-center text-white">
          <h1 className="font-[Playfair Display] text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">Contact Us</h1>
          <p className="font-[Playfair Display] text-xl md:text-2xl max-w-3xl mx-auto">"Are you looking for a classic car or interested in selling your car? We are here to help you achieve your dream."</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 px-4 max-w-7xl mx-auto ">
        <div className="shadow-lg shadow-yellow-500 bg-white dark:bg-[#2d2d2e]  rounded-xl  overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="font-[Playfair Display] text-3xl font-bold mb-6 dark:text-white">Contact Us</h2>
              <p className="font-[Playfair Display] text-gray-600 dark:text-gray-300 mb-8">Have questions about a specific vehicle or need assistance? Our classic car experts are ready to help.</p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <Phone size={20} className="text-[#FBBF24] mr-4" />
                  <span className="font-[Playfair Display] dark:text-white">+962787491703</span>
                </div>
                <div className="flex items-center">
                  <Mail size={20} className="text-[#FBBF24] mr-4" />
                  <span className="font-[Playfair Display] dark:text-white">Abdullahbainghanem@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Map size={20} className="text-[#FBBF24] mr-4" />
                  <span className="font-[Playfair Display] dark:text-white">123 Vintage Lane, Los Angeles, CA 90001</span>
                </div>
              </div>
              <div className="flex space-x-4">
                <a href="https://web.facebook.com/?_rdc=1&_rdr#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-yellow-600 hover:text-white transition">
                  <span className="font-[Playfair Display] sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-yellow-600 hover:text-white transition">
                  <span className="font-[Playfair Display] sr-only">Instagram</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://x.com/classic_ca?lang=ar" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-yellow-600 hover:text-white transition">
                  <span className="font-[Playfair Display] sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.youtube.com/watch?v=fGt2a7UnJ6s" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-yellow-600 hover:text-white transition">
                  <span className="font-[Playfair Display] sr-only">YouTube</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                  </svg>
                </a>
                {/* زر WhatsApp جديد */}
                <a href="https://wa.me/+962787491703" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center hover:bg-yellow-600 hover:text-white transition">
                  <span className="font-[Playfair Display] sr-only">WhatsApp</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </a>
              </div>
            </div>
            <div className="shadow-xl shadow-yellow-500 bg-gray-100 dark:bg-[#535354] p-8 md:p-12">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="font-[Playfair Display] block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FBBF24] dark:bg-[#49494a] dark:border-[#2d2d2e] dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-[Playfair Display] block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FBBF24] dark:bg-[#49494a] dark:border-[#2d2d2e] dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="font-[Playfair Display] block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FBBF24] dark:bg-[#49494a] dark:border-[#2d2d2e] dark:text-white"
                    required
                  ></textarea>
                </div>
                <button type="submit" className="font-[Playfair Display] w-full bg-[#FBBF24] hover:bg-yellow-600 text-white py-3 rounded-lg font-semibold transition">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section - تم تعديله ليتوافق مع الستايل الجديد */}
      <div className="w-full   ">
        <div className="container mx-auto px-4">
          <h2 className="font-[Playfair Display] text-4xl text-center text-[#FBBF24] font-bold mb-12">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="mb-6 border border-green-200 rounded-lg shadow-md dark:border-yellow-500"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 flex justify-between items-center bg-white dark:bg-[#49494a] rounded-lg hover:bg-gray-50 dark:hover:dark:bg-[#535354] transition-colors"
                >
                  <h3 className="font-[Playfair Display] text-xl font-semibold text-left text-gray-800 dark:text-gray-200">
                    {faq.question}
                  </h3>
                  {expandedFaq === index ?
                    <ChevronUp className="h-5 w-5 text-yellow-500" /> :
                    <ChevronDown className="h-5 w-5 text-yellow-600" />
                  }
                </button>

                {expandedFaq === index && (
                  <div className="px-6 py-4 bg-white dark:dark:bg-[#49494a] rounded-lg border-t ">
                    <p className="font-[Playfair Display] text-gray-600 dark:text-gray-300">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>




      <Mapp/>
      <WhatsAndButton/>





     



    </div>
  );
};

export default ContactPage;