// fetching the meal api from the TheMealDB API
const loadPhones = (searchPhoneName) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchPhoneName}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayPhones(data.data));
};

const displayPhones = (phones) => {
    const thePhoneList = document.getElementById("thePhoneList");
    const noPhoneMessageField = document.getElementById("noPhoneMessage");
    thePhoneList.textContent = "";
    console.log(phones);
    // display no phone found message
    if (phones.length === 0) {
        noPhoneMessageField.classList.remove("d-none");
    } else {
        noPhoneMessageField.classList.add("d-none");
    }
    phones.forEach((phone) => {
        const column = document.createElement("div");
        column.classList.add("col-md-3");
        column.classList.add("mb-4");
        column.innerHTML = `
            <div class="card p-3 pb-1">
                <img src="${phone.image}" style="height: 350px" class="card-img-top img-fluid" alt="${phone.phone_name}" />
                <div class="card-body">
                    <h5 class="card-title pb-3">${phone.phone_name}</h5>
                    <a href="#" class="btn btn-info"
                        >More Details</a
                    >
                </div>
            </div>
        `;
        thePhoneList.appendChild(column);
    });
    // stop spinner
    toggleSpinner(false);
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
