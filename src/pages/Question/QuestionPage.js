import React, { Component } from 'react';
import { Table, Tabs, Divider, Row, Col, Alert, Popconfirm, Button } from 'antd';
import { connect } from 'react-redux';
import { actShowQuestionTypeRequest, actDeleteQuestionRequest } from './../../actions';
import { Link } from 'react-router-dom';
const TabPane = Tabs.TabPane;
class QuestionPage extends Component {

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
        this.props.getQuestion();
    }

    onDeleteQuestion = (record) => {
        this.props.deleteQuestion(record.id)
    }

    render() {
        let { sortedInfo } = this.state;
        let { question, notifycation } = this.props;
        let holland = [];
        let mbti = [];
        for (var i in question.items) {
            if (question.items[i].test_type === "HOLLAND") {
                holland.push(question.items[i])
            } else if (question.items[i].test_type === "MBTI") {
                mbti.push(question.items[i])
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
            title: 'Tên câu hỏi',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'name' && sortedInfo.order,
        },
        {
            title: 'Tên nhóm',
            dataIndex: 'answer_type_name',
            key: 'answer_type_name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'answer_type_name' && sortedInfo.order,
        }, {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <span>
                    <Link to={`/question/edit/${record.id}`}>Sửa</Link>
                    <Divider type="vertical" />
                    <Popconfirm title="Bạn có muốn xóa câu hỏi này không?" onConfirm={() => this.onDeleteQuestion(record)} okText="Đồng ý" cancelText="Hủy bỏ">
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
            title: 'Tên nhóm',
            dataIndex: 'answer_type_name',
            key: 'answer_type_name',
            sorter: (a, b) => a.name.length - b.name.length,
            sortOrder: sortedInfo.columnKey === 'answer_type_name' && sortedInfo.order,
        }, {
            title: 'Chức năng',
            key: 'action',
            render: (record) => (
                <span>
                    <Link to={`/question/edit/${record.id}`}>Sửa</Link>
                    <Divider type="vertical" />
                    <Popconfirm title="Bạn có muốn xóa câu hỏi này không?" onConfirm={() => this.onDeleteQuestion(record)} okText="Đồng ý" cancelText="Hủy bỏ">
                        <a >Xóa</a>
                    </Popconfirm>
                </span>
            ),
        },];

        return (
            <div className="table" >
                <div className="table-title">
                    Bảng câu hỏi
                </div>
                <div className="box">
                    <div className="menu">
                        {(notifycation.messages) ? <Alert closable message={notifycation.messages} type={notifycation.types} showIcon /> : ""}
                    </div>
                    <Link to="/question/add" >
                        <Button>Thêm câu hỏi</Button>
                    </Link>
                    <Row>
                        <Col>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab="Holland" key="1"><Table rowKey={record => record.id} loading={question.isLoading} columns={columnsEnableItems} dataSource={holland} onChange={this.handleChange} /></TabPane>
                                <TabPane tab="MBTI" key="2"><Table rowKey={record => record.id} loading={question.isLoading} columns={columnsDisableItems} dataSource={mbti} onChange={this.handleChange} /></TabPane>
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
        question: state.question,
        notifycation: state.notifycation
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getQuestion: () => {
            dispatch(actShowQuestionTypeRequest())
        },
        deleteQuestion: (id) => {
            dispatch(actDeleteQuestionRequest(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPage);