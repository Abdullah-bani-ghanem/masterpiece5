import React from 'react'

function Mapp() {
  return (
    <>
           {/* Map Section */}
           <div className="py-16 px-4 max-w-7xl mx-auto">
        <div className="bg-white dark:bg-[#2d2d2e] rounded-xl shadow-xl overflow-hidden">
          <h2 className="font-[Playfair Display] text-5xl font-bold mb-8 p-8 text-center dark:text-white">
            Our Location
          </h2>
          <div className="h-96 w-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.3895895885753!2d36.08776962490851!3d32.05870992034881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b65cd4d8f17e1%3A0x30e86b8a97e4ac7d!2sOrange%20Digital%20Village%20Zarqa!5e0!3m2!1sar!2sjo!4v1742754671002!5m2!1sar!2sjo"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Our Location"
              className="rounded-lg"
            ></iframe>
          </div>
        </div>
      </div>
      
   </>
  )
}

export default Mapp
