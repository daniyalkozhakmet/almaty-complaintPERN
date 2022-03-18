import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import Message from "../Message";
import { getUsersAdmin, deleteUsersAdmin } from "../../actions/adminAction";
import { Table, Button, Pagination } from "react-bootstrap";
import { SET_ADMIN_USER } from "../../types/admin";
import { getUserStatistics } from "../../actions/adminStatisticsAction";
import UserChart from "../statistics/UserChart";
const UsersScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, error, loading, page, pages, statistics } = useSelector(
    (state) => state.getUsersAdmin
  );
  const { user } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate("/");
    }
    dispatch(getUsersAdmin(1));
    dispatch(getUserStatistics());
    dispatch({ type: SET_ADMIN_USER });
  }, [dispatch]);
  const userDeleteHandler = (id) => {
    if (window.confirm("Do you want to delete this user?")) {
      dispatch(deleteUsersAdmin(id));
    }
  };
  const paginatFunc = (page) => {
    dispatch(getUsersAdmin(page));
  };
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const time =
    statistics &&
    statistics.map((d) => month[new Date(Object.values(d)[0]).getMonth()]);
  const values =
    statistics && statistics.map((d) => Number(Object.values(d)[1]));
  return (
    <div>
      <h1 className="py-3">Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Admin</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.email}</td>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                    <td>
                      {!user.is_admin ? (
                        <i
                          className="fas fa-times"
                          style={{ color: "red" }}
                        ></i>
                      ) : (
                        <i
                          className="fas fa-check"
                          style={{ color: "green" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <>
                        <Button
                          variant="light"
                          className="btn-sm mx-1"
                          onClick={(e) => userDeleteHandler(user.id)}
                        >
                          <i className="fa fa-trash"></i>
                        </Button>

                        <Button
                          variant="light"
                          className="btn-sm mx-1"
                          onClick={(e) =>
                            navigate(`/admin/users/update?id=${user.id}`)
                          }
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                      </>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="py-4">
            {page == pages && pages == 1 && page == 1 ? (
              <></>
            ) : (
              <Pagination>
                {[...Array(pages).keys()].map((p) =>
                  p + 1 == page ? (
                    <Pagination.Item
                      key={p + 1}
                      active
                      onClick={(e) => paginatFunc(p + 1)}
                    >
                      {p + 1}
                    </Pagination.Item>
                  ) : (
                    <Pagination.Item
                      key={p + 1}
                      onClick={(e) => paginatFunc(p + 1)}
                    >
                      {p + 1}
                    </Pagination.Item>
                  )
                )}
              </Pagination>
            )}
          </div>
          {statistics && <UserChart time={time} values={values} />}
        </>
      )}
    </div>
  );
};

export default UsersScreen;
