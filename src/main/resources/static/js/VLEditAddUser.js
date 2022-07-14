// alert("hello VLEditAddUser");
// console.log("lalala")

// $(document).ready(function() {
//     var sideslider = $('[data-toggle=collapse-side]'),
//         sel1 = sideslider.attr('data-target'),
//         sel2 = sideslider.attr('data-target-2');
//
//     sideslider.click(function(event){
//         $(sel1).toggleClass('in');
//         $(sel2).toggleClass('out');
//         $('.dropdown').toggleClass('open');
//     });
// });
//

let btnAddUser = document.getElementById("btnAddUser");
btnAddUser.onclick = saveUser;
function saveUser() {
    let body = {}
    body.firstName = document.getElementById("firstName").value;
    body.lastName = document.getElementById("lastName").value;
    body.email = document.getElementById("email").value;
    body.password = document.getElementById("password").value;
    body.roles = []

    let roles = document.getElementById("selectRoles").options;
    for(role of roles) {
        if(role.selected){
            body.roles.push({id : role.value, name : role.text });
        }
    }
    postParams(body)
    return false;
}

/////////////////////////////// с пом. fetch() //////////////////
async function postParams(pbody) {
    try {
        console.log("before fetch()")
        let response = await fetch("/admin/addUser", {
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(pbody) // body: JSON.stringify(user)
        })
        .then(responce => {
            console.log(responce)
            if ( responce.redirected) {
                window.location.href = responce.url;
            }
        });

        console.log("after fetch()")
    } catch (ex) {
        console.log(ex.message)
    }
    // if (response.ok) { // если HTTP-статус в диапазоне 200-299 получаем тело ответа
    //     console.log("berfore response()")
    //     let result = await response.json();
    //     console.log("after response.json()")
    // } else {
    //     alert("Ошибка HTTP: " + response.status);
    // }
    console.log(result.message)
} /////////////// c пом fetch() ////////////

