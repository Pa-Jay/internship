import './App.css';
import Main from './dashboard/Main';
import { useEffect } from 'react'
import {BrowserRouter as Router, 
  Routes, Route} from 'react-router-dom'
import React from "react";
import Auth from './auth';
import Login from './auth/login'
import SignUp from './auth/signup'
import ResetPassword from './auth/password/ResetPassword';
import ForgotPassword from './auth/password/ForgotPassword';
import EmailInstruction from './auth/password/EmailInstruction';
import Appointments from './dashboard/components/appointments';
import DashHome from './dashboard/components/Home';
import ViewAppointment from './dashboard/components/appointments/view';
import ScheduleAppointment from './dashboard/components/appointments/schedule';
import EditAppointment from './dashboard/components/appointments/edit';
import Settings from './dashboard/components/settings/setting';
import Service from './dashboard/components/settings/services/Service';
import MainProfile from './dashboard/components/settings/profile/Profile';
import Password from './dashboard/components/settings/password';
import Utility from './dashboard/components/Utility/Utility';
import Users from './dashboard/components/users';
import BecomeADetailer from './dashboard/components/Detailer/BecomeADetailer';
import EditProfile from './dashboard/components/settings/profile/EditProfile';
import ProtectedRoute from './routing/ProtectedRoute';
import AddService from './dashboard/components/settings/services/AddService';
import DetailerProfile from './dashboard/components/Detailer/DetailerProfile';
import Landing from './Home/Landing';


function App() {

  return (
      <div className="App">
      <Router>
          <Routes>
            <Route path='/' element={<Landing />}></Route>
            <Route path="" element={<Auth />}>
              <Route path="signup" element={<SignUp/>} />
              <Route path="login" element={<Login />}/>
              <Route path='reset-password' element={<ResetPassword />} />
              <Route path='forgot-password' element={<ForgotPassword />} />
              <Route path='email-instructions' element={<EmailInstruction />} />
            </Route>
            <Route path="" element={<ProtectedRoute />}>
              <Route path='' element={<Main />}>
                <Route path='dashboard' element={<DashHome />}></Route>
                <Route path='users' element={<Users />}></Route>
                <Route path="detailer">
                  <Route path="become-a-detailer" element={<BecomeADetailer />}></Route>
                </Route>
                <Route path='appointment' >
                  <Route path='' element={<Appointments />}></Route>
                  <Route path='view' element={<ViewAppointment />}></Route>
                  <Route path='edit' element={<EditAppointment />}></Route>
                  <Route path='create' element={<ScheduleAppointment />}></Route>
                </Route>
                {/* <Route path="chat/:name/:room"  element={<Chat socket={socket}/>} /> */}
                <Route path='setting'>
                  <Route path='' element={<Settings />}>
                    <Route path='edit-profile/:id' element={<EditProfile />}></Route>
                    <Route path='services' element={<Service />}></Route>
                    <Route path='add-service' element={<AddService />}></Route>
                    <Route path='password' element={<Password />}></Route>
                  </Route>
                </Route>
                <Route path='profile' element={<MainProfile />}></Route>
                <Route path='agent-profile' element={<DetailerProfile />}></Route>
                <Route path='utilities' element={<Utility />}></Route>
              </Route>
              <Route path=''>
                {/* <Route path='profile'>
                  <Route path='' element={<Profile />} />
                </Route> */}
              </Route>
            </Route>
          </Routes>
        </Router>
      </div>
    // </SocketsProvider>
  );
}

export default App;
