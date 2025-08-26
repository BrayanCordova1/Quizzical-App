type TagProps = {
  children?: React.ReactNode
  difficulty?: 'easy' | 'normal' | 'hard'
}

export default function Tag({ children, difficulty }: TagProps) {
  return (
    <div className={`tag ${difficulty ? `tag-${difficulty}` : ''} rounded xs bold`}>
      {children}
    </div>
  )
}