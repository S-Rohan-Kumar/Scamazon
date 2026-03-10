import React from "react";
import { Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaTimes, FaCheck, FaBoxOpen } from "react-icons/fa";
import { useGetorderlsitQuery } from "../../slices/orderApiSlice.js";
import { useSelector , useDispatch } from "react-redux";
import Loading from "../../components/Loading.jsx";
import Message from "../../components/Message.jsx";



const adminStyles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#fcfcfc",
    paddingTop: "5rem",
    paddingBottom: "5rem",
    fontFamily: "'Inter', sans-serif",
    color: "#1a1a1a",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "24px",
    padding: "2.5rem",
    border: "1px solid #f0f0f0",
    boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
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
  detailsBtn: {
    backgroundColor: "#111",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "0.4rem 1rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    textDecoration: "none",
    display: "inline-block",
    transition: "all 0.2s",
  },
};



const OrderListScreen = () => {

  const {data : Orders , isLoading ,isError , error} = useGetorderlsitQuery();
  
  if(isLoading){
    return <Loading />
  }

  if(isError){
    return <Message variant="danger">{error}</Message>
  }

  return (
    <div style={adminStyles.page}>
      <Container>
        <div style={adminStyles.card}>
          <div className="d-flex align-items-center gap-3 mb-4">
            <FaBoxOpen color="#111" size={28} />
            <h1 style={{ fontSize: "2rem", fontWeight: 700, margin: 0 }}>
              All Orders
            </h1>
          </div>

          <div className="table-responsive">
            <Table hover className="align-middle border-0">
              <thead>
                <tr style={{ color: "#888", fontSize: "0.85rem", borderBottom: "2px solid #eee" }}>
                  <th className="border-0 pb-3">ORDER ID</th>
                  <th className="border-0 pb-3">USER</th>
                  <th className="border-0 pb-3">DATE</th>
                  <th className="border-0 pb-3">TOTAL</th>
                  <th className="border-0 pb-3 text-center">PAID</th>
                  <th className="border-0 pb-3 text-center">DELIVERED</th>
                  <th className="border-0 pb-3"></th>
                </tr>
              </thead>
              <tbody>
                {Orders.map((order) => (
                  <tr key={order._id} style={{ borderBottom: "1px solid #f5f5f5" }}>
                    <td className="py-3" style={{ fontWeight: 600, color: "#444" }}>
                      ...{order._id.substring(18, 24)}
                    </td>
                    <td className="py-3" style={{ fontWeight: 500 }}>
                      {order.user && order.user.name ? order.user.name : "Deleted User"}
                    </td>
                    <td className="py-3" style={{ color: "#666", fontSize: "0.9rem" }}>
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td className="py-3" style={{ fontWeight: 600 }}>
                      ${order.totalPrice.toFixed(2)}
                    </td>
                    <td className="py-3 text-center">
                      {order.isPaid ? (
                        <div style={{ ...adminStyles.statusBadge, ...adminStyles.paidBadge }}>
                          <FaCheck size={10} /> {order.paidAt.substring(0, 10)}
                        </div>
                      ) : (
                        <div style={{ ...adminStyles.statusBadge, ...adminStyles.notPaidBadge }}>
                          <FaTimes size={10} />
                        </div>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      {order.isDelivered ? (
                        <div style={{ ...adminStyles.statusBadge, ...adminStyles.paidBadge }}>
                          <FaCheck size={10} /> {order.deliveredAt.substring(0, 10)}
                        </div>
                      ) : (
                        <div style={{ ...adminStyles.statusBadge, ...adminStyles.notPaidBadge }}>
                          <FaTimes size={10} />
                        </div>
                      )}
                    </td>
                    <td className="py-3 text-end">
                      <Link to={`/order/${order._id}`} style={adminStyles.detailsBtn}>
                        Details
                      </Link>
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

export default OrderListScreen;