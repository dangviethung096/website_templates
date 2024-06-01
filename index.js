let webListData = [];
// Read json file
fetch('/list_web.json')
    .then(response => response.json())
    .then(data => {
        // Assign weblist to data from file
        webListData = data.webs;

        // Create a div and insert to the body
        var divArray = [];
        for (var i = 0; i < data.webs.length; i++) {
            if (i == 9) {
                break;
            }
            let web = data.webs[i];
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
                            <button class="btn btn-primary">Xem</button>
                        </a>
                    </div>
                </div>`;

            divArray.push(div);
        }

        let webList = document.getElementById('website-list');
        divArray.forEach(div => {
            webList.appendChild(div);
        });

        // Hide loader
        let loader = document.querySelector('.container-loader');
        loader.style.display = 'none';

    });

let pages = document.getElementsByClassName('pagination-item');
let nextBtn = document.getQuerySelector('.btn-next');
let preBtn = document.getQuerySelector('.btn-previous');
let firstBtn = document.getQuerySelector('.btn-first');
let lastBtn = document.getQuerySelector('.btn-last');

const activePage = (event) => {
    // Set current page when clicked on page
    currentPage = event.target.value;

    /* Apply 'active' class on active item */
    addActive(event.target);
}

const addActive = (element) => {
    element.classList.add('active');
}