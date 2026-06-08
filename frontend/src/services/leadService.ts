import { Lead } from "../types";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://127.0.0.1:8000";

/* -------------------------------- */
/* GET ALL LEADS                    */
/* -------------------------------- */

async function getLeads(): Promise<Lead[]> {
  const response = await fetch(
    `${API_URL}/leads`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch leads");
  }

  return response.json();
}

/* -------------------------------- */
/* CREATE LEAD                      */
/* -------------------------------- */

async function addLead(
  lead: Omit<Lead, "id" | "timeline">
): Promise<Lead> {
  const response = await fetch(
    `${API_URL}/leads`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(lead),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create lead");
  }

  return response.json();
}

/* -------------------------------- */
/* UPDATE LEAD                      */
/* -------------------------------- */

async function updateLead(
  id: string,
  updates: Partial<Lead>
): Promise<Lead> {
  const response = await fetch(
    `${API_URL}/leads/${id}`,
    {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(updates),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update lead");
  }

  return response.json();
}

/* -------------------------------- */
/* DELETE LEAD                      */
/* -------------------------------- */

async function deleteLead(
  id: string
): Promise<void> {
  const response = await fetch(
    `${API_URL}/leads/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete lead");
  }
}

/* -------------------------------- */
/* EXPORT SERVICE                   */
/* -------------------------------- */

export const leadService = {
  getLeads,
  addLead,
  updateLead,
  deleteLead,
};