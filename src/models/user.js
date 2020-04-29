// import getData from "../utils/api";

export default {
  namespace: "user",
  state: {
    userData: {},
    bread: ["", ""],
    auth: []
  },
  effects: {
    // *queryUser({ payload }, { call, put }) {
    // const result = yield getData("user/loginAdmin", payload);
    // if (result.code === 0) {
    //   yield put({
    //     type: "updateUser",
    //     payload: result.data
    //   });
    // }
    // return result;
    // },
    // *checkUser({ payload }, { call, put }) {
    //   const result = yield getData("user/check", payload);
    //   if (result.code === 0) {
    //     yield put({
    //       type: "updateUser",
    //       payload: result.data
    //     });
    //   }
    //   return result;
    // },
    *setBread({ payload }, { put }) {
      yield put({
        type: "updateBread",
        payload
      });
    }
  },
  reducers: {
    updateUser(state, { payload }) {
      return {
        ...state,
        userData: payload,
        auth: (payload._role && payload._role.auth) || []
      };
    },
    updateBread(state, { payload }) {
      return {
        ...state,
        bread: payload
      };
    }
  }
};


