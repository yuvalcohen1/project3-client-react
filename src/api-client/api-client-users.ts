import axios from "axios";

const apiBase = axios.create({
  baseURL: "http://localhost:4000/api/users",
});

export async function getJwtByLogin(
  username: string,
  password: string
) {
  const {
    data: { jwt },
  } = await apiBase.post("/login", { username, password });

  return jwt;
}

export async function addNewUserAndGetJwt(
  firstName: string,
  lastName: string,
  username: string,
  password: string
) {
  const {
    data: { jwt },
  } = await apiBase.post("/register", {
    firstName,
    lastName,
    username,
    password,
  });

  return jwt;
}
