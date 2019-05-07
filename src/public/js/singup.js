(function() {
    // Get form
    let form = document.getElementById('singup');

    // Add events
    form.addEventListener('submit', validateAndSendForm);
    form.photo.addEventListener('change', changeImage);

    // Functions
    function validateAndSendForm(ev) {
        ev.preventDefault();

        let data = {};

        //console.log('Photo:',form.photo, '\nName:',form.name, '\nEmail:',form.email, '\nPassword',form.password)
        
        if(form.photo.files.length == 0) {
            alert('You need load photo');
            return;
        } else if( form.name.value == "" )  {
            alert('you need enter a NAme');
            return;
        } else if( form.email.value == "" ) {
            alert('you need enter a Email');
            return;
        } else if( form.password.value == "") {
            alert('you need enter a Password');
            return;
        } else {
            data = {
                photo: form.photo.files[0],
                name: form.name.value,
                email: form.email.value,
                password: form.password.value
            }
        }

        let formData = new FormData();
            
        for (let field in data) {
            formData.append(field, data[field]);
        } 


            fetch('http://localhost:3000/users', {
                method: 'POST',
                body: formData

            })
            .then(res => {
                if (res.status == 404) {
                    alert('you email already registered');
                } else {
                    window.location.replace("http://localhost:3000/");
                }
            })
            .catch(console.log);
    }

    function changeImage(ev){

        let photo = form.photo.files[0];

        const URL_PHOTO = URL.createObjectURL(photo);

        form.querySelector('#avatar').setAttribute('src', URL_PHOTO);
    }
})();