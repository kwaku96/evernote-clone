import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import List from '@material-ui/core/List';
import { Divider, Button } from '@material-ui/core';
import SidebarItem from '../sidebaritem/sidebaritem';


class Sidebar extends React.Component{

    constructor(props){
        super(props)
        this.state={
            addingNote:false,
            title:null
        }
    }

    render(){
        const {classes,notes,selectedNoteIndex} = this.props
    
        return(
            <div className={classes.sidebarContainer}>
                <Button
                    onClick={this.newNoteBtnClick}
                    className={classes.newNoteBtn}
                >
                    {this.state.addingNote?'Cancel':'new note'}
                </Button>
                {
                    this.state.addingNote?
                    <div>
                        <input 
                            type="text"
                            className={classes.newNoteInput}
                            placeholder="Enter note title"
                            onKeyUp= {(e)=> this.updateTitle(e.target.value)}
                        />
                        <Button
                            className={classes.newNoteSubmitBtn}
                            onClick={this.newNote}
                        >
                            Submit note
                        </Button>
                    </div> : 
                    null
                }
                <List>
                    {
                        notes.map((note,i)=>{
                            return(
                                <div key={i}>
                                    <SidebarItem
                                        note={note}
                                        index={i}
                                        selectedNoteIndex={selectedNoteIndex}
                                        selectNote={this.selectNote}
                                        deleteNote={this.deleteNote}
                                    />
                                    <Divider/>
                                </div>
                            )
                        })
                    }
                </List>
            </div>
        )
    }

    newNoteBtnClick = () =>{
        this.setState({addingNote:!this.state.addingNote})
    }

    updateTitle = (txt) =>{
        this.setState({title:txt})
    }

    newNote = () => {
        this.props.newNote(this.state.title)
        this.setState({addingNote:false,title:null})
    }

    deleteNote = (n) => this.props.deleteNote(n)

    selectNote = (n,i) => this.props.selectNote(n,i)
}

export default withStyles(styles)(Sidebar)