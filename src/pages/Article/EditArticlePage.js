import React, { Component } from 'react';
import { Form, Input, Modal, Icon, Select, Upload, Row, Col, Checkbox, Button, message, Spin } from 'antd';
// import { storage } from './../firebase/index'
import { connect } from 'react-redux';
import { actFetchCategoryRequest, actFetchTypeNewsWithCategoryIdRequest, actFetchTypeNewsRequest, actUpdateArticleRequest, actFetchArticleWithIdRequest } from './../../actions/index';
import CKEditor from "react-ckeditor-component";
const FormItem = Form.Item;
const Option = Select.Option;
const fileList = [];

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    const isPNG = file.type === 'image/png';
    if (!isJPG && !isPNG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}
const props = {
    name: 'UploadedImage',
    action: 'http://localhost:57704/api/myfileupload',
    headers: {
        authorization: 'authorization-text',
    },
    beforeUpload: beforeUpload,
    listType: 'picture',
    defaultFileList: [...fileList],

};

class EditArticlePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            disabledNewsType: true,
            title: '',
            category: '',
            typeNews: '',
            content: '',
            description: '',
            images: '',
        }
    }

    componentDidMount() {
        this.props.getCategory();
        this.props.getTypeNews();
        let { match } = this.props;
        if (match) {
            let id = match.params.id;
            this.props.getArticleWithId(id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.itemEditing) {
            var { itemEditing } = nextProps;
            if (!itemEditing.isLoading) {
                this.setState({
                    title: itemEditing.Article.title,
                    category: itemEditing.Category.id,
                    typeNews: itemEditing.NewsType.id,
                    content: itemEditing.Article.content,
                    description: itemEditing.Article.description,
                    images: itemEditing.Article.images,
                    status: itemEditing.Article.status
                })
            }
        }
    }

    //submit form
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var article = {
                    id: this.props.match.params.id,
                    title: values.title,
                    category_id: values.category,
                    news_type_id: values.typeNews,
                    content: this.state.content,
                    description: this.state.description,
                    images: this.state.images,
                    status: values.status,
                    account_id: 1
                }
                this.props.onEditArticle(article);
                // this.props.history.push("/articles")
                window.location.href ="/articles"
            }
        });
    }


    // chon hinh anh
    onChangeImage = (info) => {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            this.setState({ images: info.file.name })
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }

    // lay danh sach category
    showOptionsCategory(category) {
        var result = null;
        result = category.map((item, index) => {
            return <Option value={item.id} key={index}>{item.name}</Option>
        })
        return result;
    }


    // lay danh sach newstpye sau khi goi api
    showOptionsTypeNews(typeNews) {
        var result = null;
        result = typeNews.map((item, index) => {
            return <Option value={item.id} key={index}>{item.name}</Option>
        })
        return result;
    }

    onSelectCategory = (value) => {
        this.props.getTypeNewsWithId(value);
        this.setState({ disabledNewsType: false, typeNews: '' })
        this.props.form.setFieldsValue({ 'typeNews': '' })
    }

    handleChangeDescription = (value) => {
        var newContent = value.editor.getData();
        this.setState({ description: newContent })
    }

    handleChangeContent = (value) => {
        var newContent = value.editor.getData();
        this.setState({ content: newContent })
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
        let { newsType, category } = this.props;
        return (
            <div className="table" >
                <div className="table-title">
                    Bảng bài viết
            </div>
                <div className="box">
                    <div className="menu">
                    </div>
                    <Row>
                        <Col lg={18}>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem  {...formItemLayout} label="Thể loại">
                                    {getFieldDecorator('category', {
                                        rules: [{ required: true, message: 'Vui lòng chọn thể loại ' }],
                                        initialValue: this.state.category
                                    })(
                                        <Select onSelect={this.onSelectCategory} onChange={this.onChangeCategory} placeholder="Chọn thể loại">
                                            {this.showOptionsCategory(category.items)}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label="Chọn loại tin">
                                    {getFieldDecorator('typeNews', {
                                        rules: [{ required: true, message: 'Vui lòng chọn loại tin ' }],
                                        initialValue: this.state.typeNews,
                                    })(
                                        <Select defaultActiveFirstOption disabled={this.state.disabledNewsType} >
                                            {(newsType.isLoading) ? "" : this.showOptionsTypeNews(newsType.items)}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label="Tiêu đề">
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: 'Tiêu đề bài viết không được để trống' }],
                                        initialValue: this.state.title
                                    })(
                                        <Input placeholder="Nhập tiêu đề bài viết" />
                                    )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label="Mô tả">
                                    {/* {getFieldDecorator('description', {
                                        rules: [{ required: true, message: 'Mô tả bài viết không được để trống' }],
                                        // initialValue: this.state.description
                                    })( */}
                                    <CKEditor
                                        key="1"
                                        activeClass="p10"
                                        content={this.state.description}
                                        events={{
                                            "change": this.handleChangeDescription
                                        }}
                                        
                                    />
                                    {/* )} */}
                                </FormItem>
                                <FormItem  {...formItemLayout} label="Nội dung bài viết">
                                    {/* {getFieldDecorator('content', {
                                        // initialValue: this.state.content,
                                        rules: [{ required: true, message: 'Nội dung bài viết không được để trống' }],
                                    })( */}
                                    <CKEditor
                                        key="2"
                                        activeClass="p10"
                                        content={this.state.content}
                                        events={{
                                            "change": this.handleChangeContent
                                        }}
                                    />
                                    {/* )} */}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Hình ảnh"
                                >
                                    {getFieldDecorator('upload', {
                                        getValueFromEvent: this.normFile,
                                    })(
                                        <div>
                                            <Upload {...props} onChange={this.onChangeImage}>
                                                <Button>
                                                    <Icon type="upload" /> Click to Upload
                                                </Button>
                                            </Upload>
                                            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                            </Modal>
                                        </div>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout} label="Trạng thái" >
                                    {getFieldDecorator('status', {
                                        valuePropName: 'checked',
                                        initialValue: this.state.status,
                                    })(
                                        <Checkbox>Hiện bài viết</Checkbox>
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" htmlType="submit" className="login-form-button">
                                        Hoàn thành
                                    </Button>
                                </FormItem>
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
        newsType: state.typeNews,
        itemEditing: state.itemEditing,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: () => {
            dispatch(actFetchCategoryRequest())
        },
        getTypeNewsWithId: (id) => {
            dispatch(actFetchTypeNewsWithCategoryIdRequest(id))
        },
        onEditArticle: (article) => {
            dispatch(actUpdateArticleRequest(article))
        },
        getArticleWithId: (id) => {
            dispatch(actFetchArticleWithIdRequest(id))
        },
        getTypeNews: () => {
            dispatch(actFetchTypeNewsRequest())
        }
    }
}

const ExEditArticlePage = Form.create()(EditArticlePage);
export default connect(mapStateToProps, mapDispatchToProps)(ExEditArticlePage);