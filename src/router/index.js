
import React from "react";
import { Route, Router, Switch, Redirect } from "dva/router";

// import { ConfigProvider } from "antd";
// import zhCN from "antd/es/locale/zh_CN";

import dynamic from "dva/dynamic";

const Err = dynamic({
  component: () => import("../common/Error")
});

// const Room = dynamic({
//   component: () => import("../common/Room")
// });

// const Login = dynamic({
//   component: () => import("../common/Login")
// });

// const Forget = dynamic({
//   component: () => import("../common/Forget")
// });

const Test = dynamic({
  component: () => import("../common/Test")
});

const RouterConfig = (dva) => {
  const { history } = dva;
  return (
    // <ConfigProvider locale={zhCN}>
    <Router history={history}>
      <Switch>
        <Redirect exact path="/" to="/test" />
        {/* <Route path="/room" component={Room} /> */}
        {/* <Route exact path="/login" component={Login} /> */}
        {/* <Route exact path="/forget" component={Forget} /> */}
        <Route path="/test" component={Test} />
        {/* <Route path="/completed" exact component={Completed} /> */}
        <Route component={Err} />
      </Switch>
    </Router>
    // </ConfigProvider>
  );
};


export default RouterConfig;
