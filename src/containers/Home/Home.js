import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { BsPlus } from "react-icons/bs";
import moment from "moment";
import "./Home.css";

// Component
import CustomCalendar from "../../components/Calendar/Calendar";
import AgendaGroup from "../../components/AgendaGroup/AgendaGroup";

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
      `agendas/by_date/${encodeURIComponent(
        moment(selectedDate).format("MM-DD-YYYY")
      )}`
    );
  };

  const renderAgendaList = (agendas) => {
    return (
      <div className="flex-row Agenda-list">
        <ListGroup className="Agendas-content">
          <LinkContainer
            key={0}
            to={`/agendas/new/${encodeURIComponent(
              moment(selectedDate).format("MM-DD-YYYY")
            )}`}
          >
            <ListGroup.Item action className="py-3 text-nowrap text-truncate">
              <BsPlus size={25} />
              <span className="ml-2 font-weight-bold">Create a new agenda</span>
            </ListGroup.Item>
          </LinkContainer>
        </ListGroup>
        <ListGroup className="Agendas-content">
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
              <LinkContainer key={agendaId} to={`/agendas/${agendaId}`}>
                {currentUser.userId === userId ? (
                  <AgendaGroup
                    title={title}
                    details={details}
                    schedDate={schedDate}
                    schedTime={schedTime}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    hideCreatedBy={true}
                    name={name}
                    action
                    variant="dark"
                  />
                ) : (
                  <AgendaGroup
                    title={title}
                    details={details}
                    schedDate={schedDate}
                    schedTime={schedTime}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                    hideCreatedBy={false}
                    name={name}
                    disabled
                  />
                )}
              </LinkContainer>
            )
          )}
        </ListGroup>
      </div>
    );
  };

  const renderLanding = () => {
    return (
      <div className="lander d-flex align-items-center flex-column">
        <h1 className="lander-title text-dark">Calendar</h1>
        <p className="lander-p text-muted">A simple calendar for OnPaper!</p>
        <div className="pt-3">
          <Link to="/login" className="btn btn-info btn-lg mr-3">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg mr-3">
            Signup
          </Link>
        </div>
      </div>
    );
  };

  const renderAgendas = () => {
    return (
      <div className="Agendas">
        <h2 className="Agenda-title pb-3 mt-4 mb-3 border-bottom">
          Community Agenda -{" "}
          {currentUser.name &&
            currentUser.name.split(" ") &&
            currentUser.name.split(" ")[0]}
        </h2>
        <div className="Agendas-main d-flex">
          <CustomCalendar />
          {!isLoading && renderAgendaList(agendas)}
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
