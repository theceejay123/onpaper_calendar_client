import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { LinkContainer } from "react-router-bootstrap";
import { BsPlus } from "react-icons/bs";
import moment from "moment";
import "./Home.css";

// Component
import CustomCalendar from "../../components/Calendar/Calendar";

// Library
import { useAppContext } from "../../libs/context";
import { onError } from "../../libs/errors";
import { API } from "aws-amplify";

const Home = () => {
  const { selectedDate, isAuthenticated, currentUser } = useAppContext();
  const [agendas, setAgendas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const onLoad = async () => {
      if (!isAuthenticated || selectedDate === null) return;

      try {
        const agendas = await loadAgendas();
        setAgendas(agendas);
      } catch (err) {
        onError(err);
      }

      setIsLoading(false);
    };

    onLoad();
  }, [isAuthenticated, selectedDate]);

  const loadAgendas = () => {
    return API.get(
      "agendas",
      `agendas/by_date/${encodeURIComponent(selectedDate.toISOString())}`
    );
  };

  const renderAgendaList = (agendas) => {
    return (
      <React.Fragment>
        <LinkContainer
          to={`/agendas/new/${encodeURIComponent(selectedDate.toISOString())}`}
        >
          <ListGroup.Item action className="py-3 text-nowrap text-truncate">
            <BsPlus size={25} />
            <span className="ml-2 font-weight-bold">Create a new agenda</span>
          </ListGroup.Item>
        </LinkContainer>
        {agendas.map(
          ({
            agendaId,
            title,
            details,
            schedDate,
            schedTime,
            createdAt,
            updatedAt,
            userId,
            name,
          }) => (
            <>
              {currentUser.userId === userId ? (
                <LinkContainer key={agendaId} to={`/agendas/${agendaId}`}>
                  <ListGroup.Item action variant="dark">
                    <span className="font-weight-bold">
                      {title.trim().split("\n")[0]}
                    </span>
                    <br />
                    <span>Details: {details}</span>
                    <br />
                    <span>Date: {new Date(schedDate).toDateString()}</span>
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
                        Created: {new Date(createdAt).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-muted">
                        Updated: {new Date(updatedAt).toLocaleDateString()}
                      </span>
                    )}
                  </ListGroup.Item>
                </LinkContainer>
              ) : (
                <ListGroup.Item disabled key={agendaId}>
                  <span className="font-weight-bold">
                    {title.trim().split("\n")[0]}
                  </span>
                  <br />
                  <span>Details: {details.trim().split("\n")[0]}</span>
                  <br />
                  <span>Date: {new Date(schedDate).toDateString()}</span>
                  <br />
                  <span>
                    Time:{" "}
                    {moment(schedTime * 1000)
                      .utc()
                      .format("h:mm A")}
                  </span>
                  <br />
                  <span className="text-muted">Created By: {name}</span>
                  <br />
                </ListGroup.Item>
              )}
            </>
          )
        )}
      </React.Fragment>
    );
  };

  const renderLanding = () => {
    return (
      <div className="lander d-flex align-items-center flex-column">
        <h1 className="lander-title text-dark">Calendar</h1>
        <p className="lander-p text-muted">A simple calendar for OnPaper!</p>
      </div>
    );
  };

  const renderAgendas = () => {
    return (
      <div className="Agendas">
        <h2 className="pb-3 mt-4 mb-3 border-bottom">
          Community Agenda - Hello {currentUser.name}!
        </h2>
        <div className="d-flex align-items-start">
          <CustomCalendar />
          <ListGroup className="Agenda-list">
            {!isLoading ? (
              renderAgendaList(agendas)
            ) : (
              <ListGroup.Item className="py-3 text-nowrap text-truncate">
                <span className="ml-2 font-weight-bold">
                  Please select date
                </span>
              </ListGroup.Item>
            )}
          </ListGroup>
        </div>
      </div>
    );
  };

  return (
    <div className="Home">
      {isAuthenticated ? renderAgendas() : renderLanding()}
    </div>
  );
};

export default Home;
