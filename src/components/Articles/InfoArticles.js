import React, { Component } from 'react';
class InfoArticles extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        console.log("componentWillMount")
    }

    render() {
        var { article } = this.props;
        return (
            <div className="article">
                <div className="title">
                    {article.title}
                </div>
                <div className="info">
                    <span>Thể loại: </span><span className="info-title">{article.category}</span>
                    <span>Loại tin: </span><span className="info-title">{article.typeNews}</span>
                </div>
                <div className="description">
                    {article.description}
                </div>
                <div className="content">
                    {article.content}
                </div>
            </div>
        );
    }
}

export default InfoArticles;