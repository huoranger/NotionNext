import Comment from '@/components/Comment'
import Live2D from '@/components/Live2D'
import replaceSearchResult from '@/components/Mark'
import NotionPage from '@/components/NotionPage'
import ShareBar from '@/components/ShareBar'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import { deepClone, isBrowser } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Announcement from './components/Announcement'
import { ArticleFooter } from './components/ArticleFooter'
import { ArticleInfo } from './components/ArticleInfo'
import { ArticleLock } from './components/ArticleLock'
import BlogArchiveItem from './components/BlogArchiveItem'
import BlogListBar from './components/BlogListBar'
import { BlogListPage } from './components/BlogListPage'
import { BlogListScroll } from './components/BlogListScroll'
import Catalog from './components/Catalog'
import { Footer } from './components/Footer'
import JumpToTopButton from './components/JumpToTopButton'
import Nav from './components/Nav'
import SearchNavBar from './components/SearchNavBar'
import CONFIG from './config'
import { Style } from './style'

const AlgoliaSearchModal = dynamic(
  () => import('@/components/AlgoliaSearchModal'),
  { ssr: false }
)

// 主题全局状态
const ThemeGlobalNobelium = createContext()
export const useNobeliumGlobal = () => useContext(ThemeGlobalNobelium)

/**
 * 基础布局 采用左右两侧布局，移动端使用顶部导航栏

 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = props => {
  const { children, post } = props
  const fullWidth = post?.fullWidth ?? false
  const { onLoading } = useGlobal()
  const searchModal = useRef(null)
  // 在列表中进行实时过滤
  const [filterKey, setFilterKey] = useState('')
  const topSlot = <BlogListBar {...props} />
  const router = useRouter()
  const [safeRouter, setSafeRouter] = useState({
    isReady: false,
    asPath: '',
    pathname: ''
  });

  // 获取一级路劲，添加到classList
  useEffect(() => {
    if (router.isReady) {
      setSafeRouter({
        isReady: true,
        asPath: router.asPath,
        pathname: router.pathname
      });
    }
  }, [router.isReady, router.asPath, router.pathname]);
  const firstLevelPath = safeRouter.asPath.split('/')[1] || '/';
  return (
    <ThemeGlobalNobelium.Provider
      value={{ searchModal, filterKey, setFilterKey }}>
      <div
        id='theme-nobelium'
        className={`${siteConfig('FONT_STYLE')} nobelium relative w-full  bg-white dark:bg-[hsl(231,14%,10%)] dark:text-[hsl(69,9%,84%)] min-h-screen flex flex-col scroll-smooth transition-colors duration-500`}>
        <Style />

        {/* 顶部导航栏 */}
        <Nav {...props} />

        {/* 主区 */}
        <main
          id='out-wrapper'
          className={`${firstLevelPath}-page relative m-auto flex-grow w-full transition-all ${!fullWidth ? 'max-w-[46rem] px-4' : 'px-4 md:px-24'}`}>
          <Transition
            show={!onLoading}
            appear={true}
            enter='transition ease-in-out duration-700 transform order-first'
            enterFrom='opacity-0 translate-y-16'
            enterTo='opacity-100'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='opacity-100 translate-y-0'
            leaveTo='opacity-0 -translate-y-16'
            unmount={false}>
            {/* 顶部插槽 */}
            {topSlot}
            {children}
            {post && <Catalog toc={post?.toc} />}
          </Transition>
        </main>

        {/* 页脚 */}
        <Footer {...props} />

        {/* 右下悬浮 */}
        <div className='fixed right-4 bottom-4'>
          <JumpToTopButton />
        </div>

        {/* 左下悬浮 */}
        <div className='bottom-4 -left-14 fixed justify-end z-40'>
          <Live2D />
        </div>

        {/* 搜索框 */}
        <AlgoliaSearchModal cRef={searchModal} {...props} />
      </div>
    </ThemeGlobalNobelium.Provider>
  )
}

/**
 * 首页
 * 首页是个博客列表，加上顶部嵌入一个公告
 * @param {*} props
 * @returns
 */
const LayoutIndex = props => {
  // return <LayoutPostList {...props} topSlot={<Announcement {...props} />} />
  const HomePoetryList = siteConfig(
    'HOME_POETRY_LIST',
  )
  return (
    <div className='poetry text-base w-auto max-w-[26em] mx-auto p-[5em_1em] text-center'>
        {HomePoetryList?.map((poe, index) => (
            <p key={index}>{poe}</p>
        ))}
    </div>
  )
}
/**
 * 文章列表
 */
const LayoutPost = props => {
  return <LayoutPostList {...props} topSlot={<Announcement {...props} />} />
}

/**
 * 博客列表
 * @param {*} props
 * @returns
 */
