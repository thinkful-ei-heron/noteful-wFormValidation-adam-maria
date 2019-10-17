import React, { Component } from 'react'

class ErrorPage extends Component {
    state = {error: null};
    static getDerivedStateFromError(error) {
        console.log(error);
        return {error};
    }
    render() {
        if (this.state.error) {
            return (
                <main className='error-page'>
                    <h1>Something went wrong</h1>
                    <p>Try refreshing the page</p>
                </main>
            );
        }
        return this.props.children;
    }
}

export default ErrorPage;