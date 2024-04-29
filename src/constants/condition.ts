import { ConditionListType } from 'types/common'
import { ConditionCategoryListType } from 'types/lecture'

export const defaultConditionCategoryList: ConditionCategoryListType = [
  {
    id: 0,
    label: '교양 > 글로벌의사소통 > 글쓰기',
    category: '교양_글로벌의사소통_글쓰기',
  },
  {
    id: 1,
    label: '교양 > 글로벌의사소통 > 영어',
    category: '교양_글로벌의사소통_영어',
  },
  {
    id: 2,
    label: '교양 > 자기탐색과리더십 > 기업가정신과리더십',
    category: '교양_자기탐색과리더십_기업가정신과리더십',
  },
  {
    id: 3,
    label: '교양 > 자기탐색과리더십 > 대학생활탐구',
    category: '교양_자기탐색과리더십_대학생활탐구',
  },
  {
    id: 4,
    label: '교양 > 자기탐색과리더십 > 자아성찰',
    category: '교양_자기탐색과리더십_자아성찰',
  },
  {
    id: 5,
    label: '기본소양/학문기초 > B',
    category: '기본소양/학문기초_B',
  },
  {
    id: 6,
    label: '기본소양/학문기초 > S',
    category: '기본소양/학문기초_S',
  },
  {
    id: 7,
    label: '기본소양/학문기초 > M',
    category: '기본소양/학문기초_M',
  },
  {
    id: 8,
    label: '전공',
    category: '전공',
  },
  {
    id: 9,
    label: '기타',
    category: 'etc',
  },
]

export const defaultConditionList: ConditionListType = defaultConditionCategoryList.map((conditionCategoryItem) => ({
  id: conditionCategoryItem.id,
  title: conditionCategoryItem.label,
  minimumCredit: 0,
  category: conditionCategoryItem.category,
  lectureConditionGroupList: [],
}))
