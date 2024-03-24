import { ConditionListType } from 'types/common'
import { ConditionCategoryListType } from 'types/lecture'

export const defaultConditionCategoryList: ConditionCategoryListType = [
  {
    id: 0,
    label: '영어 강의',
    category: 'english',
  },
  {
    id: 1,
    label: '설계 강의',
    category: 'design',
  },
  {
    id: 2,
    label: '공통 교양',
    category: 'common_refinement',
  },
  {
    id: 3,
    label: 'MSC',
    category: 'msc',
  },
  {
    id: 4,
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
