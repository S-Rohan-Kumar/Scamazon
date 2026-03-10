import React from "react";
import { Table, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTimes, FaCheck, FaUserEdit, FaBoxOpen } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetOrdersQuery } from "../slices/orderApiSlice.js";
import { toast } from "react-toastify";
import Loading from "../components/Loading.jsx";

const profileStyles = {
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
    marginBottom: "2.5rem",
  },
  darkCard: {
    backgroundColor: "#111",
    borderRadius: "24px",
    padding: "2.5rem",
    color: "#fff",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },
  whiteCard: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    padding: "2.5rem",
    border: "1px solid #f0f0f0",
  },
  detailsBtn: {
    backgroundColor: "#f8f9fa",
    color: "#111",
    border: "1px solid #eee",
    borderRadius: "8px",
    padding: "0.4rem 0.8rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
  },
  statusBadge: {
    fontSize: "0.75rem",
    fontWeight: 600,
    padding: "0.4rem 0.8rem",
    borderRadius: "6px",
    display: "inline-block",
  },
  paidBadge: { backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981" },
  notPaidBadge: { backgroundColor: "rgba(235, 87, 87, 0.1)", color: "#eb5757" },
};

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const { data: mockOrders, isLoading, isError, error } = useGetOrdersQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    toast.error(error?.data?.message || error?.message);
  }

  return (
    <div style={profileStyles.page}>
      <Container>
        <h1 style={profileStyles.heading}>My Account</h1>

        <Row className="gx-5">
          <Col lg={4} className="mb-5 mb-lg-0">
            <div style={profileStyles.darkCard}>
              <div className="d-flex align-items-center gap-3 mb-5">
                <FaUserEdit color="#999" size={24} />
                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
                  Profile Details
                </h2>
              </div>

              <div className="mb-4">
                <p style={{ color: "#aaa", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                  Name
                </p>
                <h4 style={{ fontWeight: 600, margin: 0 }}>
                  {userInfo?.name || "User"}
                </h4>
              </div>

              <div>
                <p style={{ color: "#aaa", fontSize: "0.9rem", marginBottom: "0.3rem" }}>
                  Email Address
                </p>
                <h5 style={{ fontWeight: 500, margin: 0, color: "#e0e0e0" }}>
                  {userInfo?.email || "No email provided"}
                </h5>
              </div>
            </div>
          </Col>

          <Col lg={8}>
            <div style={profileStyles.whiteCard}>
              <div className="d-flex align-items-center gap-3 mb-4">
                <FaBoxOpen color="#999" size={24} />
                <h2 style={{ fontSize: "1.5rem", fontWeight: 700, margin: 0 }}>
                  Order History
                </h2>
              </div>

              <div className="table-responsive">
                <Table hover className="align-middle border-0">
                  <thead>
                    <tr style={{ color: "#888", fontSize: "0.85rem", borderBottom: "2px solid #eee" }}>
                      <th className="border-0 pb-3">ORDER ID</th>
                      <th className="border-0 pb-3">DATE</th>
                      <th className="border-0 pb-3">TOTAL</th>
                      <th className="border-0 pb-3 text-center">PAID</th>
                      <th className="border-0 pb-3 text-center">DELIVERED</th>
                      <th className="border-0 pb-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders?.map((order) => (
                      <tr key={order._id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                        <td className="py-3" style={{ fontWeight: 600, color: "#444" }}>
                          ...{order._id.substring(18, 24)}
                        </td>
                        <td className="py-3" style={{ color: "#666", fontSize: "0.9rem" }}>
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="py-3" style={{ fontWeight: 600 }}>
                          ₹{order.totalPrice.toFixed(2)}
                        </td>
                        <td className="py-3 text-center">
                          {order.isPaid ? (
                            <div style={{ ...profileStyles.statusBadge, ...profileStyles.paidBadge }}>
                              <FaCheck size={10} /> {order.paidAt.substring(0, 10)}
                            </div>
                          ) : (
                            <div style={{ ...profileStyles.statusBadge, ...profileStyles.notPaidBadge }}>
                              <FaTimes size={10} />
                            </div>
                          )}
                        </td>
                        <td className="py-3 text-center">
                          {order.isDelivered ? (
                            <div style={{ ...profileStyles.statusBadge, ...profileStyles.paidBadge }}>
                              <FaCheck size={10} /> {order.deliveredAt.substring(0, 10)}
                            </div>
                          ) : (
                            <div style={{ ...profileStyles.statusBadge, ...profileStyles.notPaidBadge }}>
                              <FaTimes size={10} />
                            </div>
                          )}
                        </td>
                        <td className="py-3 text-end">
                          <Link to={`/order/${order._id}`} style={profileStyles.detailsBtn}>
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                
                {mockOrders?.length === 0 && (
                  <div className="text-center py-4" style={{ color: "#888" }}>
                    You haven't placed any orders yet.
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProfileScreen;