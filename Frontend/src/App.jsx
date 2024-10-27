// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/MainContent';
import Signup from './components/Signup';
import Login from './components/Login';
import Header from './components/Header';
import BookManager from './components/BookManager';
import { UserProvider } from './context/UserContext'; // Import the UserProvider
import RequestManager from './components/RequestManager';
import BrowseBooks from './pages/BrowseBooks';
import UserRequests from './pages/UserRequest';
import EditRequest from './components/EditRequest';
import ReceivedRequests from './pages/RecievedRequests';


function App() {
  return (
    <UserProvider>
      <div className="min-h-screen bg-black text-white">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/list" element={<BookManager />} />
            <Route path="/requests" element={<RequestManager />} />
            <Route path="/browse" element={<BrowseBooks />} />
            <Route path="/Viewrequests" element={<UserRequests />} />
            <Route path="/Viewrequests/edit/:requestId" element={<EditRequest />} />
            <Route path='/recievedRequests' element={<ReceivedRequests/>}></Route>

          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;
