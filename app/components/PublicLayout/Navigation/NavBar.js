import React, { Component } from 'react'
import { Nav, Navbar, NavItem, MenuItem } from 'react-bootstrap'
import { Link } from 'react-router'
import activeComponent from 'react-router-active-component'

import { connectHistory } from '../../../utils'

const NavItemLink = activeComponent('li')

const AccountItems = [
  { text: 'Dashboard', to: '/' },
  { text: 'Profile', to: '/' },
  { text: 'All Orders', to: '/' },
  { text: 'Wishlist', to: '/' },
  { text: 'Address', 'to': '/' }
]

class NavBar extends Component {
  renderShopItems() {
    return this.props.categories.map((category, i) => {
      const categoryItems = category.subcategories.map((item, j) => {
        const itemLink = `/shop/${item.id}`
        return <NavItemLink to={ itemLink } key={ i + j }> { item.name }</NavItemLink>
      })

      return (
        <li key={ i } className="col-sm-3 col-xs-12">
          <ul className="list-unstyled">
            <li>{ category.name }</li>
            { categoryItems }
          </ul>
        </li>
      )
    })
  }

  renderAccountItems() {
    return AccountItems.map((item, i) => {
      return <NavItemLink key={ i } to={ item.to }>{ item.text }</NavItemLink>
    })
  }

  checkIfShopIsActive() {
    const { context, categories } = this.props
    return categories.some(item => item.subcategories.some(subitem => context.router.isActive(`/shop/${subitem.id}`)))
  }

  render() {
    const shopsActive = this.checkIfShopIsActive()
    const className = shopsActive ? "active" : null

    return(
      <Navbar>
        <Navbar.Header>
          <a className="navbar-brand" href="javascript:void(0)"><img src="/images/logo.png" alt="" /></a>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>

            <NavItemLink to="/" onlyActiveOnIndex>Home</NavItemLink>

            <li className={`dropdown megaDropMenu ${className}`}>
              <a href="#" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="300" data-close-others="true" aria-expanded="false">Shop</a>
              <ul className="dropdown-menu row">
                <li className="col-sm-3 col-xs-12">
                  <a href="#" className="menu-photo"><img src="http://savepic.ru/10528473.jpg" alt="menu-img" /></a>
                </li>

                { this.renderShopItems() }
              </ul>
            </li>

            <li className="dropdown">
              <a href="javascript:void(0)" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account</a>
              <ul className="dropdown-menu dropdown-menu-right">
                { this.renderAccountItems() }
               </ul>
            </li>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default connectHistory(NavBar)
