import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Domain from '../Pages/domain'; 
import DomainRegistrationForm from '../Pages/RegistrationForm';
import LoginPage from "../Pages/Login"
import Signup from "../Pages/Signup"
import DomainList from '../Pages/DomainList';
import ContactListPage from '../Pages/ContactList';
import ContactList from '../Pages/ContactsList';
import DetailContactListPage from '../Pages/DetailContactPage';
import FileUpload from '../Pages/UploadFile';
function AppRouter() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<LoginPage/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path="/domain" element={<Domain />} />
          <Route path="/domain/registration/:domainName" element={<DomainRegistrationForm />} />
          <Route path='/domainList' element={<DomainList/>} />
          <Route path='/contactlist' element={<ContactList/>}/>
          <Route path='/contactDetails' element={<ContactListPage/>}/>
          <Route path='/contact-information' element={<DetailContactListPage/>}/>
          <Route path='/upload-file' element={<FileUpload/>}/>
      </Routes>
    </Router>
  );
}

export default AppRouter;
