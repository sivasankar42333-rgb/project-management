/* =========================================
   STAFF LOGIN
========================================= */

const staffEmail = "staff@gmail.com";
const staffPassword = "12345";


document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("staffLoginForm");

    if (loginForm) {

        loginForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const email =
                document.getElementById("staffEmail").value;

            const password =
                document.getElementById("staffPassword").value;

            const message =
                document.getElementById("loginMessage");


            if (email === staffEmail && password === staffPassword) {

                localStorage.setItem("staffLoggedIn", "true");

                message.style.color = "green";
                message.innerText =
                    "Login successful! Redirecting...";

                setTimeout(function () {
                    window.location.href =
                        "staff-dashboard.html";
                }, 700);

            } else {

                message.style.color = "red";
                message.innerText =
                    "Invalid email or password!";
            }

        });
    }


    /* PROFILE */

    const profileForm =
        document.getElementById("staffProfileForm");

    if (profileForm) {

        profileForm.addEventListener("submit", function (e) {

            e.preventDefault();

            const name =
                document.getElementById("profileName").value;

            const email =
                document.getElementById("profileEmail").value;

            localStorage.setItem("staffName", name);
            localStorage.setItem("staffEmail", email);

            document.getElementById("profileMessage").style.color =
                "green";

            document.getElementById("profileMessage").innerText =
                "Profile updated successfully!";
        });
    }

});


/* =========================================
   LOGOUT
========================================= */

function staffLogout() {

    localStorage.removeItem("staffLoggedIn");

    window.location.href = "staff-login.html";
}


/* =========================================
   DASHBOARD
========================================= */

function loadDashboard() {

    const students = [
        "Arun Kumar",
        "Priya Kumar",
        "Rahul S"
    ];

    const projects = [
        {
            title: "Online Project Management System",
            student: "Arun Kumar",
            status: "Pending"
        },
        {
            title: "GreenPlant Store",
            student: "Rahul S",
            status: "Review"
        },
        {
            title: "Smart College Management",
            student: "Priya Kumar",
            status: "Approved"
        }
    ];


    const studentCount =
        document.getElementById("studentCount");

    const projectCount =
        document.getElementById("projectCount");

    const pendingCount =
        document.getElementById("pendingCount");

    const approvedCount =
        document.getElementById("approvedCount");


    if (studentCount)
        studentCount.innerText = students.length;

    if (projectCount)
        projectCount.innerText = projects.length;

    if (pendingCount)
        pendingCount.innerText =
            projects.filter(p => p.status === "Pending").length;

    if (approvedCount)
        approvedCount.innerText =
            projects.filter(p => p.status === "Approved").length;


    const recent =
        document.getElementById("recentProjects");


    if (recent) {

        recent.innerHTML = "";

        projects.forEach(project => {

            recent.innerHTML += `

                <div class="project-row">

                    <div>
                        <b>${project.title}</b>
                        <p>${project.student}</p>
                    </div>

                    <span class="badge ${getBadgeClass(project.status)}">
                        ${project.status}
                    </span>

                </div>

            `;

        });
    }
}


function getBadgeClass(status) {

    if (status === "Approved")
        return "approved";

    if (status === "Review")
        return "review";

    if (status === "Rejected")
        return "rejected";

    return "pending";
}


/* =========================================
   STUDENT SEARCH
========================================= */

function searchStudents() {

    const input =
        document.getElementById("studentSearch")
            .value
            .toLowerCase();

    const rows =
        document.querySelectorAll("#studentTable tr");


    rows.forEach(row => {

        const text =
            row.innerText.toLowerCase();

        row.style.display =
            text.includes(input) ? "" : "none";

    });
}


/* =========================================
   PROJECT SEARCH
========================================= */

function searchProjects() {

    const input =
        document.getElementById("projectSearch")
            .value
            .toLowerCase();

    const cards =
        document.querySelectorAll(".project-card");


    cards.forEach(card => {

        const text =
            card.innerText.toLowerCase();

        card.style.display =
            text.includes(input) ? "" : "none";

    });
}


