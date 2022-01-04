import axios from "axios";

const apiBase = axios.create({
  baseURL: "http://localhost:4000/api/follows",
});

export async function getFollowedVacationIds(jwt: string) {
  const {
    data: { vacationIds },
  } = await apiBase.get(`/`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return vacationIds.map((obj: { vacationId: number }) => obj.vacationId);
}

export async function getFollowersAmount(vacationId: number, jwt: string) {
  const { data: followersAmount }: any = apiBase.get(
    `followers-amount/${vacationId}`,
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return followersAmount as number;
}

export async function deleteFollow(jwt: string, vacationId: number) {
  const vacationIdAsNumber = Number(vacationId);
  await apiBase.delete(`delete-follow/${vacationIdAsNumber}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return;
}

export async function addFollow(jwt: string, vacationId: number) {
  const vacationIdAsNumber = Number(vacationId);
  await apiBase.post(
    `/add-follow/${vacationIdAsNumber}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
  return;
}
