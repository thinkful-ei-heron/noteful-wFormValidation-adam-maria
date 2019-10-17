import React, { Component } from 'react'
import ValidationError from '../ValidationError/ValidationError'
import { Link } from 'react-router-dom'
import ApiContext from '../ApiContext'
import PropTypes from 'prop-types';
import './AddFolderForm.css'

class AddFolderForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: '',
                touched: false
            },
            id: ''
        }
    }
    static contextType = ApiContext

    updateName = (name, id) => {
        this.setState({
            name: {value: name, touched: true},
            id: id
        });
    }

    validateName = () => {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
            return 'Name is required';
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {name} = this.state
        this.context.addFolder(name.value);
        this.props.history.push('/');
        
    } 

    render() {
        return (
            <form className='folder-form' onSubmit={(e) => this.handleSubmit(e)}>
                <h2>Add Folder</h2>
                <div className='input_hint'>* required</div>
                <div className='form-group'>
                    <label htmlFor='name'>Name *</label>
                    <input onChange={(e) => this.updateName(e.target.value)} placeholder='New folder name...'   type='text' className='folder-input-name' name='name' id='name' />
                    {this.state.name.touched && (<ValidationError message={this.validateName()}/>)}
                </div>
                <button type='submit' className='add-folder-button'
                disabled={
                    this.validateName()
                }>
                    Save
                </button>
            </form>
        )
    }
}

AddFolderForm.PropTypes= {
    history: PropTypes.object
}

export default AddFolderForm;