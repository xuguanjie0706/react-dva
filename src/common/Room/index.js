import React, {
  // useState,
  useEffect,
  useRef,
  useCallback,
  useMemo
} from "react";
import { connect } from "dva";
import { Layout } from "antd";
import { Route, Switch } from "dva/router";
import dynamic from "dva/dynamic";

import MyHeaderView from "../../widgets/Header";
import SiderView from "../../widgets/Sider";
import "../../styles/base.less";

const { Header, Content, Footer } = Layout;

const HomePage = dynamic({
  component: () => import("../../pages/Home")
});

const UserPage = dynamic({
  component: () => import("../../pages/User")
});

const RolePage = dynamic({
  component: () => import("../../pages/Role")
});

const MenuPage = dynamic({
  component: () => import("../../pages/Menu")
});

// const DevicePage = dynamic({
//   component: () => import("../../pages/Device")
// })

let PageList = [
  {
    component: HomePage,
    path: "/room"
  },
  {
    component: UserPage,
    path: "/room/user"
  },
  {
    component: RolePage,
    path: "/room/role"
  },
  {
    component: MenuPage,
    path: "/room/menu"
  }
];

const RoomView = ({ user, dispatch, history }) => {
  const div = useRef(null);
  const { userData } = user;
  const { name, headimgurl } = userData;

  const initCheck = useCallback(
    () =>
      dispatch({
        type: "user/checkUser"
      }),
    [dispatch]
  );

  useEffect(() => {
    initCheck();
  }, [initCheck]);

  const context = useMemo(() => {
    return (
      <Layout>
        <Header style={{ background: "#fff", padding: 0 }}>
          <MyHeaderView name={name} headimgurl={headimgurl} />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="main-room"
            ref={div}
            style={{ padding: "16px 0px 0px", minHeight: 360 }}
          >
            <Switch>
              {PageList.map(item => (
                <Route
                  key={item.path}
                  exact
                  path={item.path}
                  component={item.component}
                />
              ))}
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    );
  }, [name, headimgurl]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SiderView />
      {context}
    </Layout>
  );
};

export default connect(({ user }) => ({
  user
}))(RoomView);
