import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Checkbox, Input, Icon, Row, Col, Spin } from 'antd';
import { actFetchCategoryWithIdRequest, actEditCategoryRequest } from './../../actions/index';
import { Link } from 'react-router-dom';
const FormItem = Form.Item;

class EditCategoryPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            status: false,
        }
    }

    componentDidMount() {
        let { match } = this.props;
        if (match) {
            let id = match.params.id;
            this.props.getCategory(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            var { itemEditing } = nextProps;
            this.setState({
                name: itemEditing.name,
                status: itemEditing.status
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var category = {
                    id: this.props.match.params.id,
                    name: values.name,
                    status: (values.status) === true ? 1 : 2
                }
                this.props.onUpdateCategory(category);
                this.props.history.goBack();
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        var { category } = this.props;
        return (
            <div className="table" >
                <div className="table-title">
                    Sửa thể loại
                </div>
                <div className="box">
                    <Row>
                        <Col lg={12} offset={4}>
                            <Spin spinning={category.isLoading}>
                                <Form onSubmit={this.handleSubmit} className="category-form">
                                    <FormItem label="Tiêu đề">
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: 'Tên thể loại không được bỏ trống' }],
                                            initialValue: this.state.name,
                                        })(
                                            <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tên thể loại" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('status', {
                                            valuePropName: 'checked',
                                            initialValue: this.state.status,
                                        })(
                                            <Checkbox>Hiện thể loại</Checkbox>
                                        )}
                                    </FormItem>
                                    <Button type="primary" htmlType="submit">Hoàn thành</Button>
                                    <Link to="/categories">
                                        <Button className="button-close" >Quay lại</Button>
                                    </Link>
                                </Form>
                            </Spin>
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
        itemEditing: state.itemEditing
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: (id) => {
            dispatch(actFetchCategoryWithIdRequest(id))
        },
        onUpdateCategory: (arrCategory) => {
            dispatch(actEditCategoryRequest(arrCategory))
        }
    }
}

const ExEditCategoryPage = Form.create()(EditCategoryPage);
export default connect(mapStateToProps, mapDispatchToProps)(ExEditCategoryPage);