import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Checkbox, Input, Icon, Row, Col, Alert, Spin, Select } from 'antd';
import { actAddTypeNewsRequest, actFetchCategoryRequest } from './../../actions/index';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const Option = Select.Option;
class EditQuestion extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (this.state.category_id == null) {
                console.log("null")
            } else {
                if (!err) {
                    var typeNews = {

                    }
                    this.props.onAddTypeNews(typeNews)
                    this.props.history.push("/typenews");
                }
            }

        })
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
        const { getFieldDecorator } = this.props.form;;
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
                                        <Select>
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem    {...formItemLayout} label="Nhóm">
                                    {getFieldDecorator('group', {
                                        rules: [{ required: true, message: 'Nhóm không được bỏ trống' }]
                                    })(
                                        <Select >
                                            <Option value="jack">Jack</Option>
                                            <Option value="lucy">Lucy</Option>
                                            <Option value="disabled" disabled>Disabled</Option>
                                            <Option value="Yiminghe">yiminghe</Option>
                                        </Select>
                                    )}

                                </FormItem>
                                <FormItem   {...formItemLayout} label="Câu hỏi">
                                    {getFieldDecorator('question', {
                                        rules: [{ required: true, message: 'Nhóm không được bỏ trống' }]
                                    })(
                                        <Input />
                                    )}

                                </FormItem>
                                <FormItem   {...formItemLayout} label="Trạng thái">
                                    {getFieldDecorator('status', {
                                        valuePropName: 'checked',
                                        initialValue: false,
                                    })(
                                        <Checkbox>Hiện câu hỏi</Checkbox>
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
        // notifycation: state.notifycation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddTypeNews: (typeNews) => {
            dispatch(actAddTypeNewsRequest(typeNews))
        },
        getCategory: () => {
            dispatch(actFetchCategoryRequest())
        }
    }
}

const ExEditQuestion = Form.create()(EditQuestion);
export default connect(mapStateToProps, mapDispatchToProps)(ExEditQuestion);