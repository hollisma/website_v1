import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { navLinks } from '../config'

const StyledLink = styled(Link)<{ current: string }>`
  display: flex;
  position: relative;
  padding: 0 3vw;
  height: 100%;
  align-items: center;
  font-size: 1.25rem;
  text-decoration: none;
  color: blue;
  transition: all 0.2s ease;
  background-color: #abf;
  ${props =>
    props.current === 'true'
      ? css`
          background: #92a1d6 !important;
          color: #00b;
        `
      : css`
          &:hover {
            -webkit-filter: brightness(93%);
          }
        `}
  p {
    margin: 0;
  }
`

const LinkContainer = styled.div<{ scrolled: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: ${props => (props.scrolled ? '3.5em' : '4.5em')};
  width: 100%;
  z-index: 1;
  background-color: #abf;
  align-items: center;
  transition: all 0.2s ease-out;
  font-weight: 700;
`

const Navbar = ({ location }: any) => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    window.onscroll = () => {
      setScrolled(document.documentElement.scrollTop > 1)
    }
  })

  const pathname = location && location.pathname

  return (
    <LinkContainer scrolled={scrolled}>
      {navLinks.map(({ name, url }) => {
        const urlSub = url.split('/')[1]
        const pathSub = pathname && pathname.split('/')[1]

        return (
          <StyledLink
            to={url}
            key={name}
            current={(urlSub === pathSub).toString()}
          >
            <p>{name}</p>
          </StyledLink>
        )
      })}
    </LinkContainer>
  )
}

export default Navbar
