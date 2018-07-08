import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Checkbox, Input, Row, Col, Select, Icon } from 'antd';
import { actFetchTestTypeRequest, actFetchGroupAnswersWithIdRequest, actUpdateGroupAnswerRequest } from './../../actions/index';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

class EditGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checkRequire: true,
            test_type_id: "",
            info: "",
            name: "",
            status: null,
        }
    }

    componentDidMount() {
        this.props.getTestType();
        var { match } = this.props;
        if (match) {
            var id = match.params.id;
            this.props.getGroupWithId(id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing.AnswerType) {
            var itemEditing = nextProps.itemEditing.AnswerType;
            this.setState({
                name: itemEditing.name,
                status: itemEditing.status,
                info: itemEditing.info,
                test_type_id: itemEditing.test_type_id
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var groupAnswer = {
                    id: this.props.match.params.id,
                    name: values.name,
                    info: values.info,
                    status: values.status,
                    test_type_id: this.state.test_type_id
                }
                this.props.onEditGroup(groupAnswer)
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
                    Sửa nhóm
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
                                        initialValue: this.state.test_type_id
                                    })(
                                        <Select onChange={this.handleChangeTestType}>
                                            {this.showTestType(testType.items)}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem   {...formItemLayout} label="Tên nhóm">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Nhóm không được bỏ trống' }],
                                        initialValue: this.state.name
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem   {...formItemLayout} label="Thông tin">
                                    {getFieldDecorator('info', {
                                        rules: [{ required: true, message: 'Thông tin không được bỏ trống' }],
                                        initialValue: this.state.info
                                    })(
                                        <TextArea rows={6} />
                                    )}
                                </FormItem>
                                <FormItem   {...formItemLayout} label="Trạng thái">
                                    {getFieldDecorator('status', {
                                        initialValue: this.state.status,
                                        valuePropName: 'checked',
                                    })(
                                        <Checkbox>Hiện nhóm</Checkbox>
                                    )}
                                </FormItem>
                                <Col offset={4}>
                                    <Link to="/group">
                                        <Button className="btn-back" ><Icon type="arrow-left" />Quay lại</Button>
                                    </Link>
                                    <Button type="primary" htmlType="submit"><Icon type="edit" />Hoàn thành</Button>
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
        testType: state.testType,
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getGroupWithId: (id) => {
            dispatch(actFetchGroupAnswersWithIdRequest(id))
        },
        getTestType: () => {
            dispatch(actFetchTestTypeRequest())
        },
        onEditGroup: (items) => {
            dispatch(actUpdateGroupAnswerRequest(items))
        }
    }
}

const ExEditGroup = Form.create()(EditGroup);
export default connect(mapStateToProps, mapDispatchToProps)(ExEditGroup);