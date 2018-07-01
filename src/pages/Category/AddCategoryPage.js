import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Checkbox, Input, Icon, Row, Col, Alert } from 'antd';
import { actAddCategoryRequest } from './../../actions/index';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;

class AddCategoryPage extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var category = {
                    name: values.name,
                    status: (values.status) === true ? 1 : 2
                }
                this.props.onAddCategory(category)
                this.props.history.push("/categories");
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        var { category, notifycation } = this.props;
        return (
            <div className="table" >
                <div className="table-title">
                    Thêm thể loại
                </div>
                <div className="box">
                    <div className="menu">
                        {(notifycation.types === "error") ? <Alert message={notifycation.messages} type={notifycation.types} showIcon /> : ""}
                    </div>
                    <Row>
                        <Col lg={12} offset={4}>
                            <Form onSubmit={this.handleSubmit} className="category-form">
                                <FormItem label="Tên thể loại">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Tên thể loại không được bỏ trống' }],
                                    })(
                                        <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tên thể loại" />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('status', {
                                        valuePropName: 'checked',
                                        initialValue: false,
                                    })(
                                        <Checkbox>Hiện thể loại</Checkbox>
                                    )}
                                </FormItem>
                                <Button loading={category.isLoading} type="primary" htmlType="submit">Hoàn thành</Button>
                                <Link to="/categories">
                                    <Button className="button-close" >Quay lại</Button>
                                </Link>
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
        category: state.category,
        notifycation: state.notifycation,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAddCategory: (category) => {
            dispatch(actAddCategoryRequest(category))
        }
    }
}

const ExAddCategoryPage = Form.create()(AddCategoryPage);
export default connect(mapStateToProps, mapDispatchToProps)(ExAddCategoryPage);