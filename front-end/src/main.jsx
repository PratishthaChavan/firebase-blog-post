import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Context from './context/context.jsx'
import 'react-quill/dist/quill.bubble.css';
import 'react-tagsinput/react-tagsinput.css';
import { BrowserRouter } from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <>
     <BrowserRouter>
      <Context>
         <App/>
      </Context>
     </BrowserRouter>
  </>
)
