import { HTMLAttributes } from 'react'

const List = ({
  listType = 'ul',
  children,
  ...rest
}: HTMLAttributes<HTMLOListElement | HTMLUListElement> & {
  listType?: 'ul' | 'ol'
}) => {
  const Tag = listType
  return (
    <Tag
      {...rest}
      className={
        'flex items-center justify-end first:h-12 ' + rest.className || ''
      }
    >
      {children}
    </Tag>
  )
}

export default List
