import React, { Component } from 'react';
import { Form, Input, Modal, Icon, Select, Upload, Row, Col, Checkbox, Button } from 'antd';
import { storage } from './../firebase/index'
import { connect } from 'react-redux';
import { actFetchCategoryRequest, actFetchTypeNewsRequest } from './../actions/index';
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

class AddArticlePage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            previewVisible: false,
            previewImage: '',
            fileList: [],
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
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                this.setState({
                    title: values.title,
                    category: values.category,
                    typeNews: values.typeNews,
                    content: values.content,
                    description: values.description,
                });
            }
        });
    }
    handleCancel = () => this.setState({ previewVisible: false })

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = (e) => {
        this.setState({ fileList: e.fileList })
        var image = e.file;

        console.log(image)
        // //tao dinh dang blob cho file
        // var blob = new Blob([image], { type: `images/${image.type}` })

        // //firebase
        // const uploadTask = storage.ref(`images/${image.name}`).put(blob);
        // uploadTask.on('state_changed', (snapshot) => { }, (error) => {
        //     console.log(error)
        // }, () => {
        //     storage.ref('images').child(image.name).getDownloadURL().then(url => {
        //         console.log(url);
        //         this.setState({ images: url })
        //     })
        // })

    }

    showOptionsCategory(category) {
        var result = null;
        result = category.map((item, index) => {
            return <Option value={item.id} key={index}>{item.name}</Option>
        })
        return result;
    }
    showOptionsTypeNews(typeNews) {
        var result = null;
        result = typeNews.map((item, index) => {
            return <Option value={item.id} key={index}>{item.name}</Option>
        })
        return result;
    }
    render() {
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
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

        let { typeNews, category } = this.props;
        return (
            <div className="table" >
                <div className="table-title">
                    Bảng bài viết
            </div>
                <div className="box">
                    <div className="menu">
                    </div>
                    <Row>
                        <Col lg={16}>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                <FormItem  {...formItemLayout} label="Thể loại">
                                    {getFieldDecorator('category', {
                                        rules: [{ required: true, message: 'Vui lòng chọn thể loại ' }],
                                    })(
                                        <Select placeholder="Chọn thể loại">
                                            {this.showOptionsCategory(category.items)}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label="Chọn loại tin">
                                    {getFieldDecorator('typeNews', {
                                        rules: [{ required: true, message: 'Vui lòng chọn loại tin ' }],
                                    })(
                                        <Select >
                                            {this.showOptionsTypeNews(typeNews.items)}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label="Tiêu đề">
                                    {getFieldDecorator('title', {
                                        rules: [{ required: true, message: 'Tiêu đề bài viết không được để trống' }],
                                    })(
                                        <Input placeholder="Nhập tiêu đề bài viết" />
                                    )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label="Mô tả">
                                    {getFieldDecorator('description', {
                                        rules: [{ required: true, message: 'Mô tả bài viết không được để trống' }],
                                    })(
                                        <TextArea rows={4} placeholder="Password" />
                                    )}
                                </FormItem>
                                <FormItem  {...formItemLayout} label="Nội dung bài viết">
                                    {getFieldDecorator('content', {
                                        rules: [{ required: true, message: 'Nội dung bài viết không được để trống' }],
                                    })(
                                        <TextArea rows={4} placeholder="Password" />
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="Hình ảnh"
                                >
                                    {getFieldDecorator('upload', {
                                        rules: [{ required: true, message: 'Vui lòng chọn hình ảnh' }],
                                    })(
                                        <div>

                                            <Upload
                                                data={this.handleUploadFile}
                                                listType="picture-card"
                                                fileList={this.state.fileList}
                                                onPreview={this.handlePreview}
                                                onChange={this.handleChange}
                                            >
                                                {this.state.fileList.length >= 1 ? null : uploadButton}
                                            </Upload>
                                            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
                                                <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
                                            </Modal>
                                        </div>
                                    )}
                                </FormItem>
                                <FormItem {...formItemLayout}
                                    label="Trạng thái" >
                                    <Checkbox>Ẩn bài viết</Checkbox>
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
            </div >

        );
    }
}


const mapStateToProps = state => {
    return {
        category: state.category,
        typeNews: state.typeNews
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: () => {
            dispatch(actFetchCategoryRequest())
        },
        getTypeNews: () => {
            dispatch(actFetchTypeNewsRequest())
        },
    }
}

const ExAddArticlePage = Form.create()(AddArticlePage);
export default connect(mapStateToProps, mapDispatchToProps)(ExAddArticlePage);