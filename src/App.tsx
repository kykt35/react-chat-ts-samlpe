import React, { FC, useState, useEffect } from 'react';
import './App.css';
import ChatPage from './pages/chatPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SignInPage, SignUpPage } from './pages';
import firebase from './firebase';

export interface AppState {
    currentUser?: firebase.User | null;
}
const App: FC = () => {
    const [state, setState] = useState<AppState>({
        currentUser: JSON.parse(
            sessionStorage.getItem('current_user') || 'null',
        ),
    });
    useEffect(() => {
        setState({
            currentUser: JSON.parse(
                sessionStorage.getItem('current_user') || 'null',
            ),
        });

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setState({
                    currentUser: user,
                });
            } else {
                setState({
                    currentUser: null,
                });
            }
        });
    }, []);
    return (
        <div className="App">
            <Router>
                <Route exact path="/sign_in" render={() => <SignInPage />} />
                <Route exact path="/sign_up" render={() => <SignUpPage />} />
                <Route path="/chat" render={() => <ChatPage state={state} />} />
            </Router>
        </div>
    );
};

export default App;
