import { ConditionCategoryType } from 'types/lecture'

export const getConditionCategoryItemById = (id: ConditionCategoryType) => {
  if (id === '교양_글로벌의사소통_글쓰기') {
    return { id, label: '교양 > 글로벌의사소통 > 글쓰기' }
  }
  if (id === '교양_글로벌의사소통_영어') {
    return { id, label: '교양 > 글로벌의사소통 > 영어' }
  }
  if (id === '교양_자기탐색과리더십_기업가정신과리더십') {
    return { id, label: '교양 > 자기탐색과리더십 > 기업가정신과리더십' }
  }
  if (id === '교양_자기탐색과리더십_대학생활탐구') {
    return { id, label: '교양 > 자기탐색과리더십 > 대학생활탐구' }
  }
  if (id === '교양_자기탐색과리더십_자아성찰') {
    return { id, label: '교양 > 자기탐색과리더십 > 자아성찰' }
  }
  if (id === '기본소양/학문기초_B') {
    return { id, label: '기본소양/학문기초 > B' }
  }
  if (id === '기본소양/학문기초_S') {
    return { id, label: '기본소양/학문기초 > S' }
  }
  if (id === '기본소양/학문기초_M') {
    return { id, label: '기본소양/학문기초 > M' }
  }
  if (id === '전공') {
    return { id, label: '전공' }
  }

  return { id, label: '기타' }
}
