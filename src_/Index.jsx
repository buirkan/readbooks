import React from 'react'
import ReactDOM from 'react-dom'
import Book from './components/book/Book'
import * as serviceWorker from './serviceWorker'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome/css/font-awesome.min.css'
import './components/template/custom.css'

ReactDOM.render(
    <React.StrictMode>
        <div className="container-fluid">
            <Book />
        </div>
    </React.StrictMode>
    , document.getElementById('root'))
serviceWorker.unregister()