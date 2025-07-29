import { supabase } from './supabase.js';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Fetch the crewmate
const { data: crewmate, error } = await supabase
  .from("crewmates")
  .select("*")
  .eq("id", id)
  .single();

if (error) {
  console.error(error);
} else {
  // Populate form fields
  document.getElementById('name').value = crewmate.name;
  document.getElementById('role').value = crewmate.role;
  document.getElementById('color').value = crewmate.color;
}

// Handle form submission
const form = document.getElementById('edit-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const newName = form.name.value;
  const newRole = form.role.value;
  const newColor = form.color.value;

  const { error } = await supabase
    .from("crewmates")
    .update({ name: newName, role: newRole, color: newColor })
    .eq("id", id);

  if (error) {
    console.error("Update error:", error.message);
  } else {
    alert("Crewmate updated!");
    window.location.href = "summary.html";
  }
});

// Handle delete 

document.getElementById("delete-btn").addEventListener("click", async () => {
  const confirmDelete = confirm("Are you sure you want to delete this crewmate?");
  if (!confirmDelete) return;

  const { error: deleteError } = await supabase
    .from("crewmates")
    .delete()
    .eq("id", id);

  if (deleteError) {
    alert("Delete failed: " + deleteError.message);
  } else {
    alert("Crewmate deleted!");
    window.location.href = "summary.html";
  }
});
