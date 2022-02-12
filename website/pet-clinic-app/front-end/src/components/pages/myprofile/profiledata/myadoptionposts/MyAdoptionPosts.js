

const MyAdoptionPosts = () => {
    return (
        <div className="my-great-table falign-center fjust-center flex-row fgap-16p">
            {/* first column */}
            <div className="flex-col fgap-16p ">
                <p className="table-header">View post</p>
                <a  className="margin-bottom"href="/#">click here to view</a>
                <a  className="margin-bottom"href="/#">click here to view</a>
                <a  className="margin-bottom"href="/#">click here to view</a>
            </div>
            {/* second column */}
            <div className="flex-col fgap-16p ">
                <p className="table-header">Created At</p>
                <p className="margin-bottom">13-4-2022 15:00 PM</p>
                <p className="margin-bottom">13-4-2022 15:00 PM</p>
                <p className="margin-bottom">13-4-2022 15:00 PM</p>
            </div>
            {/* third column */}
            <div className="flex-col fgap-16p ">
                <p className="table-header">Delete post</p>
                <a className="margin-bottom" href="/#"><i className="fa-regular fa-trash-can"></i></a>
                <a className="margin-bottom" href="/#"><i className="fa-regular fa-trash-can"></i></a>
                <a className="margin-bottom" href="/#"><i className="fa-regular fa-trash-can"></i></a>
            </div>
            {/* fourth column */}
            <div className="flex-col fgap-16p">
                <p className="table-header">Edit Post</p>
                <a className="margin-bottom" href="/#"><i className="fa-regular fa-pen-to-square"></i></a>
                <a className="margin-bottom" href="/#"><i className="fa-regular fa-pen-to-square"></i></a>
                <a className="margin-bottom" href="/#"><i className="fa-regular fa-pen-to-square"></i></a>
            </div>

             {/* fifth column */}
             <div className="flex-col fgap-16p">
                <p className="table-header">Status</p>
                <a className="margin-bottom" href="/#">Active <i className="fa-regular fa-pen-to-square"></i></a>
                <a className="margin-bottom" href="/#">Closed <i className="fa-regular fa-pen-to-square"></i></a>
                <a className="margin-bottom" href="/#">Closed <i className="fa-regular fa-pen-to-square"></i></a>
            </div>



        </div>
    )
}

export default MyAdoptionPosts