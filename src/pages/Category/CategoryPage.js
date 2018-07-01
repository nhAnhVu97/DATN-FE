import React, { Component } from 'react';
import { Table, Tabs, Divider, Row, Col, Alert, Popconfirm, Button, notification } from 'antd';
import { connect } from 'react-redux';
import { actFetchCategoryRequest, actEditCategoryRequest } from './../../actions';
import { Link } from 'react-router-dom';
const TabPane = Tabs.TabPane;
class CategoryPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sortedInfo: null,
            visible: false,
            categoryId: null,
            data: [],
        }
    }
    componentDidMount() {
        this.props.getCategory();
    }


    /**
     * An the loai
     * record => array category 
     */
    onDeleteCategory = (record) => {
        if (record.id) {
            var category = {
                id: record.id,
                name: record.name,
                status: 2,
            }
            this.props.onUpdateCategory(category)
        }
    }

    /**
     * Hien the loai
     * record => array category 
     */
    onRestoreCategory = (record) => {
        if (record.id) {
            var category = {
                id: record.id,
                name: record.name,
                status: 1,
            }
            this.props.onUpdateCategory(category)
        }
    }

    render() {
        let { sortedInfo } = this.state;
        let { data, notifycation } = this.props;
        let enableItem = [];
        let disableItem = [];
        for (var i in data.items) {
            if (data.items[i].status === 1) {
                // lay category status = true
                enableItem.push(data.items[i])
            } else {
                disableItem.push(data.items[i])
            }
        }
        sortedInfo = sortedInfo || {};
        const columnsEnableItems = [{
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id.length - b.id.length,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        }, {
            title: 'Tên loại',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <span>
                    <Link to={`/categories/edit/${record.id}`}>Sửa</Link>
                    <Divider type="vertical" />
                    <Popconfirm title="Bạn có muốn xóa thể loại này không?" onConfirm={() => this.onDeleteCategory(record)} okText="Đồng ý" cancelText="Hủy bỏ">
                        <a >Xóa</a>
                    </Popconfirm>
                </span >
            ),
        },];
        const columnsDisableItems = [{
            title: '#',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id.length - b.id.length,
            sortOrder: sortedInfo.columnKey === 'id' && sortedInfo.order,
        }, {
            title: 'Tên loại',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <span>
                    <Link to={`/categories/edit/${record.id}`}>Sửa</Link>
                    <Divider type="vertical" />
                    <Popconfirm title="Bạn có muốn phục hồi thể loại này không?" onConfirm={() => this.onRestoreCategory(record)} okText="Đồng ý" cancelText="Hủy bỏ">
                        <a >Phục hồi</a>
                    </Popconfirm>
                </span>
            ),
        },];


        // if (data.error) {
        //     notification.open({
        //         message: 'Notification Title',
        //         description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        //     });
        // }
        return (
            <div className="table" >
                <div className="table-title">
                    Bảng thể loại
                </div>
                <div className="box">
                    <div className="menu">
                        {(notifycation.messages) ? <Alert closable message={notifycation.messages} type={notifycation.types} showIcon /> : ""}
                    </div>
                    <Link to="/categories/add" >
                        <Button>Thêm thể loại</Button>
                    </Link>
                    <Row>
                        <Col>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Đang hiển thị" key="1"><Table rowKey={record => record.id} loading={data.isLoading} columns={columnsEnableItems} dataSource={enableItem} onChange={this.handleChange} /></TabPane>
                                <TabPane tab="Đã xóa" key="2"><Table rowKey={record => record.id} loading={data.isLoading} columns={columnsDisableItems} dataSource={disableItem} onChange={this.handleChange} /></TabPane>
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
        data: state.category,
        notifycation: state.notifycation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: () => {
            dispatch(actFetchCategoryRequest())
        },
        onUpdateCategory: (arrCategory) => {
            dispatch(actEditCategoryRequest(arrCategory))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);