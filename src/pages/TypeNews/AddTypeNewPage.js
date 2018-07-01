import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Checkbox, Input, Icon, Row, Col, Alert, Spin, Select } from 'antd';
import { actAddTypeNewsRequest, actFetchCategoryRequest } from './../../actions/index';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;
const Option = Select.Option;
class AddTypeNewPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            category_id: null,
            category_name: "",
            checkSelect: true
        }
    }

    componentDidMount() {
        this.props.getCategory();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (this.state.category_id == null) {
                console.log("null")
            } else {
                if (!err) {
                    var typeNews = {
                        name: values.name,
                        status: values.status,
                        category_id: this.state.category_id,
                        category_name: this.state.category_name,
                    }
                    this.props.onAddTypeNews(typeNews)
                    this.props.history.push("/typenews");
                }
            }

        })
    }
    handleChange = (values) => {
        console.log(values)
        this.setState({ category_id: values.key, category_name: values.label, checkSelect: false }, () => {
            this.props.form.validateFields(['select'], { force: true })
        })

    }
    showOptions(category) {
        var result = null;
        result = category.map((item, index) => {
            return <Option value={item.id} key={index}>{item.name}</Option>
        })
        return result;
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        var { typeNews, category } = this.props;
        // if (notifycation.types === "success") {
        //     return <Redirect to="/categories" />
        // }
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
                        <Col lg={12} offset={4}>
                            <Form onSubmit={this.handleSubmit} className="category-form">
                                <FormItem label="Tên loại tin">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: 'Tên loại tin không được bỏ trống' }],
                                    })(
                                        <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tên loại tin" />
                                    )}
                                </FormItem>
                                <FormItem
                                    label="Thể loại"
                                >
                                    {getFieldDecorator('select', {
                                        rules: [{ required: this.state.checkSelect, message: 'Thể loại không được bỏ trống' }]
                                    })(
                                        <Spin spinning={category.isLoading}>
                                            <Select defaultActiveFirstOption={true} labelInValue autoFocus={true} placeholder="Vui lòng chọn thể loại" onChange={this.handleChange}>
                                                {this.showOptions(category.items)}
                                            </Select>
                                        </Spin>
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
                                <Button loading={typeNews.isLoading} type="primary" htmlType="submit">Hoàn thành</Button>
                                <Link to="/typenews">
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
        typeNews: state.typeNews,
        category: state.category,
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

const ExAddTypeNewPage = Form.create()(AddTypeNewPage);
export default connect(mapStateToProps, mapDispatchToProps)(ExAddTypeNewPage);