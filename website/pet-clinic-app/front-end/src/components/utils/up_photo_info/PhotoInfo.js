
const PhotoInfo = (props) => {
  return (
    <div className="photo-info-wrapper flex-row gap-32p falign-center">
      <img src={props.fileURL} alt='mini-upload-icon' />
      <div className="flex-col gap-8p">
        <p>{props.fileName}</p><span>{props.fileSize}Kbytes</span>
      </div>

    </div>
  )
}
export default PhotoInfo