import Collapse from '@/components/Collapse'
import DarkModeButton from '@/components/DarkModeButton'
import LazyImage from '@/components/LazyImage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import CONFIG from '../config'
import { MenuItemCollapse } from './MenuItemCollapse'
import { MenuItemDrop } from './MenuItemDrop'
import RandomPostButton from './RandomPostButton'
import SearchButton from './SearchButton'
import { SvgIcon } from './SvgIcon'
import { useRouter } from 'next/router'
/**
 * 顶部导航
 */
const Nav = props => {
  const { post, fullWidth, siteInfo } = props
  const autoCollapseNavBar = siteConfig(
    'NOBELIUM_AUTO_COLLAPSE_NAV_BAR',
    true,
    CONFIG
  )
  const enableColorfulNav = siteConfig(
    'COLORFUL_NAV',
    true,
    CONFIG
  )

  const navRef = useRef(null)
  const sentinalRef = useRef([])

  const router = useRouter();
  // 是否是首页
  const isHome = router.asPath == '' || router.asPath == '/'

  // const handler = ([entry]) => {
  //   if (navRef && navRef.current && autoCollapseNavBar) {
  //     if (!entry?.isIntersecting) {
  //       navRef.current?.classList.add('sticky-nav-full')
  //     } else {
  //       navRef.current?.classList.remove('sticky-nav-full')
  //     }
  //   } else {
  //     navRef.current?.classList.add('remove-sticky')
  //   }
  // }
  // useEffect(() => {
  //   const obvserver = new window.IntersectionObserver(handler)
  //   obvserver.observe(sentinalRef.current)
  //   return () => {
  //     if (sentinalRef.current) obvserver.unobserve(sentinalRef.current)
  //   }
  // }, [sentinalRef])
  return (
    <>
      {/* <div className='observer-element h-4 md:h-12' ref={sentinalRef}></div> */}
              <div
        className={`sticky-nav sticky-nav-full  w-full  bg-opacity-60  mb-2 md:mb-12 ${
          !fullWidth ? 'max-w-4xl px-4' : 'px-4 md:px-24'
        } ${enableColorfulNav? 'nav-colorful border-none' : ''}`}
        id='sticky-nav'
        ref={navRef}>
          <div className='flex justify-between items-center mx-auto  m-auto max-w-[60rem]  py-8 h-6'>
        <div className='flex items-center'>
          <Link href='/' aria-label={siteConfig('TITLE')} className='flex items-center'>
            <div className='h-8 w-8'>
              {/* <SvgIcon/> */}
              {siteConfig('NOBELIUM_NAV_NOTION_ICON') ? (
                <LazyImage
                  src={siteInfo?.icon}
                  width={36}
                  height={36}
                  alt={siteConfig('AUTHOR')}
                />
              ) : (
                <SvgIcon />
              )}
            </div>
            <p className='logo line-clamp-1 overflow-ellipsis ml-2 font-medium text-gray-800 dark:text-gray-300 header-name whitespace-nowrap text-2xl'>
              {siteConfig('TITLE')}
              {/* ,{' '}<span className="font-normal">{siteConfig('DESCRIPTION')}</span> */}
            </p>
          </Link>
          
        </div>
        <NavBar {...props} />
          </div>

      </div>

    </>
  )
}

const NavBar = props => {
  const { customMenu, customNav } = props
  const [isOpen, changeOpen] = useState(false)
  const toggleOpen = () => {
    changeOpen(!isOpen)
  }
  const collapseRef = useRef(null)

  const { locale } = useGlobal()
  let links = [
    {
      id: 2,
      name: locale.NAV.RSS,
      href: '/feed',
      show: siteConfig('ENABLE_RSS') && siteConfig('NOBELIUM_MENU_RSS'),
      target: '_blank'
    },
    {
      icon: 'fas fa-search',
      name: locale.NAV.SEARCH,
      href: '/search',
      show: siteConfig('NOBELIUM_MENU_SEARCH')
    },
    {
      icon: 'fas fa-archive',
      name: locale.NAV.ARCHIVE,
      href: '/archive',
      show: siteConfig('NOBELIUM_MENU_ARCHIVE')
    },
    {
      icon: 'fas fa-folder',
      name: locale.COMMON.CATEGORY,
      href: '/category',
      show: siteConfig('NOBELIUM_MENU_CATEGORY')
    },
    {
      icon: 'fas fa-tag',
      name: locale.COMMON.TAGS,
      href: '/tag',
      show: siteConfig('NOBELIUM_MENU_TAG')
    }
  ]
  if (customNav) {
    links = links.concat(customNav)
  }

  // 如果 开启自定义菜单，则覆盖Page生成的菜单
  if (siteConfig('CUSTOM_MENU')) {
    links = customMenu
  }

  if (!links || links.length === 0) {
    return null
  }

  const router = useRouter();
  return (
    <div className='flex-shrink-0 flex menus'>
      <ul className='hidden md:flex flex-row'>
        {links?.map((link, index) => (
          <MenuItemDrop key={index} link={link} className={`${router.asPath == link.href ? 'text-red-500' : ''}`} />
        ))}
      </ul>
      <div className='md:hidden'>
        <Collapse
          collapseRef={collapseRef}
          isOpen={isOpen}
          type='vertical'
          className='fixed top-16 right-6'>
          <div className='dark:border-black bg-white dark:bg-black rounded border p-2 text-sm'>
            {links?.map((link, index) => (
              <MenuItemCollapse
                key={index}
                link={link}
                onHeightChange={param =>
                  collapseRef.current?.updateCollapseHeight(param)
                }
              />
            ))}
          </div>
        </Collapse>
      </div>

      {siteConfig('NOBELIUM_MENU_DARKMODE_BUTTON') && (
        <DarkModeButton className='text-center p-2 hover:bg-black hover:bg-opacity-10 rounded-full' />
      )}

      {siteConfig('NOBELIUM_MENU_RANDOM_POST') && (
        <RandomPostButton {...props} />
      )}
      {siteConfig('NOBELIUM_MENU_SEARCH_BUTTON') && <SearchButton {...props} />}
      <i
        onClick={toggleOpen}
        className='fas fa-bars cursor-pointer px-5 flex justify-center items-center md:hidden'></i>
    </div>
  )
}

export default Nav
