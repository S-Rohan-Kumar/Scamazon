import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <nav className="d-flex justify-content-center mb-5 mt-4">
      <div className="d-flex align-items-center w-100 px-3" style={{ maxWidth: '800px' }}>
        
        <div className="text-center flex-fill">
          {step1 ? (
            <Link to="/login" className="nav-link fw-bold text-primary border-bottom border-primary border-3 pb-2">Sign In</Link>
          ) : (
            <span className="nav-link disabled text-muted border-bottom border-light border-3 pb-2">Sign In</span>
          )}
        </div>

        <div className="text-center flex-fill">
          {step2 ? (
            <Link to="/shipping" className="nav-link fw-bold text-primary border-bottom border-primary border-3 pb-2">Shipping</Link>
          ) : (
            <span className="nav-link disabled text-muted border-bottom border-light border-3 pb-2">Shipping</span>
          )}
        </div>

        <div className="text-center flex-fill">
          {step3 ? (
            <Link to="/payment" className="nav-link fw-bold text-primary border-bottom border-primary border-3 pb-2">Payment</Link>
          ) : (
            <span className="nav-link disabled text-muted border-bottom border-light border-3 pb-2">Payment</span>
          )}
        </div>

        <div className="text-center flex-fill">
          {step4 ? (
            <Link to="/placeorder" className="nav-link fw-bold text-primary border-bottom border-primary border-3 pb-2">Place Order</Link>
          ) : (
            <span className="nav-link disabled text-muted border-bottom border-light border-3 pb-2">Place Order</span>
          )}
        </div>

      </div>
    </nav>
  );
};

export default CheckoutSteps;