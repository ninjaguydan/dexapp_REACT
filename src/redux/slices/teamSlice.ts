import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITeam } from "utils/Interfaces";

const initialState: ITeam[] = [
  { id: 1, name: "Genwunners", members: [25, 3, 6, 9, 143, 131], likes: [2], added_by: 1, created: 1654279977000 },
  { id: 2, name: "Blue Balls", members: [18, 65, 112, 103, 130, 6], likes: [], added_by: 2, created: 1635000000000 },
  { id: 3, name: "Try Hards", members: [442, 407, 423, 445, 448, 350], likes: [], added_by: 2, created: 1533219944000 },
  {
    id: 4,
    name: "Cutie Patooties",
    members: [184, 547, 423, 443, 447, 350],
    likes: [],
    added_by: 3,
    created: 1655171111085,
  },
  {
    id: 5,
    name: "Test",
    members: [1005, 995],
    likes: [],
    added_by: 10,
    created: 1699557368376,
  },
  {
    created: 1685171111085,
    added_by: 10,
    id: "698a02d8-658b-47ce-b8bc-3f009d817ab8",
    likes: [],
    members: [129, 129, 129, 129, 129, 129],
    name: "Fisherman Wade",
  },
];

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    team_CREATE(state, action: PayloadAction<ITeam>) {
      const newTeam = action.payload;
      state.push(newTeam);
    },
    team_DELETE(state, action: PayloadAction<string | number>) {
      const teamId = action.payload;
      state = state.filter((team) => team.id !== teamId);
    },
    team_UPDATE(state, action: PayloadAction<{ name: string; id: string | number; members: number[] }>) {
      const { name, members, id } = action.payload;
      state = state.map((team) => {
        if (team.id !== id) return team;
        return { ...team, name: name, members: members };
      });
    },
  },
});

export default teamSlice.reducer;
