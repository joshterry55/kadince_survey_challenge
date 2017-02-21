import React from 'react';
import { Route, IndexRoute, browserHistory } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import App from './containers/App';
import NoMatch from './components/NoMatch';
import SignIn from './components/SignIn'
import SigningUp from './components/SigningUp'
import Admin from './components/Admin'
import ColorForm from './components/ColorForm'
import AnimalForm from './components/AnimalForm'

const AuthenticatedAccess = UserAuthWrapper({
  authSelector: state => state.user,
  predicate: user => { return user.id },
  FailureComponent: () => <SignIn />,
  wrapperDisplayName: 'UserIsLoggedIn'
})

const AuthWrapper = AuthenticatedAccess( (props) => props.children )

export default (
  <Route>
    <Route path="/" component={App}>
      <Route path='/signin' component={SignIn} />
      <Route path='/signup' component={SigningUp} />
      <Route path='/colorform' component={ColorForm} />
      <Route path='/animalform' component={AnimalForm} />
      <Route component={AuthWrapper}>
        <Route path='/admin' component={Admin} />
      </Route>
      <Route path="*" status={404} component={NoMatch}/>
    </Route>
  </Route>
)
