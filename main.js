const arr = [];
const table = document.getElementById("table");
const submit = document.getElementById("submit");
const form = document.getElementById("form");
const amount = document.getElementById("amount");
const des = document.getElementById("description");
const cat = document.getElementById("sel1");
const localData = JSON.parse(localStorage.getItem("Expense"));
const url_str = window.location.href;
const url = new URL(url_str);
const search_params = url.searchParams;
const paramId = search_params.get("id");

///////////////////////////////////////Update fields////////////////////
if (paramId !== null) {
  let filterData = localData.filter(item => paramId === item.id);

  amount.value = filterData[0].amount;
  des.value = filterData[0].des;
  cat.value = filterData[0].cat;
  submit.value = "UPDATE";
}

////////////////////////////Table Fields///////////////////////////////////
if (localStorage.getItem("Expense")) {
  let data = JSON.parse(localStorage.getItem("Expense"));

  var tbody = document.createElement("tbody");
  table.appendChild(tbody);

  for (value of data) {
    var tr = document.createElement("tr");
    tr.setAttribute("id", value.id);
    tbody.appendChild(tr);

    var td = document.createElement("td");
    td.appendChild(document.createTextNode(value.date));
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
///////////////////////////////////////////////Submit Click////////////////////////////////////////////////
form.addEventListener("submit", getValues);
function getValues(e) {
  e.preventDefault();
  if (paramId === null) {
    if (amount.value !== "" && des.value !== "" && cat.value !== "") {
      const generateId = Math.random().toString(36).slice(2, 18);
      const date = new Date();
      let obj = {
        id: generateId,
        date: date,
        amount: amount.value,
        des: des.value,
        cat: cat.value
      };
      localData ? arr.push(...localData, obj) : arr.push(obj);

      localStorage.setItem("Expense", JSON.stringify(arr));
      window.location.reload();
    } else {
      alert("Please fill all inputs");
    }
  } else {
    let flagId = false;
    localData.forEach(value => {
      if (value.id == paramId) {
        flagId = true;
        value.amount = amount.value;
        value.des = des.value;
        value.cat = cat.value;
      }
    });
    localStorage.setItem("Expense", JSON.stringify(localData));
    flagId ? alert("Update SuccessFully") : alert("check your Id Please");
    window.open("index.html");
  }
}

//////////////////////////////////////Update & Delete//////////////////////////////////////////////////////////////////////////////////////

table.addEventListener("click", RemoveItem);
function RemoveItem(e) {
  let row = e.target.parentElement.parentElement;
  let rowId = row.getAttribute("id");
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure")) {
      var newStore = localData.filter(value => value.id !== rowId);
      localStorage.setItem("Expense", JSON.stringify(newStore));
      window.location.reload();
    }
  }
  if (e.target.classList.contains("edit")) {
    if (confirm("Are You Sure")) {
      window.open("index.html?id=" + rowId);
    }
  }
}
