import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

export default function MenuAppBar({ currentPage }) {
  //get the currently active page
  const activePage =
    currentPage === '/'
      ? 'notes'
      : currentPage.replace('/', '')

  //Render the links
  const renderLinks = (active) => {
    const links = {
      notes: {
        label: 'Notes',
        path: '/',
        icon: 'fab fa-neos'
      },
      manager: {
        label: 'Manage Raffles',
        path: '/manager',
        icon: 'fas fa-tasks'
      },
      rigger: {
        label: 'Rigger',
        path: '/rigger',
        icon: 'fas fa-pound-sign'
      },
      analitics: {
        label: 'Analitics',
        path: '/analitics',
        icon: 'fas fa-chart-area'
      }
    }

    //return the links using router Links
    return Object.keys(links).map((key) => {
      //deconstruct the path and label
      const { path, label, icon } = links[key]

      //if the link is he active page merge the active style with the link style
      const isActive =
        key === active ? 'active-nav-item' : ''

      //return the list item with the correct styling
      return (
        <li key={key} id={isActive} className="nav-item">
          <Link className="nav-link" to={path}>
            <span className="link-icon">
              <i className={icon}></i>
            </span>
            <span className="link-text">{label}</span>
          </Link>
        </li>
      )
    })
  }

  //render the menubar links within the ul
  return (
    <ul className="nav-ul">
      <li className="logo">
        <a href="/" className="nav-link">
          <span className="link-text">FEBU</span>
          <span className="link-icon">
            <i className="fas fa-chart-line"></i>
          </span>
        </a>
      </li>
      {renderLinks(activePage)}
    </ul>
  )
}
