type MajorItemType = {
  code: string
  label: string
}

type MajorListType = MajorItemType[]

export const majorList: MajorListType = [
  {
    code: 'CSE',
    label: '컴퓨터공학전공',
  },
]

export type AvailableMajorType = 'CSE'
