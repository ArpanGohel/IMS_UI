import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals.js';
import { AuthProvider } from "react-oidc-context";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { oidcConfig } from './security/oidcConfig.js';
import Callback from './security/Callback.jsx';
import ProtectedComponent from './security/ProtectedComponent.jsx';
import PurchaseOrderList from './components/PurchaseOrderList.jsx';
import Footer from './components/footer.jsx';
import AddSupplier from './components/addsupplier.jsx';
import Header from './components/header.jsx';


// AuthProvider is a wrapper component that provides the OpenID Connect functionality to its children.
// Automatically handles much  of the auth flow
// all child components of the auth provider will have access to the same oidc context
// see App.jsx for an example of how to use the useAuth hook to access the oidc context for user info, token, etc
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider {...oidcConfig}>
    <div className="flex flex-col min-h-screen center-content">
      <Header />
      <Router>
        <Routes>
          <Route path="/callback" element={<Callback />} />
          <Route path="/" element={<App />} />
          <Route path="/purchaseOrderList" element={<ProtectedComponent><PurchaseOrderList/></ProtectedComponent>} />
          <Route path="/addSupplier" element={<AddSupplier />}  />
        </Routes>
      </Router>
      <Footer year={new Date().getFullYear()}></Footer>
    </div>
  </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
