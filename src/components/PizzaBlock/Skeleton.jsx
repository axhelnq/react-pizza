import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton = (props) => (
  <ContentLoader
    className={'pizza-block'}
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="135" r="125" />
    <rect x="0" y="285" rx="10" ry="10" width="280" height="24" />
    <rect x="0" y="334" rx="10" ry="10" width="280" height="88" />
    <rect x="0" y="445" rx="10" ry="10" width="95" height="30" />
    <rect x="121" y="441" rx="25" ry="25" width="155" height="45" />
    <rect x="113" y="457" rx="0" ry="0" width="0" height="23" />
  </ContentLoader>
)

export default Skeleton
