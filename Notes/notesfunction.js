// A simple Notes App with search functionality and which use local storage for storing the notes so note will be available after refreshing the page.


shownotes();
let addBtn = document.getElementById("addBtn");

addBtn.addEventListener("click", function (event) {
    let addTxt = document.getElementById("addTxt");
    var notes = localStorage.getItem("notes");
    var datestr = localStorage.getItem('date');
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    let time = today.getHours() + ':' + today.getMinutes() + ":" + today.getSeconds();
    var datetime = date + ' ' + time;

    if (notes == null && datestr == null) {
        notesobj = [];
        dateobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
        dateobj = JSON.parse(datestr);
    }

    notesobj.push(addTxt.value);
    dateobj.push(datetime);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    localStorage.setItem("date", JSON.stringify(dateobj));
    addTxt.value = '';
    datetime = '';
    shownotes();
})

//for displaying notes
function shownotes() {
    notes = localStorage.getItem("notes");
    datestr = localStorage.getItem("date");
    if (notes == null) {
        notesobj = [];
        dateobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
        dateobj = JSON.parse(datestr);
    }

    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="card searchclass border-success text-white bg-dark mb-3 my-2 mx-2" style="width: 18rem;">
        <div class="card-header bg-success" >Note ${index + 1}</div>
        <div class="card-body">
          <h5 class="card-title"></h5>
          <p class="card-text">${element}</p>
          <p class="small text-right">${dateobj[index]} </p>
          
          <button id="${index}" onclick="deletenote(this.id)" class="btn btn-outline-success my-2 my-sm-0">Delete Note</button>
        </div>
      </div> `;
    });

    let noteselement = document.getElementById('notes');
    if (notesobj.length != 0) {
        noteselement.innerHTML = html;
    }
    else {
        noteselement.innerHTML = `Nothing to show !!!<br>Please add a note. `;
    }
}

//detete function
function deletenote(index) {
    notes = localStorage.getItem("notes");
    datestr = localStorage.getItem("date");
    if (notes == null) {
        notesobj = [];
        dateobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
        dateobj = JSON.parse(datestr);
    }

    notesobj.splice(index, 1);
    dateobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    localStorage.setItem("date", JSON.stringify(dateobj));
    shownotes();
}

//Search Event
let search = document.getElementById("inputtxt");
search.addEventListener("input", function () {
    let input = search.value.toLowerCase();
    let notecard = document.getElementsByClassName("searchclass");
    Array.from(notecard).forEach(function (element) {
        let cardtxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        if (cardtxt.includes(input)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })
});
