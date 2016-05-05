import React from 'react';
import {get} from '../utils/ajax';

export default class Plist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {"loading": false, "list": [], query: {}};
        this.handleMore = this.handleMore.bind(this);
    }

    componentDidMount() {
        this.setState({"firstView": true});
    }

    handleMore() {
        var _q = this.state.query;
        _q.page += 1;
        var url = `https://api.github.com/search/repositories?q=${_q.q}&sort=${_q.sort}&page=${_q.page}&per_page=${_q.per_page}`;
        get(url).then((data) => {
            let items = this.state.list.concat(data.items);
            this.setState({loading: false, list: items, count: data.total_count, query: _q});
        }).catch((error) => {
            console.error(error);
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({"loading": true, "firstView": false});
        var _q = nextProps.query;
        if (!_q.hasOwnProperty('page')) {
            _q.page = 1;
        } else {
            _q.page += 1;
        }
        _q.per_page=10;

        var url = `https://api.github.com/search/repositories?q=${_q.q}&sort=${_q.sort}&page=${_q.page}&per_page=${_q.per_page}`;
        get(url).then((data) => {
            this.setState({loading: false, list: data.items, count: data.total_count, query: _q});
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        const imgStyle = { width: "50px" };
        if (this.state.firstView) {
            return (
                <p>Enter name to search</p>
            )
        }

        if (this.state.loading) {
            return (
                <p>Loading result...</p>
            )
        } else {
            if (this.state.list.length === 0) {
                return (
                    <p>No result.</p>
                )
            } else {
                return (
                    <div className="row plist-result">
                        <hr />
                        {this.state.list.map(rep => {
                            return (
                                <div className="card">
                                    <div className="pull-xs-right">
                                        <span>{ rep.language }</span> |
                                        <span>{ rep.stargazers_count }</span> |
                                        <span>{ rep.forks_count }</span>
                                    </div>
                                    <a href={ rep.html_url }><span>{ rep.full_name }</span></a>
                                    <div><span>{ rep.description }</span></div>
                                    <div>{ rep.updated_at }</div>
                                </div>
                            )
                        })}
                        {this.state.list.length < this.state.count ? <div className="row div-refresh"><button className="btn btn-info" onClick={this.handleMore}>More...</button></div>: null}
                    </div>
                )
            }
        }
    }
}
