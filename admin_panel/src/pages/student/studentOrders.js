import React from "react";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import ReactHtmlParser from 'react-html-parser';

import moment from "moment";
import userservice from "../../services/userService";
// import orderservice from "../../services/orderService";
import ButtonGroup from 'react-bootstrap/ButtonGroup'

export default class StudentCourses extends React.Component {
  // {courseList:this.stud,totalCount:0,start:0,perPage:15};
  constructor(props) {
    super(props);
    this.stud_id = props.match.params.id;
    this.state = { refresh: false, orderList: [], start: 0 };
    
    this.userserv = new userservice();
    // this.userorderserv = new orderservice();
  }

  componentDidMount() {
    this.getUserOrderList();
  }

  getUserOrderList() {
    this.setState({ refresh: false });
    this.userorderserv.getUserOrder(this.stud_id).then(
      response => {
        if (!response) {
          return (response = []);
        }
        this.setState({
          refresh: true,
          orderList: response.data
        });
      },
      error => {
        alert("Opps! Something went wrong not able to order details.");
      }
    );
  }

  async handleDownload(id,e){
    // setTimeout(
    //     () => {
        const url = window.apiurl+'/create-pdf';
        const data = { id , action:2}; 

        try {
            let token = (window.user ? window.user.token : "no-token");
        // requestOptions.headers['Authorization'] = 'Bearer ' + token;
        const response = await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(data),
            headers: {
            'Content-Type': 'application/json',
            "Authorization" : 'Bearer ' + token 
            }
        });
        const json = await response.blob();
        let blob = new Blob([json], {type: 'application/pdf'});
        let downloadUrl = URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = downloadUrl;
        a.download = "data.pdf";
        document.body.appendChild(a);
        a.click();         
        } catch (error) {
        console.error('Error:', error);
    }
        //},1000);
}
  render() {
    let data = [];
    for(let i = 0;i<this.state.orderList.length;i++){
        if(this.state.orderList[i]['status'] == 0){
            this.state.orderList[i]['status'] = 'Initiated'
        }else if(this.state.orderList[i]['status'] == 1){
            this.state.orderList[i]['status'] = 'Processing'
          }else if(this.state.orderList[i]['status'] == 2){
            this.state.orderList[i]['status'] = 'Success'
          }else if(this.state.orderList[i]['status'] == 3){
            this.state.orderList[i]['status'] = 'Failed'
          }else if(this.state.orderList[i]['status'] == 4){
              this.state.orderList[i]['status'] = 'Cancelled'
          }
        data.push(<tr key = {this.state.orderList[i]._id}>
                    <td>{this.state.start + i + 1}</td>
                    <td><Link to={{pathname:"/orderinvoice/detail/"+this.state.orderList[i]._id}}>{this.state.orderList[i]._id}</Link></td>
                    <td>{this.state.orderList[i]['base_price']}</td>
                    <td>{this.state.orderList[i]['final_price']}</td>
                    <td>{this.state.orderList[i]['status']}</td>
                    <td>{this.state.orderList[i]['order_date'].split("").splice(0 , 10).join("")}</td>
                    <td>
                    {(this.state.orderList[i]['status'] === 'Success')? <ButtonGroup toggle>
                        <Button size="sm" variant="info" onClick ={this.handleDownload.bind(this,this.state.orderList[i]._id)} >Download</Button>
                    </ButtonGroup>:" "}
                   
                    </td>
                </tr>);
    }
    return (
      <div className="address addresslist">
         <Row>
          <Col>
            <div>
              <i
                onClick={() => {
                  window.history.back();
                }}
                className="fa fa-arrow-circle-left fa-3x"
                aria-hidden="true"
              ></i>
            </div>
          </Col>
        </Row>
          <Row>
          <Col sm={6}>
              <h3>Order List</h3>
          </Col>
          {/* <Col sm={5}>
              <SearchBar categories={['User Name']} parentFunction={this.searchOrderList.bind(this)} />
          </Col> */}
          <Col sm={1}>
              <div></div>
          </Col>
      </Row>
      <Row>
          {/* <Col sm={9}>
              <Pagination size="md">{items}</Pagination>
          </Col> */}
          {/* <Col sm={3} className="text-right">
              <Link to={{pathname:"/order/add"}} className="btn btn-primary">Add Order</Link>
          </Col> */}
          <br /><br />
      </Row>
      <Row>
          <Col sm={12}>
              <Table striped bordered hover size="sm">
                  <thead>
                      <tr>
                          <th>#</th>
                          <th>Order Ref</th>
                          <th>Base Price</th>
                          <th>Final Price</th>
                          <th>Status</th>
                          <th>Order Date</th>
                          <th>Action</th>
                          </tr>
                  </thead>
                  <tbody>
                      {data}
                  </tbody>
              </Table>
          </Col>
      </Row>  
      </div>
    );
  }
}
