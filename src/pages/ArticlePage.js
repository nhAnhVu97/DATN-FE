import React, { Component } from 'react';
import { Table, Button, Divider, Modal, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { actFetchArticleRequest, actFetchArticleWithIdRequest } from './../actions';
import InfoArticles from './../components/Articles/InfoArticles';
class ArticlePage extends Component {
    state = {
        filteredInfo: null,
        sortedInfo: null,
        showModal: false,
        visible: false,
    };

    componentWillMount() {
        //goi api
        this.props.getArticle();
    }

    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
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
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    //dong modal
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }


    render() {
        let { data, article } = this.props;
        let { sortedInfo } = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [{
            title: '#',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        }, {
            title: 'Tiêu đề',
            dataIndex: 'title',
            width: 450,
            sorter: (a, b) => a.title.length - b.title.length,
            sortOrder: sortedInfo.columnKey === 'title' && sortedInfo.order,
        }, {
            title: 'Thể loại',
            dataIndex: 'category',
            sorter: (a, b) => a.category.length - b.category.length,
            sortOrder: sortedInfo.columnKey === 'category' && sortedInfo.order,
        }, {
            title: 'Loại tin',
            dataIndex: 'typeNews',
            sorter: (a, b) => a.typeNews.length - b.typeNews.length,
            sortOrder: sortedInfo.columnKey === 'typeNews' && sortedInfo.order,
        }, {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <span>
                    <a onClick={() => this.showInfoArticles(record.id)}>Chi tiết</a>
                    <Divider type="vertical" />
                    {/* <a href="javascript:;">Sửa</a> */}
                    <Divider type="vertical" />
                    {/* <a href="javascript:;">Xóa</a> */}
                </span>
            ),
        }];
        return (
            <div className="table">
                <div className="table-title">
                    Bảng bài viết
                </div>
                <div className="box">
                    <div className="menu">
                        <Button>
                            <Link to="/articles/add" className="ant-button">Thêm bài viết</Link>
                        </Button>

                    </div>
                    <Table rowKey="uid" loading={data.isLoading} columns={columns} dataSource={data.items} onChange={this.handleChange} />
                </div>
                <Modal
                    title="Thông tin bài viết"
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    width={800}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Quay lại</Button>,
                        <Button key="submit" type="primary">
                            Sửa bài viết
                        </Button>,
                    ]}
                >
                    <Spin spinning={article.isLoading}>
                        <InfoArticles article={article.items} />
                    </Spin>
                </Modal>

            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        data: state.data,
        article: state.article
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
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(ArticlePage);