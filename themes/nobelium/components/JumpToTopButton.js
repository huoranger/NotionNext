import { useGlobal } from '@/lib/global'
import { useState, useEffect } from 'react'
/**
 * 跳转到网页顶部
 * 当屏幕下滑500像素后会出现该控件
 * @param targetRef 关联高度的目标html标签
 * @param showPercent 是否显示百分比
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToTopButton = () => {
  const { locale } = useGlobal()

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 检查页面是否有滚动条
      const hasScrollbar = document.documentElement.scrollHeight > window.innerHeight;
      
      // 检查是否已滚动到顶部
      const isAtTop = window.scrollY === 0;
      
      // 只有页面有滚动条且不在顶部时才显示按钮
      setShowButton(hasScrollbar && !isAtTop);
    };

    // 初始检查
    handleScroll();

    // 添加事件监听
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    // 清理函数
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!showButton) {
    return null;
  }
  return <div title={locale.POST.TOP} className='cursor-pointer p-2 text-center' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    ><i className='fas fa-angle-up text-2xl' />
    </div>
}

export default JumpToTopButton
