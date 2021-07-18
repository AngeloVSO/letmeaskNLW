import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";

import Home from "./pages/Home";
import NewRoom from "./pages/NewRoom";

function App() {

  return (
    <Router>
      <AuthContextProvider>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </Router>
  );
}

export default App;
