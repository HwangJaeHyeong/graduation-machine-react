import { transform, camelCase, isArray, isObject } from 'lodash'

export const camelizeKey = (obj: Record<string, any>) =>
  transform(obj, (acc, value, key, target) => {
    const camelKey = isArray(target) ? key : isKorean(key) ? key : camelCase(key)

    // @ts-ignore
    acc[camelKey] = isObject(value) ? camelizeKey(value) : value
  })

const isKorean = (sentence: string) => {
  const koreanChecker = /[\u3131-\uD79D]/giu

  return sentence.match(koreanChecker)
}
