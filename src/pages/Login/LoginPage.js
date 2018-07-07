import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col, Alert } from 'antd';
import { actLoginRequest } from './../../actions/index';
import { connect } from 'react-redux';
const FormItem = Form.Item
class Login extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var user = {
          username: values.userName,
          password: values.password
        }
        this.props.onLogin(user)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props;
    return (
      <Row>
        <Col lg={8} offset={8}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="title">
              ĐĂNG NHẬP
            </div>
            
            {/* <Alert message="Success Tips" type="success" showIcon /> */}
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: 'Vui lòng nhập tên đăng nhập' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Tên đăng nhập" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Vui lòng nhập mật khẩu' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Mật khẩu" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Tiếp tục<Icon type="arrow-right" />
              </Button>
            </FormItem>
          </Form>
        </Col>
      </Row>

    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (user) => {
      dispatch(actLoginRequest(user))
    }
  }
}

const WrappedNormalLoginForm = Form.create()(Login);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);