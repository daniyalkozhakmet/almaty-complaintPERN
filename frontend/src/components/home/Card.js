import React from "react";

const Card = ({ name, color }) => {
  return (
    <div className="py-2 px-2">
      {" "}
      <div
        className={`card border-left border-${color} shadow h-100 py-2 px-2`}
      >
        <div className="card-body">
          <div
            className=""
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              className={`text-xs font-weight-bold text-${color} text-uppercase mb-1`}
            >
              {name}
            </div>

            <div className={`text-${color}`}>
              <i className="fas fa-city"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
