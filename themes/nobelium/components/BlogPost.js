import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import LazyImage from '@/components/LazyImage'

const BlogPost = ({ post }) => {
  const showPageCover = true

return (
  <article
    className={`${showPageCover ? 'flex md:flex-row flex-col-reverse' : ''} replace mb-12 order-b  gap-4  items-stretch pb-[1rem] border-b border-dotted border-gray-300 dark:border-gray-600`}>
          {/* 图片封面 */}
    {showPageCover && (
      <div className='md:w-[28%]  overflow-hidden p-1'>
        <Link href={post?.href} passHref legacyBehavior>
          <LazyImage
            src={post?.pageCoverThumbnail}
            className='w-full h-full object-cover hover:scale-110 duration-200 object-center rounded-sm'
          />
        </Link>
      </div>
    )}
    <div className={`${showPageCover ? 'md:w-[70%] w-full' : ''}`}>
      <h2 className='mb-4'>
        <Link
          href={post?.href}
          className='text-black dark:text-gray-100 text-xl md:text-2xl no-underline hover:underline hover:text-[#f12349] transition-all duration-[300ms] ease-in-out'>
          {siteConfig('POST_TITLE_ICON') && (
            <NotionIcon icon={post.pageIcon} />
          )}
          {post?.title}
        </Link>
      </h2>

      <div className='mb-4 text-sm text-gray-700 dark:text-gray-300'>
        by{' '}
        <a href='#' className='text-gray-700 dark:text-gray-300'>
          {siteConfig('AUTHOR')}
        </a>{' '}
        on {post.date?.start_date || post.createdTime}
        {post.category && (
          <>
            <span className='font-bold mx-1'> | </span>
            <Link
              href={`/category/${post.category}`}
              className='text-gray-700 dark:text-gray-300 hover:underline'>
              {post.category}
            </Link>
          </>
        )}
        {/* <span className="font-bold mx-1"> | </span> */}
        {/* <a href="#" className="text-gray-700">2 Comments</a> */}
      </div>

      {!post.results && (
        <p className='line-clamp-3 text-gray-700 dark:text-gray-400 leading-normal'>
          {post.summary}
        </p>
      )}
      {/* read more */}
      <Link
          href={post?.href}
          className='text-[14px] hover:text-[#f12349] transition-all duration-[300ms] ease-in-out read-more'>
        Read more
        <span className='iconfont icon-right'></span>
        </Link>
      {/* 搜索结果 */}
      {post.results && (
        <p className='line-clamp-3 mt-4 text-gray-700 dark:text-gray-300 text-sm font-light leading-7'>
          {post.results.map((r, index) => (
            <span key={index}>{r}</span>
          ))}
        </p>
      )}
    </div>

  </article>
)


//   const { NOTION_CONFIG } = useGlobal()
//   const showPreview =
//     siteConfig('POST_LIST_PREVIEW', false, NOTION_CONFIG) && post?.blockMap

//   return (
//     <Link href={post?.href} className="flex items-stretch gap-4 border-b border-dotted border-gray-300 dark:border-gray-600 mb-6 md:mb-8 md:pb-8 pb-6">
//   {/* 图片容器 - 使用 object-cover 保持比例 */}
//   <div className="flex-none w-1/3 md:w-1/4 overflow-hidden">
//     <LazyImage
//       src={post?.pageCover}
//       className="w-full h-full object-cover"
//       alt={post.title}
//     />
//   </div>

//   {/* 文章内容 */}
//   <article className="flex-1">
//     <header className="flex flex-col justify-between md:flex-row md:items-baseline">
//       <h2 className="text-lg md:text-xl font-medium mb-2 cursor-pointer text-black dark:text-gray-100">
//         {siteConfig('POST_TITLE_ICON') && (
//           <NotionIcon icon={post.pageIcon} />
//         )}
//         {post.title}
//       </h2>
//       <time className="flex-shrink-0 text-gray-600 dark:text-gray-400">
//         {post?.publishDay}
//       </time>
//     </header>
//     <main>
//       {!showPreview && (
//         <p className="hidden md:block leading-8 text-gray-700 dark:text-gray-300">
//           {post.summary}
//         </p>
//       )}
//       {showPreview && post?.blockMap && (
//         <div className="overflow-ellipsis truncate">
//           <NotionPage post={post} />
//           <hr className="border-dashed py-4" />
//         </div>
//       )}
//     </main>
//     <div>Read More</div>
//   </article>
// </Link>
//   )
}

export default BlogPost
