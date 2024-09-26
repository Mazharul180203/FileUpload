import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./assets/css/index.css"
import "./assets/css/bootstrap.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Toaster} from "react-hot-toast";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <Toaster/>
      <App />
  </StrictMode>,
)
