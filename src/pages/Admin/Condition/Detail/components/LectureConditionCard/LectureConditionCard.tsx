import { FC } from 'react'
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
      <CardCollapse size={'large'}>
        <CardCollapsePanel
          header={<CardTitleTypo>{'교양 > 글로벌의사소통 > 글쓰기'}</CardTitleTypo>}
          key={`lecture_condition_card_`}
        >
          <ContentContainer>
            <ContentInput size={'large'} addonBefore={'최소 학점'} />
            <ContentButton type={'primary'} size={'large'}>
              그룹 추가 <ContentAddButtonIcon />
            </ContentButton>
          </ContentContainer>
        </CardCollapsePanel>
      </CardCollapse>
    </Root>
  )
}
