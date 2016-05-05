import React from 'react';
import ReactDOM from 'react-dom';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleSort = this.handleSort.bind(this);
        this.state = {
            sortDefault: '',
            sort: [
                {
                    code: '',
                    name: 'Best match'
                },
                {
                    code: 'stars',
                    name: 'Most stars'
                },
                {
                    code: 'forks',
                    name: 'Most forks'
                },
                {
                    code: 'updated',
                    name: 'Lastest update'
                }
            ]
        }
    }

    cal() {
        let name = ReactDOM.findDOMNode(this.refs.query).value.trim();
        if (!name) {
            return;
        }
        let sort = ReactDOM.findDOMNode(this.refs.sort).value.trim();
        this.props.onSearchSubmit({q: name, sort: sort});
    }

    handleSearch(e) {
        e.preventDefault();
        this.cal();
    }

    handleSort(e) {
        this.setState({sortDefault: e.target.value});
        this.cal();
    }

    render() {
        let s = {
            'margin-left': '20px'
        }
        return (
                <form onSubmit={this.handleSearch} className="form-inline center-block">
                    <div className="form-group">
                        <input type="text" ref="query" placeholder="Search" className="input-medium form-control" />
                        <input type="submit" className="btn btn-info form-control" value="Search" style={s} />
                    </div>
                    <hr />
                    <div>
                        <select className="form-control pull-xs-right" ref="sort" value={this.state.sortDefault} onChange={this.handleSort}>
                            {this.state.sort.map(item => {
                                return (
                                    <option value={item.code}>{item.name}</option>
                                )
                            })}
                        </select>
                    </div>
                </form>
        )
    }
}
