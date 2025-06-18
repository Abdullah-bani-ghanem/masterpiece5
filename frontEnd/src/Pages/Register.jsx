// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import Swal from 'sweetalert2';

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//     role: '',
//     confirmPassword: ''
//   });
//   const [isVisible, setIsVisible] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const navigate = useNavigate();

//   // Animation effect on component mount
//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!validateForm()) return;
  
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/users/register",
//         {
//           name: formData.fullName,
//           email: formData.email,
//           password: formData.password,
//           phoneNumber: formData.phoneNumber,
//           role: formData.role,
//         },
//         { withCredentials: true }
//       );
  
//       Swal.fire({
//         icon: 'success',
//         title: 'Registration Successful',
//         text: 'You have registered successfully!',
//         confirmButtonText: 'OK',
//         background: '#1F2937',
//         color: '#F9FAFB'
//       }).then(() => {
//         navigate("/");
//       });
  
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Registration Failed',
//         text: error.response?.data?.message || "An unexpected error occurred",
//         confirmButtonText: 'OK',
//         background: '#1F2937',
//         color: '#F9FAFB'
//       });
//     }
//   };
  

//   // Enhanced animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { duration: 0.7, staggerChildren: 0.15 }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 25, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
//   };

//   const slideIn = {
//     hidden: { x: -70, opacity: 0 },
//     visible: { x: 0, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } }
//   };

//   const pulse = {
//     scale: [1, 1.05, 1],
//     transition: { duration: 2, repeat: Infinity }
//   };




//   const validateForm = () => {
//     if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword || !formData.phoneNumber || !formData.role) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Missing Fields',
//         text: 'Please fill out all required fields.',
//         background: '#1F2937',
//         color: '#F9FAFB'
//       });
//       return false;
//     }
  
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Invalid Email',
//         text: 'Please enter a valid email address.',
//         background: '#1F2937',
//         color: '#F9FAFB'
//       });
//       return false;
//     }
  
//     if (formData.password.length < 6) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Weak Password',
//         text: 'Password must be at least 6 characters long.',
//         background: '#1F2937',
//         color: '#F9FAFB'
//       });
//       return false;
//     }
  
//     if (formData.password !== formData.confirmPassword) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Password Mismatch',
//         text: 'Passwords do not match!',
//         background: '#1F2937',
//         color: '#F9FAFB'
//       });
//       return false;
//     }
  
//     if (!acceptTerms) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Terms Not Accepted',
//         text: 'Please accept the terms and conditions to proceed.',
//         background: '#1F2937',
//         color: '#F9FAFB'
//       });
//       return false;
//     }
  
//     return true;
//   };
  

//   return (
//     <div className="min-h-screen bg-gradient-to-b dark:bg-[#2d2d2e] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-18">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.7 }}
//         className="max-w-5xl w-full flex dark:bg-[#4a4a48] rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
//       >
//         {/* Left side - Image with animation */}
//         <motion.div 
//           className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#FBBF24] to-yellow-600 relative overflow-hidden"
//           initial="hidden"
//           animate="visible"
//           variants={slideIn}
//         >
//           {/* Animated elements in background */}
//           <motion.div 
//             className="absolute w-64 h-64 rounded-full bg-purple-500 opacity-20" 
//             style={{ top: '10%', left: '-20%' }}
//             animate={{ 
//               scale: [1, 1.4, 1],
//               x: [0, 20, 0],
//               transition: { 
//                 duration: 12, 
//                 repeat: Infinity,
//                 repeatType: "reverse"
//               }
//             }}
//           />
//           <motion.div 
//             className="absolute w-40 h-40 rounded-full bg-indigo-100 opacity-20" 
//             style={{ bottom: '10%', right: '5%' }}
//             animate={{ 
//               scale: [1, 1.5, 1],
//               y: [0, -15, 0],
//               transition: { 
//                 duration: 10, 
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 delay: 1
//               }
//             }}
//           />
//           <motion.div 
//             className="absolute w-32 h-32 rounded-full bg-blue-400 opacity-20" 
//             style={{ top: '40%', left: '25%' }}
//             animate={{ 
//               scale: [1, 1.3, 1],
//               transition: { 
//                 duration: 8, 
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 delay: 2
//               }
//             }}
//           />
          
//           {/* Abstract lines */}
//           <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
//             <motion.path 
//               d="M0,100 Q80,50 160,100 T320,100 T480,100 T640,100 T800,100" 
//               stroke="rgba(255,255,255,0.3)" 
//               strokeWidth="2" 
//               fill="none"
//               initial={{ pathLength: 0, opacity: 0 }}
//               animate={{ 
//                 pathLength: 1,
//                 opacity: 0.3,
//                 transition: { duration: 2, delay: 0.5 }
//               }}
//             />
//             <motion.path 
//               d="M0,150 Q80,200 160,150 T320,150 T480,150 T640,150 T800,150" 
//               stroke="rgba(255,255,255,0.3)" 
//               strokeWidth="2" 
//               fill="none"
//               initial={{ pathLength: 0, opacity: 0 }}
//               animate={{ 
//                 pathLength: 1,
//                 opacity: 0.3,
//                 transition: { duration: 2, delay: 0.7 }
//               }}
//             />
//           </svg>
          
