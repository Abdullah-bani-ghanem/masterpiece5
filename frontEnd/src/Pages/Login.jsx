// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [rememberMe, setRememberMe] = useState(false);
//   const [isVisible, setIsVisible] = useState(false);
//   const navigate = useNavigate();
  
//   useEffect(() => {
//     // Trigger animation when component mounts
//     setIsVisible(true);
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // console.log('Login attempt:', { email, password, rememberMe });
  
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/users/login",
//         { email, password },
//         { withCredentials: true }
//       );
  
//       if (rememberMe) {
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("userEmail", email);
//       } else {
//         sessionStorage.setItem("token", res.data.token);
//         sessionStorage.setItem("userEmail", email);
//       }

//       // localStorage.setItem("userEmail", email);
  
//       // Swal.fire({
//       //   icon: 'success',
//       //   title: 'Success',
//       //   text: 'You have logged in successfully!',
//       //   confirmButtonText: 'OK',
//       //   background: '#1F2937',
//       //   color: '#F9FAFB',
//       // }).then(() => {
//         navigate("/");
//       // });
  
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Login Failed',
//         text: error.response?.data?.message || "An unexpected error occurred",
//         confirmButtonText: 'OK',
//         background: '#1F2937',
//         color: '#F9FAFB',
//       });
//     }
//   };

//   const handleGoogleLogin = () => {
//     console.log('Attempting to login with Google');
//     // Google login logic implementation
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
//     hidden: { x: 70, opacity: 0 },
//     visible: { x: 0, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } }
//   };

//   const pulse = {
//     scale: [1, 1.05, 1],
//     transition: { duration: 2, repeat: Infinity }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b dark:bg-[#2d2d2e] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-15 ">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.7 }}
//         className="max-w-5xl w-full flex dark:bg-[#4a4a48] rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
//       >
//         {/* Left side - Login form */}
//         <motion.div 
//           className="w-full md:w-1/2 p-10 space-y-8"
//           initial="hidden"
//           animate={isVisible ? "visible" : "hidden"}
//           variants={containerVariants}
//         >
//           {/* Title */}
//           <motion.div className="text-center" variants={itemVariants}>
//             <h2 className="mt-6 text-3xl font-extrabold text-gray-100">Welcome Back</h2>
//             <p className="mt-2 text-sm text-gray-400">
//               Don't have an account?{' '}
//               <Link to="/register" className="font-medium text-[#FBBF24] hover:text-yellow-600 transition-colors duration-200">
//                 Sign up now
//               </Link>
//             </p>
//           </motion.div>

//           {/* Login Form */}
//           <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//             <div className="rounded-md space-y-5">
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
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     className="bg-gray-800 focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-gray-100 text-sm transition-colors duration-200"
//                     placeholder="Enter your email"
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
//                     autoComplete="current-password"
//                     required
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     className="bg-gray-800 focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-md shadow-sm placeholder-gray-400 text-gray-100 text-sm transition-colors duration-200"
//                     placeholder="Enter your password"
//                   />
//                 </div>
//               </motion.div>
//             </div>

//             <motion.div className="flex items-center justify-between" variants={itemVariants}>
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   checked={rememberMe}
//                   onChange={(e) => setRememberMe(e.target.checked)}
//                   className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-700 rounded bg-gray-800"
//                 />
//                 <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
//                   Remember me
//                 </label>
//               </div>

//             </motion.div>

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
//                 Sign in
//               </motion.button>
//             </motion.div>
//           </form>

//           {/* Google Login Option */}
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
//                 onClick={handleGoogleLogin}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="w-full flex justify-center items-center py-3 px-4 border border-yellow-500 rounded-md shadow-sm  text-sm font-medium text-gray-300 dark:bg-[#4a4a48] hover:dark:bg-[#2d2d2e] transition-colors duration-200"
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
//                 Sign in with Google
//               </motion.button>
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Right side - Image with animation */}
//         <motion.div 
//           className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#FBBF24] to-yellow-600 relative overflow-hidden"
//           initial="hidden"
//           animate="visible"
//           variants={slideIn}
//         >
//           {/* Animated elements in background */}
//           <motion.div 
//             className="absolute w-64 h-64 rounded-full bg-purple-600 opacity-20" 
//             style={{ top: '10%', right: '-20%' }}
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
//             className="absolute w-40 h-40 rounded-full bg-green-100 opacity-20" 
//             style={{ bottom: '10%', left: '5%' }}
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
//             className="absolute w-32 h-32 rounded-full bg-blue-800 opacity-20" 
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
//                 <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
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
//               Welcome Back
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
//               Sign in to access your account and continue your journey with us.
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
//                 <span>Secure Login</span>
//               </div>
              
//               <div className="flex items-center text-white/90 text-sm">
//                 <svg className="w-5 h-5 mr-2 text-indigo-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                   <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
//                 </svg>
//                 <span>24/7 Support</span>
//               </div>
//             </motion.div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginPage;



