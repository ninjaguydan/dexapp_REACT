import { IPost, IReview, ITeam, ITimeLineCard } from "./Interfaces";

function generateTimeline(posts: IPost[] = [], reviews: IReview[] = [], teams: ITeam[] = []): ITimeLineCard[] {
  let timeline: ITimeLineCard[] = [];

  posts.forEach((post) => timeline.push({ role: "post", content: post }));
  reviews.forEach((review) => timeline.push({ role: "review", content: review }));
  teams.forEach((team) => timeline.push({ role: "team", content: team }));

  if (timeline.length > 0) return timeline.sort((a, b) => a.content.created - b.content.created).reverse();
  else return timeline;
}
export default generateTimeline;