//           {/* Centered content */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
//             <motion.div 
//               className="relative w-32 h-32 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm mb-6"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ 
//                 opacity: 1, 
//                 y: 0,
//                 transition: { duration: 0.8, delay: 0.6 }
//               }}
//               whileHover={pulse}
//             >
//               <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
//               </svg>
//             </motion.div>
            
//             <motion.h3 
//               className="text-2xl font-bold text-white mb-2"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ 
//                 opacity: 1, 
//                 y: 0,
//                 transition: { duration: 0.8, delay: 0.9 }
//               }}
//             >
//               Join Our Community
//             </motion.h3>
            
//             <motion.p 
//               className="text-indigo-100 text-center max-w-xs"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ 
//                 opacity: 1, 
//                 y: 0,
//                 transition: { duration: 0.8, delay: 1.1 }
//               }}
//             >
//               Create an account to access exclusive features and personalized experiences.
//             </motion.p>
            
//             <motion.div 
//               className="mt-8 flex space-x-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ 
//                 opacity: 1, 
//                 y: 0,
//                 transition: { duration: 0.8, delay: 1.3 }
//               }}
//             >
//               {/* Feature highlights */}
//               <div className="flex items-center text-white/90 text-sm">
//                 <svg className="w-5 h-5 mr-2 text-indigo-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                 </svg>
//                 <span>Free Registration</span>
//               </div>
              
//               <div className="flex items-center text-white/90 text-sm">
//                 <svg className="w-5 h-5 mr-2 text-indigo-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                 </svg>
//                 <span>Premium Access</span>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Right side - Register form */}
//         <motion.div 
//           className="w-full md:w-1/2 p-10 space-y-6"
//           initial="hidden"
//           animate={isVisible ? "visible" : "hidden"}
//           variants={containerVariants}
//         >
//           {/* Title */}
//           <motion.div className="text-center" variants={itemVariants}>
//             <h2 className="mt-6 text-3xl font-extrabold text-gray-100">Create an account</h2>
//             <p className="mt-2 text-sm text-gray-400">
//               Already have an account?{' '}
//               <Link to="/login" className="font-medium text-[#FBBF24] hover:text-yellow-600 transition-colors duration-200">
//                 Sign in instead
//               </Link>
//             </p>
//           </motion.div>

//           {/* Register Form */}
//           <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
//             <div className="rounded-md space-y-4">
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="full-name" className="block text-sm font-medium text-gray-300">
//                   Full Name
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="full-name"
//                     name="fullName"
//                     type="text"
//                     required
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     className="bg-white  block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-black text-sm transition-colors duration-200"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//               </motion.div>
              
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="email-address" className="block text-sm font-medium text-gray-300">
//                   Email address
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                     </svg>
//                   </div>
//                   <input
//                     id="email-address"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="bg-white  block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-black text-sm transition-colors duration-200"
//                     placeholder="Enter your email"
//                   />
//                 </div>
//               </motion.div>
              
//               {/* Phone Number Field */}
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="phone-number" className="block text-sm font-medium text-gray-300">
//                   Phone Number
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//                     </svg>
//                   </div>
//                   <input
//                     id="phone-number"
//                     name="phoneNumber"
//                     type="tel"
//                     required
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     className="bg-white  block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-black text-sm transition-colors duration-200"
//                     placeholder="Enter your phone number"
//                   />
//                 </div>
//               </motion.div>
              
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-300">
//                   Password
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     className="bg-gray-800  block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-gray-100 text-sm transition-colors duration-200"
//                     placeholder="Create a password"
//                   />
//                 </div>
//               </motion.div>
              
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
//                   Confirm Password
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="confirm-password"
//                     name="confirmPassword"
//                     type="password"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     className="bg-white  block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-black text-sm transition-colors duration-200"
//                     placeholder="Confirm your password"
//                   />
//                 </div>
//               </motion.div>
//             </div>

//             <motion.div variants={itemVariants}>
//               <motion.button
//                 type="submit"
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FBBF24] hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
//               >
//                 <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                   <svg
//                     className="h-5 w-5 text-[#a78633] group-hover:text-yellow-800"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                     aria-hidden="true"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                 </span>
//                 Create Account
//               </motion.button>
//             </motion.div>
//           </form>

//           {/* Social signup option */}
//           <div className="mt-6">
//             <motion.div className="relative" variants={itemVariants}>
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-700" />
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2  text-gray-400">Or continue with</span>
//               </div>
//             </motion.div>

