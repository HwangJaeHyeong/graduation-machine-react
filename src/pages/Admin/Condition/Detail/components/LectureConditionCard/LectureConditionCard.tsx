import { FC } from 'react'
import { LectureGroupCard } from '../LectureGroupCard'
import {
  CardCollapse,
  CardCollapsePanel,
  CardTitleTypo,
  ContentAddButtonIcon,
  ContentButton,
  ContentContainer,
  ContentInput,
  Root,
} from './styled'

type LectureConditionCardProps = {
  className?: string
}

export const LectureConditionCard: FC<LectureConditionCardProps> = ({ className }) => {
  return (
    <Root className={className}>
      <CardCollapse>
        <CardCollapsePanel
          header={<CardTitleTypo>{'교양 > 글로벌의사소통 > 글쓰기'}</CardTitleTypo>}
          key={`lecture_condition_card_`}
        >
          <ContentContainer>
            <ContentInput addonBefore={'최소 학점'} />
            <LectureGroupCard />
            <ContentButton type={'primary'}>
              그룹 추가 <ContentAddButtonIcon />
            </ContentButton>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
