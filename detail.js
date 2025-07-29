import { supabase } from "./supabase.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const container = document.getElementById("crewmate-detail");
const editLink = document.getElementById("edit-link");

const { data: crewmate, error } = await supabase
  .from("crewmates")
  .select("*")
  .eq("id", id)
  .single();

if (error) {
  container.textContent = "Error loading crewmate details.";
  console.error(error);
} else {
  container.innerHTML = `
    <h2>${crewmate.name}</h2>
    <p>Role: ${crewmate.role}</p>
    <p>Color: ${crewmate.color}</p>
    <p>Extra info: ${crewmate.extra_info || "No extra info available."}</p>
  `;

  editLink.href = `edit.html?id=${id}`;
}