//             <motion.div className="mt-6" variants={itemVariants}>
//               <motion.button
//                 onClick={() => console.log('Attempting to register with Google')}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full flex justify-center items-center py-3 px-4 border border-yellow-500 rounded-md shadow-sm  text-sm font-medium dark:bg-[#4a4a48] text-gray-300 hover:dark:dark:bg-[#2d2d2e] transition-colors duration-200"
//               >
//                 <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                   <path
//                     fill="#EA4335"
//                     d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
//                   />
//                   <path
//                     fill="#34A853"
//                     d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
//                   />
//                   <path
//                     fill="#4A90E2"
//                     d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.7272727 L18.4363636,14.7272727 C18.1187732,16.013119 17.2662994,17.0926947 16.0407269,18.0125889 L19.834192,20.9995801 Z"
//                   />
//                   <path
//                     fill="#FBBC05"
//                     d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
//                   />
//                 </svg>
//                 Sign up with Google
//               </motion.button>
//             </motion.div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default RegisterPage;





// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import Swal from 'sweetalert2';

// const RegisterPage = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//     phoneNumber: '',
//     confirmPassword: ''
//   });
//   const [isVisible, setIsVisible] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});
//   const navigate = useNavigate();

//   // Animation effect on component mount
//   useEffect(() => {
//     setIsVisible(true);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value
//     });

//     // Validate field on change if it's been touched
//     if (touched[name]) {
//       validateField(name, value);
//     }
//   };

//   const handleBlur = (e) => {
//     const { name, value } = e.target;
//     setTouched({
//       ...touched,
//       [name]: true
//     });
//     validateField(name, value);
//   };

//   const validateField = (name, value) => {
//     let newErrors = { ...errors };
    
//     switch (name) {
//       case 'fullName':
//         if (!value.trim()) {
//           newErrors.fullName = 'Name is required';
//         } else if (value.trim().length < 2) {
//           newErrors.fullName = 'Name must be at least 2 characters';
//         } else if (!/^[a-zA-Z\s]*$/.test(value)) {
//           newErrors.fullName = 'Name should contain only letters';
//         } else {
//           delete newErrors.fullName;
//         }
//         break;
      
//       case 'email':
//         if (!value) {
//           newErrors.email = 'Email is required';
//         } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//           newErrors.email = 'Please enter a valid email address';
//         } else {
//           delete newErrors.email;
//         }
//         break;
      
//       case 'phoneNumber':
//         if (!value) {
//           newErrors.phoneNumber = 'Phone number is required';
//         } else if (!/^[0-9+\-\s()]{7,15}$/.test(value)) {
//           newErrors.phoneNumber = 'Please enter a valid phone number';
//         } else {
//           delete newErrors.phoneNumber;
//         }
//         break;
      
//       case 'password':
//         if (!value) {
//           newErrors.password = 'Password is required';
//         } else if (value.length < 6) {
//           newErrors.password = 'Password must be at least 6 characters';
//         } else if (!/\d/.test(value)) {
//           newErrors.password = 'Password must include at least one number';
//         } else if (!/[a-z]/.test(value)) {
//           newErrors.password = 'Password must include at least one lowercase letter';
//         } else if (!/[A-Z]/.test(value)) {
//           newErrors.password = 'Password must include at least one uppercase letter';
//         } else {
//           delete newErrors.password;
//         }
        
//         // Also validate confirmPassword if it exists
//         if (formData.confirmPassword && value !== formData.confirmPassword) {
//           newErrors.confirmPassword = 'Passwords do not match';
//         } else if (formData.confirmPassword) {
//           delete newErrors.confirmPassword;
//         }
//         break;
      
//       case 'confirmPassword':
//         if (!value) {
//           newErrors.confirmPassword = 'Please confirm your password';
//         } else if (value !== formData.password) {
//           newErrors.confirmPassword = 'Passwords do not match';
//         } else {
//           delete newErrors.confirmPassword;
//         }
//         break;
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     let isValid = true;
  
//     // Full Name
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Name is required';
//       isValid = false;
//     } else if (formData.fullName.trim().length < 2) {
//       newErrors.fullName = 'Name must be at least 2 characters';
//       isValid = false;
//     } else if (!/^[a-zA-Z\s]*$/.test(formData.fullName)) {
//       newErrors.fullName = 'Name should contain only letters';
//       isValid = false;
//     }
  
//     // Email
//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//       isValid = false;
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Please enter a valid email address';
//       isValid = false;
//     }
  
//     // Phone
//     if (!formData.phoneNumber) {
//       newErrors.phoneNumber = 'Phone number is required';
//       isValid = false;
//     } else if (!/^[0-9+\-\s()]{7,15}$/.test(formData.phoneNumber)) {
//       newErrors.phoneNumber = 'Please enter a valid phone number';
//       isValid = false;
//     }
  
//     // Password
//     const pw = formData.password;
//     if (!pw) {
//       newErrors.password = 'Password is required';
//       isValid = false;
//     } else if (pw.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//       isValid = false;
//     } else if (!/\d/.test(pw)) {
//       newErrors.password = 'Password must include at least one number';
//       isValid = false;
//     } else if (!/[a-z]/.test(pw)) {
//       newErrors.password = 'Password must include at least one lowercase letter';
//       isValid = false;
//     } else if (!/[A-Z]/.test(pw)) {
//       newErrors.password = 'Password must include at least one uppercase letter';
//       isValid = false;
//     }
  
