import {
  uniqueNamesGenerator,
  Config,
  adjectives,
  colors,
} from "unique-names-generator";

import { v4 as uuidv4 } from "uuid";

export const prepareUser = () => {
  const customConfig: Config = {
    dictionaries: [adjectives, colors],
    separator: "-",
    length: 2,
  };
  const userDetails = localStorage.getItem("User");

  if (!userDetails) {
    const room = uuidv4();
    const name: string = uniqueNamesGenerator(customConfig);
    localStorage.setItem("User", JSON.stringify({ name, room }));

    return { name, room };
  }
  if (userDetails) {
    return JSON.parse(userDetails);
  }
};