function filterProjects() {

    const filter =
        document.getElementById("projectFilter").value;

    const cards =
        document.querySelectorAll(".project-card");


    cards.forEach(card => {

        const badge =
            card.querySelector(".badge");

        if (!badge) return;

        const status =
            badge.innerText.trim();

        if (filter === "all" || status === filter) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });
}


/* =========================================
   PROJECT REVIEW
========================================= */

function saveProjectReview() {

    const status =
        document.getElementById("reviewStatus").value;

    const remarks =
        document.getElementById("reviewRemarks").value;


    const review = {

        project:
            "Online Project Management System",

        student:
            "Arun Kumar",

        status:
            status,

        remarks:
            remarks,

        date:
            new Date().toLocaleDateString()

    };


    localStorage.setItem(
        "projectReview",
        JSON.stringify(review)
    );


    const message =
        document.getElementById("reviewMessage");

    message.style.color = "green";

    message.innerText =
        "Project review saved successfully!";
}


function rejectProject() {

    document.getElementById("reviewStatus").value =
        "Rejected";

    saveProjectReview();

    document.getElementById("reviewMessage").style.color =
        "red";

    document.getElementById("reviewMessage").innerText =
        "Project rejected and review saved.";
}


/* =========================================
   DOCUMENT REVIEW
========================================= */

function viewDocument(name) {

    alert(
        "Opening document:\n\n" +
        name +
        "\n\nDemo preview only."
    );
}


function approveDocument(button) {

    const card =
        button.closest(".document-card");

    const badge =
        card.querySelector(".badge");

    badge.innerText = "Approved";

    badge.className =
        "badge approved";

    button.remove();

    alert("Document approved successfully!");
}


function rejectDocument(button) {

    const card =
        button.closest(".document-card");

    const badge =
        card.querySelector(".badge");

    badge.innerText = "Rejected";

    badge.className =
        "badge rejected";

    button.remove();

    alert("Document rejected!");
}


/* =========================================
   FEEDBACK
========================================= */

function submitFeedback() {

    const student =
        document.getElementById("feedbackStudent").value;

    const project =
        document.getElementById("feedbackProject").value;

    const type =
        document.getElementById("feedbackType").value;

    const text =
        document.getElementById("feedbackText").value;


    if (!student || !project || !text) {

        const message =
            document.getElementById("feedbackMessage");

        message.style.color = "red";

        message.innerText =
            "Please fill all required fields.";

        return;
    }


    const feedback = {

        student: student,
        project: project,
        type: type,
        message: text,
        date: new Date().toLocaleDateString()

    };


    let feedbackList =
        JSON.parse(
            localStorage.getItem("staffFeedback") || "[]"
        );


    feedbackList.push(feedback);


    localStorage.setItem(
        "staffFeedback",
        JSON.stringify(feedbackList)
    );


    const message =
        document.getElementById("feedbackMessage");

    message.style.color = "green";

    message.innerText =
        "Feedback sent successfully!";


    document.getElementById("feedbackText").value = "";
}


/* =========================================
   PROJECT STATUS
========================================= */

function showProgress(value) {

    document.getElementById("progressValue")
        .innerText = value;
}


function updateProjectStatus() {

    const status =
        document.getElementById("statusSelect").value;

    const progress =
        document.getElementById("progressRange").value;

    const comment =
        document.getElementById("statusComment").value;


    const statusData = {

        project:
            "Online Project Management System",

        student:
            "Arun Kumar",

        status:
            status,

        progress:
            progress,

        comment:
            comment,

        updatedAt:
            new Date().toLocaleString()

    };


    localStorage.setItem(
        "projectStatus",
        JSON.stringify(statusData)
    );


    const message =
        document.getElementById("statusMessage");

    message.style.color = "green";

    message.innerText =
        "Project status updated successfully!";
}