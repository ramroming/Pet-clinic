const InputError = (props) => {
  return (
    <span style={props.style} className={props.class}>{props.msg}</span>
  )
}

export default InputError