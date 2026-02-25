const jobContainer = document.getElementById("job-container");
const interview = document.getElementById("interview-jobs");
const rejected = document.getElementById("rejected-jobs");
const totalJobs = document.querySelectorAll(".total-jobs");
totalJobs.forEach((element) => {
  element.innerText = jobContainer.children.length;
});

let totalJobsCount = document.getElementById("totalJobCount");
let interviewJobsElement = [];
let rejectedJobsElement = [];
let activeTab = "all";

function countCalculator() {
  interview.innerText = interviewJobsElement.length;
  rejected.innerText = rejectedJobsElement.length;
}

function totalCount() {
  if (activeTab === "all-btn") {
    totalJobsCount.innerText = jobContainer.children.length;
  } else if (activeTab === "interview-btn") {
    if (interviewJobsElement.length === 0) {
      totalJobsCount.innerText = 0;
    } else {
      totalJobsCount.innerText = `${interviewJobsElement.length} of ${jobContainer.children.length}`;
    }
  } else if (activeTab === "rejected-btn") {
    if (rejectedJobsElement.length === 0) {
      totalJobsCount.innerText = 0;
    } else {
      totalJobsCount.innerText = `${rejectedJobsElement.length} of ${jobContainer.children.length}`;
    }
  }
}

const mainContainer = document.querySelector("main");
const filterSection = document.getElementById("filter-section");

function clickToggle(id) {
  const all = document.getElementById("all-btn");
  const interviewBtn = document.getElementById("interview-btn");
  const rejectedBtn = document.getElementById("rejected-btn");
  activeTab = id;

  all.classList.remove("bg-neutral-700", "text-white");
  interviewBtn.classList.remove("bg-neutral-700", "text-white");
  rejectedBtn.classList.remove("bg-neutral-700", "text-white");

  document.getElementById(id).classList.add("bg-neutral-700", "text-white");

  if (id === "interview-btn") {
    filterSection.classList.remove("hidden");
    jobContainer.classList.add("hidden");
    renderInterviewElement();
    totalCount();
  } else if (id === "all-btn") {
    filterSection.classList.add("hidden");
    jobContainer.classList.remove("hidden");
    totalCount();
  } else if (id === "rejected-btn") {
    filterSection.classList.remove("hidden");
    jobContainer.classList.add("hidden");
    renderRejectedElement();
    totalCount();
  }
}

function updateBadgeInAllSection(companyName, jobTitle, status) {
  jobContainer.querySelectorAll(".bg-white").forEach((card) => {
    const cardCompany = card.querySelector(".companyName")?.innerText.trim();
    const cardTitle = card.querySelector(".jobTittle")?.innerText.trim();

    if (cardCompany === companyName && cardTitle === jobTitle) {
      const badge = card.querySelector(".prograss");
      badge.classList.remove("btn-info", "btn-success", "btn-error");

      if (status === "INTERVIEW") {
        badge.innerText = "INTERVIEW";
        badge.classList.add("btn-success");
      } else if (status === "REJECTED") {
        badge.innerText = "REJECTED";
        badge.classList.add("btn-error");
      }
    }
  });
}

mainContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("interviewButton")) {
    const parentNode = event.target.closest(".bg-white");

    const companyName = parentNode
      .querySelector(".companyName")
      .innerText.trim();
    const jobTitle = parentNode.querySelector(".jobTittle").innerText.trim();
    const jobCategory = parentNode
      .querySelector(".jobCatagory")
      .innerText.trim();
    const description = parentNode
      .querySelector(".description")
      .innerText.trim();

    const cardInfo = {
      companyName,
      jobTitle,
      jobCategory,
      prograss: "INTERVIEW",
      description,
    };

    updateBadgeInAllSection(companyName, jobTitle, "INTERVIEW");

    const jobExist = interviewJobsElement.find(
      (job) => job.companyName === companyName && job.jobTitle === jobTitle,
    );
    if (!jobExist) interviewJobsElement.push(cardInfo);

    rejectedJobsElement = rejectedJobsElement.filter(
      (job) => !(job.companyName === companyName && job.jobTitle === jobTitle),
    );

    if (activeTab === "interview-btn") renderInterviewElement();
    if (activeTab === "rejected-btn") renderRejectedElement();

    countCalculator();
    totalCount();
  } else if (event.target.classList.contains("rejectedButton")) {
    const parentNode = event.target.closest(".bg-white");

    const companyName = parentNode
      .querySelector(".companyName")
      .innerText.trim();
    const jobTitle = parentNode.querySelector(".jobTittle").innerText.trim();
    const jobCategory = parentNode
      .querySelector(".jobCatagory")
      .innerText.trim();
    const description = parentNode
      .querySelector(".description")
      .innerText.trim();

    const cardInfo = {
      companyName,
      jobTitle,
      jobCategory,
      prograss: "REJECTED",
      description,
    };

    updateBadgeInAllSection(companyName, jobTitle, "REJECTED");

    const jobExist = rejectedJobsElement.find(
      (job) => job.companyName === companyName && job.jobTitle === jobTitle,
    );
    if (!jobExist) rejectedJobsElement.push(cardInfo);

    interviewJobsElement = interviewJobsElement.filter(
      (job) => !(job.companyName === companyName && job.jobTitle === jobTitle),
    );

    if (activeTab === "rejected-btn") renderRejectedElement();
    if (activeTab === "interview-btn") renderInterviewElement();

    countCalculator();
    totalCount();
  } else if (event.target.classList.contains("delete-btn")) {
    const parentNode = event.target.closest(".bg-white");

    const companyName = parentNode
      .querySelector(".companyName")
      .innerText.trim();
    const jobTitle = parentNode.querySelector(".jobTittle").innerText.trim();

    interviewJobsElement = interviewJobsElement.filter(
      (job) => !(job.companyName === companyName && job.jobTitle === jobTitle),
    );
    rejectedJobsElement = rejectedJobsElement.filter(
      (job) => !(job.companyName === companyName && job.jobTitle === jobTitle),
    );

    jobContainer.querySelectorAll(".bg-white").forEach((card) => {
      if (
        card.querySelector(".companyName")?.innerText.trim() === companyName &&
        card.querySelector(".jobTittle")?.innerText.trim() === jobTitle
      ) {
        card.remove();
      }
    });

    parentNode.remove();

    if (activeTab === "interview-btn") renderInterviewElement();
    if (activeTab === "rejected-btn") renderRejectedElement();

    totalJobs.forEach((element) => {
      element.innerText = jobContainer.children.length;
    });
    countCalculator();
    totalCount();
  }
});

