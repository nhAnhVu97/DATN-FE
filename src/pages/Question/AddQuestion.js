import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Input, Row, Col, Select, Alert } from 'antd';
import { actFetchTestTypeRequest, actGetAnswerTypeWithIdTestTypeRequest, actAddQuestionRequest } from './../../actions/index';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea;
class AddQuestion extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabledGroup: true,
            groupId: null,
        }
    }

    componentDidMount() {
        this.props.getTestType();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var question = {
                    name: values.question,
                    answer_type: values.group,
                    status: true
                }
                this.props.onAddQuestion(question)
                this.props.form.setFieldsValue({ 'group': '', 'question': '' })
                // this.props.history.push("/question")
            }
        })
    }
    //show option test type
    showTestType = (testType) => {
        var result = null
        result = testType.map((item, index) => {
            return <Option key={index} value={item.id}>{item.name}</Option>
        })
        return result
    }
    showGroup = (groups) => {
        var result = null
        result = groups.map((item, index) => {
            return <Option key={index} value={item.id}>{item.name}</Option>
        })
        return result
    }

    handleChangeTestType = (value) => {
        this.props.getAnswerGroup(value)
        this.setState({ disabledGroup: false })
        this.props.form.setFieldsValue({ 'group': '' })
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const { getFieldDecorator } = this.props.form;
        var { testType, groupAnswer, notifycation, question } = this.props;
        return (
            <div className="table" >
                <div className="table-title">
                    Thêm loại tin
                </div>
                <div className="box">
                    <div className="menu">
                        {(notifycation.messages) ? <Alert closable message={notifycation.messages} type={notifycation.types} showIcon /> : ""}
                    </div>
                    <Row>
                        <Col lg={18} >
                            <Form onSubmit={this.handleSubmit} className="category-form">
                                <FormItem   {...formItemLayout} label="Loại trắc nghiệm">
                                    {getFieldDecorator('test', {
                                        rules: [{ required: true, message: 'Loại trắc nghiệm không được bỏ trống' }],
                                    })(
                                        <Select onChange={this.handleChangeTestType}>
                                            {this.showTestType(testType.items)}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem    {...formItemLayout} label="Nhóm">
                                    {getFieldDecorator('group', {
                                        rules: [{ required: true, message: 'Nhóm không được bỏ trống' }]
                                    })(
                                        <Select disabled={this.state.disabledGroup} onChange={this.handleChangeGroup}>
                                            {(!groupAnswer.isLoading) ? this.showGroup(groupAnswer.items) : ""}
                                        </Select>
                                    )}

                                </FormItem>
                                <FormItem   {...formItemLayout} label="Câu hỏi">
                                    {getFieldDecorator('question', {
                                        rules: [{ required: true, message: 'Câu hỏi không được bỏ trống' }]
                                    })(
                                        <TextArea rows={2} />
                                    )}

                                </FormItem>
                                <Col offset={4}>
                                    <Button loading={question.isLoading} type="primary" htmlType="submit">Hoàn thành</Button>
                                    <a href="/question">
                                        <Button className="button-close" >Quay lại</Button>
                                    </a>
                                </Col>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notifycation: state.notifycation,
        testType: state.testType,
        groupAnswer: state.group_answer,
        question: state.question
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTestType: () => {
            dispatch(actFetchTestTypeRequest())
        },
        getAnswerGroup: (id) => {
            dispatch(actGetAnswerTypeWithIdTestTypeRequest(id))
        },
        onAddQuestion: (items) => {
            dispatch(actAddQuestionRequest(items))
        }
    }
}

const ExAddQuestion = Form.create()(AddQuestion);
export default connect(mapStateToProps, mapDispatchToProps)(ExAddQuestion);