//     // Confirm password
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Please confirm your password';
//       isValid = false;
//     } else if (formData.confirmPassword !== pw) {
//       newErrors.confirmPassword = 'Passwords do not match';
//       isValid = false;
//     }
  
//     // Terms
//     if (!acceptTerms) {
//       newErrors.terms = 'You must accept the terms and conditions';
//       isValid = false;
//     }
  
//     setErrors(newErrors);
  
//     // Mark all as touched
//     const allTouched = {};
//     Object.keys(formData).forEach(key => allTouched[key] = true);
//     setTouched(allTouched);
  
//     return isValid;
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!validateForm()) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Validation Error',
//         text: 'Please correct the errors in the form',
//         background: '#1F2937',
//         color: '#F9FAFB'
//       });
//       return;
//     }
  
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/users/register",
//         {
//           name: formData.fullName,
//           email: formData.email,
//           password: formData.password,
//           phoneNumber: formData.phoneNumber,
//         },
//         { withCredentials: true }
//       );
    
//       // ✅ تخزين التوكن
//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token);
//       }
    
//       Swal.fire({
//         icon: 'success',
//         title: 'Registration Successful',
//         text: 'You have registered successfully!',
//         confirmButtonText: 'OK',
//         background: '#1F2937',
//         color: '#F9FAFB'
//       }).then(() => {
//         navigate("/");
//       });
    
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Registration Failed',
//         text: error.response?.data?.message || "An unexpected error occurred",
//         confirmButtonText: 'OK',
//         background: '#1F2937',
//         color: '#F9FAFB'
//       });
//     }
    
//   };
  
//   // Enhanced animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { 
//       opacity: 1,
//       transition: { duration: 0.7, staggerChildren: 0.15 }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 25, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
//   };

//   const slideIn = {
//     hidden: { x: -70, opacity: 0 },
//     visible: { x: 0, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } }
//   };

//   const pulse = {
//     scale: [1, 1.05, 1],
//     transition: { duration: 2, repeat: Infinity }
//   };

//   // Function to determine input class based on validation state
//   const getInputClassName = (fieldName) => {
//     const baseClass = "block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 text-sm transition-colors duration-200";
    
//     if (!touched[fieldName]) {
//       return `${baseClass} bg-white text-black border-gray-700`;
//     }
    
//     if (errors[fieldName]) {
//       return `${baseClass} bg-white text-black border-red-500 focus:ring-red-500 focus:border-red-500`;
//     }
    
//     return `${baseClass} bg-white text-black border-green-500`;
//   };

//   // Function to calculate password strength
//   const calculatePasswordStrength = (password) => {
//     if (!password) return 0;
    
//     let strength = 0;
//     // Length check
//     if (password.length >= 6) strength += 1;
//     if (password.length >= 10) strength += 1;
    
//     // Character variety check
//     if (/[A-Z]/.test(password)) strength += 1;
//     if (/[a-z]/.test(password)) strength += 1;
//     if (/\d/.test(password)) strength += 1;
//     if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
//     return Math.min(5, strength);
//   };
  
//   const passwordStrength = calculatePasswordStrength(formData.password);
  
//   const strengthColors = [
//     'bg-red-500', // Very weak
//     'bg-red-400', // Weak
//     'bg-yellow-500', // Medium
//     'bg-yellow-400', // Good
//     'bg-green-500', // Strong
//     'bg-green-400', // Very strong
//   ];
  
