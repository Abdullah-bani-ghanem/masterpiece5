import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

// 🌐 Global Components
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import ScrollToTop from "../src/Component/ScrollToTop";

// 🔐 Authentication Pages
import Login from "./Pages/Login";
import Register from "./Pages/Register";

// 🏠 Public Pages
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import UserProfile from "./Pages/UserProfile";

// 🚗 Car Pages
import Cars from "./Pages/car/Cars";
import CarDetails from "./Pages/car/CarDetails";
import FormCar from "./Pages/car/FormCar";
import Payment from "./Pages/Payment";

// 🏍️ Bike Pages
import BikePage from "./Pages/Bike/BikePage";
import AddBikeForm from "./Pages/Bike/AddBikeForm";
import BikeDetails from "./Pages/Bike/BikeDetails";

// 🛠️ Admin Dashboard Layout
import AdminLayout from "./admin-dashboard/pages/AdminLayout";

// 📊 Admin Pages - Main
import Dashboard from "./admin-dashboard/pages/Dashboard";
import Orders from "./admin-dashboard/pages/Orders";
import Testimonials from "./admin-dashboard/pages/TestimonialsAdmin";
import ContactsManagement from './admin-dashboard/pages/ContactsManagement';

// 🚗 Admin Pages - Cars
import Carss from "./admin-dashboard/pages/Cars";
import NewCar from "./admin-dashboard/pages/NewCar";
import EditCar from "./admin-dashboard/pages/EditCar";
import CarView from "./admin-dashboard/pages/CarView";
import Comment from "./admin-dashboard/pages/Comment";

// 👥 Admin Pages - Users
import AdminUsers from "./admin-dashboard/pages/Users";
import NewUser from "./admin-dashboard/pages/NewUser";
import EditUser from "./admin-dashboard/pages/EditUser";

// 🏍️ Admin Pages - Bikes
import BikeAdmin from './admin-dashboard/pages/Baike/AdminBikeDashboard';
import BikeDetailsAdminPage from './admin-dashboard/pages/Baike/BikeDetailsAdminPage';
import BikeCommentsAdmin from './admin-dashboard/pages/Baike/BikeCommentsAdmin';

// 💳 Stripe
const stripePromise = loadStripe('pk_test_51RQBjG4WkYOHEN2zH0mjO8EDJR5amnvyYHiUHmn0Az5OQheCfdQheIKdotVp3bctpBcG1RQIZz2UdlH9QWhijrMh00t0ViOXSA');

// ✅ Wrapper to access `useLocation` outside `Router`
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const location = useLocation();
  const hideLayout = location.pathname.startsWith('/admin') || location.pathname.startsWith('/admin-dashboard');

  return (
    <>
      {!hideLayout && <Navbar />}

      
      <ScrollToTop />

      <Routes>

        {/* 🌐 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userProfile" element={<UserProfile />} />

        {/* 🚗 Cars */}
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/form" element={<FormCar />} />
        <Route path="/payment/:carId" element={
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        } />

        {/* 🏍️ Bikes */}
        <Route path="/bikes" element={<BikePage />} />
        <Route path="/add-bike" element={<AddBikeForm />} />
        <Route path="/bike-details/:id" element={<BikeDetails />} />

        {/* 🛠️ Admin Dashboard */}
        <Route path="/admin-dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin-dashboard/all-cars" element={<AdminLayout><Orders /></AdminLayout>} />
        <Route path="/admin-dashboard/cars" element={<AdminLayout><Carss /></AdminLayout>} />
        <Route path="/admin-dashboard/cars/new" element={<AdminLayout><NewCar /></AdminLayout>} />
        <Route path="/admin-dashboard/car/edit/:id" element={<AdminLayout><EditCar /></AdminLayout>} />
        <Route path="/admin-dashboard/cars/view/:id" element={<AdminLayout><CarView /></AdminLayout>} />
        <Route path="/admin-dashboard/comment" element={<AdminLayout><Comment /></AdminLayout>} />
        <Route path="/admin-dashboard/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
        <Route path="/admin-dashboard/users/new" element={<AdminLayout><NewUser /></AdminLayout>} />
        <Route path="/admin-dashboard/users/edit/:id" element={<AdminLayout><EditUser /></AdminLayout>} />
        <Route path="/admin-dashboard/testimonials" element={<AdminLayout><Testimonials /></AdminLayout>} />
        <Route path="/admin/contacts" element={<AdminLayout><ContactsManagement /></AdminLayout>} />

        {/* 🏍️ Admin - Bikes */}
        <Route path="/admin/AdminBikeDashboard" element={<AdminLayout><BikeAdmin /></AdminLayout>} />
        <Route path="/admin/BikeDetailsAdminPage/:id" element={<AdminLayout><BikeDetailsAdminPage /></AdminLayout>} />
        <Route path="/admin/BikeCommentsAdmin" element={<AdminLayout><BikeCommentsAdmin /></AdminLayout>} />

      </Routes>
     

      {!hideLayout && <Footer />}
    </>
  );
}

