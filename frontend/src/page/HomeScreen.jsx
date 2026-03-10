import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Product } from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loading from "../components/Loading";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom";

export const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const products = data?.products;

  const styles = {
    section: { padding: "4rem 0" },
    title: {
      fontWeight: 700,
      fontSize: "2.25rem",
      letterSpacing: "-0.03em",
      marginBottom: "2rem",
      color: "#111",
    },
    subtitle: { color: "#666", marginBottom: "3rem", fontSize: "1.1rem" },
  };

  return (
    <Container style={styles.section}>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <div className="alert alert-danger">
          {error?.data?.message || error.error}
        </div>
      ) : (
        <>
          <header>
            <h1 style={styles.title}>New Arrivals</h1>
            <p style={styles.subtitle}>
              Thoughtfully designed pieces for your everyday life.
            </p>
          </header>

          <Row className="gy-4">
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={data.pages}
            page={data.page}
            // keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </Container>
  );
};
