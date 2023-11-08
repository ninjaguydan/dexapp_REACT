const initState = {
  loggedUser: {
    id: 10,
    bio: "I am an anonymous user. Change whatever you like, or make a new account!",
    location: "",
    pronouns: "",
    name: "John Doe",
    username: "anon10",
    password: "password",
    user_img: "dfault",
    bg_color: "bg-black",
  },
  users: [
    {
      id: 1,
      bio: "The very best.",
      pronouns: "He/Him",
      name: "Daniel Thompson",
      username: "danboy",
      password: "password",
      user_img: "m1",
      bg_color: "bg-primary",
      location: "Jackson, MS",
    },
    {
      id: 2,
      bio: "This is a bio. I can put anything here. Gotta be respectful tho",
      name: "Josh Virgil",
      username: "joshwick420",
      password: "1234",
      user_img: "m2",
      bg_color: "bg-green",
    },
    { id: 3, name: "Kelsey J", username: "k_sheesh", password: "gggg", user_img: "f3", bg_color: "bg-yellow" },
    {
      id: 10,
      bio: "I am an anonymous user. Change whatever you like, or make a new account!",
      location: "",
      pronouns: "",
      name: "John Doe",
      username: "anon10",
      password: "password",
      user_img: "dfault",
      bg_color: "bg-black",
    },
  ],
  posts: [
    { id: 1, content: "What a cool site. Just missing some friends!", created: 1604322329404, added_by: 1, likes: [] },
    { id: 2, content: "I hate pikachu!", created: 1649163929404, added_by: 2, likes: [1] },
    { id: 3, content: "Old pokemon are the best!", created: 1647003929404, added_by: 1, likes: [2] },
    { id: 4, content: "Daniel is so cool", created: 1655179597085, added_by: 3, likes: [] },
    {
      id: 5,
      content: "On a Pokemon's profile page, you can click the image to see the official shiny artwork..!!",
      created: 1698289597085,
      added_by: 2,
      likes: [],
    },
  ],
  reviews: [
    {
      id: 1,
      content: "What an over rated piece of garbage!!",
      rating: 3,
      created: 1655158527085,
      added_by: 1,
      pkmn: 6,
      likes: [],
    },
    {
      id: 2,
      content: "Mega evolution made him cool again",
      rating: 9,
      created: 1633439194661,
      added_by: 2,
      pkmn: 6,
      likes: [],
    },
    { id: 3, content: "Bulba is great!", rating: 6, created: 1633439233667, added_by: 1, pkmn: 1, likes: [] },
    {
      id: 4,
      content: "Best Middle Evo and it's not even close!!",
      rating: 8,
      created: 1638709633667,
      added_by: 1,
      pkmn: 8,
      likes: [],
    },
    { id: 5, content: "big C H O N K", rating: 10, created: 1633439233667, added_by: 1, pkmn: 3, likes: [] },
  ],
  teams: [
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
      created: 1685171111085,
    },
  ],
  replies: [
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
  ],
  likes: [
    { postType: "reply", user: 1, forId: 4 },
    { postType: "team", user: 1, forId: 1 },
    { postType: "post", user: 3, forId: 2 },
    { postType: "post", user: 1, forId: 2 },
    { postType: "post", user: 2, forId: 2 },
    { postType: "review", user: 1, forId: 4 },
    { postType: "post", user: 1, forId: 5 },
    { postType: "post", user: 2, forId: 5 },
    { postType: "post", user: 3, forId: 5 },
    { postType: "post", user: 10, forId: 5 },
  ],
};

function reducer(state = initState, action: any) {
  switch (action.type) {
    case "users/ON_LOGIN":
      return {
        ...state,
        loggedUser: {
          ...action.logUser[0],
        },
      };
    case "users/ON_LOGOUT":
      return {
        ...state,
        loggedUser: {
          id: 0,
          bio: "",
          location: "",
          pronouns: "",
          name: "",
          username: "",
          password: "",
          user_img: "",
          bg_color: "",
        },
      };
    case "users/REGISTER":
      return {
        ...state,
        loggedUser: { ...action.newUser },
        users: [...state.users, action.newUser],
      };
    case "users/UPDATE":
      return {
        ...state,
        loggedUser: {
          ...state.loggedUser,
          ...action.formData,
        },
        users: state.users.map((user) => {
          if (user.id === action.userId) {
            return {
              ...user,
              ...action.formData,
            };
          }
          return user;
        }),
      };
    case "users/LIKE":
      return {
        ...state,
        likes: [...state.likes, action.tempLike],
      };
    case "users/UNLIKE":
      return {
        ...state,
        likes: state.likes.filter((like) => {
          if (like.postType !== action.tempLike.postType || like.user !== action.tempLike.user) {
            return like;
          } else {
            return like.forId !== action.tempLike.forId;
          }
        }),
      };
    case "post/CREATE":
      return {
        ...state,
        posts: [...state.posts, action.newPost],
      };
    case "post/DELETE":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
        replies: state.replies.filter((reply) => {
          if (reply.for !== "post") {
            return reply;
          } else {
            return reply.forId !== action.postId;
          }
        }),
      };
    case "review/CREATE":
      return {
        ...state,
        reviews: [...state.reviews, action.newReview],
      };
    case "review/DELETE":
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.reviewId),
        replies: state.replies.filter((reply) => {
          if (reply.for !== "review") {
            return reply;
          } else {
            return reply.forId !== action.reviewId;
          }
        }),
      };
    case "reply/CREATE":
      return {
        ...state,
        replies: [...state.replies, action.newReply],
      };
    case "reply/DELETE":
      return {
        ...state,
        replies: state.replies.filter((reply) => reply.id !== action.replyId),
      };
    default:
      return state;
  }
}

export default reducer;
