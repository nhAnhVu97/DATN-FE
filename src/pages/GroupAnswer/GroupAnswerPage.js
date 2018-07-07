import React, { Component } from 'react';
import { Table, Tabs, Divider, Row, Col, Alert, Popconfirm, Button } from 'antd';

import { connect } from 'react-redux';
import { actFetchGroupAnswersRequest, actUpdateGroupAnswerRequest } from './../../actions';
import { Link } from 'react-router-dom';
const TabPane = Tabs.TabPane;
class GroupAnswerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        this.props.getCategory();
    }

    onDeleteGroupp = (record) => {
        if (record.id) {
            var groups = {
                id: record.id,
                name: record.name,
                info: record.info,
                test_type_id: record.test_type_id,
                status: false,
            }
            this.props.onEditGroup(groups)
        }
    }

    onRestoreGroup = (record) => {
        if (record.id) {
            var groups = {
                id: record.id,
                name: record.name,
                info: record.info,
                test_type_id: record.test_type_id,
                status: true,
            }
            this.props.onEditGroup(groups)
        }
    }

    render() {
        let { sortedInfo } = this.state;
        let { group_answer, notifycation } = this.props;
        let enableItem = [];
        let disableItem = [];
        for (var i in group_answer.items) {
            if (group_answer.items[i].status) {
                // lay category status = true
                enableItem.push(group_answer.items[i])
            } else {
                disableItem.push(group_answer.items[i])
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
            title: 'Tên nhóm',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <span>
                    <Link to={`/group/edit/${record.id}`}>Sửa</Link>
                    <Divider type="vertical" />
                    <Popconfirm title="Bạn có muốn xóa nhóm này không?" onConfirm={() => this.onDeleteGroupp(record)} okText="Đồng ý" cancelText="Hủy bỏ">
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
            title: 'Tên nhóm',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        }, {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <span>
                    <Link to={`/group/edit/${record.id}`}>Sửa</Link>
                    <Divider type="vertical" />
                    <Popconfirm title="Bạn có muốn phục hồi nhóm này không?" onConfirm={() => this.onRestoreGroup(record)} okText="Đồng ý" cancelText="Hủy bỏ">
                        <a >Phục hồi</a>
                    </Popconfirm>
                </span>
            ),
        },];

        return (
            <div className="table" >
                <div className="table-title">
                    Bảng loại nhóm
                </div>
                <div className="box">
                    <div className="menu">
                        {(notifycation.messages) ? <Alert closable message={notifycation.messages} type={notifycation.types} showIcon /> : ""}
                    </div>
                    <Link to="/group/add" >
                        <Button>Thêm nhóm</Button>
                    </Link>
                    <Row>
                        <Col>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Đang hiển thị" key="1"><Table rowKey={record => record.id} loading={group_answer.isLoading} columns={columnsEnableItems} dataSource={enableItem} onChange={this.handleChange} /></TabPane>
                                <TabPane tab="Đã xóa" key="2"><Table rowKey={record => record.id} loading={group_answer.isLoading} columns={columnsDisableItems} dataSource={disableItem} onChange={this.handleChange} /></TabPane>
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
        group_answer: state.group_answer,
        notifycation: state.notifycation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: () => {
            dispatch(actFetchGroupAnswersRequest())
        },
        onEditGroup: (items) => {
            dispatch(actUpdateGroupAnswerRequest(items))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupAnswerPage);