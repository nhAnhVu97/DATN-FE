import React, { Component } from 'react';
import { Spin } from 'antd';
import { BASE_IMG } from './../../ultils/config';
import ReactHtmlParser from 'react-html-parser';
class InfoArticles extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        var { article } = this.props;
        console.log(article)
        return (
            <Spin spinning={article.isLoading} >
                <div className="article">
                    <div className="image">
                        <img width="350" src={(article.isLoading) ? "" : BASE_IMG + article.Article.images} alt={(article.isLoading) ? "" : article.Article.images} />
                    </div>
                    <div className="title">
                        {(article.isLoading) ? "" : ReactHtmlParser(article.Article.title)}
                    </div>
                    <div className="info">
                        <span>Thể loại: </span><span className="info-title">{(article.isLoading) ? "" : article.Category.name}</span>
                        <span>Loại tin: </span><span className="info-title">{(article.isLoading) ? "" : article.NewsType.name}</span>
                    </div>
                    <div className="description">
                        {(article.isLoading) ? "" : ReactHtmlParser(article.Article.description)}
                    </div>
                    <div className="content">
                        {(article.isLoading) ? "" : ReactHtmlParser(article.Article.content)}
                    </div>
                </div>
            </Spin>
        );
    }
}

export default InfoArticles;