import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  
  // Validation states
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  
  useEffect(() => {
    // Trigger animation when component mounts
    setIsVisible(true);
  }, []);

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const validatePassword = (password) => {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'Password must be at least 6 characters';
    return '';
  };

  // Field handlers
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setErrors({
        ...errors,
        email: validateEmail(value)
      });
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setErrors({
        ...errors,
        password: validatePassword(value)
      });
    }
  };

  const handleBlur = (field) => {
    setTouched({
      ...touched,
      [field]: true
    });
    
    if (field === 'email') {
      setErrors({
        ...errors,
        email: validateEmail(email)
      });
    } else if (field === 'password') {
      setErrors({
        ...errors,
        password: validatePassword(password)
      });
    }
  };

  const isFormValid = () => {
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password)
    };
    
    setErrors(newErrors);
    setTouched({
      email: true,
      password: true
    });
    
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      return;
    }
  
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredentials: true }
      );
  
      if (rememberMe) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userEmail", res.data.user.email);
      } else {
        sessionStorage.setItem("token", res.data.token);
        sessionStorage.setItem("userEmail", res.data.user.email);
      }

      navigate("/");
  
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.response?.data?.message || "An unexpected error occurred",
        confirmButtonText: 'OK',
        background: '#1F2937',
        color: '#F9FAFB',
      });
    }
  };

  const handleGoogleLogin = () => {
    console.log('Attempting to login with Google');
    // Google login logic implementation
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
    hidden: { x: 70, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.9, ease: "easeOut" } }
  };

  const pulse = {
    scale: [1, 1.05, 1],
    transition: { duration: 2, repeat: Infinity }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b dark:bg-[#2d2d2e] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 mt-15 ">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl w-full flex dark:bg-[#4a4a48] rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
      >
        {/* Left side - Login form */}
        <motion.div 
          className="w-full md:w-1/2 p-10 space-y-8"
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Title */}
          <motion.div className="text-center" variants={itemVariants}>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-100">Welcome Back</h2>
            <p className="mt-2 text-sm text-gray-400">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-[#FBBF24] hover:text-yellow-600 transition-colors duration-200">
                Sign up now
              </Link>
            </p>
          </motion.div>

          {/* Login Form */}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="rounded-md space-y-5">
              <motion.div variants={itemVariants}>
                <label htmlFor="email-address" className="block text-sm font-medium text-gray-300">
                  Email address
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
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={() => handleBlur('email')}
                    className={`bg-gray-800 focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-3 py-3 border ${
                      errors.email && touched.email ? 'border-red-500' : 'border-gray-700'
                    } rounded-md shadow-sm placeholder-gray-400 text-gray-100 text-sm transition-colors duration-200`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && touched.email && (
                  <p className="mt-2 text-sm text-red-500">{errors.email}</p>
                )}
              </motion.div>
              
              <motion.div variants={itemVariants}>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
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
                    autoComplete="current-password"
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={() => handleBlur('password')}
                    className={`bg-gray-800 focus:ring-green-500 focus:border-green-500 block w-full pl-10 pr-3 py-3 border ${
                      errors.password && touched.password ? 'border-red-500' : 'border-gray-700'
                    } rounded-md shadow-sm placeholder-gray-400 text-gray-100 text-sm transition-colors duration-200`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && touched.password && (
                  <p className="mt-2 text-sm text-red-500">{errors.password}</p>
                )}
              </motion.div>
            </div>

            <motion.div className="flex items-center justify-between" variants={itemVariants}>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-700 rounded bg-gray-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#FBBF24] hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <svg
                    className="h-5 w-5 text-[#a78633] group-hover:text-yellow-800"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                Sign in
              </motion.button>
            </motion.div>
          </form>

          {/* Google Login Option */}
          <div className="mt-6">
            <motion.div className="relative" variants={itemVariants}>
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-400">Or continue with</span>
              </div>
            </motion.div>

            <motion.div className="mt-6" variants={itemVariants}>
              <motion.button
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center items-center py-3 px-4 border border-yellow-500 rounded-md shadow-sm text-sm font-medium text-gray-300 dark:bg-[#4a4a48] hover:dark:bg-[#2d2d2e] transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                  />
                  <path
                    fill="#34A853"
                    d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970142 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                  />
                  <path
                    fill="#4A90E2"
                    d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.7272727 L18.4363636,14.7272727 C18.1187732,16.013119 17.2662994,17.0926947 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                  />
                </svg>
                Sign in with Google
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Right side - Image with animation */}
        <motion.div 
          className="hidden md:block md:w-1/2 bg-gradient-to-br from-[#FBBF24] to-yellow-600 relative overflow-hidden"
          initial="hidden"
          animate="visible"
          variants={slideIn}
        >
          {/* Animated elements in background */}
          <motion.div 
            className="absolute w-64 h-64 rounded-full bg-purple-600 opacity-20" 
            style={{ top: '10%', right: '-20%' }}
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
            className="absolute w-40 h-40 rounded-full bg-green-100 opacity-20" 
            style={{ bottom: '10%', left: '5%' }}
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
            className="absolute w-32 h-32 rounded-full bg-blue-800 opacity-20" 
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
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
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
              Welcome Back
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
              Sign in to access your account and continue your journey with us.
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
                <span>Secure Login</span>
              </div>
              
              <div className="flex items-center text-white/90 text-sm">
                <svg className="w-5 h-5 mr-2 text-indigo-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                <span>24/7 Support</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;