import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";

import Modal from "components/modules/Modal";
import Button from "components/modules/Button";

import { ITeam } from "utils/Interfaces";
import { setTeamNameError } from "utils/Validator";
import { RootState } from "redux/store";

type Props = {
  onClose: () => void;
  team: ITeam;
};

export default function EditTeam({ onClose, team }: Props) {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [checkedState, setCheckedState] = useState(new Array(team.members.length).fill(false));
  const allTeamNames: string[] = useSelector((state: RootState) => state.teams.map((team) => team.name));
  const teamName: React.MutableRefObject<HTMLInputElement | undefined> = useRef();

  const handleChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) => (index === position ? !item : item));
    setCheckedState(updatedCheckedState);
  };

  const onSubmit = useCallback(
    () => (event: any) => {
      event.preventDefault();
      const teamData = {
        name: teamName.current?.value!,
        members: checkedState
          .map((value, index) => {
            if (!value) return team.members[index];
            return;
          })
          .filter(Boolean),
      };
      if (teamData.name !== team.name) {
        setError(setTeamNameError(teamData.name!, allTeamNames));
        if (setTeamNameError(teamData.name!, allTeamNames) === "") {
          dispatch({ type: "team/UPDATE", teamData, teamId: team.id });
          onClose();
        }
      } else {
        dispatch({ type: "team/UPDATE", teamData, teamId: team.id });
        onClose();
      }
    },
    [checkedState]
  );

  return (
    <Modal closeModal={onClose}>
      <Modal.Header>Edit Team</Modal.Header>
      <Modal.Body>
        <form
          className="w-full flex flex-col gap-y-4"
          onSubmit={onSubmit()}>
          <div className="relative flex flex-col gap-y-2 w-full">
            <label htmlFor="team-name">Team Name</label>
            <input
              ref={teamName as any}
              placeholder="Team Name"
              id="team-name"
              className="w-full text-black p-1 px-2 rounded"
              type="text"
              defaultValue={team.name}
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
          </div>
          <label className="block">Remove Pokemon</label>
          <div className="grid gap-4 sm:gap-8 my-3 grid-cols-2 xsm:grid-cols-3">
            {team.members.map((member, index) => (
              <label
                htmlFor={`pkmn${index}`}
                key={index}
                className="relative w-full">
                <input
                  type="checkbox"
                  id={`pkmn${index}`}
                  name={`${member}`}
                  value={`${member}`}
                  className="absolute"
                  onChange={() => handleChange(index)}
                />
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${member}.png`}
                  alt=""
                  className="bg-gray1 rounded-full w-full hover:ring-2 hover:ring-gray3"
                />
              </label>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button action={() => dispatch({ type: "team/DELETE", teamId: team.id })}>
              <Button.Secondary>Delete Team</Button.Secondary>
            </Button>
            <Button action={() => {}}>
              <Button.Primary>Save</Button.Primary>
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
