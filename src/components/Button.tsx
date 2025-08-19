type ButtonProps = {
  onClick?: () => void
  children: React.ReactNode
  type?: "primary" | "secondary" | "danger"
  state?: "default" | "disabled"
}

export default function Button({ onClick, children, type = "primary", state = "default" }: ButtonProps) {
  return (
    <button disabled={state === "disabled"} onClick={onClick} className={`btn-${type} rounded`}>
      {children}
    </button>
  )
}