const LayoutPostList = props => {
  const { posts, topSlot, tag } = props
  const { filterKey } = useNobeliumGlobal()
  let filteredBlogPosts = []
  if (filterKey && posts) {
    filteredBlogPosts = posts.filter(post => {
      const tagContent = post?.tags ? post?.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(filterKey.toLowerCase())
    })
  } else {
    filteredBlogPosts = deepClone(posts)
  }

  return (
    <>
      {topSlot}
      {tag && <SearchNavBar {...props} />}
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} posts={filteredBlogPosts} />
      ) : (
        <BlogListScroll {...props} posts={filteredBlogPosts} />
      )}
    </>
  )
}

/**
 * 搜索
 * 页面是博客列表，上方嵌入一个搜索引导条
 * @param {*} props
 * @returns
 */
const LayoutSearch = props => {
  const { keyword, posts } = props
  useEffect(() => {
    if (isBrowser) {
      replaceSearchResult({
        doms: document.getElementById('posts-wrapper'),
        search: keyword,
        target: {
          element: 'span',
          className: 'text-red-500 border-b border-dashed'
        }
      })
    }
  }, [])

  // 在列表中进行实时过滤
  const { filterKey } = useNobeliumGlobal()
  let filteredBlogPosts = []
  if (filterKey && posts) {
    filteredBlogPosts = posts.filter(post => {
      const tagContent = post?.tags ? post?.tags.join(' ') : ''
      const searchContent = post.title + post.summary + tagContent
      return searchContent.toLowerCase().includes(filterKey.toLowerCase())
    })
  } else {
    filteredBlogPosts = deepClone(posts)
  }

  return (
    <>
      <SearchNavBar {...props} />
      {siteConfig('POST_LIST_STYLE') === 'page' ? (
        <BlogListPage {...props} posts={filteredBlogPosts} />
      ) : (
        <BlogListScroll {...props} posts={filteredBlogPosts} />
      )}
    </>
  )
}

/**
 * 归档
 * @param {*} props
 * @returns
 */
const LayoutArchive = props => {
  const { archivePosts } = props
  return (
    <>
      <div className='mb-10 pb-20 md:py-12 p-3  min-h-screen w-full'>
        {Object.keys(archivePosts).map(archiveTitle => (
          <BlogArchiveItem
            key={archiveTitle}
            archiveTitle={archiveTitle}
            archivePosts={archivePosts}
          />
        ))}
      </div>
    </>
  )
}

/**
 * 文章详情
 * @param {*} props
 * @returns
 */
const LayoutSlug = props => {
  const { post, lock, validPassword } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000

  const commentContainerRef = useRef(null);
  useEffect(() => {
    // 404
    if (!post) {
      setTimeout(
        () => {
          if (isBrowser) {
            const article = document.querySelector('#article-wrapper #notion-article')
            if (!article) {
              router.push('/404').then(() => {
                console.warn('找不到页面', router.asPath)
              })
            }
          }
        },
        waiting404
      )
    }
  }, [post])

  // 修改评论区样式
  useEffect(() => {
  if (!post) return;

  // 使用防抖函数避免频繁执行
  const debounce = (func, delay) => {
    let timer;
    return function() {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, arguments), delay);
    };
  };

  const applyTwikooStyles = () => {
    const twikooContainer = document.querySelector('#twikoo');
    if (!twikooContainer) return;

    // 使用requestAnimationFrame优化性能
    requestAnimationFrame(() => {
      try {
        // 1. 修改表单区域
        const avatar = twikooContainer.querySelector('.tk-submit .tk-avatar');
        if (avatar) avatar.style.display = 'none';

        const previewBtn = twikooContainer.querySelector('.tk-preview');
        if (previewBtn) previewBtn.style.display = 'none';

        const markdownBtn = twikooContainer.querySelector('.__markdown');
        if (markdownBtn) markdownBtn.style.display = 'none';

        const sendBtn = twikooContainer.querySelector('.tk-send');
        if (sendBtn) {
          sendBtn.style.cssText = `
            background: #F44336;
            padding: .5rem 1.5rem;
            border-radius: 4px;
            color: #fff;
            font-size: 14px
          `;
        }

        const actions = twikooContainer.querySelector('.tk-row.actions');
        if (actions) actions.style.marginLeft = '0';

        // 2. 修改文本输入框
        const textarea = twikooContainer.querySelector('textarea');
        if (textarea) {
          textarea.style.cssText = `
            outline: none;
            border: 0;
            border-radius: 3px;
            width: 100%;
            min-height: 140px;
            height: auto;
            line-height: 1.5;
            background-color: #f0f3f8;
            padding: .375rem .75rem;
            overflow: auto;
            resize: none;
            font-size: 15px
          `;
        }

        // 3. 修改元数据输入框
        const metaInputs = twikooContainer.querySelectorAll('.tk-meta-input div');
        metaInputs.forEach(meta => {
          const name = meta.querySelector('div');
          const input = meta.querySelector('input');

          if (name) {
            name.style.display = 'none';
            if (input) input.placeholder = name.innerText;
          }
          
          if (input) {
            input.style.cssText = `
              outline: none;
              background-color: #f4f6fb;
              border-radius: 3px;
              border: 1px solid #f4f6fb;
              padding: .375rem .75rem;
              line-height: 1.5;
              font-size: 14px
            `;
          }
        });

        // 4. 修改评论列表
        const commentContainer = twikooContainer.querySelector('.tk-comments-container');
        if (commentContainer) {
          const avatarList = commentContainer.querySelectorAll('.tk-avatar');
          avatarList.forEach(avatar => {
            avatar.style.borderRadius = '50%';
          });
        }
      } catch (error) {
        console.error('应用样式出错:', error);
      }
    });
  };

  // 防抖处理后的样式应用函数
  const debouncedApplyStyles = debounce(applyTwikooStyles, 100);

  // 立即尝试应用一次
  debouncedApplyStyles();

  // 创建优化的观察器
  const observer = new MutationObserver((mutations) => {
    // 只处理实际变化
    if (mutations.length > 0) {
      debouncedApplyStyles();
    }
  });

  // 限制观察范围，只观察#twikoo及其子元素
  const twikooContainer = document.querySelector('#twikoo');
  if (twikooContainer) {
    observer.observe(twikooContainer, {
      childList: true,
      subtree: true,
      attributes: false, // 不需要观察属性变化
      characterData: false
    });
  }

  return () => {
    observer.disconnect();
  };
}, [post]);

  return (
    <>
      {lock && <ArticleLock validPassword={validPassword} />}

      {!lock && post && (
        <div className='px-2'>
          <>
            <ArticleInfo post={post} />
            <div id='article-wrapper'>
              <NotionPage post={post} />
            </div>
            <ShareBar post={post}/>
            <Comment frontMatter={post} ref={commentContainerRef}/>
            {/* <ArticleFooter /> */}
          </>
        </div>
      )}
    </>
  )
}

