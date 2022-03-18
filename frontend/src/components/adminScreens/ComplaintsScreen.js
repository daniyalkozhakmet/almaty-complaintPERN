import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Moment from "react-moment";
import { useNavigate } from "react-router-dom";
import { Table, Button,Pagination ,Col,Row} from "react-bootstrap";
import { getComplaintsAdmin } from "../../actions/adminAction";
import {getComplaintStatistics} from '../../actions/adminStatisticsAction'
import Message from "../Message";
import Loader from "../Loader";
import { GET_RESET_ADMIN_COMPLAINT_BY_ID } from "../../types/admin";
import ComplaintChart from '../statistics/ComplaintChart'
const ComplaintsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { complaints, loading, error,page,pages } = useSelector(
    (state) => state.getComplaintsAdmin
  );
  const {loading:statisticsLoading,error:statisticsError,statistics}=useSelector(state=>state.complaintStatistics)
  const { user } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (!user || !user.is_admin) {
      navigate("/");
    }
    dispatch({ type: GET_RESET_ADMIN_COMPLAINT_BY_ID });
    dispatch(getComplaintsAdmin());
    dispatch(getComplaintStatistics())
  }, [dispatch]);
  const viewComplaintHandler = (id) => {
    navigate(`/admin/complaint?id=${id}`);
    console.log(id);
  };
  const paginatFunc=(page)=>{
    dispatch(getComplaintsAdmin(page))
  }
  return (
    <div>
      <h1 className="py-3">Complaints</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>{error}</Message>
      ) : (
        <>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Neighborhood</th>
              <th>Category</th>
              <th>Submitted</th>
              <th>Reply</th>
              <th>Replied</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {complaints &&
              complaints.map((comp) => (
                <tr key={comp.id}>
                  <td>{comp.id}</td>
                  <td>
                    {comp.user &&
                      comp.user.first_name + " " + comp.user.last_name}
                  </td>
                  <td>{comp.neighborhood && comp.neighborhood.name}</td>
                  <td>
                    {comp.sub_category &&
                      comp.sub_category.category +
                        " / " +
                        comp.sub_category.name}
                  </td>
                  <td>
                    <Moment format="YYYY/MM/DD">{comp.created_at}</Moment>
                  </td>
                  <td>
                    {comp.is_replied ? (
                      <i
                        className="fas fa-check mx-3"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i
                        className="fas fa-times mx-3"
                        style={{ color: "red" }}
                      ></i>
                    )}
                  </td>
                  <td>
                  {comp.is_replied ? (
                    <Moment format="YYYY/MM/DD">{comp.replied_at}</Moment>
                    ) : (
''
                    )}
                  </td>
                  <td>
                    <Button
                      className="btn-sm"
                      onClick={(e) => viewComplaintHandler(comp.id)}
                    >
                      View
                    </Button>
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
          <Row className='justify-content-center'>
          <h3>Complaints statistics</h3>
            <Col md={8}>{statisticsLoading ? <Loader/> : error ? <Message variant='danger'>{error}</Message>:<ComplaintChart statistics={statistics}/>}</Col>

          </Row>
          
        </>
      )}
    </div>
  );
};

export default ComplaintsScreen;
