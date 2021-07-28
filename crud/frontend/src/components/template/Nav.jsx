import './Nav.css'
import React from 'react'
import { Link } from 'react-router-dom'

export default props =>
    <aside className="menu-area">
        <nav className="menu">
            {/* Refatorar criando um novo componente chamado
            NavItem e mandar ele para cá!!! */}
            <Link to="/">
                <i className={`fa fa-${props.icon}`}></i> {props.title}
            </Link>
            <Link to="/users">
                <i className={`fa fa-${props.iconS}`}></i> {props.titleS}
            </Link>
        </nav>
    </aside>