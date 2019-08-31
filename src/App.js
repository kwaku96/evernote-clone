import React from 'react';
import './App.css';
import Sidebar from './sidebar/sidebar';
import EditorComponent from './editor/editor';

const firebase =  require('firebase');



class App extends React.Component{

  constructor(props){
    super(props)
    this.state={
      selectedNoteIndex:null,
      selectedNote:null,
      notes:[]
    }
  }

  componentDidMount(){
    firebase.firestore()
      .collection('notes')
      .onSnapshot(serverUpdate=>{
        const notes = serverUpdate.docs.map(_doc=>{
          const data = _doc.data();
          data['id'] = _doc.id;
          return data;
        });
        console.log(notes)
        this.setState({notes:notes})
      })
  }

  render(){
    return(
      <div>
        <Sidebar 
          selectedNoteIndex={this.state.selectedNoteIndex}
          notes = {this.state.notes}
          selectNote={this.selectNote}
          newNote={this.newNote}
          deleteNote={this.deleteNote}
        />
        {
          this.state.selectedNote?
          <EditorComponent
            selectedNote={this.state.selectedNote}
            selectedNoteIndex={this.state.selectedNoteIndex}
            noteUpdate = {this.noteUpdate}
          />:
          <div></div>
        }
      </div>
    )
  }

  deleteNote = (note) =>{
    const noteIndex = this.state.notes.indexOf(note);
    if(this.state.selectedNoteIndex === noteIndex){
      this.setState({selectedNote:null,selectedNoteIndex:null})
    }else{
      this.state.notes.length > 1 ?
      this.selectNote(this.state.notes[this.state.selectedNoteIndex-1],this.state.selectedNoteIndex-1):
      this.setState({selectedNote:null,selectedNoteIndex:null})
    }

    firebase
      .firestore()
      .collection('notes')
      .doc(note.id)
      .delete()
      .catch(err=>console.log(err));
  }

  selectNote = (n,i) =>{
    this.setState({selectedNoteIndex:i,selectedNote:n})
    console.log(this.state.selectedNoteIndex)
  }

  newNote = async (title) =>{
    console.log('from app js ',title)
    const note = {
      title,
      body:''
    }

    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title:note.title,
        body:note.body,
        timestamp:firebase.firestore.FieldValue.serverTimestamp()
      })

      const newId = newFromDB.id;
      await this.setState({notes:[...this.state.notes,note]})
      const newNoteIndex = this.state.notes.indexOf(
        this.state.notes.filter(_note=>_note.id === newId)[0]
      )
      this.setState({
        selectedNote:this.state.notes[newNoteIndex],
        selectedNoteIndex:newNoteIndex
      })
  }

  noteUpdate =(id,note)=>{
    console.log(id,note);
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title:note.title,
        body:note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .catch(err=>console.log(err))
  }

}

export default App;
