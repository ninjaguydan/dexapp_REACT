export function styleType(type: string) {
  switch (type) {
    case "fighting":
      return {
        backgroundColor: "#813620",
      };
    case "flying":
      return {
        backgroundColor: "#7fddee",
        color: "#232433",
      };
    case "poison":
      return {
        backgroundColor: "#bb5ed3",
        color: "#f5d9ef",
      };
    case "ground":
      return {
        backgroundColor: "#6e4326",
      };
    case "rock":
      return {
        backgroundColor: "#5c401b",
        color: "#fde8d4",
      };
    case "bug":
      return {
        backgroundColor: "#929e65",
        color: "#3a423a",
      };
    case "ghost":
      return {
        backgroundColor: "#6c487c",
      };
    case "steel":
      return {
        backgroundColor: "#5d6e77",
      };
    case "fire":
      return {
        backgroundColor: "#e4633c",
        color: "#3a2219",
      };
    case "water":
      return {
        backgroundColor: "#2d8ac0",
      };
    case "grass":
      return {
        backgroundColor: "#547954",
      };
    case "electric":
      return {
        backgroundColor: "#e0df75",
        color: "#3d381b",
      };
    case "psychic":
      return {
        backgroundColor: "#da5ec5",
        color: "#352434",
      };
    case "ice":
      return {
        backgroundColor: "#65f5ff",
        color: "#000000",
      };
    case "dragon":
      return {
        backgroundColor: "#8337ff",
      };
    case "dark":
      return {
        backgroundColor: "#362131",
        color: "#fae5f1",
      };
    case "fairy":
      return {
        backgroundColor: "#ff9797",
        color: "#521b1b",
      };
    default:
      return {
        backgroundColor: "#808080",
      };
  }
}