export default AppWrapper;




// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
 

// import Navbar from "./Component/Navbar";
// import About from "./Pages/About";
// import Cars from "./Pages/car/Cars";
// import Contact from "./Pages/Contact";
// import Home from "./Pages/Home";
// import Register from "./Pages/Register";
// import Footer from "./Component/Footer";
// import Payment from "./Pages/Payment"
// import FormCar from "./Pages/car/FormCar"
// import UserProfile from "./Pages/UserProfile";
// import CarDetails from './Pages/car/CarDetails';

// import BikePage from './Pages/Bike/BikePage';
// import AddBikeForm from './Pages/Bike/AddBikeForm';



// import AdminLayout from "../../frontEnd/src/admin-dashboard/pages/AdminLayout";
// import Dashboard from "../../frontEnd/src/admin-dashboard/pages/Dashboard";
// import Carss from "../../frontEnd/src/admin-dashboard/pages/Cars";
// import NewCar from "../src/admin-dashboard/pages/NewCar";
// import Orders from "../src/admin-dashboard/pages/Orders";
// import EditCar from "../src/admin-dashboard/pages/EditCar";
// import AdminUsers from "../src/admin-dashboard/pages/Users";
// import NewUser from "../src/admin-dashboard/pages/NewUser";
// import EditUser from "../src/admin-dashboard/pages/EditUser";
// import CarView from "../src/admin-dashboard/pages/CarView";
// import Comment from "../src/admin-dashboard/pages/Comment";
// import ContactsManagement from '../src/admin-dashboard/pages/ContactsManagement';
// import BikeDetails from '../src/Pages/Bike/BikeDetails';
// import BikeAdmin from '../src/admin-dashboard/pages/Baike/AdminBikeDashboard';
// import BikeDetailsAdminPage from '../src/admin-dashboard/pages/Baike/BikeDetailsAdminPage';
// import BikeCommentsAdmin from '../src/admin-dashboard/pages/Baike/BikeCommentsAdmin';
// import Testimonials from '../src/admin-dashboard/pages/TestimonialsAdmin';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';



// import React from 'react'
// import Login from "./Pages/Login";

// const stripePromise = loadStripe('pk_test_51RQBjG4WkYOHEN2zH0mjO8EDJR5amnvyYHiUHmn0Az5OQheCfdQheIKdotVp3bctpBcG1RQIZz2UdlH9QWhijrMh00t0ViOXSA');


// function App() {
//   return (
//     <>

//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/about" element={<About />}></Route>
//           <Route path="/contact" element={<Contact />}></Route>
//           <Route path="/cars" element={<Cars />}></Route>
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/payment/:carId" element={<Elements stripe={stripePromise}><Payment /></Elements>} />
//           <Route path="/form" element={<FormCar />} />
//           <Route path="/userProfile" element={<UserProfile />} />

//           <Route path="/car-details/:id" element={<CarDetails />} />

//           <Route path="/bikes" element={<BikePage />} />
//           <Route path="/admin/add-bike" element={<AddBikeForm />} />
//           <Route path="/bike-details/:id" element={<BikeDetails />} />
          




//           <Route path="/admin-dashboard/all-cars" element={<AdminLayout><Orders /></AdminLayout>} />
//           <Route path="/admin-dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
//           <Route path="/admin-dashboard/cars" element={<AdminLayout><Carss /></AdminLayout>} />
//           <Route path="/admin-dashboard/cars/new" element={<AdminLayout><NewCar /></AdminLayout>} />
//           <Route path="/admin-dashboard/car/edit/:id" element={<AdminLayout><EditCar /></AdminLayout>}/>
//           <Route path="/admin-dashboard/users" element={<AdminLayout><AdminUsers /></AdminLayout>}/>
//           <Route path="/admin-dashboard/users/new" element={<AdminLayout><NewUser /></AdminLayout>} />
//           <Route path="/admin-dashboard/users/edit/:id" element={<AdminLayout><EditUser /></AdminLayout>}/>
//           <Route path="/admin-dashboard/cars/view/:id" element={<AdminLayout><CarView /></AdminLayout>}/>
//           <Route path="/admin-dashboard/comment" element={<AdminLayout><Comment /></AdminLayout>}/>
//           <Route path="/admin/contacts" element={<AdminLayout><ContactsManagement /></AdminLayout>}/>
//           <Route path="/admin/AdminBikeDashboard" element={<AdminLayout><BikeAdmin /></AdminLayout>}/>
//           <Route path="/admin/BikeDetailsAdminPage/:id" element={<AdminLayout><BikeDetailsAdminPage /></AdminLayout>}/>
//           <Route path="/admin/BikeCommentsAdmin" element={<AdminLayout><BikeCommentsAdmin /></AdminLayout>}/>
//           <Route path="/admin-dashboard/testimonials" element={<AdminLayout><Testimonials /></AdminLayout>}/>

       
//         </Routes>
//         <Footer />
//       </Router>
//     </>
//   )
// }

// export default App

