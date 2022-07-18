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

////////////////////////// add user //////////////////////////////
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
    postParams(body, "/admin/addUser")
    return false;
}

/////////////////////////////// с пом. fetch() //////////////////
async function postParams(pbody, pUrl) {
    try {
        console.log("before fetch()")
        let response = await fetch(pUrl, {
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
}
/////////////// end c пом fetch() ////////////////////////////////////////////////////


const arrBtnEdit = document.querySelectorAll('.VLedit');
arrBtnEdit.forEach(function(elem) {
    elem.onclick = btnEditOnClick;
}
)

const arrBtnDelete = document.querySelectorAll('.VLdelete');
arrBtnDelete.forEach(function(elem) {
        elem.onclick = btnDeleteOnClick;
    }
)

async function btnEditOnClick() {
    // by default fetch() uses method GET:
    let json = null;
    let response  = await fetch("/admin/getUserWroles?id=" + this.value);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        json = await response.json();
        json.roles.sort(compareRoles)
    } else {
        alert("Ошибка HTTP: " + response.status);
    }

    $("#editId").val(json.id);
    // если не сработал jquery (а он несколько раз не работал для поля ID), то можно так:
    // document.getElementById("editId").value = cells[0].innerText;
    $("#editFirstName").val(json.firstName);
    $("#editLastName").val(json.lastName);
    $("#editEmail").val(json.email);
    $("#editPassword").val(json.password);

    let lvSelect = document.getElementById("editWinSelectRoles");
    lvSelect.innerHTML = ""; // .empty(); // .append('<option value=1>My option</option>').selectmenu('refresh');
    json.roles.forEach(pRole => {
        let option = document.createElement("option");
        option.value = pRole.id;
        option.text = pRole.name;
        if(pRole.checked)
            option.selected = true;
            // option.setAttribute('selected', "");
        lvSelect.add(option, null);

    });

}

////////////////////////////// btn Delete on click (modal window) /////////////////////////////////
async function btnDeleteOnClick() {
    // by default fetch() uses method GET:
    let json = null;
    let response  = await fetch("/admin/getUserWroles?id=" + this.value);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        json = await response.json();
        json.roles.sort(compareRoles)
    } else {
        alert("Ошибка HTTP: " + response.status);
    }

    $("#editId").val(json.id);
    // если не сработал jquery (а он несколько раз не работал для поля ID), то можно так:
    // document.getElementById("editId").value = cells[0].innerText;
    $("#editFirstName").val(json.firstName).prop("readonly", true);
    $("#editLastName").val(json.lastName).prop("readonly", true);
    $("#editEmail").val(json.email).prop("readonly", true);
    $("#editPassword").val(json.password).prop("readonly", true);

    let lvSelect = document.getElementById("editWinSelectRoles");
    lvSelect.innerHTML = ""; // .empty(); // .append('<option value=1>My option</option>').selectmenu('refresh');
    json.roles.forEach(pRole => {
        let option = document.createElement("option");
        option.value = pRole.id;
        option.text = pRole.name;
        if(pRole.checked)
            option.selected = true;
        // option.setAttribute('selected', "");
        lvSelect.add(option, null);

    });
    // lvSelect.ariaReadOnly = true;
    // lvSelect.setAttribute("readonly", "true");
    // lvSelect.setAttribute("readonly", true);
    // $("#editWinSelectRoles").prop('readonly',true);
    // $("#editWinSelectRoles").select2('readonly',true);

    // $("#editWinSelectRoles").attr('disabled',true);

    // $("#lvSelect").prop('disabled',true);
    // $("#lvSelect").prop('disabled', "disabled");
    // lvSelect.readonly = 1;
    // $('#editWinSelectRoles').attr("style", "pointer-events: none;background-color:yellow");
    // $("#editWinSelectRoles").readOnly = true;

    let btnModalEdit = document.getElementById("btnModalEdit");
    btnModalEdit.setAttribute("hidden", "");

    let btnModalDelete = document.getElementById("btnModalDelete");
    btnModalDelete.removeAttribute("hidden");
    // $('#editWinSelectRoles').selectpicker('mobile');
    // $('.selectpicker').selectpicker('mobile');
}

let btnModalEdit = document.getElementById("btnModalEdit");
btnModalEdit.onclick = function (pEvent) {
    let body = {}
    body.id = document.getElementById("editId").value;
    body.firstName = document.getElementById("editFirstName").value;
    body.lastName = document.getElementById("editLastName").value;
    body.email = document.getElementById("editEmail").value;
    body.password = document.getElementById("editPassword").value;
    body.roles = []

    let roles = document.getElementById("editWinSelectRoles").options;
    for(role of roles) {
        if(role.selected){
            body.roles.push({id : role.value, name : role.text });
        }
    }
    postParams(body, "/admin/editUser");

    $('#editDeleteUser').modal('hide');

    return false;

}

let btnModalDelete = document.getElementById("btnModalDelete");
btnModalDelete.onclick = btnModalDeleteOnclick;
async function btnModalDeleteOnclick() {

    $('#editDeleteUser').modal('hide');

    let response = await fetch("/admin/delete?id=" + $("#editId").val())
        .then(responce => {
            if ( responce.redirected) {
                window.location.href = responce.url;
            }
        });

    return false;

}


function compareRoles( a, b ) {
    if ( a.id < b.id){
        return -1;
    }
    if ( a.id > b.id ){
        return 1;
    }
    return 0;
}







