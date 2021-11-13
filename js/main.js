
let i = 0

window.onload = function() {
  if (localStorage.length > 0) {
        document.getElementById("editText").style.visibility = "hidden";
        var values = [],
        keys = Object.keys(localStorage),
        a = keys.length;

        var lastCode = Number(keys[keys.length-1])

        i = lastCode + 1

        fillTable();
  } else {
    document.getElementById("editText").style.visibility = "hidden";
    i = 1
  }
};  

function fillTable(){
    if(localStorage.length > 0){
        var bodyRef = document.getElementById('toDoTable').getElementsByTagName('tbody')[0];
        bodyRef.innerHTML = '';

        let tbody = document.getElementById('toDoTBody')

        var archive = {},
        keys = Object.keys(localStorage),
        i = keys.length;

        while ( i-- ) {
            archive[ keys[i] ] = localStorage.getItem( keys[i] );
        }

        for (let index = 0; index <= keys.length - 1; index++) {
                var row = tbody.insertRow(-1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                cell1.innerHTML = keys[index];
                cell2.innerHTML = archive[Number(keys[index])];
                cell3.innerHTML =   "<button style='margin:5px;' onclick='EditRow(this)' type='button' class='btn btn-primary'>Edit</button>"+
                                    "<button style='margin:5px;' onclick='DeleteRow(this)' type='button' class='btn btn-primary'>Delete</button>";
        }
    } else if(localStorage.length == 0){
        var bodyRef = document.getElementById('toDoTable').getElementsByTagName('tbody')[0];
        bodyRef.innerHTML = '';
    }

}

function InsertToTable(){
    let item = document.getElementById('toDoText')
    let tbody = document.getElementById('toDoTBody')

    localStorage.setItem(i, item.value);

    var row = tbody.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = i;
    cell2.innerHTML = item.value;
    cell3.innerHTML =   "<button style='margin:5px;' onclick='EditRow()' type='button' class='btn btn-primary'>Edit</button>"+
                        "<button style='margin:5px;' onclick='DeleteRow(this)' type='button' class='btn btn-primary'>Delete</button>";
    item.value = '';  
    i++
}

function EditRow(row){
    let itemValue = localStorage.getItem(row.parentNode.parentNode.cells[0].innerText)
    let item = document.getElementById('toDoText')
    let editText = document.getElementById('editText')
    let mainButton = document.getElementById('mainButton')
    //Getting all done for editing
    item.value = itemValue
    editingValue = Number(row.parentNode.parentNode.cells[0].innerText)
    editText.style.color = "red"
    editText.style.visibility = "visible";
    mainButton.innerText = 'Edit'
    mainButton.setAttribute('onclick','')
    mainButton.setAttribute('onclick',`UpdatingField(${editingValue})`)
}
function DeleteRow(row){
    localStorage.removeItem(row.parentNode.parentNode.cells[0].innerText);
    fillTable();
}

function UpdatingField(editingValue){
    let newValue = document.getElementById('toDoText')
    let editText = document.getElementById('editText')
    let mainButton = document.getElementById('mainButton')
    //editing field
    localStorage.setItem(editingValue, newValue.value);
    //erasing editing track
    editText.style.color = "black"
    editText.style.visibility = "hidden";
    mainButton.innerText = 'Add'
    mainButton.setAttribute('onclick','')
    mainButton.setAttribute('onclick','InsertToTable()')
    newValue.value = ''
    fillTable();
}

