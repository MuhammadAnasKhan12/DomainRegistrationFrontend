import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Domain from '../Pages/domain'; 
import DomainRegistrationForm from '../Pages/RegistrationForm';
import PermanentDrawerLeft from '../Component/Drawer';

function AppRouter() {
  return (
    <Router>
      <Routes>
          <Route path="/domain" element={<Domain />} />
          <Route path="/domain/registration/:domainName" element={<DomainRegistrationForm />} />
      </Routes>
    </Router>
  );
}

export default AppRouter;
