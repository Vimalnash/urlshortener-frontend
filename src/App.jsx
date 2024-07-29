
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { LandingPage } from './Pages/LandingPage';
import { SignupPage } from './Pages/SignupPage';
import { LoginPage } from './Pages/LoginPage';
import { UserActivateVerifyLinkPage } from './Pages/UserActivateVerifyLinkPage';
import { ResetPassVerifyLinkPage } from './Pages/ResetPassVerifyLinkPage';
import { ResetPasswordPage } from './Pages/ResetPasswordPage';
import { NewPasswordSetPage } from './Pages/NewPasswordSetPage';
import { useAppContext } from './Context/AppContext';
import { CreatedURlsCardReport } from './Pages/Reports/CreatedUrlsReportCards';
import { LongUrlRedirect } from './Pages/LongUrlRedirect';
import { CreatedUrlsReportTable } from './Pages/Reports/CreatedUrlsReportTable';
import { UrlsDashboard } from './Pages/Reports/UrlsDashboard';

function App() {

  const {theme} = useAppContext();
  return (
    <div data-theme={theme}>
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/useractivation" element={<UserActivateVerifyLinkPage />} />
        
        <Route path="/login" element={<LoginPage />} />

        <Route path="/resetpassword" element={<ResetPasswordPage />} />
        <Route path="/resetpasswordlink" element={<ResetPassVerifyLinkPage />} />
        <Route path="/newpassword" element={<NewPasswordSetPage />} />

        <Route path="/:shortname" element={<LongUrlRedirect />} />
        
        <Route path="/user/savedurlscardview" element={<CreatedURlsCardReport />} />
        <Route path="/user/savedurlstableview" element={<CreatedUrlsReportTable />} />
        <Route path="/user/urlsdashboard" element={<UrlsDashboard />} />
      </Routes>
    </div>
  )
}

export default App;
