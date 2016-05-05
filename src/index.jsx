import '../node_modules/bootstrap/scss/bootstrap.scss';
import './main.scss'
import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/search';
import Plist from './components/plist';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {query: ''};
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleSearchSubmit(query) {
        this.setState({query: query});
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <Search onSearchSubmit={ this.handleSearchSubmit } />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <Plist query={ this.state.query } />
                    </div>
                </div>
            </div>
        )
    }
};

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);
