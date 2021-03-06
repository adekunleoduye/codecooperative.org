/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useStaticQuery, graphql } from 'gatsby'

import Header from '../Header'
import Footer from '../Footer'
import './layout.scss'
import '../../_assets/css/style.scss'

export const Layout = ({ children, className }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
      sitePage {
        path
      }
    }
  `)

  return (
    <>
      <Header />
      {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
      <div className={`sitePage sitePage-${className}`}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
