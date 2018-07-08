import React, { Component } from 'react';
import { Table, Tabs, Divider, Row, Col, Alert, Popconfirm, Button } from 'antd';
import { Link } from 'react-router-dom';
import { actFetchTypeNewsRequest, actUpdateTypeNewsRequest } from './../../actions/index';
import { connect } from 'react-redux';
const TabPane = Tabs.TabPane;
class TypeNewsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() {
        this.props.getTypeNews();
    }

    /**
     * An the loai
     * record => array category 
     */
    onDeleteTypeNews = (record) => {
        console.log(record)
        if (record.id) {
            var typeNews = {
                id: record.id,
                name: record.name,
                category_id: record.category_id,
                category_name: record.category_name,
                status: 2,
            }
            this.props.onUpdateNewsType(typeNews)
            // this.props.onUpdateCategory(category)
        }
    }

    /**
     * Hien the loai
     * record => array category 
     */
    onRestoreTypeNews = (record) => {
        if (record.id) {
            var typeNews = {
                id: record.id,
                name: record.name,
                category_id: record.category_id,
                category_name: record.category_name,
                status: 1,
            }
            this.props.onUpdateNewsType(typeNews)
        }
    }
    render() {

        let { typeNews, notifycation } = this.props;
        let enableItem = [];
        let disableItem = [];

        for (var i in typeNews.items) {
            if (typeNews.items[i].status === 1) {
                enableItem.push(typeNews.items[i])
            } else {
                disableItem.push(typeNews.items[i])
            }
        }
        const columnsEnableItem = [{
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        }, {
            title: 'Tên loại tin',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        }, {
            title: 'Thể loại',
            dataIndex: 'Category.name',
            key: 'Category.name',
            sorter: (a, b) => a.Category.name.length - b.Category.name.length,
        }, {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <span>
                    <Link to={`/typenews/edit/${record.id}`}>Sửa</Link>
                    <Divider type="vertical" />
                    <Popconfirm title="Bạn có muốn xóa loại tin này không?" onConfirm={() => this.onDeleteTypeNews(record)} okText="Đồng ý" cancelText="Hủy bỏ">
                        <a >Xóa</a>
                    </Popconfirm>
                </span >
            ),
        }];

        const columnsDisableItem = [{
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        }, {
            title: 'Tên loại tin',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        }, {
            title: 'Thể loại',
            dataIndex: 'Category.name',
            key: 'Category.name',
            sorter: (a, b) => a.Category.name.length - b.Category.name.length,
        }, {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <span>
                    <Link to={`/typenews/edit/${record.id}`}>Sửa</Link>
                    <Divider type="vertical" />
                    <Popconfirm title="Bạn có muốn phục hồi loại tin này không?" onConfirm={() => this.onRestoreTypeNews(record)} okText="Đồng ý" cancelText="Hủy bỏ">
                        <a >Phục hồi</a>
                    </Popconfirm>
                </span >
            ),
        }];


        return (
            <div className="table" >
                <div className="table-title">
                    Bảng loại tin
                </div>
                <div className="box">
                    <div className="menu">
                    {(notifycation.isShow) ? <Alert description={<Link to="/articles/add">Thêm bài viết</Link>} banner closable message={notifycation.messages} type={notifycation.types} showIcon /> : ""}
                    </div>
                    <Link to="/typenews/add" >
                        <Button>Thêm loại tin</Button>
                    </Link>
                    <Row>
                        <Col>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Đang hiển thị" key="1"> <Table rowKey={record => record.id} loading={typeNews.isLoading} columns={columnsEnableItem} dataSource={enableItem} /></TabPane>
                                <TabPane tab="Đã xóa" key="2"> <Table rowKey={record => record.id} columns={columnsDisableItem} dataSource={disableItem} /></TabPane>
                            </Tabs>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        typeNews: state.typeNews,
        notifycation: state.notifycation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTypeNews: () => {
            dispatch(actFetchTypeNewsRequest())
        },
        onUpdateNewsType: (typeNews) => {
            dispatch(actUpdateTypeNewsRequest(typeNews))
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TypeNewsPage);