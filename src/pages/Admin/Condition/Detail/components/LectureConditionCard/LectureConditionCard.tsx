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
  id: number
  name: string
  minimumCredit: number
}

export const LectureConditionCard: FC<LectureConditionCardProps> = ({ className, name, minimumCredit, id }) => {
  return (
    <Root className={className}>
      <CardCollapse>
        <CardCollapsePanel header={<CardTitleTypo>{name}</CardTitleTypo>} key={`lecture_condition_card_${id}`}>
          <ContentContainer>
            <ContentInput addonBefore={'최소 학점'} value={minimumCredit} />
            <LectureGroupCard id={id} />
            <ContentButton type={'primary'}>
              그룹 추가 <ContentAddButtonIcon />
            </ContentButton>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
