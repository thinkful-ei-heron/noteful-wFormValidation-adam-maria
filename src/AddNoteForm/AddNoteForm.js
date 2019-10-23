import React, { Component } from 'react'
import ValidationError from "../ValidationError/ValidationError";
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types';

export class AddNoteForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: {
                value: "",
                touched: false
            },
            content: {
                value: "",
                touched: false
            },
            folder: {
                value: "",
                touched: false
            },
        
        }
    }
    static contextType = ApiContext

    UpdateName(name) {
        this.setState({name: {value: name, touched: true}});
        }

    UpdateContent(content){
        this.setState({content: {value: content, touched: true}});
    }

    UpdateFolder(folder){
        this.setState({folder: {value: folder, touched: true}});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {name, content, folder} = this.state;
        this.context.addNote(name.value, content.value, folder.value)
        console.log(this.props.history)
        this.props.history.push('/')
        
    }

    validateName() {
        const name = this.state.name.value.trim();
        if(name.length === 0) {
            return "Name is a required field";
        } else if (name.length < 3) {
            return "Name must be 3 characters or longer";
        }
    }

    validateContent() {
        const content = this.state.content.value.trim();
        if(content.length === 0) {
            return "content is a required field";
        } else if (content.length < 10) {
            return "content must be 10 characters or longer";
        }
    }

    validatefolder() {
        const folder = this.state.folder.value.trim();
        if(folder.length === 0) {
            return "Folder is a required";
        } else if (folder.length < 3) {
            return " folder...";
        }
    }


    render() {
        const nameError = this.validateName();
        const contentError = this.validateContent();
        const folderError = this.validatefolder();
                return (
            <form className="notes" onSubmit={e => this.handleSubmit(e)}>
                <h2>Add Notes Form</h2>
                     
                <div className="name-group">
                    <label htmlFor="name">Name *</label>
                    <input 
                        type="text" 
                        className="name__content" 
                        name="name"
                        id="name"
                        value={this.state.name.value}
                        onChange={e => this.UpdateName(e.target.value)}
                    />
                        {this.state.name.touched && <ValidationError message={nameError}/>}
                </div>

                <div className="content-group">
                    <label htmlFor="content">Content *</label>
                    <input 
                        type="text" 
                        className="content__content" 
                        name="content"
                        id="content"
                        value={this.state.content.value}
                        onChange={e => this.UpdateContent(e.target.value)}
                    />
                        {this.state.content.touched && <ValidationError message={contentError}/>}
                </div>

                <div className="folder-group">
                    <label htmlFor="folder">Folder *</label>
                    <select
                        className="folder__content" 
                        name="folder"
                        id="folder"
                        onChange={e => this.UpdateFolder(e.target.value)}>
                            <option
                            value=''>Select a folder
                            </option>
                            {this.context.folders.map(folder => {
                                return (
                                    <option
                                        key={folder.id}
                                        value={folder.id}>
                                        {folder.name} 
                                        </option>
                                )
                            })}
                        </select>
                    
                        {this.state.content.touched && <ValidationError message={folderError}/>}
                </div>

                <div className="notes-button">
                    <button type="submit" className="add-notes-button" 
                        disabled={
                            this.validateName() || this.validateContent() || this.validatefolder()
                        }
                    > Submit </button>
                </div>
            </form>
        );
    }
}

//propTypes 
AddNoteForm.propTypes= {
    history: PropTypes.object.isRequired
}

export default AddNoteForm