/**
 * 404 页面
 * @param {*} props
 * @returns
 */
const Layout404 = props => {
  const router = useRouter()
  useEffect(() => {
    // 延时3秒如果加载失败就返回首页
    setTimeout(() => {
      const article = isBrowser && document.getElementById('article-wrapper')
      if (!article) {
        router.push('/').then(() => {
          // console.log('找不到页面', router.asPath)
        })
      }
    }, 3000)
  }, [])

  return <>
        <div className='md:-mt-20 text-black w-full h-screen text-center justify-center content-center items-center flex flex-col'>
            <div className='dark:text-gray-200'>
                <h2 className='inline-block border-r-2 border-gray-600 mr-2 px-3 py-2 align-top'><i className='mr-2 fas fa-spinner animate-spin' />404</h2>
                <div className='inline-block text-left h-32 leading-10 items-center'>
                    <h2 className='m-0 p-0'>页面无法加载，即将返回首页</h2>
                </div>
            </div>
        </div>
    </>
}

/**
 * 文章分类列表
 * @param {*} props
 * @returns
 */
const LayoutCategoryIndex = props => {
  const { categoryOptions } = props

  return (
    <>
      <div id='category-list' className='duration-200 flex flex-wrap'>
        {categoryOptions?.map(category => {
          return (
            <Link
              key={category.name}
              href={`/category/${category.name}`}
              passHref
              legacyBehavior>
              <div
                className={
                  'hover:text-black dark:hover:text-white dark:text-gray-300 dark:hover:bg-gray-600 px-5 cursor-pointer py-2 hover:bg-gray-100'
                }>
                <i className='mr-4 fas fa-folder' />
                {category.name}({category.count})
              </div>
            </Link>
          )
        })}
      </div>
    </>
  )
}

/**
 * 文章标签列表
 * @param {*} props
 * @returns
 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <>
      <div>
        <div id='tags-list' className='duration-200 flex flex-wrap'>
          {tagOptions.map(tag => {
            return (
              <div key={tag.name} className='p-2'>
                <Link
                  key={tag}
                  href={`/tag/${encodeURIComponent(tag.name)}`}
                  passHref
                  className={`cursor-pointer inline-block rounded hover:bg-gray-500 hover:text-white duration-200 mr-2 py-1 px-2 text-xs whitespace-nowrap dark:hover:text-white text-gray-600 hover:shadow-xl dark:border-gray-400 notion-${tag.color}_background dark:bg-gray-800`}>
                  <div className='font-light dark:text-gray-400'>
                    <i className='mr-1 fas fa-tag' />{' '}
                    {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export {
  Layout404,
  LayoutArchive,
  LayoutBase,
  LayoutCategoryIndex,
  LayoutIndex,
  LayoutPostList,
  LayoutSearch,
  LayoutSlug,
  LayoutTagIndex,
  LayoutPost,
  CONFIG as THEME_CONFIG
}
