import { siteConfig } from '@/lib/config'
import CONFIG from '../config'

const HomePoetry = props => {
  const HomePoetryList = siteConfig(
    'HOME_POETRY_LIST',
    ["暗夜中", "渴望一束光的关怀", "在白天", "却更渴望黑洞的吞噬", "因为好奇心，想看看黑暗中有什么"],
    CONFIG
  )
  return (
    <ul>
        {HomePoetryList?.map((poe, index) => (
            <li key={index}>{poe}</li>
        ))}
    </ul>
  )
}
export default Announcement
