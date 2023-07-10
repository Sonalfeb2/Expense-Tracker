let arr = [];
var table = document.getElementById("table");
var submit = document.getElementById("submit");
if (localStorage.getItem("Expense")) {
  let data = JSON.parse(localStorage.getItem("Expense"));

  var tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (value of data) {
    arr.push({ amount: value.amount, des: value.des, cat: value.cat });

    var tr = document.createElement("tr");
    tbody.appendChild(tr);

    var td = document.createElement("td");
    td.appendChild(document.createTextNode(value.id));
    tr.appendChild(td);

    td.className = "time";
    var td1 = document.createElement("td");

    td1.appendChild(document.createTextNode(value.amount));
    tr.appendChild(td1);
    var td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(value.des));
    tr.appendChild(td2);
    var td3 = document.createElement("td");
    td3.appendChild(document.createTextNode(value.cat));
    tr.appendChild(td3);
    var td4 = document.createElement("td");
    var td4Delete = document.createElement("button");
    var td4Update = document.createElement("button");

    td4Delete.className = "btn btn-danger btn-sm float-right delete";
    td4Delete.appendChild(document.createTextNode("Delete"));
    td4.appendChild(td4Delete);
    td4Update.className = "btn btn-primary btn-sm edit";
    td4Update.appendChild(document.createTextNode("Update"));
    td4.appendChild(td4Update);
    tr.appendChild(td4);
  }
}
var form = document.getElementById("form");
var amount = document.getElementById("amount");
var des = document.getElementById("description");
var cat = document.getElementById("sel1");
form.addEventListener("submit", getValues);
function getValues(e) {
  e.preventDefault();
  if (!submit.getAttribute('key')) {
    if (amount.value !== "" && des.value !== "" && cat.value !== "") {
      const date = new Date();
      arr.push({
        id: date,
        amount: amount.value,
        des: des.value,
        cat: cat.value
      });
      localStorage.setItem("Expense", JSON.stringify(arr));
      window.location.reload();
    } else {
      alert("Please fill all inputs");
    }
  }
  else{
    var key = submit.getAttribute('key')
    var localData = JSON.parse(localStorage.getItem("Expense"));
    localData.forEach((value)=>{
        if(value.id==key){
            value.amount = amount.value;
            value.des = des.value;
            value.cat  = cat.value;
        }
    })
    localStorage.setItem('Expense',JSON.stringify(localData));
    window.location.reload();
    
  }
}
table.addEventListener("click", RemoveItem);
function RemoveItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure")) {
      var row = e.target.parentElement.parentElement;
      var td = row.firstElementChild;
      var localData = JSON.parse(localStorage.getItem("Expense"));
      var newStore = localData.filter(value => value.date !== td.value);
      localStorage.clear("Expense");
      localStorage.setItem("Expense", JSON.stringify(newStore));
      window.location.reload();
    }
  }
  if (e.target.classList.contains("edit")) {
    if (confirm("Are You Sure")) {
      var row = e.target.parentElement.parentElement;
      var td = row.firstElementChild;
      submit.value = "Update";
      submit.setAttribute("key", td.textContent);
    }
  }
}
