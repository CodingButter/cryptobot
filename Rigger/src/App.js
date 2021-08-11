//Import libs
import React from 'react'
import {
  Route,
  Switch,
  useLocation
} from 'react-router-dom/'

//Import pages
import Notes from './pages/Notes/Notes'
import Analitics from './pages/Analitics/Analitics'
import Manager from './pages/Manager/Manager'
import Rigger from './pages/Rigger/Rigger'

//Import components
import MenuBar from './components/MenuBar/MenuBar'

//Import style
import './App.css'
import './themes/Darkula.css'

export default function () {
  return (
    <>
      <nav className="navbar">
        <MenuBar currentPage={useLocation().pathname} />
      </nav>
      <main>
        <Switch>
          <Route exact path="/">
            <Notes />
          </Route>
          <Route path="/analitics">
            <Analitics />
          </Route>
          <Route path="/manager">
            <Manager />
          </Route>
          <Route path="/rigger">
            <Rigger />
          </Route>
        </Switch>
      </main>
    </>
  )
}
