// fetching the meal api from the TheMealDB API
const loadPhones = (searchPhoneName) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchPhoneName}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayPhones(data.data))
        .catch((error) => {
            console.log(error.message);
        });
};

const displayPhones = (phones) => {
    const thePhoneList = document.getElementById("thePhoneList");
    const noPhoneMessageField = document.getElementById("noPhoneMessage");
    const showBtnField = document.getElementById("showButtonId");

    thePhoneList.textContent = "";
    console.log(phones);
    // show 10 phone list
    let phonesList = phones.slice(0, 8);

    // show all phone list
    document.getElementById("showbtnClick").addEventListener("click", () => {
        phonesList = phones;
        showBtnField.classList.add("d-none");
        thePhoneList.textContent = "";
        showPhoneList(phonesList);
    });

    // display no phone found message
    if (phones.length === 0) {
        noPhoneMessageField.classList.remove("d-none");
    } else {
        noPhoneMessageField.classList.add("d-none");
    }
    showPhoneList(phonesList);
    // stop spinner
    toggleSpinner(false);
};

// show phone list
const showPhoneList = (phonesList) => {
    const thePhoneList = document.getElementById("thePhoneList");

    phonesList.forEach((phone) => {
        const column = document.createElement("div");
        column.classList.add("col-md-3");
        column.classList.add("mb-4");
        column.innerHTML = `
            <div class="card p-3 pb-1">
                <img src="${phone.image}" style="height: 350px" class="card-img-top img-fluid" alt="${phone.phone_name}" />
                <div class="card-body">
                    <h5 class="card-title pb-3">${phone.phone_name}</h5>
                    <button onclick="loadPhoneDetails('${phone.slug}')" class="btn btn-info" data-bs-toggle="modal"
                    data-bs-target="#exampleModal" 
                        >More Details</
                    ></button>
                </div>
            </div>
        `;
        thePhoneList.appendChild(column);
    });
};

const loadPhoneDetails = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then((res) => res.json())
        .then((data) => displayPhoneDetails(data.data))
        .catch((error) => {
            console.log(error.message);
        });
};

const displayPhoneDetails = (phone) => {
    const phoneTitleElement = document.getElementById("phoneModalTitleId");
    const releaseDateElement = document.getElementById("releaseDateId");
    phoneTitleElement.innerText = phone.name;
    releaseDateElement.innerText = phone.releaseDate;
};
const toggleSpinner = (isLoading) => {
    const loadingFeild = document.getElementById("loading");
    if (isLoading) {
        loadingFeild.classList.remove("d-none");
    } else {
        loadingFeild.classList.add("d-none");
    }
};

const searchPhones = () => {
    // start spinner
    toggleSpinner(true);
    const thePhoneList = document.getElementById("thePhoneList");
    thePhoneList.textContent = "";

    const phoneSearchField = document.getElementById("phoneSearchId");
    const phoneSearchValue = phoneSearchField.value;

    loadPhones(phoneSearchValue);
};

(() => {
    toggleSpinner(true);
    loadPhones("samsung");
})();
