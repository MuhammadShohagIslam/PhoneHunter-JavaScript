// fetching the meal api from the TheMealDB API
const loadMealDB = (searchPhoneName) => {
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchPhoneName}`;
    fetch(url)
        .then((res) => res.json())
        .then((data) => displayData(data.data));
};

const displayData = (phones) => {
    const thePhoneList = document.getElementById("thePhoneList");
    thePhoneList.innerHTML = "";
    console.log(phones)
    phones.forEach((phone) => {
        const column = document.createElement("div");
        column.classList.add("col-md-3")
        column.classList.add("mb-4")
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
        thePhoneList.appendChild(column)
    });
};


const searchPhones = () => {
    console.log("aaa")
    const phoneSearchField = document.getElementById("phoneSearchId");
    const phoneSearchValue = phoneSearchField.value;
    loadMealDB(phoneSearchValue)
}
loadMealDB("iphone");
