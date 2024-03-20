// english : 영어 강의, design : 설계 강의, refinement : 교양 강의, msc
export type ConditionCategoryType = 'english' | 'design' | 'common_refinement' | 'msc' | 'etc'
export type ConditionCategoryItemType = {
  id: number
  label: string
  category: ConditionCategoryType
}

export type ConditionCategoryListType = ConditionCategoryItemType[]

export const defaultConditionCategoryList: ConditionCategoryListType = [
  {
    id: 0,
    label: '영어강의',
    category: 'english',
  },
  {
    id: 1,
    label: '설계강의',
    category: 'design',
  },
  {
    id: 2,
    label: '공통교양',
    category: 'common_refinement',
  },
  {
    id: 3,
    label: 'msc',
    category: 'msc',
  },
]
