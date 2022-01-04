import moment from "moment";
import React, { FC, useCallback, useContext, useState } from "react";
import { Badge, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import {
  addFollow,
  deleteFollow,
  getFollowedVacationIds,
} from "../../api-client/api-client-follows";
import { VacationModel } from "../../models/Vacation.model";
import { StateContext } from "../../state-context";
import { ErrorAlert } from "../ErrorAlert/ErrorAlert";
import "./VacationCard.css";

export const VacationCard: FC<VacationModel> = ({
  id,
  destination,
  description,
  startDate,
  endDate,
  image,
  price,
  followersAmount,
}) => {
  const { appState, setAppState } = useContext(StateContext);

  const [errorAlert, setErrorAlert] = useState(false);

  const followedVacationIds = JSON.parse(
    localStorage.getItem("followedVacationIds") as string
  );

  const [isFollowed, setIsFollowed] = useState(
    followedVacationIds.includes(id)
  );

  const jwt = JSON.parse(localStorage.getItem("jwt") as string);

  const handleFollowClick = useCallback(async () => {
    try {
      if (isFollowed) {
        await deleteFollow(jwt, id);

        const vacations = JSON.parse(
          localStorage.getItem("vacations") as string
        );
        const deletedFollowVacationIndex = vacations.findIndex(
          (vacation: any) => vacation.id === id
        );
        const vacation = vacations.find((vacation: any) => vacation.id === id);
        vacation.followersAmount--;
        vacations.splice(deletedFollowVacationIndex, 1, vacation);
        localStorage.setItem("vacations", JSON.stringify(vacations));

        setAppState({
          ...appState,
          vacations,
        });

        const followedVacationIds = await getFollowedVacationIds(jwt);

        localStorage.setItem(
          "followedVacationIds",
          JSON.stringify(followedVacationIds)
        );

        setIsFollowed(false);

        return;
      }

      await addFollow(jwt, id);

      const vacations = JSON.parse(localStorage.getItem("vacations") as string);
      const deletedFollowVacationIndex = vacations.findIndex(
        (vacation: any) => vacation.id === id
      );
      const vacation = vacations.find((vacation: any) => vacation.id === id);
      vacation.followersAmount++;
      vacations.splice(deletedFollowVacationIndex, 1, vacation);
      localStorage.setItem("vacations", JSON.stringify(vacations));

      setAppState({
        ...appState,
        vacations,
      });

      const followedVacationIds = await getFollowedVacationIds(jwt);

      localStorage.setItem(
        "followedVacationIds",
        JSON.stringify(followedVacationIds)
      );

      setIsFollowed(true);
    } catch (err) {
      setErrorAlert(true);
      setTimeout(() => setErrorAlert(false), 3500);
    }
  }, [id, isFollowed, jwt, appState, setAppState]);

  return (
    <div>
      <Card className="m-3" style={{ width: "18rem" }}>
        <Card.Img style={{ height: "10rem" }} variant="top" src={image} />

        <Card.Body>
          <Card.Title>{destination}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <button
            className={isFollowed ? "followed-btn" : "not-followed-btn"}
            onClick={handleFollowClick}
          >
            Follow
          </button>
          <Badge pill bg="secondary">
            {followersAmount ? followersAmount : null}
          </Badge>
        </Card.Body>

        <ListGroup className="list-group-flush">
          <ListGroupItem>
            <strong>Dates:</strong> {moment(startDate).format("MM/DD/YYYY")}-
            {moment(endDate).format("MM/DD/YYYY")}
          </ListGroupItem>
          <ListGroupItem>
            <strong>Price:</strong> {price}$
          </ListGroupItem>
        </ListGroup>
      </Card>

      {errorAlert ? <ErrorAlert /> : null}
    </div>
  );
};
