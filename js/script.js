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


//Payment IDs
const paymentMethodSelector = document.getElementById('payment');
const paypalDiv = document.getElementById('paypal');
const bitcoinDiv = document.getElementById('bitcoin');
const ccDiv = document.getElementById('credit-card')


//Activities Classes
const activities = document.querySelector('.activities');
const checkboxes = document.querySelectorAll('.activities input');


//put focus on the name field
function getFocus(element){
    document.getElementById(element).focus();
}



//show-hide the other-title field
function otherTitleController(){
    //default the other title field to closed
    otherTitle.style.display = 'none';
    //add event listener to title selector
    title.addEventListener('change', () => {
        const titleOption = title.querySelectorAll('option');
        //if 'other' is selected, display the other title field, if not, don't display it
        if(titleOption[5].selected){
            otherTitle.style.display = 'block';
        } else {
            otherTitle.style.display = 'none';
        }
    })
}



function tshirtController(){
    // Get design and color options children
    const designOptions = designSelect.children;
    const colorOptions = colorSelect.children;

    //initializer for initial state of t-shirt selector
    //add the please select option and select it
    const pleaseSelect = document.createElement("option");
    pleaseSelect.text = "Please select a T-shirt theme";
    colorSelect.prepend(pleaseSelect);
    colorOptions[0].selected = true;

    //if 'select theme' is selected
        //hide the entire color options selector
    //else excevute \/
    if(designOptions[0].textContent === 'Select Theme'){
        shirtColors.hidden = true;
    } else {
        shirtColors.hidden = false;
    }

    //add event listener to the design selector
    designSelect.addEventListener('change', (e) => {
        const selected = e.target.value

        //if 'select theme' is NOT selected, and the placeholder options are still first, remove them and show color selector
        if(selected !== 'Select Theme' &&
            designOptions[0].textContent === 'Select Theme' &&
            colorOptions[0].textContent === 'Please select a T-shirt theme'){
            designSelect.removeChild(designOptions[0])
            colorSelect.removeChild(colorOptions[0]);
            shirtColors.hidden = false;
        }
        //if 'js puns' option selected, show appropriate color options
        if(selected === 'js puns'){
            colorOptions[0].selected = true;
            colorOptions[0].style.display = 'block';
            colorOptions[1].style.display = 'block';
            colorOptions[2].style.display = 'block';
            colorOptions[3].style.display = 'none';
            colorOptions[4].style.display = 'none';
            colorOptions[5].style.display = 'none';
        //if 'heart js' option selected, show appropriate color options
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
    activities.addEventListener('change', (e) => {
        //save the date and time of the target to a variable
        const checkedDT = e.target.getAttribute('data-day-and-time');
        //loop through the checkboxes options
        for (let i = 0; i < checkboxes.length; i++){
            //assign the date and time of a given checkbox to a variable
            let checkboxDT = checkboxes[i].getAttribute('data-day-and-time')
            //if the date and time of the checked one and the [i] checkbox match
            //AND you are not selected on the target
                //then disable the checkbox
                //else, enable it
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
        //update the price each time a box is checked or unchecked
        updatePrice()
    })
}



function updatePrice(){
    //create total variable
    let total = 0;
    //loop through the checkboxes
    for (let i = 0; i < checkboxes.length; i++){
        //if they are checked, convert cost attribute to variable and add it to total
        if(checkboxes[i].checked){
            total += parseInt(checkboxes[i].getAttribute('data-cost'));
        }
    }
    //create HTML code for total to display in
    const totalHTML = document.createElement('span');
    
    //if the html doesn't exist, add it in and update the text to reflect the total
    if(!document.querySelector('.activities span')){
        activities.appendChild(totalHTML);
        activities.children[8].textContent = `Total: $${total}`
    //else just update the total
    } else {
        activities.children[8].textContent = `Total: $${total}`
    }
}



//display proper div based on payment method
function paymentDivController(){

    //PaymentDiv IDs

    
    //select credit card by default
    paymentMethodSelector[1].selected = true;
    //hide paypay and bitcoin divs by default
    paypalDiv.hidden = true;
    bitcoinDiv.hidden = true;
    //add event listener to the payment method selector
    paymentMethodSelector.addEventListener('change', (e) => {
        const selected = e.target.value;
        //if credit card is selected, hide other divs and likewise for following code blocks
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

//NAME ERROR COMPONENTS
const nameError = document.createElement('span');
const nameErrorChar = document.createElement('span');
nameError.innerHTML = 'Please enter a first and last name';
nameError.style.color = 'red';
nameErrorChar.innerHTML = 'Please ensure you have entered a first and last name using only letters';
nameErrorChar.style.color = 'red';
const nameRegEx = /^\w+\s\w+$/;


function nameValidator (){
    const nameValue = name.value;
    if(nameRegEx.test(String(name.value))){
        //if the element before the input is the error message, remove it
        if(name.previousElementSibling.style.color === 'red'){
            name.parentElement.removeChild(name.parentElement.children[2]);
            name.style.borderColor = '';
        }
        //return true if the regex qualifications are met
        return true;
    //'throw' an error if there's no name present
    } else  if (!name.value){
        name.style.borderColor = 'red';
        name.parentNode.insertBefore(nameError, name);
        return false;
    //'throw' another error if an unallowed character is used
    } else {
        name.style.borderColor = 'red';
        name.parentNode.insertBefore(nameErrorChar, name);
        return false;
    }
}
//make the event listener work in real time before submit
//I went with the focus out method as to not barrage the user with errors in the middle of their typing, eg. 'keyprees'
name.addEventListener('focusout', nameValidator);

function emailValidator(){
    //very very basic validator from project warmup
    const emailValue = email.value;
    const indexAt = emailValue.indexOf('@');
    const indexPeriod = emailValue.lastIndexOf('.');

    //if the '@' symbol is not first, and the '.' is after the '@', return true
    if(indexAt > 1 && indexPeriod > indexAt + 1){
    //   email.style.borderColor = 'white';
      return true;
    } else {
      email.style.borderColor = 'red';
      return false;
    }
}

function activitiesValidator(){
    //create a variable defaulting to false that will be returned if no activities are checked
    let isOneSelected = false;
    //loop through the checkboxes, if one+ is checked, turn above variable to true
    for (let i = 0; i < checkboxes.length; i++){
        if (checkboxes[i].checked){
            isOneSelected = true;
        }
    }
    //if one is not selected, turn the legend color to red
    if (!isOneSelected){
        activities.children[0].style.color = 'red';
    }
    //return boolean value of variable
    return isOneSelected.valueOf();
}

function ccValidator(){
    //execute only if credit card method is selected
    if(paymentMethodSelector[1].selected = true){
        //if number length is >=13 and <= 16, move on to zip validation
        if (ccNum.value.length >= 13 && ccNum.value.length <= 16){
            //zip must be 5 nums
            if(ccZip.value.length === 5){
                //cvv must be 3 nums
                //return true only if all 3 conditions are met, otherwise return falsy value and highlight red
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
    emailValidator();
    activitiesValidator();
    ccValidator();

    //if any validators are triggered falsy, prevent form from submitting
    if(!nameValidator() || !emailValidator() || !activitiesValidator() ||!ccValidator()){
        e.preventDefault();
    }
})