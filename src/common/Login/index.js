import { Form, Icon, Input, Button, Checkbox } from "antd";
import React, { useEffect, useState } from "react";

// import getData from "../../utils/api"
import { connect } from "dva";
import { Link } from "dva/router";
import "../../styles/login.less";
import md5 from "md5";


const LoginView = ({ history, user, dispatch, form }) => {
  // console.log(props);
  const [name, setname] = useState("admin");
  const [password, setpassword] = useState("123456");
  const { getFieldDecorator } = form;
  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setname(name);
      setpassword(localStorage.getItem("password"));
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    form.validateFields(async (err, values) => {
      if (!err) {
        if (values.remember) {
          localStorage.setItem("name", values.name);
          localStorage.setItem("password", values.password);
        } else {
          localStorage.clear();
        }
        values.password = md5(values.password);
        const result = await dispatch({
          type: "user/queryUser",
          payload: values
        });


        if (result.code === 0) {
          localStorage.setItem("token", result.data.token);
          history.push("/room");
        }
      }
    });
  };
  console.log(user);

  return (

    <div className="login-room">
      <Form onSubmit={handleSubmit} className="login-form">
        <h2>管理员登陆</h2>
        <Form.Item>
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "请输入账号" }],
            initialValue: name
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="请输入账号"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "请输入密码!" }],
            initialValue: password
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="请输入密码"
            />,
          )}
        </Form.Item>
        <div className="between-room">
          <Form.Item className="margin0">
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true,
            })(<Checkbox>记住密码</Checkbox>)}
          </Form.Item>
          <Link to="/forget" className="span-link margin-b-12">
            忘记密码
          </Link>
        </div>

        <div>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
            </Button>
        </div>
      </Form>
    </div>
  );
};


export default connect((user) => ({
  user
}))(Form.create()(LoginView));
