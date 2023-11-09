import { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { useNavigate } from "react-router-dom";

import FormInput from "components/common/inputs/FormInput";

import Modal from "components/modules/Modal";
import Button from "components/modules/Button";

import { ITeam } from "utils/Interfaces";

type Props = {
  onClose: () => void;
  userId: number;
  pkmnId: number;
};

export default function AddToTeam({ onClose, userId, pkmnId }: Props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const myTeams: ITeam[] = useSelector((state: RootState) => state.teams.filter((team) => team.added_by === userId));
  const selectedTeam: React.MutableRefObject<HTMLInputElement | undefined> = useRef();
  const teamName: React.MutableRefObject<HTMLInputElement | undefined> = useRef();

  const formHandler = useCallback(
    () => (event: any) => {
      event.preventDefault();
      const data: { team: number | undefined; newTeamName: string | undefined } = {
        team: parseInt(selectedTeam.current?.value!),
        newTeamName: teamName.current?.value,
      };
      if (!!data.team) {
        onClose();
        dispatch({ type: "team/ADD", pkmnId, teamId: data.team });
        navigate(`/team/${data.team}`);
      }
    },
    []
  );

  return (
    <Modal closeModal={onClose}>
      <Modal.Header>Add to Team</Modal.Header>
      <Modal.Body>
        {!showCreateForm ? (
          <form
            className="w-full flex flex-col gap-y-4"
            onSubmit={formHandler()}>
            <div className="relative flex flex-col gap-y-2 w-full">
              <label htmlFor="select-team">Select Team</label>
              <select
                ref={selectedTeam as any}
                className="w-full text-black p-1 rounded"
                name="select-team"
                id="select-team">
                {myTeams.map((team) => (
                  <option
                    key={team.id}
                    value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <Button action={() => {}}>
              <Button.Primary>Add to teamName</Button.Primary>
            </Button>
            <span className="flex items-center gap-x-2">
              <hr className="w-full" />
              OR <hr className="w-full" />
            </span>
            <Button
              action={() => {
                setShowCreateForm(true);
              }}>
              <Button.Secondary>Create New Team</Button.Secondary>
            </Button>
          </form>
        ) : (
          <form
            className="w-full flex flex-col gap-y-4"
            onSubmit={formHandler()}>
            <div className="relative flex flex-col gap-y-2 w-full">
              <label htmlFor="select-team">New Team Name</label>
              <input
                ref={teamName as any}
                placeholder="Team Name"
                id="team-name"
                className="w-full text-black p-1 rounded"
                type="text"
              />
            </div>
            <Button action={() => {}}>
              <Button.Primary>Create Team and Add</Button.Primary>
            </Button>
            <Button
              action={() => {
                setShowCreateForm(false);
              }}>
              <Button.Secondary>Back</Button.Secondary>
            </Button>
          </form>
        )}
      </Modal.Body>
    </Modal>
  );
}
