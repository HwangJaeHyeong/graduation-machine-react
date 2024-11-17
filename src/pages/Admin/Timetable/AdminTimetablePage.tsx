import { Header } from 'components/Header'
import { FC } from 'react'
import { Root } from './styled'

type AdminTimetablePageProps = {
  className?: string
}

export const AdminTimetablePage: FC<AdminTimetablePageProps> = ({ className }) => {
  return (
    <Root className={className}>
      <Header type={'ADMIN'} />
    </Root>
  )
}
