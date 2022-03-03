const LoadingSpinner = (props) => {
  return (
    <div 
    style={{ top: props.top, left: props.left}}
    className={`lds-ripple-${props.color}`}><div></div><div></div></div>
  )
}
export default LoadingSpinner