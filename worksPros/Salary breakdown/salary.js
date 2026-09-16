const employees = [
  { id: 1, name: "Alex", dept: "Engineering", salary: 85000, skills: ["JavaScript", "React", "Node"] },
  { id: 2, name: "Beatriz", dept: "Engineering", salary: 95000, skills: ["Python", "Docker", "AWS"] },
  { id: 3, name: "Charlie", dept: "Design", salary: 70000, skills: ["Figma", "UI/UX", "CSS"] },
  { id: 4, name: "David", dept: "Marketing", salary: 62000, skills: ["SEO", "Content", "Analytics"] },
  { id: 5, name: "Eva", dept: "Engineering", salary: 110000, skills: ["JavaScript", "Go", "Kubernetes"] }
];

const availableSkills = ["JavaScript", "React", "Node", "Python", "Docker", "AWS", "Figma", "UI/UX", "CSS", "SEO", "Content", "Analytics", "Go", "Kubernetes"];

const deptSelect = document.getElementById("deptSelect");
const minSalary = document.getElementById("minSalary");
const maxSalary = document.getElementById("maxSalary");
const salaryError = document.getElementById("salaryErroe");
const skillsContainer = document.getElementById("skillsContainer");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");
const rosterCount = document.getElementById("rosterCount");
const rosterList = document.getElementById("rosterList");
const totalSalary = document.getElementById("totalSalary");
const avgSalary = document.getElementById("avgSalary");
const payrollSecondaryContent = document.getElementById("payrollSecondaryContent");

function renderSkillCheckboxes(){
  skillsContainer.innerHTML="";

  availableSkills.forEach(skill =>{
    let div=document.createElement("div");
    div.classList.add("skill-checkbox-item");

    let checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.value=skill;
    checkbox.classList.add("skill-checkbox");

    let label=document.createElement("label");
    label.textContent=skill;
    div.append(checkbox, label);
    skillsContainer.append(div);
  });
};

function validateSalaryInputs(){
  salaryError.textContent="";
  minSalary.classList.remove("input-error");
  maxSalary.classList.remove("input-error");
  applyBtn.disabled = false;

  let minVal=Number(minSalary.value);
  let maxVal=Number(maxSalary.value);
  if (minSalary.value !== "" && maxSalary.value !== "" && minVal > maxVal){
    salaryError.textContent= "Min salary cannot be greater than Max salary.";
    minSalary.classList.add("input-error");
    maxSalary.classList.add("input-error");
    applyBtn.disabled= true;
    return false;
  };
  return true;
};

function renderRoster(employeeList) {
  rosterList.innerHTML="";
  rosterCount.textContent=employeeList.length;

  if (employeeList.length===0) {
    let emptyMsg=document.createElement("p");
    emptyMsg.textContent="No employees match the selected criteria.";
    emptyMsg.classList.add("empty-preview");
    rosterList.append(emptyMsg);
    return;
  }

  employeeList.forEach(emp =>{
    let card=document.createElement("div");
    card.classList.add("employee-card");

    let nameHeading=document.createElement("h4");
    nameHeading.textContent=emp.name;
    if (emp.salary>=100000){
      let badge = document.createElement("span");
      badge.textContent="High Earner ($100k+)";
      badge.classList.add("high-earner-badge");
      nameHeading.append(badge);
    }

    let deptPara=document.createElement("p");
    deptPara.textContent="Department: "+emp.dept;

    let salaryPara=document.createElement("p");
    salaryPara.textContent = "Salary: $"+emp.salary.toLocaleString();

    let skillsPara=document.createElement("p");
    skillsPara.textContent = "Skills: "+emp.skills.join(", ");

    card.append(nameHeading,deptPara,salaryPara,skillsPara);
    rosterList.append(card);
  });
};

function updatePayrollSummary(employeeList){
  let total=employeeList.reduce((acc, emp) => {
    return acc+emp.salary;
  },0);
  let avg = employeeList.length>0?Math.round(total/employeeList.length):0;

  totalSalary.textContent="$"+total.toLocaleString();
  avgSalary.textContent="$"+avg.toLocaleString();

  payrollSecondaryContent.innerHTML="";
  payrollSecondaryContent.classList.remove("empty-preview");
  let summaryText=document.createElement("p");
  summaryText.textContent="Currently viewing "+employeeList.length + " employee(s) in payroll metrics.";
  payrollSecondaryContent.append(summaryText);
};

function applyFilters(){
  if (!validateSalaryInputs()) {
    return;
  }
  let selectedDept = deptSelect.value;
  let minVal=minSalary.value!=="" ? Number(minSalary.value):0;
  let maxVal=maxSalary.value !== "" ? Number(maxSalary.value):Infinity;
  let selectedSkills = [];
  let checkboxes=document.querySelectorAll(".skill-checkbox");
  checkboxes.forEach(cb=>{
    if (cb.checked){
      selectedSkills.push(cb.value);
    };
  });
  let filteredEmployees=employees.filter(emp=>{
    let matchesDept=selectedDept==="All"||emp.dept===selectedDept;
    let matchesMin= emp.salary>=minVal;
    let matchesMax=emp.salary<=maxVal;

    let matchesSkill=true;
    if (selectedSkills.length>0){
      matchesSkill=emp.skills.some(skill=>selectedSkills.includes(skill));
    };
    return matchesDept && matchesMin && matchesMax && matchesSkill;
  });
  renderRoster(filteredEmployees);
  updatePayrollSummary(filteredEmployees);
};

function resetFilters(){
  deptSelect.value="All";
  minSalary.value="";
  maxSalary.value="";
  salaryError.textContent="";

  minSalary.classList.remove("input-error");
  maxSalary.classList.remove("input-error");
  applyBtn.disabled=false;

  let checkboxes=document.querySelectorAll(".skill-checkbox");
  checkboxes.forEach(cb=>{
    cb.checked=false;
  });
  renderRoster(employees);
  updatePayrollSummary(employees);
};

document.addEventListener("DOMContentLoaded",()=>{
  renderSkillCheckboxes();
  renderRoster(employees);
  updatePayrollSummary(employees);
  minSalary.addEventListener("input", validateSalaryInputs);
  maxSalary.addEventListener("input", validateSalaryInputs);
  applyBtn.addEventListener("click", applyFilters);
  resetBtn.addEventListener("click", resetFilters);
});