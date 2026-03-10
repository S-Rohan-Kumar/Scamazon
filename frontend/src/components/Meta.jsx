import React from 'react';
import { Helmet } from 'react-helmet-async';

const Meta = ({ 
  title = "Welcome to Scamazon", 
  description = "Find the best products at the best prices.", 
  keywords = "electronics, buy electronics, cheap electronics, scamazon" 
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default Meta;