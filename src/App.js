import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";

import "./index.scss";
import ListPage from "./pages/List";
import NewComplaintPage from "./pages/NewComplaint";
import SearchComplaintPage from "./pages/SearchComplaint";
import CreateComplaintPage from "./pages/CreateComplaint";
import ComplaintsPage from "./pages/Complaints";
import ComplaintDetailsPage from "./pages/ComplaintDetails";

import "./i18n";
//import LanguageSelect from "./components/LanguageSelect";
import TopBar from "./@egovernments/components/js/TopBar";
import Body from "./@egovernments/components/js/Body";

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
      <Body>
        <TopBar />
        <AppContainer>
          <Route exact path="/" component={ListPage} />
          <Route path="/new" component={NewComplaintPage} />
          <Route path="/search" component={SearchComplaintPage} />
          <Route path="/create-complaint" component={CreateComplaintPage} />
          <Route path="/complaints" component={ComplaintsPage} />
          <Route
            path="/complaint-details/:id"
            component={ComplaintDetailsPage}
          />
        </AppContainer>
      </Body>
    </Router>
  );
};

export default App;
