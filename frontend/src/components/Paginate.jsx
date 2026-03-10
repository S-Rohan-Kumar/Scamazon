import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  if (pages <= 1) return null;

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      gap: "8px",
      marginTop: "3rem",
      marginBottom: "2rem",
    },
    link: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "40px",
      height: "40px",
      borderRadius: "10px",
      textDecoration: "none",
      fontWeight: 600,
      fontSize: "0.95rem",
      transition: "all 0.2s ease",
      border: "1px solid #eee",
    },
    active: {
      backgroundColor: "#111",
      color: "#fff",
      borderColor: "#111",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    inactive: {
      backgroundColor: "#fff",
      color: "#111",
    }
  };

  return (
    <div style={styles.container}>
      {[...Array(pages).keys()].map((x) => {
        const pageNumber = x + 1;
        
        let route = `/page/${pageNumber}`;
        if (isAdmin) {
          route = `/admin/productlist/${pageNumber}`;
        } else if (keyword) {
          route = `/search/${keyword}/page/${pageNumber}`;
        }

        return (
          <Link
            key={pageNumber}
            to={route}
            style={{
              ...styles.link,
              ...(pageNumber === page ? styles.active : styles.inactive),
            }}
            onMouseOver={(e) => {
              if (pageNumber !== page) {
                e.currentTarget.style.backgroundColor = "#f8f9fa";
                e.currentTarget.style.borderColor = "#ddd";
              }
            }}
            onMouseOut={(e) => {
              if (pageNumber !== page) {
                e.currentTarget.style.backgroundColor = "#fff";
                e.currentTarget.style.borderColor = "#eee";
              }
            }}
          >
            {pageNumber}
          </Link>
        );
      })}
    </div>
  );
};

export default Paginate;