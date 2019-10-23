import React from 'react';
import firebase from './firebase';

class User extends React.Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    addUser = e => {
        e.preventDefault();

        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
        });

        const userRef = db.collection('users').add({
            email: this.state.email,
            password: this.state.password,
        });

        this.setState({
            email: '',
            password: ''
        });
    };

    render() {
        return (
            <form onSubmit={this.addUser}>
                <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.updateInput}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default User;