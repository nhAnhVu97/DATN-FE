import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Checkbox, Input, Row, Col, Select } from 'antd';
import { actFetchTestTypeRequest, actAddGroupAnswersRequest } from './../../actions/index';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;
class AddGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            test_type_id: "",
            info: "",
            checkRequire: true
        }
    }

    componentDidMount() {
        this.props.getTestType();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var groupAnswer = {
                    name: values.name,
                    info: values.info,
                    status: values.status,
                    test_type_id: this.state.test_type_id
                }
                this.props.onAddGroup(groupAnswer)
                this.props.history.push("/group")
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

    handleChangeTestType = (value) => {
        this.setState({ test_type_id: value })
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
        var { testType } = this.props;
        return (
            <div className="table" >
                <div className="table-title">
                    Thêm loại tin
                </div>
                <div className="box">
                    <div className="menu">
                        {/* {(notifycation.types === "error") ? <Alert message={notifycation.messages} type={notifycation.types} showIcon /> : ""} */}
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
                                <FormItem   {...formItemLayout} label="Tên nhóm">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Nhóm không được bỏ trống' }]
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem   {...formItemLayout} label="Thông tin">
                                    {getFieldDecorator('info', {
                                        rules: [{ required: true, message: 'Thông tin không được bỏ trống' }],
                                        initialValue: this.state.info
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                                <FormItem   {...formItemLayout} label="Trạng thái">
                                    {getFieldDecorator('status', {
                                        valuePropName: 'checked',
                                        initialValue: true,
                                    })(
                                        <Checkbox>Hiện nhóm</Checkbox>
                                    )}
                                </FormItem  >

                                <Col offset={4}>
                                    <Button type="primary" htmlType="submit">Hoàn thành</Button>
                                    <Link to="/typenews">
                                        <Button className="button-close" >Quay lại</Button>
                                    </Link>
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
        testType: state.testType
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTestType: () => {
            dispatch(actFetchTestTypeRequest())
        },
        onAddGroup: (items) => {
            dispatch(actAddGroupAnswersRequest(items))
        }
    }
}

const ExAddGroup = Form.create()(AddGroup);
export default connect(mapStateToProps, mapDispatchToProps)(ExAddGroup);