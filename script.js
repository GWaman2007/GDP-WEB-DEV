const notesDiv = document.getElementById("notes");



// Fetch all notes

async function fetchNotes() {

  const res = await fetch("/notes");

  const notes = await res.json();



  notesDiv.innerHTML = "";



  notes.forEach((note) => {

    const noteDiv = document.createElement("div");

    noteDiv.className = "note";



    const title = document.createElement("h3");

    title.innerText = note.title;



    const content = document.createElement("p");

    content.innerText = note.content;



    const editBtn = document.createElement("button");

    editBtn.innerText = "Edit";

    editBtn.onclick = () => editNote(note);



    const deleteBtn = document.createElement("button");

    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = () => deleteNote(note._id);



    noteDiv.appendChild(title);

    noteDiv.appendChild(content);

    noteDiv.appendChild(editBtn);

    noteDiv.appendChild(deleteBtn);



    notesDiv.appendChild(noteDiv);

  });

}



// Add note

async function addNote() {

  const title = document.getElementById("title").value;

  const content = document.getElementById("content").value;



  if (!title || !content) {

    alert("Fill all fields");

    return;

  }



  await fetch("/notes", {

    method: "POST",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({ title, content }),

  });



  document.getElementById("title").value = "";

  document.getElementById("content").value = "";



  fetchNotes();

}



// Delete note

async function deleteNote(id) {

  await fetch(`/notes/${id}`, {

    method: "DELETE",

  });



  fetchNotes();

}



// Edit note

async function editNote(note) {

  const title = prompt("Edit title:", note.title);

  const content = prompt("Edit content:", note.content);



  if (!title || !content) return;



  await fetch(`/notes/${note._id}`, {

    method: "PATCH",

    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({ title, content }),

  });



  fetchNotes();

}



// Load notes on page load

fetchNotes();


