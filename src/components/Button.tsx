type ButtonProps = {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  children: React.ReactNode
  type?: "primary" | "secondary" | "danger"
  state?: "default" | "disabled"
  htmlType?: "button" | "submit" | "reset"
}

export default function Button({ onClick, children, type = "primary", state = "default", htmlType = "button" }: ButtonProps) {
  return (
    <button disabled={state === "disabled"} onClick={onClick} className={`btn-${type} rounded base`} type={htmlType}>
      {children}
    </button>
  )
}