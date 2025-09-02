type TagProps = {
  children?: React.ReactNode
  difficulty?: 'easy' | 'medium' | 'hard'
}

export default function Tag({ children, difficulty }: TagProps) {
  return (
    <div dangerouslySetInnerHTML={{ __html: children as string }} className={`tag ${difficulty ? `tag-${difficulty}` : ''} rounded xs bold`}>
    </div>
  )
}