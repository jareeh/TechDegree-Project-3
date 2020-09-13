//Info IDs
const name = document.querySelector('#name');
const email = document.querySelector('#mail');
const title = document.querySelector('#title');
const otherTitle = document.getElementById('other-title');

//CreditCard IDs
const ccNum = document.querySelector('#cc-num');
const ccZip = document.querySelector('#zip');
const ccCVV = document.querySelector('#cvv');
const ccExpMonth = document.querySelector('#exp-month');
const ccExpYear = document.querySelector('#exp-year');


//T-Shirt IDs
const shirtColors = document.querySelector('#shirt-colors');
const designSelect = document.getElementById("design");
const colorSelect = document.getElementById("color");



//put focus on the name field
function getFocus(element){
    document.getElementById(element).focus();
}



//show-hide the other-title field
function otherTitleController(){
    otherTitle.style.display = 'none';
    title.addEventListener('change', () => {
        const titleOption = title.querySelectorAll('option');
        if(titleOption[5].selected){
            otherTitle.style.display = 'block';
        } else {
            otherTitle.style.display = 'none';
        }
    })
}



function tshirtController(){
    // Get design and color options
    const designOptions = designSelect.children;
    const colorOptions = colorSelect.children;

    //initializer for initial state
    //add the please select option and select it
    const pleaseSelect = document.createElement("option");
    pleaseSelect.text = "Please select a T-shirt theme";
    colorSelect.prepend(pleaseSelect);
    colorOptions[0].selected = true;


    designSelect.addEventListener('change', (e) => {
        const selected = e.target.value
        if(selected !== 'Select Theme' &&
            designOptions[0].textContent === 'Select Theme' &&
            colorOptions[0].textContent === 'Please select a T-shirt theme'){
            designSelect.removeChild(designOptions[0])
            colorSelect.removeChild(colorOptions[0]);
        }
        if(selected === 'js puns'){
            colorOptions[0].selected = true;
            colorOptions[0].style.display = 'block';
            colorOptions[1].style.display = 'block';
            colorOptions[2].style.display = 'block';
            colorOptions[3].style.display = 'none';
            colorOptions[4].style.display = 'none';
            colorOptions[5].style.display = 'none';
        } else if(selected === 'heart js'){
            colorOptions[3].selected = true;
            colorOptions[0].style.display = 'none';
            colorOptions[1].style.display = 'none';
            colorOptions[2].style.display = 'none';
            colorOptions[3].style.display = 'block';
            colorOptions[4].style.display = 'block';
            colorOptions[5].style.display = 'block';
        }
    })
}



function activitiesController(){
    //dynamically enable and disable events checkboxes with competing times
    const activities = document.querySelector('.activities');
    const checkboxes = document.querySelectorAll('.activities input');
    activities.addEventListener('change', (e) => {
        const checkedDT = e.target.getAttribute('data-day-and-time');
        for (let i = 0; i < checkboxes.length; i++){
            let checkboxDT = checkboxes[i].getAttribute('data-day-and-time')
            if(checkedDT === checkboxDT && e.target !== checkboxes[i]){
                if(e.target.checked){
                    checkboxes[i].disabled = true;
                    checkboxes[i].parentNode.style.color = 'lightgrey';
                } else {
                    checkboxes[i].disabled = false;
                    checkboxes[i].parentNode.style.color = 'black';
                }
            }
        }
        updatePrice()
    })
}




function updatePrice(){
    let total = 0;
    for (let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked){
            total += parseInt(checkboxes[i].getAttribute('data-cost'));
        }
    }
    const totalHTML = document.createElement('span');
    
    if(!document.querySelector('.activities span')){
        activities.appendChild(totalHTML);
        activities.children[8].textContent = `Total: $${total}`
    } else {
        activities.children[8].textContent = `Total: $${total}`
    }
}


function paymentDivController(){
    //display proper div based on payment method
    const paymentMethodSelector = document.getElementById('payment');
    const paypalDiv = document.getElementById('paypal');
    const bitcoinDiv = document.getElementById('bitcoin');
    const ccDiv = document.getElementById('credit-card')
    paymentMethodSelector[1].selected = true;
    paypalDiv.hidden = true;
    bitcoinDiv.hidden = true;
    paymentMethodSelector.addEventListener('change', (e) => {
        const selected = e.target.value;
        if (selected === 'credit card'){
            ccDiv.hidden = false;
            paypalDiv.hidden = true;
            bitcoinDiv.hidden = true;
        } else if (selected === 'paypal'){
            paypalDiv.hidden = false;
            ccDiv.hidden = true;
            bitcoinDiv.hidden = true;
        } else if (selected === 'bitcoin'){
            bitcoinDiv.hidden = false;
            ccDiv.hidden = true;
            paypalDiv.hidden = true;
        }
    })
}

/***********************
CALLING ALL THE FUNCTIONS
*/
getFocus('name');
otherTitleController();
tshirtController();
activitiesController();
paymentDivController();

/******************* 
VALIDATOR FUNCTIONS 
*/

function nameValidator (){
    const nameValue = name.value;
    if(name.value.length > 0){
      name.style.borderColor = 'white';
      return true;
    } else {
      name.style.borderColor = 'red';
      return false;
    }
}

function emailValidator(){
    const emailValue = email.value;
    const indexAt = emailValue.indexOf('@');
    const indexPeriod = emailValue.lastIndexOf('.');
  
    if(indexAt > 1 && indexPeriod > indexAt + 1){
      email.style.borderColor = 'white';
      return true;
    } else {
      email.style.borderColor = 'red';
      return false;
    }
}

function activitiesValidator(){
    //create a variable defaulting to false that will be returned if no activities are checked
    let isOneSelected = false;
    for (let i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked){
            isOneSelected = true;
        }
    }
    if (!isOneSelected){
        activities.style.borderColor = 'red';
    }
    return isOneSelected.valueOf();
}

function ccValidator(){
    if(paymentMethodSelector[1].selected = true){
        if (ccNum.value.length >= 13 && ccNum.value.length <= 16){
            if(ccZip.value.length === 5){
                if (ccCVV.value.length === 3){
                    return true;
                } else {
                    ccCVV.style.borderColor = 'red';
                    return false;
                }
            } else {
                ccZip.style.borderColor = 'red';
                return false;
            }
        } else {
            ccNum.style.borderColor = 'red';
            return false;
        }
    } else {
        return true;
    }

}



document.querySelector('form').addEventListener('submit', (e) => {
    //call all validators to expose fields with bad data
    nameValidator();
    emailValidator();
    activitiesValidator();
    ccValidator();
    
    //if any validators are triggered falsy, prevent form from submitting
    if(!nameValidator()||
        !emailValidator()||
        !shirtValidator()||
        !ccValidator()){
            e.preventDefault();
        }
})