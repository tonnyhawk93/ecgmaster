import { keys } from "./constants";

export const validateFile = (obj) => {
  return keys.every((key) => key in obj);
};
