import axios from "axios";
import { VacationModel } from "../models/Vacation.model";

const apiBase = axios.create({
  baseURL: "http://localhost:4000/api/vacations",
});

export async function getVacationsAndIsAdminAndUserId(jwt: string) {
  const { data: vacationsAndIsAdmin } = await apiBase.get<{
    userId: number;
    isAdmin: number;
    vacations: VacationModel[];
  }>("/", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return vacationsAndIsAdmin;
}

export async function addNewVacation(
  newVacation: Partial<VacationModel>,
  jwt: string
) {
  const res = apiBase.post(`/add-vacation`, newVacation, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  return res;
}

export async function updateVacation(
  vacation: Partial<VacationModel>,
  jwt: string
) {
  const { id, destination, description, image, startDate, endDate, price } =
    vacation;
  await apiBase.put(
    `/update-vacation/${id}`,
    {
      description,
      destination,
      image,
      startDate,
      endDate,
      price,
    },
    {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }
  );
}

export async function deleteVacationById(vacationId: number, jwt: string) {
  await apiBase.delete(`/delete-vacation/${vacationId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return;
}
