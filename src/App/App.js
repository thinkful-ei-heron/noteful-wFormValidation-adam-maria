import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import ApiContext from '../ApiContext';
import config from '../config';
import AddNoteForm from '../AddNoteForm/AddNoteForm';
import AddFolderForm from '../AddFolderForm/AddFolderForm'
import './App.css';
import ErrorPage from '../ErrorPage/ErrorPage'

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    componentDidMount() {
        Promise.all([
            fetch(`${config.API_ENDPOINT}/notes`),
            fetch(`${config.API_ENDPOINT}/folders`)
        ])
            .then(([notesRes, foldersRes]) => {
                if (!notesRes.ok)
                    return notesRes.json().then(e => Promise.reject(e));
                if (!foldersRes.ok)
                    return foldersRes.json().then(e => Promise.reject(e));

                return Promise.all([notesRes.json(), foldersRes.json()]);
            })
            .then(([notes, folders]) => {
                this.setState({notes, folders});
            })
            .catch(error => {
                console.error({error});
            });
    }

    handleAddFolder = (name) => {
        const addFolderOptions= {
            method: 'POST',
            body: JSON.stringify({
                name: name
            }),
            headers: {
                'content-type': 'application/json'
            }
        } 
        fetch('http://localhost:9090/folders', addFolderOptions)
            .then(res => {
                if(!res.ok) {
                    throw new Error('Something went wrong, please try again later');
                }
                return res.json();
            })
            .then(data => this.setState({folders: [...this.state.folders, data]}))
       
    }

    handleAddNote = (name, content, folderName) =>{
        const targetFolder = this.state.folders.filter(folder => folder.name === folderName);
        console.log(targetFolder)
        // const folderId = targetFolder[0].id;
        // console.log(folderId)
        const addNoteOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
        
            },
            body: JSON.stringify({
                name: name,
                content: content,
                // folderId: folderId

            })
        };

        fetch('http://localhost:9090/notes', addNoteOptions)
        .then(res => {
            console.log(res)
            if(!res.ok) {
                throw new Error ('something went wrong');
            }
            return res.json();
        })
        
        .then(data => this.setState({notes: [...this.state.notes, data]}))

    }     

    handleDeleteNote = noteId => {
        this.setState({
            notes: this.state.notes.filter(note => note.id !== noteId)
        });
    };

    renderNavRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListNav}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageNav} />
                <Route path="/add-folder" component={AddFolderForm} />
                <Route path="/add-note" component={AddNoteForm} />
            </>
        );
    }

    renderMainRoutes() {
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        component={NoteListMain}
                    />
                ))}
                <Route path="/note/:noteId" component={NotePageMain} />
            </>
        );
    }

    render() {
        const value = {
            notes: this.state.notes,
            folders: this.state.folders,
            deleteNote: this.handleDeleteNote,
            addFolder: this.handleAddFolder,
            addNote: this.handleAddNote,

        };
        return (
            <ApiContext.Provider value={value}>
                <div className="App">
                    <ErrorPage>
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                    </ErrorPage>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
