import {BrowserRouter, Route, Routes} from "react-router-dom";
import SignupPage from "../src/pages/SignUp.jsx";
import Details from "../src/pages/Home/Details.jsx";
import ValidationHelper from "../utility/ValidationUtility.jsx";
import Login from "../src/pages/Login.jsx";
import File from "../src/pages/FileFolder/File.jsx";

const Webroute = () => {
    if(!ValidationHelper.isLogin()){
        return(
            <BrowserRouter >
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/signup" element={<SignupPage/>}/>
                </Routes>
            </BrowserRouter>
        );

    }else{
        return(
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Details/>}/>
                    <Route path="/file" element={<File/>}/>

                </Routes>
            </BrowserRouter>
        )
    }
};

export default Webroute;