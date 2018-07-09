import React, { Component } from 'react';
import { Form, Icon, Input, Button, Row, Col, Alert } from 'antd';
import { actLoginRequest } from './../../actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
const FormItem = Form.Item
class Login extends Component {

  constructor(props){
    super(props)
    this.state={
      redirect : false
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        var user = {
          username: values.userName,
          password: values.password
        }
        this.props.onLogin(user)
      }
    });
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.user.isSuccess) {
      this.setState({redirect:true})
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { user } = this.props;
    if(user.items.length > 0){
      console.log("redirect")
    } 
    if(this.state.redirect){
      window.location.href="/"
    }
    return (
      <Row>
        <Col lg={8} offset={8}>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <div className="title">
              ĐĂNG NHẬP
            </div>
            {(user.error != null) ? <Alert banner message="Vui lòng kiểm tra lại tên đăng nhập hoặc mật khẩu" type="error" showIcon /> : ""}
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
            <FormItem style={{ textAlign: "center" }}>
              <Button size="large" loading={user.isLoading} icon="arrow-right" type="primary" htmlType="submit" className="login-form-button">
                Tiếp tục
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
    user: state.auth
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