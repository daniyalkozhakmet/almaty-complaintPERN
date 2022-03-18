import React from "react";
import { Pagination } from "react-bootstrap";
const Paginator = ({ pages, page }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="py-4"
    >
      <Pagination>
        {[...Array(pages).keys()].map((p) =>
          p + 1 == page ? (
            <Pagination.Item active >{p + 1}</Pagination.Item>
          ) : (
            <Pagination.Item>{p + 1}</Pagination.Item>
          )
        )}
      </Pagination>
    </div>
  );
};

export default Paginator;
