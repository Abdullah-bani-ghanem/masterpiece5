import React, { useState } from 'react';
import Swal from 'sweetalert2';
import WhatsAndButton from '../Component/WhatsAndButton';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ClassicCarsPaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { carId } = useParams();
  // const email = localStorage.getItem('userEmail');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');



  const email = localStorage.getItem('userEmail') || sessionStorage.getItem('userEmail');

if (!email || !email.includes('@')) {
  Swal.fire({
    icon: 'error',
    title: 'Email missing',
    text: 'Your email address is missing. Please log in again.',
  });
  setLoading(false);
  return;
}

  const handleSubmits = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Get client secret from backend
    const { data } = await axios.post('http://localhost:5000/api/payment/payment', {
      amount: 10000, // $10
      customerEmail:email,
      vehicalId:carId
    });

    // 2. Confirm card payment
    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      setMessage(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        await axios.post('http://localhost:5000/api/payment/updatePaymentStatus', {
          paymentIntentId: result.paymentIntent.id, status:result.paymentIntent.status, vehicalId:carId
        });
        setMessage('Payment successful!');
      }
    }

    setLoading(false);
  };

  return (
    <div className='flex justify-center items-center w-[100vw] h-[100vh]'>
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md w-full h-[12rem]">
      <form onSubmit={handleSubmits} className="space-y-6 mt">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Card Details
          </label>
          <div className="p-4 border border-gray-300 rounded-md bg-white">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#32325d',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a',
                  },
                },
              }}
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={!stripe || loading}
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-md shadow-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {loading ? 'Processing...' : 'Pay $10'}
        </button>
        
        {message && (
          <p className={`text-sm font-medium ${
            message.includes('successful') ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
    </div>
  );
};

export default ClassicCarsPaymentForm;




















// const [formData, setFormData] = useState({
//   cardName: '',
//   cardNumber: '',
//   securityCode: '',
//   expiryDate: ''
// });

    // const [errors, setErrors] = useState({
  //   cardName: '',
  //   cardNumber: '',
  //   securityCode: '',
  //   expiryDate: ''
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   let updatedValue = value;

  //   if (name === 'cardNumber') {
  //     updatedValue = value.replace(/\D/g, '').slice(0, 16);
  //     updatedValue = updatedValue.replace(/(.{4})/g, '$1 ').trim();
  //   }

  //   if (name === 'securityCode') {
  //     updatedValue = value.replace(/\D/g, '').slice(0, 3);
  //   }

  //   if (name === 'expiryDate') {
  //     updatedValue = value.replace(/\D/g, '').slice(0, 4);
  //     if (updatedValue.length >= 3) {
  //       updatedValue = `${updatedValue.slice(0, 2)}/${updatedValue.slice(2)}`;
  //     }
  //   }

  //   setFormData({
  //     ...formData,
  //     [name]: updatedValue
  //   });

  //   if (errors[name]) {
  //     setErrors({
  //       ...errors,
  //       [name]: ''
  //     });
  //   }
  // };

  // const validateForm = () => {
  //   let valid = true;
  //   const newErrors = { ...errors };

  //   if (!/^[A-Za-z\s]+$/.test(formData.cardName)) {
  //     newErrors.cardName = 'Name should contain only letters and spaces';
  //     valid = false;
  //   }

  //   const cardNumberClean = formData.cardNumber.replace(/\s/g, '');
  //   if (!/^\d{16}$/.test(cardNumberClean)) {
  //     newErrors.cardNumber = 'Card number should be 16 digits';
  //     valid = false;
  //   }

  //   if (!/^\d{3}$/.test(formData.securityCode)) {
  //     newErrors.securityCode = 'Security code should be 3 digits';
  //     valid = false;
  //   }

  //   if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
  //     newErrors.expiryDate = 'Format should be MM/YY';
  //     valid = false;
  //   } else {
  //     const [month, year] = formData.expiryDate.split('/');
  //     const expDate = new Date(`20${year}`, month);
  //     const today = new Date();
  //     today.setDate(1);
  //     if (expDate < today) {
  //       newErrors.expiryDate = 'Card has expired';
  //       valid = false;
  //     }
  //   }

  //   setErrors(newErrors);
  //   return valid;
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   try {
  //     const response = await fetch('http://localhost:5000/api/payment', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify(formData)
  //     });

  //     const data = await response.json();
  //     if (response.ok) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: 'Payment Saved',
  //         text: 'Your payment has been saved successfully!',
  //         confirmButtonText: 'OK'
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: 'Payment Failed',
  //         text: data.message || 'Something went wrong while saving the payment.',
  //         confirmButtonText: 'OK'
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error saving payment:', error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Error',
  //       text: 'An unexpected error occurred. Please try again.',
  //       confirmButtonText: 'OK'
  //     });
  //   }
  // };






    // <div>
    //   {/* Hero Section */}
    //   {/* <div className="bg-gray-700 bg-opacity-70 bg-blend-overlay bg-center bg-cover py-25 mt-8"
    //     style={{ backgroundImage: 'url("https://images.pexels.com/photos/6214475/pexels-photo-6214475.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load' }}>
    //     <div className="container mx-auto px-4 text-center text-white">
    //       <h1 className="font-[Playfair Display] text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">Payment</h1>
    //       <p className="font-[Playfair Display] text-xl md:text-2xl max-w-3xl mx-auto">
    //         "Welcome to the payment page – please complete your payment to finalize your order safely and easily."
    //       </p>
    //     </div>
    //   </div> */}



    //   {/* باقي الصفحة */}
    //   <div className="flex items-center justify-center  dark:bg-[#2d2d2e] p-4 mt-5">

    //     <div
    //       className="text-white border border-gray-700 rounded-lg overflow-hidden py-10 mt-25 mb-20"
    //       style={{
    //         boxShadow: '0 0 10px 1px #facc15' // أصفر Tailwind: yellow-400
    //       }}
    //     >

    //       {/* <div className="relative">
    //         <img 
    //           src="https://images.unsplash.com/photo-1576761733452-984b98effaf3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGNhciUyMGNsYXNzaWN8ZW58MHx8MHx8fDA%3D" 
    //           alt="Classic cars" 
    //           className="w-full h-40 object-cover" 
    //         />
    //         <br /><br />
    //         <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 bg-gray-900 rounded-full p-1 border-4 border-gray-700">
    //           <img 
    //             src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-PpsNyA3Q5Q5s7Y3D0ajFIysdDXSinmutTQ&s" 
    //             alt="Classic car logo" 
    //             className="w-16 h-16 rounded-full object-cover" 
    //           />
    //         </div>
    //       </div> */}

    //       <div className="pt-12 pb-6 text-center px-6">
    //         <h2 className="text-xl font-bold text-white">Card Payment</h2>
    //       </div>

    //       <div className=" px-6 pb-6">
    //         <form className="space-y-10" onSubmit={handleSubmit}>
    //           <div className="space-y-1">
    //             <label className="block text-white">
    //               <span className="text-[#FBBF24]">*</span> Name on Card
    //             </label>
    //             <input
    //               type="text"
    //               name="cardName"
    //               value={formData.cardName}
    //               onChange={handleChange}
    //               placeholder="John Doe"
    //               className={`w-full px-3 py-2 dark:bg-[#49494a] border ${errors.cardName ? 'border-yellow-500' : 'border-gray-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600`}
    //               required
    //             />
    //             {errors.cardName && <p className="dark:text-red-600 text-xs mt-1">{errors.cardName}</p>}
    //           </div>

    //           <div className="space-y-1">
    //             <label className="block text-white">
    //               <span className="text-[#FBBF24]">*</span> Card Number
    //             </label>
    //             <input
    //               type="text"
    //               name="cardNumber"
    //               value={formData.cardNumber}
    //               onChange={handleChange}
    //               placeholder="1234 5678 9012 3456"
    //               className={`w-full px-3 py-2 dark:bg-[#49494a] border ${errors.cardNumber ? 'border-yellow-500' : 'border-gray-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600`}
    //               required
    //             />
    //             {errors.cardNumber && <p className="dark:text-red-600 text-xs mt-1">{errors.cardNumber}</p>}
    //           </div>

    //           <div className="grid grid-cols-2 gap-4">
    //             <div className="space-y-1">
    //               <label className="block text-white">
    //                 <span className="text-[#FBBF24]">*</span> Security Code
    //               </label>
    //               <input
    //                 type="text"
    //                 name="securityCode"
    //                 value={formData.securityCode}
    //                 onChange={handleChange}
    //                 placeholder="CVC"
    //                 className={`w-full px-3 py-2 dark:bg-[#49494a] border ${errors.securityCode ? 'border-yellow-500' : 'border-gray-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600`}
    //                 required
    //               />
    //               {errors.securityCode && <p className="dark:text-red-600 text-xs mt-1">{errors.securityCode}</p>}
    //             </div>
    //             <div className="space-y-1">
    //               <label className="block text-white">
    //                 <span className="text-[#FBBF24]">*</span> Expiration Date
    //               </label>
    //               <input
    //                 type="text"
    //                 name="expiryDate"
    //                 value={formData.expiryDate}
    //                 onChange={handleChange}
    //                 placeholder="MM/YY"
    //                 className={`w-full px-3 py-2 dark:bg-[#49494a] border ${errors.expiryDate ? 'border-yellow-500' : 'border-gray-700'} text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-600`}
    //                 required
    //               />
    //               {errors.expiryDate && <p className="dark:text-red-600 text-xs mt-1">{errors.expiryDate}</p>}
    //             </div>
    //           </div>

    //           <button
    //             type="submit"
    //             className="w-full py-2 bg-[#FBBF24] hover:bg-yellow-600 text-white rounded-md transition duration-200"
    //           >
    //             Complete Payment
    //           </button>

    //           <div className="flex items-center justify-center text-[#FBBF24] text-sm pt-2">
    //             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    //               <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    //               <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    //             </svg>
    //             <span>Transactions are secure and encrypted</span>
    //           </div>
    //         </form>
    //       </div>
    //     </div>



    //     <WhatsAndButton />

    //   </div>
    // </div>