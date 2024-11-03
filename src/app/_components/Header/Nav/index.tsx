'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { Button } from '../../Button'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'


import classes from './index.module.scss'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showButton, setShowButton] = useState<boolean>(false);

  useEffect(() => {
    // Show button when there is text in the search query
    setShowButton(searchQuery.length > 0);
  }, [searchQuery]);

const handleSearchClick = () => {
    if (searchQuery) {
    console.log(`Searching for: ${searchQuery}`);
    // Implement search functionality
    }
};

  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link}  className={classes.navItem}/>
      })}

      {user && <Link href="/account">Account</Link>}
      {!user && (
        <Button
          el="link"
          href="/login"
          label="Login"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
      {/* {user && <CartLink />} */}
    </nav>
  )
}
