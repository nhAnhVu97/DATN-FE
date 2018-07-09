import React, { Component } from 'react';
import { Table, Button, Divider, Modal, Tabs, Row, Col, Alert, Popconfirm } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchArticleRequest, actFetchArticleWithIdRequest, actUpdateArticleRequest } from './../../actions/index';
import InfoArticles from './../../components/Articles/InfoArticles';

const TabPane = Tabs.TabPane;
class ArticlePage extends Component {
    state = {
        sortedInfo: null,
        showModal: false,
        visible: false,
    };

    componentWillMount() {
        //goi api
        this.props.getArticle();
    }

    handleChange = (pagination, sorter) => {
        this.setState({
            sortedInfo: sorter,
        });
    }

    // lay article theo id
    showInfoArticles = (id) => {
        this.setState({ visible: true })
        this.props.getArticleWithId(id)
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }
    //dong modal
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    /**
  * An bai viet
  * record => array  
  */
    onDeleteArticle = (record) => {
        if (record.id) {
            var article = {
                id: record.id,
                title: record.title,
                content: record.content,
                description: record.description,
                news_type_id: record.news_type_id,
                account_id: 1,
                images: record.images,
                status: false,
            }
            this.props.onEditArticle(article)
        }
    }

    /**
     * Hien bai viet
     * record => array  
     */
    onRestoreArticle = (record) => {
        if (record.id) {
            var article = {
                id: record.id,
                title: record.title,
                content: record.content,
                description: record.description,
                news_type_id: record.news_type_id,
                account_id: 1,
                images: record.images,
                status: true,
            }
            this.props.onEditArticle(article)
        }
    }

    render() {
        let { article, itemEditing, notifycation } = this.props;
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        const columnsEnabled = [{
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
           
        }, {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: 450,
            sorter: (a, b) => a.title.length - b.title.length,

        }, {
            title: 'Thể loại',
            dataIndex: 'Category.name',
            key: 'Category.name',
            sorter: (a, b) => a.Category.name.length - b.Category.name.length,
        
        }, {
            title: 'Loại tin',
            dataIndex: 'NewsType.name',
            key: 'NewsType.name',
            sorter: (a, b) => a.NewsType.name.length - b.NewsType.name.length,
        }, {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <span>
                    <a onClick={() => this.showInfoArticles(record.id)}>Chi tiết</a>
                    <Divider type="vertical" />
                    <a href={`/articles/edit/${record.id}`}>Sửa</a>
                    <Divider type="vertical" />
                    <Popconfirm title="Bạn có muốn xóa bài viết này không?" onConfirm={() => this.onDeleteArticle(record)} okText="Đồng ý" cancelText="Hủy bỏ">
                        <a >Xóa</a>
                    </Popconfirm>
                </span>
            ),
        }];
        const columnsDisabled = [{
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        }, {
            title: 'Tiêu đề',
            dataIndex: 'title',
            key: 'title',
            width: 450,
            sorter: (a, b) => a.title.length - b.title.length,
        }, {
            title: 'Thể loại',
            dataIndex: 'Category.name',
            key: 'Category.name',
            sorter: (a, b) => a.Category.name.length - b.Category.name.length,
        }, {
            title: 'Loại tin',
            dataIndex: 'NewsType.name',
            key: 'NewsType.name',
            sorter: (a, b) => a.NewsType.name.length - b.NewsType.name.length,
        }, {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <span>
                    <a onClick={() => this.showInfoArticles(record.id)}>Chi tiết</a>
                    <Divider type="vertical" />
                    <a href={`/articles/edit/${record.id}`}>Sửa</a>
                    <Divider type="vertical" />
                    <Popconfirm title="Bạn có muốn phục hồi bài viết này không?" onConfirm={() => this.onRestoreArticle(record)} okText="Đồng ý" cancelText="Hủy bỏ">
                        <a >Phục hồi</a>
                    </Popconfirm>
                </span>
            ),
        }];

        var enableItem = [];
        var disableItem = [];
        for (var i in article.items) {
            if (article.items[i].status) {
                enableItem.push(article.items[i])
            } else {
                disableItem.push(article.items[i])
            }
        }
        return (
            <div className="table">
                <div className="table-title">
                    Bảng bài viết
                </div>
                <div className="box">
                    <div className="menu">
                        {(notifycation.messages) ? <Alert showIcon banner closable message={notifycation.messages} type={notifycation.types}  /> : ""}
                    </div>
                    <Button>
                        <Link to="/articles/add" className="ant-button">Thêm bài viết</Link>
                    </Button>
                    <Row>
                        <Col>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Đang hiển thị" key="1"><Table rowKey={record => record.id} loading={article.isLoading} columns={columnsEnabled} dataSource={enableItem} onChange={this.handleChange} /></TabPane>
                                <TabPane tab="Đã xóa" key="2"> <Table rowKey={record => record.id} loading={article.isLoading} columns={columnsDisabled} dataSource={disableItem} onChange={this.handleChange} /></TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
                <Modal
                    title="Thông tin bài viết"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    width={800}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Quay lại</Button>,

                    ]}
                >
                    <InfoArticles article={itemEditing} />
                </Modal>

            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        article: state.article,
        itemEditing: state.itemEditing,
        notifycation: state.notifycation
    }
}

const mapDispatchToProp = (dispatch) => {
    return {
        // lay tat ca article
        getArticle: () => {
            dispatch(actFetchArticleRequest())
        },
        // modal article theo id
        getArticleWithId: (id) => {
            dispatch(actFetchArticleWithIdRequest(id))
        },
        onEditArticle: (article) => {
            dispatch(actUpdateArticleRequest(article))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ArticlePage);