import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReply } from "utils/Interfaces";

const initialState: IReply[] = [
  { id: 1, content: "Wow son you a big ass hater", created: 1649163929404, added_by: 2, for: "review", forId: 1 },
  {
    id: 2,
    content: "It's not even the best Kanto starter.",
    created: 1651892729404,
    added_by: 1,
    for: "review",
    forId: 1,
  },
  {
    id: 3,
    content: "Yeah right before they snatched it away one gen later lmaoo",
    created: 1651201529404,
    added_by: 1,
    for: "review",
    forId: 2,
  },
  { id: 4, content: "Agreed!!!", created: 1651801529404, added_by: 2, for: "post", forId: 3 },
  { id: 5, content: "We can be friends!", created: 1651801009404, added_by: 2, for: "post", forId: 1 },
  { id: 6, content: "Cool team!!! Red was the best trainer", created: 1651801009404, added_by: 3, for: "team", forId: 1 },
  {
    id: "b7825e56-078f-4652-be34-af373c8e9c7a",
    content: "guys. please. they all suck",
    created: 1655168868922,
    added_by: 3,
    for: "review",
    forId: 1,
  },
  {
    id: 7,
    content: "No way...",
    created: 1699289597085,
    added_by: 1,
    for: "post",
    forId: 5,
  },
  {
    id: 8,
    content: "Charizard might have the best one ngl",
    created: 1699289597085,
    added_by: 3,
    for: "post",
    forId: 5,
  },
];

const replySlice = createSlice({
  name: "replies",
  initialState,
  reducers: {
    reply_CREATE(state, action: PayloadAction<IReply>) {
      const newReply = action.payload;
      state.push(newReply);
    },
    reply_DESTROY(state, action: PayloadAction<number | string>) {
      const postId = action.payload;
      return state.filter((reply) => reply.id !== postId);
    },
    reply_DESTROY_BY_POST(state, action: PayloadAction<number | string>) {
      const postId = action.payload;
      return state.filter((reply) => reply.forId !== postId);
    },
  },
});

export default replySlice.reducer;

// Selectors
export const selectReplies = (state: IReply[]) => state;

type Details = {
  id: string | number;
  type: "post" | "review" | "team";
};
export const makeSelectRepliesBy = () =>
  createSelector([selectReplies, (state: IReply[], details: Details) => details], (replies, details) =>
    replies.filter((reply) => {
      console.log("Reply Selector");
      return reply.for === details.type && reply.forId === details.id;
    })
  );
