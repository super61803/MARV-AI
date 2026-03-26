import React from 'react'

const BeforeLogin: React.FC = () => {
  return (
    <div>
      <p>
        <b>Welcome to MARV AI.</b>
        {
          ' This is the Payload admin sign-in. Admins manage the Marv Tech API list, catalog data, and related content here. '
        }
        {'Customers sign in on the storefront to use accounts, carts, and orders — see your front-end '}
        <a href={`${process.env.PAYLOAD_PUBLIC_SERVER_URL}/login`}>login page</a>
        {' when it is exposed publicly.'}
      </p>
    </div>
  )
}

export default BeforeLogin
