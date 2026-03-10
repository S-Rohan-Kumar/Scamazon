import React from "react";
import { Table, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { useGetProductsQuery } from "../../slices/productsApiSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading.jsx";
import Message from "../../components/Message.jsx";
import { useCreateProductMutation , useDeleteProductMutation } from "../../slices/productsApiSlice.js";
import { toast } from 'react-toastify';

const adminStyles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#fcfcfc",
    paddingTop: "5rem",
    paddingBottom: "5rem",
    fontFamily: "'Inter', sans-serif",
    color: "#1a1a1a",
  },
  heading: {
    fontWeight: 700,
    fontSize: "2rem",
    letterSpacing: "-0.03em",
    margin: 0,
  },
  whiteCard: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    padding: "2.5rem",
    border: "1px solid #f0f0f0",
    boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
    marginTop: "2rem",
  },
  createBtn: {
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    padding: "0.8rem 1.5rem",
    fontWeight: 600,
    display: "inline-flex", /* <--- Changed to inline-flex to fix the right alignment */
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s ease",
  },
  actionBtnEdit: {
    backgroundColor: "#f8f9fa",
    color: "#111",
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "0.5rem 0.8rem",
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  actionBtnDelete: {
    backgroundColor: "rgba(235, 87, 87, 0.1)",
    color: "#eb5757",
    border: "none",
    borderRadius: "8px",
    padding: "0.5rem 0.8rem",
    fontSize: "0.9rem",
    transition: "all 0.2s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "0.5rem",
  },
};

const ProductListScreen = () => {
  const keyword = ""
  const pageNumber = ""
  const { data: products, isLoading, isError, error  , refetch } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  const [createProduct , {isLoading  : createLoading  }] = useCreateProductMutation();
  const [deleteProduct , {isLoading : deleteLoading} ] = useDeleteProductMutation();


  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      console.log("Delete product triggered for ID:", id);
      try {
        await deleteProduct(id)
        refetch()
        toast.success('Product deleted successfully')
      } catch (error) {
        toast.error(error?.data?.message || error?.message)
      }
    }
  };

  const createProductHandler = async () => {
    try {
      await createProduct();
      refetch();
      toast.success('Product created successfully');
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Message variant="danger">{error?.data?.message || error.error}</Message>;
  }

  return (
    <div style={adminStyles.page}>
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1 style={adminStyles.heading}>Products</h1>
          </Col>
          <Col className="text-end">
            <button
              style={adminStyles.createBtn}
              onClick={createProductHandler}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <FaPlus /> Create Product
            </button>
          </Col>
        </Row>

        <div style={adminStyles.whiteCard}>
          <div className="table-responsive">
            <Table hover className="align-middle border-0 mb-0">
              <thead>
                <tr
                  style={{
                    color: "#888",
                    fontSize: "0.85rem",
                    borderBottom: "2px solid #eee",
                  }}
                >
                  <th className="border-0 pb-3">ID</th>
                  <th className="border-0 pb-3">NAME</th>
                  <th className="border-0 pb-3">PRICE</th>
                  <th className="border-0 pb-3">CATEGORY</th>
                  <th className="border-0 pb-3">BRAND</th>
                  <th className="border-0 pb-3 text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    style={{ borderBottom: "1px solid #f5f5f5" }}
                  >
                    <td
                      className="py-4"
                      style={{ color: "#888", fontSize: "0.9rem" }}
                    >
                      ...{product._id.substring(18, 24)}
                    </td>
                    <td
                      className="py-4"
                      style={{ fontWeight: 600, color: "#111" }}
                    >
                      {product.name}
                    </td>
                    <td className="py-4" style={{ fontWeight: 600 }}>
                      ${product.price.toFixed(2)} {/* <--- Changed to $ */}
                    </td>
                    <td className="py-4" style={{ color: "#666" }}>
                      {product.category}
                    </td>
                    <td className="py-4" style={{ color: "#666" }}>
                      {product.brand}
                    </td>
                    <td className="py-4 text-end">
                      <Link to={`/admin/product/${product._id}/edit`}>
                        <button
                          style={adminStyles.actionBtnEdit}
                          onMouseOver={(e) =>
                            (e.currentTarget.style.backgroundColor = "#eee")
                          }
                          onMouseOut={(e) =>
                            (e.currentTarget.style.backgroundColor = "#f8f9fa")
                          }
                        >
                          <FaEdit />
                        </button>
                      </Link>
                      <button
                        style={adminStyles.actionBtnDelete}
                        onClick={() => deleteHandler(product._id)}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "rgba(235, 87, 87, 0.2)")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor =
                            "rgba(235, 87, 87, 0.1)")
                        }
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductListScreen;