// import React from 'react'
// const axios = require("axios");

// class ReactUploadImage extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//           selectedFile: null
//         }
//     }
//     onChangeHandler=event=>{
//         this.setState({
//           selectedFile: event.target.files[0],
//           loaded: 0,
//         })
//     }
//     onClickHandler = () => {
//         const data = new FormData()
//         data.append('file', this.state.selectedFile)
//         axios.post("http://localhost:3000/course/upload/file", data, { 
//            // receive two    parameter endpoint url ,form data
//        })
//        .then(res => { // then print response status
//      })
//     }

//     render() {
//         return (
//             <div className="container">
//             <div className="row">
//             <div className="col-md-6"></div>
//               <div className="form-group files">
//                 <label>Upload Your File </label>
//                 <input type="file" name="file" onChange={this.onChangeHandler}/>
//               </div> 
//               <button type="button" className="btn btn-success btn-block" 
//               onClick={this.onClickHandler}>Upload</button> 
//         </div>
//     </div>
//         )
//     }
// }

// export default ReactUploadImage
import React from 'react'
const axios = require("axios");

class ReactUploadImage extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:3000/course/upload/file",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    onChange(e) {
        this.setState({file:e.target.files[0]});
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>Image Upload</h1>
                <input type="file" name="image" onChange= {this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}

export default ReactUploadImage