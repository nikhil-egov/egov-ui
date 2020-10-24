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
// import { ReOpen } from "./components/reopen";
// import Reason from "./pages/ReopenComplaint/Reason";
import ReasonPage from "./pages/ReopenComplaint/Reason";
import AddtionalDetails from "./pages/ReopenComplaint/AddtionalDetails";
import UploadPhoto from "./pages/ReopenComplaint/UploadPhoto";

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
          <Route path="/complaint-reopen-reason/:id" component={ReasonPage} />
          <Route
            path="/complaint-reopen-upload-photo/:id"
            component={UploadPhoto}
          />
          <Route
            path="/complaint-reopen-addional-details/:id"
            component={AddtionalDetails}
          />
        </AppContainer>
      </Body>
    </Router>
  );
};

export default App;
