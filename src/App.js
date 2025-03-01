import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Thanks from "./components/Thanks";

 
import { Router } from "react-router-dom/cjs/react-router-dom.min";

 


export const config = {
 endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

// function App() {
//   return (

    
   
    
//     <ThemeProvider theme={theme}>
     
//      <Switch>
//     <div className="App">
//       {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
//           {/* <Register /> */}
//           {/* <Login /> */}
          
//           <Route exact path="/" component={Products} />
//     <Route path="/login" component={Login} />
//    <Route  path="/register" component={Register} />
   
//     </div>
//     </Switch>
   

   
//     </ThemeProvider>
//   );
// }
function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
     <Switch>


      <Route path="/register">
        <Register />
      </Route>


      <Route path="/login">
        <Login />
      </Route>
      <Route path="/checkout" component ={Checkout} />
      <Route path="/thanks" component ={Thanks} />
      <Route path="/">
      <Products />
      </Route>
    
      {/* <Checkout />
      </Route> */}


     
      </Switch>   
     
    </div>
  );
}
export default App;
