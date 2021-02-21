import React from "react";
import moment from "moment";
import ListGroup from "react-bootstrap/ListGroup";

const AgendaGroup = ({
  title,
  details,
  schedDate,
  schedTime,
  updatedAt,
  createdAt,
  name,
  hideCreatedBy,
  ...props
}) => {
  return (
    <ListGroup.Item {...props}>
      <span className="font-weight-bold">{title.trim().split("\n")[0]}</span>
      <br />
      <span>Details: {details && details.trim().split("\n")[0]}</span>
      <br />
      <span>Date: {moment(schedDate, "MM-DD-YYYY").format("YYYY-MM-DD")}</span>
      <br />
      <span>
        Time:{" "}
        {moment(schedTime * 1000)
          .utc()
          .format("h:mm A")}
      </span>
      <br />
      {updatedAt === createdAt ? (
        <span className="text-muted">
          Created: {moment(createdAt).format("YYYY-MM-DD")}
        </span>
      ) : (
        <span className="text-muted">
          Updated: {moment(updatedAt).format("YYYY-MM-DD")}
        </span>
      )}
      <br />
      {!hideCreatedBy && <span className="text-muted">Created By: {name}</span>}
    </ListGroup.Item>
  );
};

export default AgendaGroup;