//   const strengthLabels = [
//     'Very Weak',
//     'Weak',
//     'Medium',
//     'Good',
//     'Strong',
//     'Very Strong',
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-b dark:bg-[#2d2d2e] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-18">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.7 }}
//         className="max-w-5xl w-full flex dark:bg-[#4a4a48] rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
//       >
//         {/* Left side - Image with animation */}
//         <motion.div 
//           className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#FBBF24] to-yellow-600 relative overflow-hidden"
//           initial="hidden"
//           animate="visible"
//           variants={slideIn}
//         >
//           {/* Animated elements in background */}
//           <motion.div 
//             className="absolute w-64 h-64 rounded-full bg-purple-500 opacity-20" 
//             style={{ top: '10%', left: '-20%' }}
//             animate={{ 
//               scale: [1, 1.4, 1],
//               x: [0, 20, 0],
//               transition: { 
//                 duration: 12, 
//                 repeat: Infinity,
//                 repeatType: "reverse"
//               }
//             }}
//           />
//           <motion.div 
//             className="absolute w-40 h-40 rounded-full bg-indigo-100 opacity-20" 
//             style={{ bottom: '10%', right: '5%' }}
//             animate={{ 
//               scale: [1, 1.5, 1],
//               y: [0, -15, 0],
//               transition: { 
//                 duration: 10, 
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 delay: 1
//               }
//             }}
//           />
//           <motion.div 
//             className="absolute w-32 h-32 rounded-full bg-blue-400 opacity-20" 
//             style={{ top: '40%', left: '25%' }}
//             animate={{ 
//               scale: [1, 1.3, 1],
//               transition: { 
//                 duration: 8, 
//                 repeat: Infinity,
//                 repeatType: "reverse",
//                 delay: 2
//               }
//             }}
//           />
          
//           {/* Abstract lines */}
//           <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
//             <motion.path 
//               d="M0,100 Q80,50 160,100 T320,100 T480,100 T640,100 T800,100" 
//               stroke="rgba(255,255,255,0.3)" 
//               strokeWidth="2" 
//               fill="none"
//               initial={{ pathLength: 0, opacity: 0 }}
//               animate={{ 
//                 pathLength: 1,
//                 opacity: 0.3,
//                 transition: { duration: 2, delay: 0.5 }
//               }}
//             />
//             <motion.path 
//               d="M0,150 Q80,200 160,150 T320,150 T480,150 T640,150 T800,150" 
//               stroke="rgba(255,255,255,0.3)" 
//               strokeWidth="2" 
//               fill="none"
//               initial={{ pathLength: 0, opacity: 0 }}
//               animate={{ 
//                 pathLength: 1,
//                 opacity: 0.3,
//                 transition: { duration: 2, delay: 0.7 }
//               }}
//             />
//           </svg>
          
//           {/* Centered content */}
//           <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
//             <motion.div 
//               className="relative w-32 h-32 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm mb-6"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ 
//                 opacity: 1, 
//                 y: 0,
//                 transition: { duration: 0.8, delay: 0.6 }
//               }}
//               whileHover={pulse}
//             >
//               <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
//               </svg>
//             </motion.div>
            
//             <motion.h3 
//               className="text-2xl font-bold text-white mb-2"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ 
//                 opacity: 1, 
//                 y: 0,
//                 transition: { duration: 0.8, delay: 0.9 }
//               }}
//             >
//               Join Our Community
//             </motion.h3>
            
//             <motion.p 
//               className="text-indigo-100 text-center max-w-xs"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ 
//                 opacity: 1, 
//                 y: 0,
//                 transition: { duration: 0.8, delay: 1.1 }
//               }}
//             >
//               Create an account to access exclusive features and personalized experiences.
//             </motion.p>
            
//             <motion.div 
//               className="mt-8 flex space-x-4"
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ 
//                 opacity: 1, 
//                 y: 0,
//                 transition: { duration: 0.8, delay: 1.3 }
//               }}
//             >
//               {/* Feature highlights */}
//               <div className="flex items-center text-white/90 text-sm">
//                 <svg className="w-5 h-5 mr-2 text-indigo-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                 </svg>
//                 <span>Free Registration</span>
//               </div>
              
//               <div className="flex items-center text-white/90 text-sm">
//                 <svg className="w-5 h-5 mr-2 text-indigo-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                 </svg>
//                 <span>Premium Access</span>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Right side - Register form */}
//         <motion.div 
//           className="w-full md:w-1/2 p-10 space-y-6"
//           initial="hidden"
//           animate={isVisible ? "visible" : "hidden"}
//           variants={containerVariants}
//         >
//           {/* Title */}
//           <motion.div className="text-center" variants={itemVariants}>
//             <h2 className="mt-6 text-3xl font-extrabold text-gray-100">Create an account</h2>
//             <p className="mt-2 text-sm text-gray-400">
//               Already have an account?{' '}
//               <Link to="/login" className="font-medium text-[#FBBF24] hover:text-yellow-600 transition-colors duration-200">
//                 Sign in instead
//               </Link>
//             </p>
//           </motion.div>

//           {/* Register Form */}
//           <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
//             <div className="rounded-md space-y-4">
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="full-name" className="block text-sm font-medium text-gray-300">
//                   Full Name <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="full-name"
//                     name="fullName"
//                     type="text"
//                     required
//                     value={formData.fullName}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={getInputClassName('fullName')}
//                     placeholder="Enter your full name"
//                   />
//                   {touched.fullName && errors.fullName && (
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//                 {touched.fullName && errors.fullName && (
//                   <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
//                 )}
//               </motion.div>
              
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="email-address" className="block text-sm font-medium text-gray-300">
//                   Email address <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                       <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                     </svg>
//                   </div>
//                   <input
//                     id="email-address"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={getInputClassName('email')}
//                     placeholder="Enter your email"
//                   />
//                   {touched.email && errors.email && (
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//                 {touched.email && errors.email && (
//                   <p className="mt-1 text-sm text-red-500">{errors.email}</p>
//                 )}
//               </motion.div>
              
//               {/* Phone Number Field */}
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="phone-number" className="block text-sm font-medium text-gray-300">
//                   Phone Number <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
//                     </svg>
//                   </div>
//                   <input
//                     id="phone-number"
//                     name="phoneNumber"
//                     type="tel"
//                     required
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={getInputClassName('phoneNumber')}
//                     placeholder="Enter your phone number"
//                   />
//                   {touched.phoneNumber && errors.phoneNumber && (
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//                 {touched.phoneNumber && errors.phoneNumber && (
//                   <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
//                 )}
//               </motion.div>
              
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="password" className="block text-sm font-medium text-gray-300">
//                   Password <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     required
//                     value={formData.password}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={getInputClassName('password')}
//                     placeholder="Create a password"
//                   />
//                   {touched.password && errors.password && (
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//                 {touched.password && errors.password && (
//                   <p className="mt-1 text-sm text-red-500">{errors.password}</p>
//                 )}
                
//                 {/* Password strength indicator */}
//                 {formData.password && (
//                   <div className="mt-2">
//                     <div className="flex justify-between mb-1">
//                       <span className="text-xs text-gray-400">Password strength</span>
//                       <span className="text-xs font-medium text-gray-300">
//                         {strengthLabels[passwordStrength]}
//                       </span>
//                     </div>
//                     <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
//                       <div 
//                         className={`h-full ${strengthColors[passwordStrength]} transition-all duration-300`} 
//                         style={{ width: `${(passwordStrength + 1) * 16.67}%` }}
//                       ></div>
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
              
//               <motion.div variants={itemVariants}>
//                 <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
//                   Confirm Password <span className="text-red-500">*</span>
//                 </label>
//                 <div className="mt-1 relative rounded-md shadow-sm">
//                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                     <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                     </svg>
//                   </div>
//                   <input
//                     id="confirm-password"
//                     name="confirmPassword"
//                     type="password"
//                     required
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={getInputClassName('confirmPassword')}
//                     placeholder="Confirm your password"
//                   />
//                   {touched.confirmPassword && errors.confirmPassword && (
//                     <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
//                       <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                         <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                       </svg>
//                     </div>
//                   )}
//                 </div>
//                 {touched.confirmPassword && errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
//                 )}
//               </motion.div>
//             </div>

//             {/* Register Button */}
//             <motion.div variants={itemVariants}>
//               <button
//                 type="submit"
//                 className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-[#FBBF24] hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
//               >
//                 <span className="absolute left-0 inset-y-0 flex items-center pl-3">
//                   <svg className="h-5 w-5 text-yellow-800 group-hover:text-yellow-900 transition-colors duration-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
//                     <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//                   </svg>
//                 </span>
//                 Create Account
//               </button>
//             </motion.div>
//           </form>
          
//           {/* Social media signup options */}
//           <motion.div variants={itemVariants}>
//             <div className="mt-6 relative">
//               <div className="absolute inset-0 flex items-center">
//                 <div className="w-full border-t border-gray-700"></div>
//               </div>
//               <div className="relative flex justify-center text-sm">
//                 <span className="px-2 bg-[#4a4a48] text-gray-400">
//                   Or sign up with
//                 </span>
//               </div>
//             </div>

//             <div className=" grid">
//             <motion.div className="mt-6" variants={itemVariants}>
//               <motion.button
//                 onClick={() => console.log('Attempting to register with Google')}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full flex justify-center items-center py-3 px-4 border border-yellow-500 rounded-md shadow-sm  text-sm font-medium dark:bg-[#4a4a48] text-gray-300 hover:dark:dark:bg-[#2d2d2e] transition-colors duration-200"
//               >
//                 <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
//                   <path
//                     fill="#EA4335"
//                     d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
//                   />
//                   <path
//                     fill="#34A853"
//                     d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
//                   />
//                   <path
//                     fill="#4A90E2"
//                     d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.7272727 L18.4363636,14.7272727 C18.1187732,16.013119 17.2662994,17.0926947 16.0407269,18.0125889 L19.834192,20.9995801 Z"
//                   />
//                   <path
//                     fill="#FBBC05"
//                     d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
//                   />
//                 </svg>
//                 Sign up with Google
//               </motion.button>
//              </motion.div>

//             </div>
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default RegisterPage;




import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Swal from 'sweetalert2';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'user', // Setting a default role
    confirmPassword: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  // Animation effect on component mount
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Validate field on change if it's been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched({
      ...touched,
      [name]: true
    });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          newErrors.fullName = 'Name is required';
        } else if (value.trim().length < 2) {
          newErrors.fullName = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s]*$/.test(value)) {
          newErrors.fullName = 'Name should contain only letters';
        } else {
          delete newErrors.fullName;
        }
        break;
      
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.email = 'Please enter a valid email address';
        } else {
          delete newErrors.email;
        }
        break;
      
      case 'phoneNumber':
        if (!value) {
          newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^[0-9+\-\s()]{7,15}$/.test(value)) {
          newErrors.phoneNumber = 'Please enter a valid phone number';
        } else {
          delete newErrors.phoneNumber;
        }
        break;
      
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (value.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        } else if (!/\d/.test(value)) {
          newErrors.password = 'Password must include at least one number';
        } else if (!/[a-z]/.test(value)) {
          newErrors.password = 'Password must include at least one lowercase letter';
        } else if (!/[A-Z]/.test(value)) {
          newErrors.password = 'Password must include at least one uppercase letter';
        } else {
          delete newErrors.password;
        }
        
        // Also validate confirmPassword if it exists
        if (formData.confirmPassword && value !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else if (formData.confirmPassword) {
          delete newErrors.confirmPassword;
        }
        break;
      
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
      
      // Removed role validation
      
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateForm = () => {
    // Validate all fields
    let isValid = true;
    let newErrors = {};
    let allTouched = {};
    
    // Mark all fields as touched and validate all except role
    Object.keys(formData).forEach(key => {
      if (key !== 'role') { // Skip role validation
        allTouched[key] = true;
        if (!validateField(key, formData[key])) {
          isValid = false;
        }
      }
    });
    
    setTouched(allTouched);
    
    // Check terms acceptance
    if (!acceptTerms) {
      newErrors.terms = 'You must accept the terms and conditions';
      setErrors(prev => ({ ...prev, ...newErrors }));
      isValid = false;
    }
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      Swal.fire({
        icon: 'warning',
        title: 'Validation Error',
        text: 'Please correct the errors in the form',
        background: '#1F2937',
        color: '#F9FAFB'
      });
      return;
    }
  
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          role: formData.role,
        },
        { withCredentials: true }
      );
  
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have registered successfully!',
        confirmButtonText: 'OK',
        background: '#1F2937',
        color: '#F9FAFB'
      }).then(() => {
        navigate("/");
      });
  
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.response?.data?.message || "An unexpected error occurred",
        confirmButtonText: 'OK',
        background: '#1F2937',
        color: '#F9FAFB'
      });
    }
  };
  
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.7, staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const slideIn = {
    hidden: { x: -70, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } }
  };

  const pulse = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  };

  // Function to determine input class based on validation state
  const getInputClassName = (fieldName) => {
    const baseClass = "block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 text-sm transition-colors duration-200";
    
    if (!touched[fieldName]) {
      return `${baseClass} bg-white text-black border-gray-700`;
    }
    
    if (errors[fieldName]) {
      return `${baseClass} bg-white text-black border-red-500 focus:ring-red-500 focus:border-red-500`;
    }
    
    return `${baseClass} bg-white text-black border-green-500`;
  };

  // Function to calculate password strength
  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    
    let strength = 0;
    // Length check
    if (password.length >= 6) strength += 1;
    if (password.length >= 10) strength += 1;
    
    // Character variety check
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/\d/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return Math.min(5, strength);
  };
  
  const passwordStrength = calculatePasswordStrength(formData.password);
  
  const strengthColors = [
    'bg-red-500', // Very weak
    'bg-red-400', // Weak
    'bg-yellow-500', // Medium
    'bg-yellow-400', // Good
    'bg-green-500', // Strong
    'bg-green-400', // Very strong
  ];
  
  const strengthLabels = [
    'Very Weak',
    'Weak',
    'Medium',
    'Good',
    'Strong',
    'Very Strong',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b dark:bg-[#2d2d2e] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-18">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl w-full flex dark:bg-[#4a4a48] rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
      >
        {/* Left side - Image with animation */}
        <motion.div 
          className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#FBBF24] to-yellow-600 relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={slideIn}
        >
          {/* Animated elements in background */}
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-purple-500 opacity-20" 
            style={{ top: '10%', left: '-20%' }}
            animate={{ 
              scale: [1, 1.4, 1],
              x: [0, 20, 0],
              transition: { 
                duration: 12, 
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
          <motion.div 
            className="absolute w-40 h-40 rounded-full bg-indigo-100 opacity-20" 
            style={{ bottom: '10%', right: '5%' }}
            animate={{ 
              scale: [1, 1.5, 1],
              y: [0, -15, 0],
              transition: { 
                duration: 10, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }
            }}
          />
          <motion.div 
            className="absolute w-32 h-32 rounded-full bg-blue-400 opacity-20" 
            style={{ top: '40%', left: '25%' }}
            animate={{ 
              scale: [1, 1.3, 1],
              transition: { 
                duration: 8, 
                repeat: Infinity,
                repeatType: "reverse",
                delay: 2
              }
            }}
          />
          
          {/* Abstract lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
            <motion.path 
              d="M0,100 Q80,50 160,100 T320,100 T480,100 T640,100 T800,100" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="2" 
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1,
                opacity: 0.3,
                transition: { duration: 2, delay: 0.5 }
              }}
            />
            <motion.path 
              d="M0,150 Q80,200 160,150 T320,150 T480,150 T640,150 T800,150" 
              stroke="rgba(255,255,255,0.3)" 
              strokeWidth="2" 
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: 1,
                opacity: 0.3,
                transition: { duration: 2, delay: 0.7 }
              }}
            />
          </svg>
          
          {/* Centered content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
            <motion.div 
              className="relative w-32 h-32 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: 0.6 }
              }}
              whileHover={pulse}
            >
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
              </svg>
            </motion.div>
            
            <motion.h3 
              className="text-2xl font-bold text-white mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: 0.9 }
              }}
            >
              Join Our Community
            </motion.h3>
            
            <motion.p 
              className="text-indigo-100 text-center max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: 1.1 }
              }}
            >
              Create an account to access exclusive features and personalized experiences.
            </motion.p>
            
            <motion.div 
              className="mt-8 flex space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.8, delay: 1.3 }
              }}
            >
              {/* Feature highlights */}
              <div className="flex items-center text-white/90 text-sm">
                <svg className="w-5 h-5 mr-2 text-indigo-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Free Registration</span>
              </div>
              
              <div className="flex items-center text-white/90 text-sm">
                <svg className="w-5 h-5 mr-2 text-indigo-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>Premium Access</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Register form */}
        <motion.div 
          className="w-full md:w-1/2 p-10 space-y-6"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Title */}
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-100">Create an account</h2>
            <p className="mt-2 text-sm text-gray-400">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#FBBF24] hover:text-yellow-600 transition-colors duration-200">
                Sign in instead
              </Link>
            </p>
          </motion.div>

          {/* Register Form */}
          <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
            <div className="rounded-md space-y-4">
              <motion.div variants={itemVariants}>
                <label htmlFor="full-name" className="block text-sm font-medium text-gray-300">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="full-name"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName('fullName')}
                    placeholder="Enter your full name"
                  />
                  {touched.fullName && errors.fullName && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {touched.fullName && errors.fullName && (
                  <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-300">
                  Email address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName('email')}
                    placeholder="Enter your email"
                  />
                  {touched.email && errors.email && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {touched.email && errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </motion.div>
              
              {/* Phone Number Field */}
              <motion.div variants={itemVariants}>
                <label htmlFor="phone-number" className="block text-sm font-medium text-gray-300">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                  </div>
                  <input
                    id="phone-number"
                    name="phoneNumber"
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName('phoneNumber')}
                    placeholder="Enter your phone number"
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {touched.phoneNumber && errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                )}
              </motion.div>
              
              {/* Role Selection - Kept the UI component but removed validation */}
              {/* <motion.div variants={itemVariants}>
                <label htmlFor="role" className="block text-sm font-medium text-gray-300">
                  Role
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border rounded-md shadow-sm placeholder-gray-400 text-sm transition-colors duration-200 bg-white text-black border-gray-700"
                  >
                    <option value="user">User</option>
                    <option value="client">Client</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </motion.div> */}
              
              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName('password')}
                    placeholder="Create a password"
                  />
                  {touched.password && errors.password && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {touched.password && errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
                
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-300">Password strength: {strengthLabels[passwordStrength]}</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full ${strengthColors[passwordStrength]}`} style={{ width: `${(passwordStrength + 1) * 16.66}%` }}></div>
                    </div>
                    <ul className="mt-2 text-xs text-gray-400 space-y-1">
                      <li className={`flex items-center ${formData.password.length >= 6 ? 'text-green-500' : ''}`}>
                        <svg className={`h-3 w-3 mr-1 ${formData.password.length >= 6 ? 'text-green-500' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        At least 6 characters
                      </li>
                      <li className={`flex items-center ${/\d/.test(formData.password) ? 'text-green-500' : ''}`}>
                        <svg className={`h-3 w-3 mr-1 ${/\d/.test(formData.password) ? 'text-green-500' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        At least one number
                      </li>
                      <li className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-500' : ''}`}>
                        <svg className={`h-3 w-3 mr-1 ${/[a-z]/.test(formData.password) ? 'text-green-500' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        At least one lowercase letter
                      </li>
                      <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-500' : ''}`}>
                        <svg className={`h-3 w-3 mr-1 ${/[A-Z]/.test(formData.password) ? 'text-green-500' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                        </svg>
                        At least one uppercase letter
                      </li>
                    </ul>
                  </div>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-300">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={getInputClassName('confirmPassword')}
                    placeholder="Confirm your password"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {touched.confirmPassword && errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </motion.div>
            </div>

            <motion.div className="flex items-center" variants={itemVariants}>
              <input
                id="accept-terms"
                name="acceptTerms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="accept-terms" className="ml-2 block text-sm text-gray-300">
                I accept the <a href="#" className="text-[#FBBF24] hover:text-yellow-600">Terms and Conditions</a>
              </label>
            </motion.div>
            {errors.terms && (
              <p className="text-sm text-red-500">{errors.terms}</p>
            )}

            <motion.div variants={itemVariants}>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-[#FBBF24] hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors duration-200"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-yellow-800 group-hover:text-yellow-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </span>
                Create Account
              </button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;