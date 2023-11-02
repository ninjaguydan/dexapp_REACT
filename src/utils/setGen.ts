export function setGen(id: number): number {
  if (id < 152) {
    return 1;
  } else if (id < 252) {
    return 2;
  } else if (id < 387) {
    return 3;
  } else if (id < 494) {
    return 4;
  } else if (id < 650) {
    return 5;
  } else if (id < 722) {
    return 6;
  } else if (id < 810) {
    return 7;
  } else if (id < 906) {
    return 8;
  } else {
    return 9;
  }
}
