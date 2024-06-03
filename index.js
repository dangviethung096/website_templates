let webListData = [];

let currentPage = 1;
let totalPages = 5;
const pageSize = 9;
// Read json file
fetch('/list_web.json')
    .then(response => response.json())
    .then(data => {
        // Assign weblist to data from file
        webListData = data.webs;
        totalPages = Math.ceil(webListData.length / pageSize);

        // Create a div and insert to the body
        updateTemplate(currentPage);

        // Add pages size
        let pagination = document.querySelector('ul.pagination');
        for (let i = 1; i <= totalPages; i++) {
            const li = document.createElement('li');
            li.innerHTML = `${i}`;
            li.classList.add('pagination-item');
            li.value = i;
            li.onclick = activePage;
            if (i == 1) {
                li.classList.add('active');
            }
            pagination.appendChild(li);
            disablePreviousAndFirstBtn();
        }

        // Hide loader
        let loader = document.querySelector('.container-loader');
        loader.style.display = 'none';

    });

var pages = document.getElementsByClassName('pagination-item');
let nextBtn = document.querySelector('.paging-btn-next');
let preBtn = document.querySelector('.paging-btn-previous');
let firstBtn = document.querySelector('.paging-btn-first');
let lastBtn = document.querySelector('.paging-btn-last');

const activePage = (event) => {
    // Set current page when clicked on page
    currentPage = event.target.value;

    /* Apply 'active' class on active item */
    addActive(event.target);

    updateUI();
};

function updateUI() {
    enableNextAndLastBtn();
    enablePreviousAndFirstBtn();
    if (currentPage == 1) {
        disablePreviousAndFirstBtn();
    } else if (currentPage == totalPages) {
        disableNextAndLastBtn();
    }

    // Update template pages
    updateTemplate(currentPage);
}

const removeActive = () => {
    // Foreach page, remove 'active' class
    for (let i = 0; i < pages.length; i++) {
        pages[i].classList.remove('active');
    }
};

const addActive = (element) => {
    removeActive();
    element.classList.add('active');
};

const first = () => {
    currentPage = 1;
    addActive(pages[currentPage - 1]);
    updateUI();
}

const last = () => {
    currentPage = totalPages;
    addActive(pages[currentPage - 1]);
    updateUI();
}

const previous = () => {
    if (currentPage > 1) {
        currentPage--;
        addActive(pages[currentPage - 1]);
        updateUI();
    }
}

const next = () => {
    if (currentPage < totalPages) {
        currentPage++;
        addActive(pages[currentPage - 1]);
        updateUI();
    }
}

const disableNextAndLastBtn = function () {
    nextBtn.disabled = true;
    lastBtn.disabled = true;
}

const disablePreviousAndFirstBtn = function () {
    preBtn.disabled = true;
    firstBtn.disabled = true;
}

const enableNextAndLastBtn = function () {
    nextBtn.disabled = false;
    lastBtn.disabled = false;
}

const enablePreviousAndFirstBtn = function () {
    preBtn.disabled = false;
    firstBtn.disabled = false;
}



function updateTemplate(pageIndex) {
    let divArray = [];
    for (var i = (pageIndex - 1) * pageSize; i < pageIndex * pageSize; i++) {
        let web = webListData[i];
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
                <div class="card">
                    <img src="${web.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${web.name}</h5>
                    </div>
                    <div class="mb-5 d-flex justify-content-around">
                        <a href="${web.url}">
                            <button type="button" class="btn btn-primary">Xem</button>
                        </a>
                    </div>
                </div>`;
        divArray.push(div);
    }

    let webList = document.getElementById('website-list');
    webList.innerHTML = '';
    divArray.forEach(div => {
        webList.appendChild(div);
    });

    // Move to head of page
    window.scrollTo(0, 0);
}