import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Image, Container } from "react-bootstrap";
import {
  FaCheckCircle,
  FaShippingFast,
  FaWallet,
  FaBoxOpen,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import {
  useGetOrderQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation
} from "../slices/orderApiSlice.js";
import Loading from "../components/Loading.jsx";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";

const orderStyles = {
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
    marginBottom: "0.5rem",
  },
  orderId: {
    color: "#999",
    fontSize: "0.9rem",
    marginBottom: "2.5rem",
  },
  statusBadge: {
    fontSize: "0.75rem",
    fontWeight: 600,
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    marginTop: "1rem",
    display: "inline-block",
  },
  paidBadge: { backgroundColor: "rgba(16, 185, 129, 0.1)", color: "#10b981" },
  notPaidBadge: { backgroundColor: "rgba(235, 87, 87, 0.1)", color: "#eb5757" },
  itemCard: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "1.5rem",
    marginBottom: "1rem",
    border: "1px solid #f0f0f0",
  },
  summaryCard: {
    backgroundColor: "#111",
    borderRadius: "24px",
    padding: "2.5rem",
    color: "#fff",
    position: "sticky",
    top: "6rem",
    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
  },
  summaryLine: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1.2rem",
    fontSize: "1rem",
    color: "#999",
  },
  totalLine: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "2rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #333",
    fontWeight: 600,
    fontSize: "1.25rem",
    color: "#fff",
  },
  adminBtn: {
    width: "100%",
    backgroundColor: "#fff",
    color: "#111",
    border: "none",
    borderRadius: "14px",
    padding: "1.1rem",
    fontWeight: 600,
    marginTop: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    transition: "all 0.3s ease",
  },
};

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, isLoading, isError, error, refetch } = useGetOrderQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();


  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal?.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  const submitHandler = async () => {
    try {
      await deliverOrder(orderId)
      refetch()
      toast.success("Order delivered successfully")
    } catch (error) {
      toast.error(error?.data?.message || error?.message)
    }
  }
  

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <div>Error: {error?.data?.message || error.message}</div>;
  }



  return (
    <div style={orderStyles.page}>
      <Container>
        <h1 style={orderStyles.heading}>Order Status</h1>
        <p style={orderStyles.orderId}>ID: {order._id}</p>

        <Row className="gx-5">
          <Col lg={8}>
            <div style={orderStyles.itemCard}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <FaShippingFast color="#999" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>
                  Shipping
                </h3>
              </div>
              <p style={{ color: "#666", fontSize: "0.95rem", margin: 0 }}>
                <strong>{order.user.name}</strong>
                <br />
                {order.shippingAddress.address}, {order.shippingAddress.city}{" "}
                {order.shippingAddress.postalCode}
              </p>
              <div
                style={{
                  ...orderStyles.statusBadge,
                  ...(order.isDelivered
                    ? orderStyles.paidBadge
                    : orderStyles.notPaidBadge),
                }}
              >
                {order.isDelivered
                  ? `Delivered on ${order.deliveredAt.substring(0, 10)}`
                  : "Processing Shipment"}
              </div>
            </div>

            <div style={orderStyles.itemCard}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <FaWallet color="#999" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>
                  Payment Method
                </h3>
              </div>
              <p style={{ color: "#666", fontSize: "0.95rem", margin: 0 }}>
                {order.paymentMethod}
              </p>
              <div
                style={{
                  ...orderStyles.statusBadge,
                  ...(order.isPaid
                    ? orderStyles.paidBadge
                    : orderStyles.notPaidBadge),
                }}
              >
                {order.isPaid ? (
                  <>
                    <FaCheckCircle size={12} className="me-2" /> Paid on{" "}
                    {order.paidAt.substring(0, 10)}
                  </>
                ) : (
                  "Awaiting Payment"
                )}
              </div>
            </div>

            <div style={orderStyles.itemCard}>
              <div className="d-flex align-items-center gap-3 mb-4">
                <FaBoxOpen color="#999" />
                <h3 style={{ fontSize: "1.1rem", fontWeight: 600, margin: 0 }}>
                  Items in Order
                </h3>
              </div>
              {order.orderItems.map((item, index) => (
                <Row
                  key={index}
                  className="align-items-center mb-4 g-0 border-bottom pb-3"
                >
                  <Col xs={3} md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      style={{ borderRadius: "12px", aspectRatio: "1/1", objectFit: "cover" }}
                    />
                  </Col>
                  <Col className="ps-4">
                    <span style={{ fontSize: "1rem", fontWeight: 600 }}>
                      {item.name}
                    </span>
                    <div style={{ color: "#888", fontSize: "0.9rem" }}>
                      {item.qty} x ₹{item.price}
                    </div>
                  </Col>
                  <Col xs={3} className="text-end fw-bold">
                    ₹{(item.qty * item.price).toFixed(2)}
                  </Col>
                </Row>
              ))}
            </div>
          </Col>

          <Col lg={4}>
            <div style={orderStyles.summaryCard}>
              <h2
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  marginBottom: "2rem",
                }}
              >
                Order Summary
              </h2>

              <div style={orderStyles.summaryLine}>
                <span>Items</span>
                <span style={{ color: "#fff" }}>
                  ₹{order.itemsPrice.toFixed(2)}
                </span>
              </div>
              <div style={orderStyles.summaryLine}>
                <span>Shipping</span>
                <span style={{ color: "#fff" }}>
                  ₹{order.shippingPrice.toFixed(2)}
                </span>
              </div>
              <div style={orderStyles.summaryLine}>
                <span>Tax</span>
                <span style={{ color: "#fff" }}>
                  ₹{order.taxPrice.toFixed(2)}
                </span>
              </div>

              <div style={orderStyles.totalLine}>
                <span>{order.isPaid ? "Total Paid" : "Total Due"}</span>
                <span>₹{order.totalPrice.toFixed(2)}</span>
              </div>

              {!order.isPaid && userInfo && !userInfo.isAdmin && (
                <div className="mt-4 pt-4 border-top border-secondary">
                  {loadingPay && <Loading />}

                  {isPending ? (
                    <div className="text-center py-3">
                      <Loading />
                      <div
                        className="mt-2"
                        style={{ color: "#999", fontSize: "0.85rem" }}
                      >
                        Loading Secure Gateway...
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p
                        style={{
                          color: "#999",
                          fontSize: "0.85rem",
                          textAlign: "center",
                          marginBottom: "1rem",
                        }}
                      >
                        Complete your payment below
                      </p>
                      <div
                        style={{
                          backgroundColor: "#f8f9fa",
                          padding: "12px",
                          borderRadius: "12px",
                        }}
                      >
                        <PayPalButtons
                          style={{
                            layout: "vertical",
                            color: "gold",
                            shape: "rect",
                          }}
                          createOrder={(data, actions) => {
                            return actions.order
                              .create({
                                purchase_units: [
                                  {
                                    amount: {
                                      value: Number(order.totalPrice).toFixed(2),
                                      currency_code: "USD",
                                    },
                                  },
                                ],
                              })
                              .then((orderID) => {
                                return orderID;
                              });
                          }}
                          onApprove={(data, actions) => {
                            return actions.order.capture().then(async (details) => {
                              try {
                                await payOrder({
                                  orderId,
                                  paymentResult: details,
                                });
                                refetch();
                                toast.success("Payment successful");
                              } catch (error) {
                                toast.error(
                                  error?.data?.message || error?.message
                                );
                              }
                            });
                          }}
                          onError={(err) => {
                            toast.error("Payment failed or cancelled");
                            console.error(err);
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <button
                  type="button"
                  style={orderStyles.adminBtn}
                  onClick={submitHandler}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  Mark As Delivered <FaCheckCircle size={16} />
                </button>
              )}
              {loadingDeliver && <Loading />}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default OrderScreen;