import React from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { useGetAllUsersQuery , useDeleteUserMutation } from "../../slices/usersApiSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../components/Loading.jsx";
import Message from "../../components/Message.jsx";
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

const UserListScreen = () => {

  const {data : mockUsers , isLoading , isError , error , refetch} = useGetAllUsersQuery()
  const [deleteUser , {isLoading : deleteLoading}] = useDeleteUserMutation()


  const deleteHandler = async (id) => {
    try {
      await deleteUser(id)
      refetch()
      toast.success('User deleted successfully')
    } catch (error) {
      toast.error(error?.data?.message || error?.message)
    }
  };


  if(isLoading){
    return <Loading />
  }

  if(isError){
    return <Message variant="danger">{error}</Message>
  }

  
  return (
    <div style={adminStyles.page}>
      <Container>
        <Row className="align-items-center">
          <Col>
            <h1 style={adminStyles.heading}>Users</h1>
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
                  <th className="border-0 pb-3">EMAIL</th>
                  <th className="border-0 pb-3 text-center">ADMIN</th>
                  <th className="border-0 pb-3 text-end">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map((user) => (
                  <tr
                    key={user._id}
                    style={{ borderBottom: "1px solid #f5f5f5" }}
                  >
                    <td
                      className="py-4"
                      style={{ color: "#888", fontSize: "0.9rem" }}
                    >
                      ...{user._id.substring(18, 24)}
                    </td>
                    <td
                      className="py-4"
                      style={{ fontWeight: 600, color: "#111" }}
                    >
                      {user.name}
                    </td>
                    <td className="py-4">
                      <a 
                        href={`mailto:${user.email}`} 
                        style={{ color: "#0d6efd", textDecoration: "none", fontWeight: 500 }}
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className="py-4 text-center">
                      {user.isAdmin ? (
                        <FaCheck style={{ color: "#10b981" }} />
                      ) : (
                        <FaTimes style={{ color: "#eb5757" }} />
                      )}
                    </td>
                    <td className="py-4 text-end">
                      
                      <button
                        style={adminStyles.actionBtnDelete}
                        onClick={() => deleteHandler(user._id)}
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

export default UserListScreen;