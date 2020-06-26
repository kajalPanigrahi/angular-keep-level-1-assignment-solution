import { Note } from './note';
import { Component, OnInit } from '@angular/core';
import { NotesService } from './notes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'my-app';
  btnCSSClass : string;
  btnText : string;
  isLoggedIn : boolean;
  isDisabled : boolean;
  errorMessage : string;

  note : Note;
  notesList : Array<Note>;

  constructor(private noteService : NotesService){
    
    this.note = new Note();
    this.notesList = [];
  }

  ngOnInit(){

    this.noteService.getNotes().subscribe(notesListResponse =>{
      this.notesList = notesListResponse;
    },
   error =>{
    this.errorMessage = "Http failure response for http://localhost:3000/notes: 404 Not Found";
  })
  }

  takeNote(){

    if (this.note.title == undefined || this.note.text == undefined) 
      this.errorMessage = "Title and Text both are required fields";

    this.notesList.push(this.note);
    this.noteService.addNote(this.note).subscribe(addedNote =>{      
    },error =>{
      let index = this.notesList.findIndex(note => note.id === this.note.id);
      this.notesList.splice(index,1);
      this.errorMessage = "Http failure response for http://localhost:3000/notes: 404 Not Found";
    })
    
    
  }

}
