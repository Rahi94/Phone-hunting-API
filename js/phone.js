const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';

    const showAllContainer = document.getElementById('show-all-btn');

    // display show all btn if there is more than 12 phones
    if(phones.length > 12 && !isShowAll){
      showAllContainer.classList.remove('hidden');
    }
    else{
      showAllContainer.classList.add('hidden')
    }
    console.log('is show all', isShowAll);
    // show only 12 phones
    if(!isShowAll){
      phones = phones.slice(0,12);

    }
    phones.forEach(phone => {
        console.log(phone);

        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-gray-300 shadow-xl text-center p-4 mt-8`
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                      <h2 class="card-title flex justify-center text-center">${phone.phone_name}</h2>
                      <p>${phone.slug}</p>
                      <div class="card-actions justify-center">
                        <button class="btn btn-primary text-center">show details</button>
                      </div>
                    </div>
        `
        phoneContainer.appendChild(phoneCard);
    });
    // hide loading spinner
    loadingSpinner(false);

}

const handleSearch = (isShowAll) => {
    // console.log('handle search triggered!!!');
  loadingSpinner(true)
    const inputField = document.getElementById('input-field');
    const searchText = inputField.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const loadingSpinner = (isLoading) =>{
  const spinnerContainer = document.getElementById('loading-spinner');
  if(isLoading){
    spinnerContainer.classList.remove('hidden')
  }
  else{
    spinnerContainer.classList.add('hidden')
  }
}

// handle show all btn
const handleShowAll = () =>{
  handleSearch(true);
}



// loadPhone();