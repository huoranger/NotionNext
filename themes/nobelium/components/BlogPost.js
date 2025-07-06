import NotionIcon from '@/components/NotionIcon'
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import LazyImage from '@/components/LazyImage'
import { BlogPostCardInfo } from './BlogPostCardInfo'
import CONFIG from '../config'

const BlogPost = ({ post, index, showSummary }) => {
  const showPreview =
  siteConfig('HEXO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
if (
  post &&
  !post.pageCoverThumbnail &&
  siteConfig('HEXO_POST_LIST_COVER_DEFAULT', null, CONFIG)
) {
  post.pageCoverThumbnail = siteInfo?.pageCover
}
const showPageCover = true
//   const delay = (index % 2) * 200
console.log(post)
return (
  <div
    className={`${siteConfig('HEXO_POST_LIST_COVER_HOVER_ENLARGE', null, CONFIG) ? ' hover:scale-110 transition-all duration-150' : ''}`}>
      {/* 大图片封面 */}
      {post?.cover == 'big' && showPageCover && (
        <div className='md:w-full overflow-hidden'>
          <Link href={post?.href}>
            <>
              <LazyImage
                priority={index === 1}
                alt={post?.title}
                src={post?.pageCoverThumbnail}
                className='h-60 w-full object-cover object-center group-hover:scale-110 duration-500'
              />
            </>
          </Link>
        </div>
      )}
    <div
      key={post.id}
      data-aos='fade-up'
      data-aos-easing='ease-in-out'
      data-aos-duration='500'
      data-aos-once='false'
      data-aos-anchor-placement='top-bottom'
      id='blog-post-card'
      className={`mb-[2rem] group md:h-56 w-full flex justify-between md:flex-row flex-col-reverse ${!post?.cover && index % 2 === 1 ? 'md:flex-row-reverse' : ''}
                  overflow-hidden border dark:border-black bg-white dark:bg-hexo-black-gray post-item`}>
      {/* 文字内容 */}
      <BlogPostCardInfo
        index={index}
        post={post}
        showPageCover={showPageCover}
        showPreview={showPreview}
        showSummary={showSummary}
      />

      {/* 图片封面 */}
      {post?.cover != 'big' && showPageCover && (
        <div className='md:w-4/12 overflow-hidden'>
          <Link href={post?.href}>
            <>
              <LazyImage
                priority={index === 1}
                alt={post?.title}
                src={post?.pageCoverThumbnail}
                className='h-56 w-full object-cover object-center group-hover:scale-110 duration-500'
              />
            </>
          </Link>
        </div>
      )}
    </div>
  </div>
)


// const showPageCover = true
// console.log(type)
// return (
//   <article
//     className={`${showPageCover ? 'flex md:flex-row flex-col-reverse' : ''} replace mb-12 order-b  gap-4  items-stretch pb-[2.5rem]ß`}>
//           {/* 图片封面 */}
//     {type == 'left' && showPageCover && (
//       <div className='md:w-[28%]  overflow-hidden p-1'>
//         <Link href={post?.href} passHref legacyBehavior>
//           <LazyImage
//             src={post?.pageCoverThumbnail}
//             className='w-full h-full object-cover hover:scale-110 duration-200 object-center rounded-sm'
//           />
//         </Link>
//       </div>
//     )}
//     <div className={`${showPageCover ? 'w-full' : ''}`}>
//       <h2 className='mb-4'>
//         <Link
//           href={post?.href}
//           className='text-black dark:text-gray-100 text-xl md:text-2xl no-underline hover:underline hover:text-[#f12349] transition-all duration-[300ms] ease-in-out'>
//           {siteConfig('POST_TITLE_ICON') && (
//             <NotionIcon icon={post.pageIcon} />
//           )}
//           {post?.title}
//         </Link>
//       </h2>

//       <div className='mb-4 text-sm text-gray-700 dark:text-gray-300'>
//         by{' '}
//         <a href='#' className='text-gray-700 dark:text-gray-300'>
//           {siteConfig('AUTHOR')}
//         </a>{' '}
//         on {post.date?.start_date || post.createdTime}
//         {post.category && (
//           <>
//             <span className='font-bold mx-1'> | </span>
//             <Link
//               href={`/category/${post.category}`}
//               className='text-gray-700 dark:text-gray-300 hover:underline'>
//               {post.category}
//             </Link>
//           </>
//         )}
//         {/* <span className="font-bold mx-1"> | </span> */}
//         {/* <a href="#" className="text-gray-700">2 Comments</a> */}
//       </div>

//       {!post.results && (
//         <p className='line-clamp-3 text-gray-700 dark:text-gray-400 leading-normal'>
//           {post.summary}
//         </p>
//       )}
//       {/* read more */}
//       <Link
//           href={post?.href}
//           className='text-[14px] hover:text-[#f12349] transition-all duration-[300ms] ease-in-out read-more'>
//         Read more
//         <span className='iconfont icon-right'></span>
//         </Link>
//       {/* 搜索结果 */}
//       {post.results && (
//         <p className='line-clamp-3 mt-4 text-gray-700 dark:text-gray-300 text-sm font-light leading-7'>
//           {post.results.map((r, index) => (
//             <span key={index}>{r}</span>
//           ))}
//         </p>
//       )}
//     </div>

//   </article>
// )


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
