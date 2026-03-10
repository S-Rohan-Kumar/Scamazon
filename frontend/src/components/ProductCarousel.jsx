import React from "react";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Loading from "./Loading";
import Message from "./Message";

const ProductCarousel = () => {
  const { data: products, isLoading, isError, error } = useGetTopProductsQuery();

  const styles = {
    carouselWrapper: {
      backgroundColor: "#111", 
      borderRadius: "24px",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      marginBottom: "4rem",
      position: "relative",
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "450px", 
      padding: "2rem",
      paddingBottom: "6rem",
    },
    image: {
      maxHeight: "100%",
      maxWidth: "100%",
      objectFit: "contain",
      filter: "drop-shadow(0px 15px 25px rgba(0,0,0,0.4))",
      transition: "transform 0.3s ease",
    },
    caption: {
      position: "absolute",
      bottom: "0",
      left: "0",
      width: "100%",
      backgroundColor: "rgba(17, 17, 17, 0.7)", 
      backdropFilter: "blur(12px)", 
      padding: "1.5rem",
      textAlign: "center",
      borderTop: "1px solid rgba(255,255,255,0.05)",
    },
    title: {
      color: "#fff",
      fontSize: "1.25rem",
      fontWeight: 600,
      margin: 0,
      letterSpacing: "0.5px",
    },
  };

  if (isLoading) return <Loading />;
  
  if (isError) {
    return (
      <Message variant="danger">
        {error?.data?.message || error.error}
      </Message>
    );
  }

  return (
    <div style={styles.carouselWrapper}>
      <Carousel pause="hover" indicators={false}>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <div 
                style={styles.imageContainer}
                onMouseOver={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  if(img) img.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  if(img) img.style.transform = 'scale(1)';
                }}
              >
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fluid 
                  style={styles.image} 
                />
              </div>
              <div style={styles.caption}>
                <h2 style={styles.title}>
                  {product.name} (₹{product.price})
                </h2>
              </div>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;