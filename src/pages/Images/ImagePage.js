import React, { Component } from 'react';
import { Card, Icon, Avatar, Row, Col } from 'antd';
import { storage } from './../../firebase/index'
const { Meta } = Card;
class ImagePage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
        this.getImage()
    }

    getImage() {
        let { state } = this
        let storageRef = storage.ref();
        let imagesFolder = storageRef.child("images/10-dithering-opt.jpg");
        console.log(imagesFolder.fullPath)
        imagesFolder.getDownloadURL().then(url => {
            console.log(url)
        })

        // storage.ref('images').getDownloadURL().then(url => {
        //     console.log(url);
        //     // this.setState({ images: url })
        // })
    }
    render() {
        return (
            <div className="table" >
                <div className="table-title">
                    Thêm loại tin
                </div>
                <div className="box">
                    <Row gutter={16}>
                        <Col span={6}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card
                                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                                actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
                            >
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

        );
    }
}

export default ImagePage;