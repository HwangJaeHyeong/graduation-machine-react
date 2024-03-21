import { ConditionCategoryType } from 'types/lecture'

export const getConditionCategoryItemById = (id: ConditionCategoryType) => {
  if (id === 'common_refinement') {
    return { id, label: '공통교양' }
  }
  if (id === 'design') {
    return { id, label: '설계과목' }
  }
  if (id === 'english') {
    return { id, label: '영어과목' }
  }
  if (id === 'msc') {
    return { id, label: 'MSC' }
  }

  return { id, label: '기타' }
}
