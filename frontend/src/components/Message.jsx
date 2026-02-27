import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  const isError = variant === 'danger';
  
  return (
    <Alert 
      variant={variant} 
      style={{
        backgroundColor: '#fff', // Pure white background to match your clean UI
        color: '#111',
        border: 'none',
        borderLeft: `6px solid ${isError ? '#ff4444' : '#111'}`, // Strong accent bar
        borderRadius: '0',
        padding: '1.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)', // Subtle elevation
        fontFamily: 'inherit'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ fontSize: '1.5rem', marginRight: '1rem' }}>
          {isError ? '✕' : 'ℹ︎'}
        </span>
        <div>
          <strong style={{ display: 'block', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
            {isError ? 'System Alert' : 'Notification'}
          </strong>
          <div style={{ fontSize: '1rem', color: '#555' }}>
            {children}
          </div>
        </div>
      </div>
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;