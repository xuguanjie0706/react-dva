import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
import getData from "../../utils/api"
import { connect } from "dva"
import "../../styles/login.less"
const { Search } = Input

const ForgetView =({ history, user, dispatch, form }) => {
  // console.log(props);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        getData("user/login", values).then(r => {
          getData("user/editpassword", values).then(r => {
            history.push('/login')
          })
        })
      }
    });
  }
  const { getFieldDecorator } = form
  return (
    <div className="login-room">
      <Form onSubmit={handleSubmit} className="login-form">
      <h2>管理员修改密码</h2>
      <Form.Item>
            {getFieldDecorator('name', {
              rules: [{ required: true, message: '请输入账号' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入账号"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('phone', {
              rules: [{ required: true, message: '请输入手机号码!' }],
            })(
              <Input
                prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入手机号码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('verification', {
              rules: [{ required: true, message: '请输入验证码' }],
            })(
              <Search
              prefix={<Icon type="safety-certificate" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="输入验证码" onSearch={() => this.handleVerification()} enterButton="获取验证码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入新的密码!' }],
            })(
              <Input
                prefix={<Icon type="block" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入新的密码"
              />,
            )}
          </Form.Item>
        

        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={() => history.push('/login')} type="primary" className="login-form-button">
              返回登陆
            </Button>
            <Button type="danger" htmlType="submit" className="login-form-button">
              修改
            </Button>
          </div>
      </Form>
    </div>
  );
}

export default connect((user) => ({
  user
}))(Form.create()(ForgetView)) 