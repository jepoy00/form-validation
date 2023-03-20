const form = document.getElementById('form');
const given = document.getElementById('given');
const last = document.getElementById('last');
const middle = document.getElementById('middle');
const email = document.getElementById('email');
const id = document.getElementById('id');
const id2 = document.getElementById('id2');
const bdate = document.getElementById("bdate");
const box1 = document.getElementById("box1");

form.addEventListener('submit', e => {
    e.preventDefault();

    validate();
    isValidDate(dateString);
    isOldEnough(dateString);
});

const sendData = (givenValue, sRate, Count) => {
    if(sRate === Count){
        swal("Hello " + givenValue , "You are Registered", "success");
        form.reset();
    }

}

const SuccessMsg = (givenValue) => {
    let formContr = document.getElementsByClassName('form-control');
    var Count = formContr.length - 1;
    for(var i = 0; i < formContr.length; i++){
        if(formContr[i].className === "form-control success"){
            var sRate = 0 + i;
            console.log(sRate);
            sendData(givenValue, sRate, Count);
        
    } else{
            return false;
        }
    }
}

const setError = (element, message) => {
    const formControl = element.parentElement;
    const errorDisplay = formControl.querySelector('.error');
    formControl.className = "form-control error";

    errorDisplay.innerText = message;
    formControl.classList.add('error');
    formControl.classList.remove('success')
}

const setSuccess = element => {
    const formControl = element.parentElement;
    const errorDisplay = formControl.querySelector('.error');
    formControl.className = "form-control success";

    errorDisplay.innerText = '';
    formControl.classList.add('success');
    formControl.classList.remove('error');
};

const validEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validate = () => {
    const givenValue = given.value.trim();
    const lastValue = last.value.trim();
    const middleValue = middle.value.trim();
    const emailValue = email.value.trim();
    const idValue = id.value.trim();
    const id2Value = id2.value.trim();
    const bdateValue = bdate.value.trim();

    if(givenValue === '') {
        setError(given, 'Please enter your givenname');
    } else {
        setSuccess(given);
    }

    if(lastValue === '') {
        setError(last, 'Please enter your lastname');
    } else {
        setSuccess(last);
    }

    if(middleValue === '') {
        setError(middle, 'Please enter your middlename');
    } else {
        setSuccess(middle);
    }

    if(emailValue === '') {
        setError(email, 'Please enter you email');
    } else if (!validEmail(emailValue)) {
        setError(email, 'Please enter a valid email address');
    } else {
        setSuccess(email);
    }

    if(idValue === '') {
        setError(id, 'Please enter your preferred user id');
    } else if (idValue.length < 8 ) {
        setError(id, 'User ID must be at least 8 character');
    } else {
        setSuccess(id);
    }

    if(id2Value === '') {
        setError(id2, 'Please confirm your user id');
    } else if (id2Value !== idValue) {
        setError(id2, "User ID doesn't match");
    } else {
        setSuccess(id2);
    }

    if (bdateValue === "") {
        setError(bdate, "Please enter your birthdate");
  } else if (!isValidDate(bdateValue)) {
        setError(bdate, "Please enter a valid birthdate in MM/DD/YYYY format");
  } else if (!isOldEnough(bdateValue)) {
        setError(bdate, "You must be 18 years or older to sign up");
  } else {
        setSuccess(bdate);
  }

    if (!box1.checked) {
        setError(box1,"Please check this field");
    } else {
        setSuccess(box1);
    }
        SuccessMsg(givenValue);
    
};

const isValidDate = (dateString) => {
    if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
    return false;
  }
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
    return false;
  }
    const year = date.getFullYear();
    const currentYear = new Date().getFullYear();
    if (year < 1900 || year > currentYear) {
    return false;
  }
     return true;
};

const isOldEnough = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
        age--;
  }

    return age >= 18;
};
