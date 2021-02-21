import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import TimePicker from "react-bootstrap-time-picker";
import moment from "moment";
import { API } from "aws-amplify";
import "./Agenda_New.css";

// Bootstrap
import Form from "react-bootstrap/Form";

// Components
import LoaderButton from "../../components/LoaderButton/LoaderButton";

// Library
import { useAppContext } from "../../libs/context";
import { useFormFields } from "../../libs/hooks";
import { onError } from "../../libs/errors";

const NewAgenda = () => {
  const { selectedDate, setSelectedDate, currentUser } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const [time, setTime] = useState(0);
  const { date } = useParams();
  const [fields, handleFieldChange] = useFormFields({
    title: "",
    details: "",
  });

  useEffect(() => {
    onLoad();
  }, []);

  const onLoad = () => {
    setSelectedDate(new Date(decodeURIComponent(date).split("-")));
  };

  const handleTimeChange = (time) => {
    setTime(time);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      console.log(selectedDate);
      await createAgenda({
        title: fields.title,
        details: fields.details,
        date: moment(selectedDate).format("MM-DD-YYYY"),
        time,
        name: currentUser.name,
      });
      history.push("/");
    } catch (err) {
      onError(err);
      setIsLoading(false);
    }
  };

  const createAgenda = (agenda) => {
    return API.post("agendas", "agendas", {
      body: agenda,
    });
  };

  const validateForm = () => {
    return fields.title.length > 0;
  };

  return (
    <div>
      {selectedDate && (
        <div className="NewAgenda">
          <h3>{moment(selectedDate).format("dddd - MMMM Do, YYYY")}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                autoFocus
                value={fields.title}
                type="text"
                onChange={handleFieldChange}
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
                onChange={handleFieldChange}
                placeholder="Lorem ipsum dolor sit amet, consectetur adipis..."
              />
            </Form.Group>
            <LoaderButton
              block
              type="submit"
              size="lg"
              variant="dark"
              isLoading={isLoading}
              disabled={!validateForm()}
            >
              Create Agenda
            </LoaderButton>
          </Form>
        </div>
      )}
    </div>
  );
};

export default NewAgenda;
