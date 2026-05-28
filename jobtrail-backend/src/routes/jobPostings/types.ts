export interface JobPostingData {
  object: string
  id: string
  created_time: string
  last_edited_time: string
  created_by: CreatedBy
  last_edited_by: LastEditedBy
  cover: unknown
  icon: Icon
  parent: Parent
  in_trash: boolean
  is_archived: boolean
  is_locked: boolean
  properties: Properties
  url: string
  public_url: string
  archived: boolean
}

export interface CreatedBy {
  object: string
  id: string
}

export interface LastEditedBy {
  object: string
  id: string
}

export interface Icon {
  type: string
  emoji: string
}

export interface Parent {
  type: string
  data_source_id: string
  database_id: string
}

export interface Properties {
  SearchQuery: SearchQuery
  "Created time": CreatedTime
  Company: Company
  JobPostingLink: JobPostingLink
  Position: Position
}

export interface SearchQuery {
  id: string
  type: string
  rich_text: RichText[]
}

export interface RichText {
  type: string
  text: Text
  annotations: Annotations
  plain_text: string
  href: unknown
}

export interface Text {
  content: string
  link: unknown
}

export interface Annotations {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}

export interface CreatedTime {
  id: string
  type: string
  created_time: string
}

export interface Company {
  id: string
  type: string
  url: string
}

export interface JobPostingLink {
  id: string
  type: string
  url: string
}

export interface Position {
  id: string
  type: string
  title: Title[]
}

export interface Title {
  type: string
  text: Text2
  annotations: Annotations2
  plain_text: string
  href: string
}

export interface Text2 {
  content: string
  link: string
}

export interface Annotations2 {
  bold: boolean
  italic: boolean
  strikethrough: boolean
  underline: boolean
  code: boolean
  color: string
}
