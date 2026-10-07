/* ==========================================
   STUDENT REGISTRATION
========================================== */

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            alert("❌ Passwords do not match!");
            return;

        }

        const student = {

            regNo:
                document.getElementById("regNo").value,

            fullName:
                document.getElementById("fullName").value,

            email:
                document.getElementById("email").value,

            phone:
                document.getElementById("phone").value,

            department:
                document.getElementById("department").value,

            year:
                document.getElementById("year").value,

            password: password,

            address: ""

        };

        localStorage.setItem(
            "student",
            JSON.stringify(student)
        );

        alert("🎉 Registration successful!");

        window.location.href =
            "student-login.html";
    });
}


/* ==========================================
   STUDENT LOGIN
========================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const student =
            JSON.parse(localStorage.getItem("student"));

        if (!student) {

            alert(
                "⚠️ Student account not found. Please register first."
            );

            return;
        }

        const email =
            document.getElementById("loginEmail").value;

        const password =
            document.getElementById("loginPassword").value;

        if (
            email === student.email &&
            password === student.password
        ) {

            localStorage.setItem(
                "loggedIn",
                "true"
            );

            alert("✅ Login successful!");

            window.location.href =
                "student-profile.html";

        } else {

            alert("❌ Invalid email or password!");

        }

    });
}


/* ==========================================
   PROFILE
========================================== */

function loadProfile() {

    const student =
        JSON.parse(localStorage.getItem("student"));

    if (!student) return;

    const regNo =
        document.getElementById("profileRegNo");

    const name =
        document.getElementById("profileName");

    const email =
        document.getElementById("profileEmail");

    const phone =
        document.getElementById("profilePhone");

    const department =
        document.getElementById("profileDepartment");

    const address =
        document.getElementById("profileAddress");

    if (regNo)
        regNo.value = student.regNo;

    if (name)
        name.value = student.fullName;

    if (email)
        email.value = student.email;

    if (phone)
        phone.value = student.phone;

    if (department)
        department.value = student.department;

    if (address)
        address.value = student.address || "";

    const profileNameCard =
        document.getElementById("profileNameCard");

    const profileRegCard =
        document.getElementById("profileRegCard");

    if (profileNameCard)
        profileNameCard.textContent =
            student.fullName;

    if (profileRegCard)
        profileRegCard.textContent =
            student.regNo;
}

loadProfile();


/* ==========================================
   UPDATE PROFILE
========================================== */

const profileForm =
    document.getElementById("profileForm");

if (profileForm) {

    profileForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const student =
            JSON.parse(localStorage.getItem("student"));

        if (!student) return;

        student.fullName =
            document.getElementById("profileName").value;

        student.email =
            document.getElementById("profileEmail").value;

        student.phone =
            document.getElementById("profilePhone").value;

        student.department =
            document.getElementById("profileDepartment").value;

        student.address =
            document.getElementById("profileAddress").value;

        localStorage.setItem(
            "student",
            JSON.stringify(student)
        );

        alert("💾 Profile updated successfully!");

        loadProfile();

    });
}


/* ==========================================
   PROJECT SUBMISSION
========================================== */

const projectForm =
    document.getElementById("projectForm");

if (projectForm) {

    projectForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const project = {

            projectId:
                "FYP-" +
                Math.floor(1000 + Math.random() * 9000),

            title:
                document.getElementById("projectTitle").value,

            domain:
                document.getElementById("projectDomain").value,

            abstract:
                document.getElementById("projectAbstract").value,

            guide:
                document.getElementById("guideName").value,

            team:
                document.getElementById("teamMembers").value,

            status:
                "Project Submitted",

            date:
                new Date().toLocaleDateString()

        };

        localStorage.setItem(
            "project",
            JSON.stringify(project)
        );

        alert(
            "🚀 Project submitted successfully!"
        );

        window.location.href =
            "project-details.html";

    });
}


/* ==========================================
   PROJECT DETAILS
========================================== */

function loadProjectDetails() {

    const project =
        JSON.parse(localStorage.getItem("project"));

    if (!project) return;

    const id =
        document.getElementById("detailId");

    const title =
        document.getElementById("detailTitle");

    const domain =
        document.getElementById("detailDomain");

    const guide =
        document.getElementById("detailGuide");

    const team =
        document.getElementById("detailTeam");

    const abstract =
        document.getElementById("detailAbstract");

    if (id)
        id.textContent =
            project.projectId;

    if (title)
        title.textContent =
            project.title;

    if (domain)
        domain.textContent =
            project.domain;

    if (guide)
        guide.textContent =
            project.guide;

    if (team)
        team.textContent =
            project.team || "No team members added";

    if (abstract)
        abstract.textContent =
            project.abstract;
}

loadProjectDetails();


/* ==========================================
   DOCUMENT UPLOAD
========================================== */

const documentForm =
    document.getElementById("documentForm");

if (documentForm) {

    documentForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const type =
            document.getElementById("documentType").value;

        const file =
            document.getElementById("documentFile").files[0];

        if (!file) {

            alert("⚠️ Please select a file!");

            return;
        }

        let documents =
            JSON.parse(
                localStorage.getItem("documents")
            ) || [];

        documents.push({

            type: type,

            fileName: file.name,

            date:
                new Date().toLocaleDateString(),

            status: "Uploaded"

        });

        localStorage.setItem(
            "documents",
            JSON.stringify(documents)
        );

        alert(
            "📄 Document uploaded successfully!"
        );

        documentForm.reset();

        displayDocuments();

    });
}


/* ==========================================
   DISPLAY DOCUMENTS
========================================== */

function displayDocuments() {

    const list =
        document.getElementById("documentList");

    if (!list) return;

    const documents =
        JSON.parse(
            localStorage.getItem("documents")
        ) || [];

    list.innerHTML = "";

    documents.forEach(function(doc) {

        const div =
            document.createElement("div");

        div.className =
            "document-item";

        div.innerHTML = `

            <div class="file-icon">
                📄
            </div>

            <div class="document-info">

                <h3>${doc.type}</h3>

                <p>
                    ${doc.fileName}
                    • Uploaded ${doc.date}
                </p>

            </div>

            <span class="uploaded-status">
                ✓ ${doc.status}
            </span>

        `;

        list.appendChild(div);

    });

    const count =
        document.getElementById("documentCount");

    if (count) {

        count.textContent =
            documents.length +
            (documents.length === 1
                ? " Document"
                : " Documents");

    }
}

displayDocuments();


/* ==========================================
   LOGOUT
========================================== */

function logout() {

    localStorage.removeItem("loggedIn");

    alert("👋 Logged out successfully!");

    window.location.href =
        "student-login.html";
}