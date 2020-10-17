import React from "react";
import { Route, BrowserRouter as Router, Link } from "react-router-dom";

import "./index.scss";
import ListPage from "./pages/List";
import NewComplaintPage from "./pages/NewComplaint";
import SearchComplaintPage from "./pages/SearchComplaint";

import "./i18n";
import LanguageSelect from "./components/LanguageSelect";
import TopBar from "./@egovernments/components/js/TopBar";
import AppContainer from "./@egovernments/components/js/AppContainer";

// const Header = () => (
//   <>
//     <div className="column">
//       <Link to="/">Home</Link> -&nbsp;
//       <Link to="/new">New</Link> -&nbsp;
//       <Link to="/search">Search</Link> &nbsp;
//       <LanguageSelect />
//     </div>
//   </>
// );

const App = () => {
  return (
    <Router>
      <TopBar />
      <AppContainer>
        <Route exact path="/" component={ListPage} />
        <Route path="/new" component={NewComplaintPage} />
        <Route path="/search" component={SearchComplaintPage} />
        <Route path="/create-complaint" component={SearchComplaintPage} />
      </AppContainer>
    </Router>
  );
};

export default App;
