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
}
/////////////// end c пом fetch() ////////////////////////////////////////////////////


const arrBtnEdit = document.querySelectorAll('.VLedit');
arrBtnEdit.forEach(function(elem) {
    elem.onclick = btnEditOnClick;
}
)

async function btnEditOnClick() {
    // by default fetch() user method GET:
    let json = null;
    let response  = await fetch("/admin/getUserWroles?id=" + this.value);
    if (response.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        json = await response.json();
        json.roles.sort(compareRoles)
    } else {
        alert("Ошибка HTTP: " + response.status);
    }

    let rowID = "rowid" + this.value;
    let cells = document.getElementById(rowID).getElementsByTagName("td");
    $("#editId").val(cells[0].innerText);
    // если не сработал jquery (а он несколько раз не работал для поля ID), то можно так:
    // document.getElementById("editId").value = cells[0].innerText;
    $("#editFirstName").val(cells[1].innerText);
    $("#editLastName").val(cells[2].innerText);
    $("#editEmail").val(cells[3].innerText);
    $("#editPassword").val(cells[4].innerText);

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

/* /////////////////получаем значения из ячеек по клику на кн. Edit ///////////////////////////////////
// function btnEditOnClick() {
//     let rowID = "rowid" + this.value;
//     let cells = document.getElementById(rowID).getElementsByTagName("td");
//     $("#editId").val(cells[0].innerText);
//     // если не сработал jquery (а он несколько раз не работал для поля ID), то можно так:
//     // document.getElementById("editId").value = cells[0].innerText;
//     $("#editFirstName").val(cells[1].innerText);
//     $("#editLastName").val(cells[2].innerText);
//     $("#editEmail").val(cells[3].innerText);
//     $("#editPassword").val(cells[4].innerText);
//
// }

 */

/* /////////// можно использовать событие модального окна чтобы отловить нажатую кнопку: /////////////
// $("#editDeleteUser").on("show.bs.modal",
// function (event) {
//             // так можно получить нажатую кнопку,  значение нажатой кнопки и т.д.:
//             let ValueOfButton = event.relatedTarget.value
//             alert("on(\"show.bs.modal\"");
//         }
// )
 */

/*///////////// присвоение одной ф-ции нескольким элементам html в цикле://////////////
// 1st var
// Вам абсолютно правильно делают замечание, что ID в рамках страницы должен быть уникальным, но можно так:
// document.querySelectorAll('[id="header"]');
//2nd var:
// делаем класс, например "__select" и далее:
// const selects = document.querySelectorAll('.__select');
// selects.forEach(function(select) {
*/
/* ///////////// обработка одной строки таблицы по клику по кнопке "edit" ///////
// <table>
//     <tr onClick="SetBackGround(this)">
//         <td>1</td>
//         <td>2</td>
//         <td>3</td>
//     </tr>
//     <tr onClick="SetBackGround(this)">
//         <td>4</td>
//         <td>5</td>
//         <td>6</td>
//     </tr>
//     <tr onClick="SetBackGround(this)">
//         <td>7</td>
//         <td>8</td>
//         <td>9</td>
//     </tr>
// </table>
// <script>
//     function SetBackGround(sender)
//     {
//         var cells = sender.getElementsByTagName("td");
//         for (var i = 0; i <= cells.length - 1;i++)
//     {
//         cells[i].style.backgroundColor = "#b9ffb9";
//     }
//     }
// </script>
*/

/* ////////////some examples of fetch()////////////////////////////////
// fetch('http://jsonplaceholder.typicode.com/users').then(function(response) {
//     // response.json() returns a promise, use the same .then syntax to work with the results
//     response.json().then(function(users){
//         // users is now our actual variable parsed from the json, so we can use it
//         users.forEach(function(user){
//             console.log(user.name)
//         });
//     });
// }).catch(err => console.error(err));
//
// ///////////////////////////
// fetch('http://jsonplaceholder.typicode.com/users', {
//     method: 'GET'
// }).then((response) => {
//     response.json().then((jsonResponse) => {
//         console.log(jsonResponse)
//     })
//     // assuming your json object is wrapped in an array
//     response.json().then(i => i.forEach(i => console.log(i.name)))
// }).catch((err) => {
//     console.log(`Error: ${err}` )
// });
// ////////////////////////////////
// response.json() returns a promise, so you cannot just call forEach on it.
//     Something more along the lines of
// response.json().then(function(users){users.forEach(function(user){console.log(user.name)})


///////////////////////// https://learn.javascript.ru/fetch




 */

