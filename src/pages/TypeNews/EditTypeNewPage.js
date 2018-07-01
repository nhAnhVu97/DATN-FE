import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actFetchTypeNewsWithIdRequest, actUpdateTypeNewsRequest, actFetchCategoryRequest } from './../../actions';
import { Form, Button, Checkbox, Input, Icon, Row, Col, Spin, Select } from 'antd';
import { Link } from 'react-router-dom';
// import CategorySelect from './../../components/Category/CategorySelect';
const Option = Select.Option;
const FormItem = Form.Item;
class EditTypeNewPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: "",
            status: false,
            category_id: "",
            category_name: "",
        }
    }

    componentDidMount() {
        this.props.getCategory();
        var { match } = this.props;
        var id = match.params.id;
        if (id) {
            this.props.getTypeNews(id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            let { itemEditing } = nextProps;
            this.setState({
                name: itemEditing.name,
                status: itemEditing.status,
                category_id: itemEditing.category_id
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var arrTypeNews = {
                    id: this.props.match.params.id,
                    name: values.name,
                    status: values.status,
                    category_id: this.state.category_id,
                    category_name: this.state.category_name
                }

                this.props.onUpdateTypeNews(arrTypeNews)
                this.props.history.goBack();
            }
            console.log(arrTypeNews)
        })
    }

    showOptions(category) {
        var result = null;
        result = category.map((item, index) => {
            return <Option value={item.id} key={index}>{item.name}</Option>
        })
        return result;
    }

    handleChange = (values) => {
        //thay doi gia tri select => category
        this.setState({ category_id: values.key, category_name: values.label })
        console.log(values)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let { typeNews, itemEditing, category } = this.props;
        return (
            <div className="table" >
                <div className="table-title">
                    Sửa loại tin
            </div>
                <div className="box">
                    <Row>
                        <Col lg={12} offset={4}>
                            <Spin spinning={typeNews.isLoading}>
                                <Form onSubmit={this.handleSubmit} className="category-form">
                                    <FormItem label="Tiêu đề">
                                        {getFieldDecorator('name', {
                                            rules: [{ required: true, message: 'Tên thể loại không được bỏ trống' }],
                                            initialValue: this.state.name,
                                        })(
                                            <Input prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tên thể loại" />
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="Thể loại"
                                        hasFeedback
                                    >
                                        {getFieldDecorator('select', {
                                        })(
                                            <Spin spinning={category.isLoading} key={itemEditing.category_id}>
                                                <Select autoFocus={true} defaultValue={{ key: itemEditing.category_id }} labelInValue onChange={this.handleChange}>
                                                    {this.showOptions(category.items)}
                                                </Select>
                                            </Spin>
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
                                    <Link to="/typenews">
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
        typeNews: state.typeNews,
        itemEditing: state.itemEditing,
        category: state.category,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getTypeNews: (id) => {
            dispatch(actFetchTypeNewsWithIdRequest(id))
        },
        onUpdateTypeNews: (arrTypeNews) => {
            dispatch(actUpdateTypeNewsRequest(arrTypeNews))
        },
        getCategory: () => {
            dispatch(actFetchCategoryRequest())
        }
    }
}

const ExEditTypeNewPage = Form.create()(EditTypeNewPage);
export default connect(mapStateToProps, mapDispatchToProps)(ExEditTypeNewPage);