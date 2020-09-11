function getFocus(element){
    document.getElementById(element).focus();
}
getFocus('name');

//show-hide the other-title field
const title = document.getElementById('other-title');
title.style.display = 'none';
const jobRole = document.querySelector('#title');
jobRole.addEventListener('change', () => {
    const titleOption = jobRole.querySelectorAll('option');
    if(titleOption[5].selected){
        title.style.display = 'block';
    } else {
        title.style.display = 'none';
    }
})

// Get design and color options
const designSelect = document.getElementById("design");
const designOptions = designSelect.children;
const colorSelect = document.getElementById("color");
const colorOptions = colorSelect.children;

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


