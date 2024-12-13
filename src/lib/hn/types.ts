export interface Story {
  id: number
  title: string
  url?: string
  text?: string
  time: number
  score: number
  by: string
  descendants: number
  type: 'story' | 'job' | 'ask' | 'show'
  kids?: number[]
}

export interface Comment {
  id: number
  text: string
  by: string
  time: number
  kids?: number[]
  parent: number
  deleted?: boolean
  dead?: boolean
}

export type StoryType = 'top' | 'new' | 'best' | 'ask' | 'show' | 'job' 