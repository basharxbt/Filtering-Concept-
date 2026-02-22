const jobContainer = document.getElementById('job-container');
const totalJobs = jobContainer.childElementCount;

const totalJobsElement = document.getElementById('total-jobs');
totalJobsElement.innerText = totalJobs;


let interviewJobsElement = [];
let rejectedJobsElement = [];


const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filter-section');


function clickToggle(id) {
    const all = document.getElementById('all-btn');
    const interview = document.getElementById('interview-btn');
    const rejected = document.getElementById('rejected-btn');

    all.classList.remove("bg-neutral-700", "text-white");
    interview.classList.remove("bg-neutral-700", "text-white")
    rejected.classList.remove('bg-neutral-700', "text-white")


    document.getElementById(id).classList.add("bg-neutral-700", "text-white");



    // if (id === 'all-btn') {
    //     filterSection.classList.add('hidden');

    //     jobContainer.classList.remove('hidden');
    // }
    // else if (id === 'interview-btn') {
    //     interview.classList.add("bg-neutral-700", "text-white")
    //     all.classList.remove("bg-neutral-700", "text-white");
    //     rejected.classList.remove('bg-neutral-700', "text-white")
    //     filterSection.classList.remove('hidden');
    //     jobContainer.classList.add('hidden');
    // }

    // else if (id === 'rejected-btn') {
    //     rejected.classList.add('bg-neutral-700', "text-white")
    //     interview.classList.remove("bg-neutral-700", "text-white")
    //     all.classList.remove("bg-neutral-700", "text-white");
    // }
}


mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('interviewButton')) {
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.companyName').innerText;
        const jobTitle = parentNode.querySelector('.jobTittle').innerText;
        const jobCategory = parentNode.querySelector('.jobCatagory').innerText;
        const prograss = parentNode.querySelector('.prograss').innerText;
        const description = parentNode.querySelector('.description').innerText;
        parentNode.querySelector('.prograss').innerText = 'INTERVIEW';


        const cardInfo = {
            companyName,
            jobTitle,
            jobCategory,
            prograss,
            description
        };

        const jobExist = interviewJobsElement.find(job => job.companyName === companyName && job.jobTitle === jobTitle);
        if (!jobExist) {

            interviewJobsElement.push(cardInfo);
            console.log(interviewJobsElement);

        }
        renderInterviewJobsElement()

    }

})

// mainContainer.addEventListener('click', function (event) {

// })





function renderInterviewJobsElement() {
    filterSection.innerHTML = '';
    for (let job of interviewJobsElement) {
        let div = document.createElement('div');

        div.className = 'bg-white p-5 rounded-lg shadow-sm flex justify-between'
        div.innerHTML = `
        
            <div class="bg-white p-5 rounded-lg shadow-sm flex justify-between">
                <div class="">
                    <p class="companyName font-bold text-[#002C5C] text-[18px] mb-1">Mobile First Corp</p>

                    <p class="jobTittle mb-4 text-neutral-500">React Native Developer</p>
                    <p class="jobCatagory mb-3 text-neutral-500">Remote
                        •
                        Full-time
                        •
                        $130,000 - $175,000</p>
                    <button class="prograss btn btn-soft btn-info">NOT APPLIED</button>

                    <p class="description my-3">Build cross-platform mobile applications using React Native. Work on
                        products used
                        by millions of
                        users worldwide.</p>
                    <button class="btn btn-outline btn-success mx-2">INTERVIEW</button>

                    <button class="btn btn-outline btn-error">REJECTED</button>
                </div>

                <div>
                    <button><i class="fas fa-trash"></i></button>
                </div>



        `
        filterSection.appendChild(div);

    }


}

