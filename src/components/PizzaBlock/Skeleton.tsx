import React from 'react'
import ContentLoader from 'react-content-loader'

const Skeleton: React.FC = (props) => (
  <ContentLoader
    speed={1.5}
    width={280}
    height={465}
    viewBox="0 0 280 465"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="139" cy="115" r="110" />
    <rect x="0" y="251" rx="15" ry="15" width="280" height="27" />
    <rect x="0" y="295" rx="10" ry="10" width="280" height="80" />
    <rect x="0" y="417" rx="13" ry="13" width="109" height="27" />
    <rect x="128" y="409" rx="20" ry="20" width="150" height="40" />
  </ContentLoader>
)

export default Skeleton
