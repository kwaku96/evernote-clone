import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeHTMLTags } from '../helpers';

class SidebarItem extends React.Component{
    render(){
        const {index,note,classes,selectedNoteIndex} = this.props
        return(
            <div key={index}>
                <ListItem
                    selected={selectedNoteIndex === index}
                    alignItems='flex-start'
                    className={classes.listItem}>
                    <div
                        className={classes.textSection}
                        onClick={()=>this.selectNote(note,index)}
                    >
                        <ListItemText
                            primary={note.title}
                            secondary={removeHTMLTags(note.body.substring(0,30)+'...')}
                        />
                    </div>
                    <DeleteIcon
                        onClick={()=>this.deleteNote(note)}
                        className={classes.deleteIcon}
                    />
                </ListItem>
            </div>
        )
    }

    selectNote = (n,i) => this.props.selectNote(n,i)

    deleteNote = (n) =>{
        if(window.confirm(`Are you sure want to delete ${n.title}`)){
            this.props.deleteNote(n)
        }
    }

}

export default withStyles(styles)(SidebarItem)