function renderInterviewElement() {
  filterSection.innerHTML = "";

  if (interviewJobsElement.length === 0) {
    filterSection.innerHTML = `
      <div class="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center justify-center text-center py-20 space-y-2 mt-5">
        <i class="fa-solid fa-file-lines fa-5x" style="color: rgb(116, 192, 252);"></i>
        <h3 class="font-bold text-2xl text-[#002C5C]">No jobs available</h3>
        <p class="text-[#64748B]">Check back soon for new job opportunities</p>
      </div>`;
    return;
  }

  for (let job of interviewJobsElement) {
    let div = document.createElement("div");
    div.innerHTML = `
      <div class="bg-white p-5 rounded-lg shadow-sm flex justify-between mb-5">
        <div>
          <p class="companyName font-bold text-[#002C5C] text-[18px] mb-1">${job.companyName}</p>
          <p class="jobTittle mb-4 text-neutral-500">${job.jobTitle}</p>
          <p class="jobCatagory mb-3 text-neutral-500">${job.jobCategory}</p>
          <p class="prograss btn btn-soft btn-success">INTERVIEW</p>
          <p class="description my-3">${job.description}</p>
          <button class="interviewButton btn btn-outline btn-success mx-2">INTERVIEW</button>
          <button class="rejectedButton btn btn-outline btn-error">REJECTED</button>
        </div>
        <div>
          <button><i class="delete-btn fas fa-trash text-2xl cursor-pointer"></i></button>
        </div>
      </div>`;
    filterSection.appendChild(div);
  }
}

function renderRejectedElement() {
  filterSection.innerHTML = "";

  if (rejectedJobsElement.length === 0) {
    filterSection.innerHTML = `
      <div class="bg-white p-5 rounded-lg shadow-sm flex flex-col items-center justify-center text-center py-20 space-y-2 mt-5">
        <i class="fa-solid fa-file-lines fa-5x" style="color: rgb(116, 192, 252);"></i>
        <h3 class="font-bold text-2xl text-[#002C5C]">No jobs available</h3>
        <p class="text-[#64748B]">Check back soon for new job opportunities</p>
      </div>`;
    return;
  }

  for (let job of rejectedJobsElement) {
    let div = document.createElement("div");
    div.innerHTML = `
      <div class="bg-white p-5 rounded-lg shadow-sm flex justify-between mb-5">
        <div>
          <p class="companyName font-bold text-[#002C5C] text-[18px] mb-1">${job.companyName}</p>
          <p class="jobTittle mb-4 text-neutral-500">${job.jobTitle}</p>
          <p class="jobCatagory mb-3 text-neutral-500">${job.jobCategory}</p>
          <p class="prograss btn btn-soft btn-error">REJECTED</p>
          <p class="description my-3">${job.description}</p>
          <button class="interviewButton btn btn-outline btn-success mx-2">INTERVIEW</button>
          <button class="rejectedButton btn btn-outline btn-error">REJECTED</button>
        </div>
        <div>
          <button><i class="delete-btn fas fa-trash text-2xl cursor-pointer"></i></button>
        </div>
      </div>`;
    filterSection.appendChild(div);
  }
}
