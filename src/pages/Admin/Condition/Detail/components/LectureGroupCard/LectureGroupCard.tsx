import { FC } from 'react'
import {
  CardCollapse,
  CardCollapsePanel,
  CardTitleTypo,
  ContentAddButtonIcon,
  ContentButton,
  ContentContainer,
  ContentTitleTypo,
  Root,
} from './styled'

type LectureGroupCardProps = {
  className?: string
}

export const LectureGroupCard: FC<LectureGroupCardProps> = ({ className }) => {
  return (
    <Root className={className}>
      <CardCollapse>
        <CardCollapsePanel header={<CardTitleTypo>{'EAS1'}</CardTitleTypo>} key={`lecture_condition_card_`}>
          <ContentContainer>
            <ContentTitleTypo>선이수 강의</ContentTitleTypo>
            <ContentButton type={'primary'}>
              선이수 강의 추가 <ContentAddButtonIcon />
            </ContentButton>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
