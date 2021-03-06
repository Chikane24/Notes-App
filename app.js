const addBtn = document.getElementById("addBtn");
showNotes();

//If user adds a note: Add it to local storage
addBtn.addEventListener('click', e => {
    let addText = document.getElementById("addText");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addText.value);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addText.value = "";
    // console.log(notesObj);
    showNotes();
})

//Function to show all notes

function showNotes(){
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index){
        html += `
            <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Note ${index + 1}</h5>
                  <p class="card-text">${element}</p>
                  <button onclick="deleteNote(this.id)" id="${index}" class="btn btn-primary">Delete Note</button>
                </div>
            </div>
        `
    });
    let noteEle = document.getElementById("notes");
    if(notesObj.length != 0){
        noteEle.innerHTML = html;
    }
    else{
        noteEle.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes`;
    }
}

// Function to delete a note

function deleteNote(index){
    // console.log("I am deleting");
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesObj = [];
    }
    else{
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener('input', function(){
    // console.log(("Input event fired"));
    let inputVal = search.value;
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal))
        {
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})