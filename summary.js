const container = document.getElementById("crewmate-list"); // make sure you have this div in your HTML

const { data: crew, error } = await supabase
  .from("crewmates")
  .select("*")
  .order("created_at", { ascending: false });

if (error) {
  console.error("Error fetching crewmates:", error);
} else {
  crew.forEach(c => {
    // Create a card or list item
    const card = document.createElement("div");
    card.className = "crewmate-card";

    // Add crewmate info
    card.innerHTML = `
      <h3><a href="detail.html?id=${c.id}">${c.name}</a></h3>
      <p>Role: ${c.role}</p>
      <p>Color: ${c.color}</p>
      <a href="detail.html?id=${c.id}">View Details</a>
      <a href="edit.html?id=${c.id}">Edit</a>
    `;

    // Append to the container
    container.appendChild(card);
  });
}
