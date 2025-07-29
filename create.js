document.getElementById("create-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const role = e.target.role.value;
    const color = e.target.color.value;

    const {date, error} = await supabase
        .form ('crewmates')
        .insert([{name, role, color}]);

    if (error ) console.error(error);
    else window.location.href = "summary.html";
})