import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import TimePicker from "react-bootstrap-time-picker";
import moment from "moment";
import "./Agenda.css";

// Bootstrap
import Form from "react-bootstrap/Form";

// Components
import LoaderButton from "../../components/LoaderButton/LoaderButton";

// Library
import { onError } from "../../libs/errors";

const Agenda = () => {
  const { id } = useParams();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fields, handleFieldChange] = useState({
    title: "",
    details: "",
    date: "",
  });
  const [time, setTime] = useState(null);

  useEffect(() => {
    const loadAgenda = () => {
      return API.get("agendas", `agendas/by_id/${id}`);
    };

    const onLoad = async () => {
      try {
        const agenda = await loadAgenda();
        const { title, details, schedDate, schedTime } = agenda;
        handleFieldChange({
          title,
          details,
          date: schedDate,
        });
        setTime(schedTime);
      } catch (e) {
        onError(e);
      }
    };
    onLoad();
  }, [id]);

  const validateForm = () => {
    return fields.title.length > 0;
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const saveAgenda = (agenda) => {
    return API.put("agendas", `agendas/${id}`, {
      body: agenda,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await saveAgenda({
        title: fields.title,
        details: fields.details,
        date: fields.date,
        time,
      });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  const deleteAgenda = () => {
    return API.del("agendas", `agendas/${id}`);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this note?"
    );

    if (!confirmed) return;

    setIsDeleting(true);

    try {
      await deleteAgenda();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  };

  return (
    <div className="Agenda">
      {time >= 0 && (
        <React.Fragment>
          <h3>
            {moment(fields.date, "MM-DD-YYYY").format("dddd - MMMM Do, YYYY")}
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                autoFocus
                value={fields.title}
                type="text"
                onChange={(e) => {
                  handleFieldChange({
                    ...fields,
                    [e.target.id]: e.target.value,
                  });
                }}
                placeholder="Anime is Lyfe..."
              />
            </Form.Group>
            <Form.Group>
              <TimePicker
                step={75}
                onChange={handleTimeChange}
                value={time}
                className="TimePicker"
              />
            </Form.Group>
            <Form.Group controlId="details">
              <Form.Control
                value={fields.details}
                as="textarea"
                onChange={(e) => {
                  handleFieldChange({
                    ...fields,
                    [e.target.id]: e.target.value,
                  });
                }}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipis..."
              />
            </Form.Group>
            <LoaderButton
              block
              size="lg"
              type="submit"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Save
            </LoaderButton>
            <LoaderButton
              block
              size="lg"
              variant="danger"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              Delete
            </LoaderButton>
          </Form>
        </React.Fragment>
      )}
    </div>
  );
};

export default Agenda;
