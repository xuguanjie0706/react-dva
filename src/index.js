import "./index.css";
import * as serviceWorker from "./serviceWorker";
import dva from "dva";
import {
  createHashHistory,
  // createBrowserHistory
} from "history";

const app = dva({
  history: createHashHistory(),
  // history: createBrowserHistory()
});

app.router(require("./router").default);

app.model(require("./models/user").default);


app.start("#root");
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
