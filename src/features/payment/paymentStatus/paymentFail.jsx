// import React, { useState } from 'react';
// import './PaymentSuccess.css';


// const PaymentFail = () => {
   
//     return (
//         <div className="paymentsuccess-container">
//             <img className='img-logo' src='./PaymentFail.png' alt="Payment successful" />
//             <div className='paymentsuccess-text '>Payment Fail</div>
//         </div>
//     );
// };

// export default PaymentFail;



import React from 'react';
import './PaymentSuccess.css'; 

const PaymentFail = () => {
    return (
        <div className="paymentsuccess-container">
            {/* Ensure the correct path for the image */}
            <img className='img-logo' src='./PaymentFail.png' alt="Payment failed" />
            <div className='paymentfail-text'>Payment Failed</div>
        </div>
    );
};

export default PaymentFail;
