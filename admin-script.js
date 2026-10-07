/* ==========================================
   ADMIN LOGIN
========================================== */

function adminLogin(event) {

    event.preventDefault();

    const email =
        document.getElementById("adminEmail").value.trim();

    const password =
        document.getElementById("adminPassword").value.trim();

    const message =
        document.getElementById("loginMessage");


    if (email === "admin@gmail.com" &&
        password === "12345") {

        localStorage.setItem(
            "adminLoggedIn",
            "true"
        );

        message.style.color = "green";

        message.innerHTML =
            "Login successful! Redirecting...";

        setTimeout(function () {

            window.location.href =
                "admin-dashboard.html";

        }, 800);

    }

    else {

        message.style.color = "red";

        message.innerHTML =
            "Invalid email or password!";

    }

}


/* ==========================================
   ADMIN LOGOUT
========================================== */

function adminLogout() {

    localStorage.removeItem(
        "adminLoggedIn"
    );

    window.location.href =
        "admin-login.html";
}


/* ==========================================
   SEARCH TABLE
========================================== */

function searchTable(input, tableId) {

    const filter =
        input.value.toLowerCase();

    const table =
        document.getElementById(tableId);

    if (!table) return;

    const rows =
        table.getElementsByTagName("tr");


    for (let i = 1; i < rows.length; i++) {

        const rowText =
            rows[i].textContent.toLowerCase();

        if (rowText.includes(filter)) {

            rows[i].style.display = "";

        }

        else {

            rows[i].style.display = "none";

        }

    }

}


/* ==========================================
   STUDENT SEARCH
========================================== */

function searchStudents() {

    const input =
        document.getElementById("studentSearch");

    searchTable(
        input,
        "studentTable"
    );

}


/* ==========================================
   STUDENT FILTER
========================================== */

function filterStudents(value) {

    const table =
        document.getElementById("studentTable");

    if (!table) return;

    const rows =
        table.getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");


    for (let row of rows) {

        const status =
            row.cells[5].textContent
            .trim()
            .toLowerCase();


        if (value === "all") {

            row.style.display = "";

        }

        else if (value === status) {

            row.style.display = "";

        }

        else {

            row.style.display = "none";

        }

    }

}


/* ==========================================
   DELETE ROW
========================================== */

function deleteRow(button) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this record?"
        );


    if (confirmDelete) {

        const row =
            button.closest("tr");

        row.remove();

        alert(
            "Record deleted successfully!"
        );

    }

}


/* ==========================================
   ADD STUDENT
========================================== */

function openStudentForm() {

    const name =
        prompt("Enter student name:");

    if (!name) return;


    const email =
        prompt("Enter student email:");

    if (!email) return;


    const table =
        document.querySelector(
            "#studentTable tbody"
        );


    const row =
        table.insertRow();


    row.innerHTML = `

        <td>NEW</td>

        <td>
            <b>${name}</b>
        </td>

        <td>${email}</td>

        <td>Not Assigned</td>

        <td>Not Assigned</td>

        <td>
            <span class="status approved">
                Active
            </span>
        </td>

        <td>

            <button class="action edit">
                ✏
            </button>

            <button
                class="action delete"
                onclick="deleteRow(this)">
                🗑
            </button>

        </td>

    `;


    alert(
        "Student added successfully!"
    );

}


/* ==========================================
   DOCUMENT APPROVE
========================================== */

function approveDocument(button) {

    const row =
        button.closest("tr");

    const status =
        row.querySelector(".status");


    status.textContent =
        "Approved";

    status.className =
        "status approved";


    alert(
        "Document approved successfully!"
    );

}


/* ==========================================
   DOCUMENT REJECT
========================================== */

function rejectDocument(button) {

    const row =
        button.closest("tr");

    const status =
        row.querySelector(".status");


    status.textContent =
        "Rejected";

    status.className =
        "status rejected";


    alert(
        "Document rejected!"
    );

}


/* ==========================================
   ADMIN PROFILE
========================================== */

function updateAdminProfile(event) {

    event.preventDefault();

    const name =
        document.getElementById(
            "profileName"
        ).value;

    localStorage.setItem(
        "adminName",
        name
    );

    alert(
        "Profile updated successfully!"
    );

}


function changeAdminPassword(event) {

    event.preventDefault();

    alert(
        "Password changed successfully!"
    );

}


/* ==========================================
   PRINT REPORT
========================================== */

function printReport() {

    window.print();

}


/* ==========================================
   PAGE LOGIN CHECK
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const currentPage =
            window.location.pathname
            .split("/")
            .pop();


        if (currentPage !==
            "admin-login.html") {

            const loggedIn =
                localStorage.getItem(
                    "adminLoggedIn"
                );


            if (loggedIn !== "true") {

                // Uncomment this if you want
                // login protection.

                // window.location.href =
                //     "admin-login.html";

            }

        }

    }
);