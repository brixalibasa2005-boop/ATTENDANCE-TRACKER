const nameInput = document.getElementById("name");
const dateInput = document.getElementById("date");
const statusInput = document.getElementById("status");
const addBtn = document.getElementById("addBtn");
const tableBody = document.getElementById("tableBody");
const search = document.getElementById("search");

let attendance = JSON.parse(localStorage.getItem("attendance")) || [];


addBtn.addEventListener("click", () => {

    const name = nameInput.value.trim();
    const date = dateInput.value;
    const status = statusInput.value;

    if(name === "" || date === ""){
        alert("Please complete all fields.");
        return;
    }

    attendance.push({
        id: Date.now(),
        name,
        date,
        status
    });

    saveData();
    displayData();

    nameInput.value = "";
    dateInput.value = "";
    statusInput.value = "Present";
});


// Display Data
function displayData(){

    tableBody.innerHTML = "";

    let keyword = search.value.toLowerCase();

    let filtered = attendance.filter(item =>
        item.name.toLowerCase().includes(keyword)
    );

    filtered.forEach(item =>{

        let colorClass="";

        if(item.status==="Present"){
            colorClass="status-present";
        }
        else if(item.status==="Late"){
            colorClass="status-late";
        }
        else{
            colorClass="status-absent";
        }

        tableBody.innerHTML += `
        <tr>

            <td>${item.name}</td>

            <td>${item.date}</td>

            <td class="${colorClass}">
                ${item.status}
            </td>

            <td>

                <button class="delete-btn"
                onclick="deleteAttendance(${item.id})">

                <i class="fa-solid fa-trash"></i>

                </button>

            </td>

        </tr>
        `;

    });

    updateCards();

}


// Delete
function deleteAttendance(id){

    if(confirm("Delete this record?")){

        attendance = attendance.filter(item=>item.id!==id);

        saveData();
        displayData();

    }

}


// Save LocalStorage
function saveData(){

    localStorage.setItem(
        "attendance",
        JSON.stringify(attendance)
    );

}


// Dashboard Cards
function updateCards(){

    document.getElementById("total").innerHTML =
    attendance.length;

    document.getElementById("present").innerHTML =
    attendance.filter(item=>item.status==="Present").length;

    document.getElementById("late").innerHTML =
    attendance.filter(item=>item.status==="Late").length;

    document.getElementById("absent").innerHTML =
    attendance.filter(item=>item.status==="Absent").length;

}


// Search
search.addEventListener("keyup",displayData);


// First Load
displayData();