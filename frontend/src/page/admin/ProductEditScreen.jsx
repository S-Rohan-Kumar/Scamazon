import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Form, Container, Row, Col } from "react-bootstrap";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import {
  useGetproductDetailsQuery,
  useUpdateProductMutation,
} from "../../slices/productsApiSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading.jsx";
import Message from "../../components/Message.jsx";
import { toast } from "react-toastify";

const editStyles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#fcfcfc",
    paddingTop: "3rem",
    paddingBottom: "5rem",
    fontFamily: "'Inter', sans-serif",
    color: "#1a1a1a",
  },
  goBack: {
    color: "#666",
    textDecoration: "none",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "2rem",
    transition: "color 0.2s ease",
  },
  whiteCard: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    padding: "3rem",
    border: "1px solid #f0f0f0",
    boxShadow: "0 10px 40px rgba(0,0,0,0.03)",
  },
  heading: {
    fontWeight: 700,
    fontSize: "2rem",
    letterSpacing: "-0.03em",
    marginBottom: "0.5rem",
  },
  subtext: {
    color: "#999",
    fontSize: "0.95rem",
    marginBottom: "2rem",
  },
  input: {
    backgroundColor: "#f8f9fa",
    border: "1px solid #eee",
    color: "#111",
    borderRadius: "12px",
    padding: "0.8rem 1rem",
    fontSize: "0.95rem",
  },
  label: {
    color: "#666",
    fontSize: "0.85rem",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "0.5rem",
  },
  submitBtn: {
    width: "100%",
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "14px",
    padding: "1.2rem",
    fontWeight: 600,
    marginTop: "2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s ease",
  },
};

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetproductDetailsQuery(productId);
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  const [name, setName] = useState(
    product?.name || "Wireless Mechanical Keyboard",
  );
  const [price, setPrice] = useState(product?.price || 129.99);
  const [image, setImage] = useState(product?.image || "/images/keyboard.jpg");
  const [brand, setBrand] = useState(product?.brand || "Keychron");
  const [category, setCategory] = useState(product?.category || "Electronics");
  const [countInStock, setCountInStock] = useState(product?.countInStock || 15);
  const [description, setDescription] = useState(
    product?.description ||
      "A premium wireless mechanical keyboard with hot-swappable switches and RGB backlighting.",
  );
  const [uploadFile, setUploadFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("brand", brand);
      formData.append("category", category);
      formData.append("countInStock", countInStock);
      formData.append("description", description);

      if (uploadFile) {
        formData.append("prodImage", uploadFile); 
      } else {
        formData.append("image", image); 
      }

      await updateProduct({ productId, formData }).unwrap();
      toast.success("Product updated successfully!");
      navigate("/admin/productlist");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const uploadFileHandler = (e) => {
    console.log("File selected:", e.target.files[0]);
    const file = e.target.files[0];
    setUploadFile(file);
    setImage(URL.createObjectURL(file));
  };

  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <Message variant="danger">{error}</Message>;
  }

  return (
    <div style={editStyles.page}>
      <Container>
        <Link
          to="/admin/productlist"
          style={editStyles.goBack}
          onMouseOver={(e) => (e.currentTarget.style.color = "#111")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#666")}
        >
          <FaArrowLeft /> Go Back to Products
        </Link>

        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div style={editStyles.whiteCard}>
              <h1 style={editStyles.heading}>Edit Product</h1>
              <p style={editStyles.subtext}>Product ID: {productId}</p>

              <Form onSubmit={submitHandler}>
                <Form.Group className="mb-4" controlId="name">
                  <Form.Label style={editStyles.label}>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter product name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={editStyles.input}
                    className="shadow-none"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="price">
                      <Form.Label style={editStyles.label}>
                        Price ($)
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        style={editStyles.input}
                        className="shadow-none"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="countInStock">
                      <Form.Label style={editStyles.label}>
                        Stock Count
                      </Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter stock"
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                        style={editStyles.input}
                        className="shadow-none"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4" controlId="image">
                  <Form.Label style={editStyles.label}>Image URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    style={editStyles.input}
                    className="shadow-none mb-2"
                  />
                  <Form.Control
                    type="file"
                    label="Choose File"
                    onChange={uploadFileHandler}
                    style={{ ...editStyles.input, padding: "0.6rem 1rem" }}
                    className="shadow-none"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="brand">
                      <Form.Label style={editStyles.label}>Brand</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                        style={editStyles.input}
                        className="shadow-none"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4" controlId="category">
                      <Form.Label style={editStyles.label}>Category</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={editStyles.input}
                        className="shadow-none"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4" controlId="description">
                  <Form.Label style={editStyles.label}>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Enter description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{ ...editStyles.input, resize: "none" }}
                    className="shadow-none"
                  />
                </Form.Group>

                <button
                  type="submit"
                  style={editStyles.submitBtn}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <FaSave size={18} /> Save Changes
                </button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductEditScreen;
