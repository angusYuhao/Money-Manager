import React from 'react';
import {Redirect} from 'react-router';

class Spendings extends React.Component {

  render() {

    const { loggedIn } = this.props

    return (

      loggedIn ?

        < div > This is the Spendings page: D </div >
        : <Redirect to="/login" /> 

    )

  }

}

export default Spendings;