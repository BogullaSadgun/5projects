const registeredAttendees = [
  { ticketId: "EVT-001", fullName: "Sarah Connor", email: "sarah@cyberdyne.com", role: "Speaker", sessions: ["AI Ethics", "Robotics"] },
  { ticketId: "EVT-002", fullName: "John Doe", email: "john@techcorp.io", role: "Attendee", sessions: ["Web3", "AI Ethics"] }
];

const availableSessions = ["AI Ethics", "Robotics", "Web3", "Cloud Native", "DevOps"];

// getting the elements
const form = document.getElementById("registrationForm");
const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const role = document.getElementById("role");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const sessionError = document.getElementById("sessionError");
const formError = document.getElementById("formError");

const badgePreview = document.getElementById("badgePreview");
const sessionSummary = document.getElementById("sessionSummary");

const session = document.querySelectorAll('input[name="sessions"]');


// validating the form

function validateForm(){
  let isValid = true;
  nameError.textContent = "";
  emailError.textContent = "";
  sessionError.textContent = "";

  fullName.classList.remove("input-error");
  email.classList.remove("input-error");

  session.forEach(sess=>{
    sess.classList.remove("input-error");
  });

  // name validation
  const allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz ";
  let validName = true;
  const ProserName = fullName.value;
  for(let i = 0;i<ProserName.length;i++){
    if(!allowed.includes(ProserName[i])){
      validName = false;
      break;
    };
  };

  if(ProserName === "" || !validName){
    nameError.textContent = "Full Proper name is required.";
    fullName.classList.add("input-error");
    isValid = false;
  };

  // email validation
  if(!email.value.includes("@") || !email.value.includes(".")){
    emailError.textContent = "Enter a valid email with @ and a domain.";
    email.classList.add("input-error");
    isValid = false;
  };

  // session validation
  let selectedSession = [];
  for(let i = 0;i<session.length;i++){
    if(session[i].checked){
      selectedSession.push(session[i].value);
    };
  };

  if(selectedSession.length < 1){
    sessionError.textContent = "Please select at least One session.";
    session.forEach(sess=>{
      sess.classList.add("input-error");
    });
    isValid = false;
  };
  return isValid;
};

// checking duplicate email
function isDuplicateEmail(emailValue){
  let allEmails = registeredAttendees.map(attendee => attendee.email);
  return allEmails.includes(emailValue);
};

// registering the attendee
function handleRegistration(){
  formError.textContent = "";
  let formIsValid = validateForm();
  if(!formIsValid){
    return;
  };

  if(isDuplicateEmail(email.value)){
    formError.textContent = "This email is already registered.";
    email.classList.add("input-error");
    return;
  };

  let selectedSession = [];
  for(let i = 0;i<session.length;i++){
    if(session[i].checked){
      selectedSession.push(session[i].value);
    };
  };

  let newAttendee = {
    ticketId: "EVT-"+(registeredAttendees.length + 1).toString().padStart(3, "0"),
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    role: role.value,
    sessions: selectedSession
  };

  registeredAttendees.push(newAttendee);
  showBadge(newAttendee);
  showSessionSummary();
  form.reset();
};

// showing the badge
function showBadge(attendee){
  badgePreview.innerHTML = "";
  badgePreview.classList.remove("empty-preview");

  let badgeName = document.createElement("p");
  badgeName.textContent = attendee.fullName;
  badgeName.classList.add("badgeName");

  let badgeEmail = document.createElement("p");
  badgeEmail.textContent = attendee.email;
  badgeEmail.classList.add("badgeEmail");

  let badgeRole = document.createElement("p");
  badgeRole.textContent = attendee.role;
  badgeRole.classList.add("badgeRole");

  let badgeTicket = document.createElement("p");
  badgeTicket.textContent = attendee.ticketId;
  badgeTicket.classList.add("badgeTicket");

  let badgeSessions = document.createElement("p");
  badgeSessions.textContent = attendee.sessions.join(", ");
  badgeSessions.classList.add("badgeSessions");

  badgePreview.append(badgeName, badgeEmail, badgeRole, badgeTicket, badgeSessions);
};

// showing session summary
function showSessionSummary(){
  sessionSummary.innerHTML = "";
  sessionSummary.classList.remove("empty-summary");
  let sessionCounts = registeredAttendees.reduce((acc, attendee)=>{
    attendee.sessions.forEach(sess=>{
      acc[sess] = (acc[sess] || 0)+1;
    });
    return acc;
  },{});

  for(let sessionName in sessionCounts){
    let line = document.createElement("p");
    line.textContent = sessionName+" : "+sessionCounts[sessionName];
    line.classList.add("sessionCountLine");
    sessionSummary.append(line);
  };
};

document.addEventListener("DOMContentLoaded",()=>{
  showSessionSummary();
  form.addEventListener("submit",(event)=>{
    event.preventDefault();
    handleRegistration();
  });
});