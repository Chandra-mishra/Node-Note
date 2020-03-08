import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalTitle from "react-bootstrap/ModalTitle";
import ModalBody from "react-bootstrap/ModalBody";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const PreviewOrder = props => {
  useEffect(() => {
    let taxRate = [];
    let taxType = [];
    let taxValue = [];
    let courseName = [];
    let taxdetails = props.prevOrder;
    // console.log(taxdetai ls);
    // taxdetails.order_date = props.prevOrder
    //   .split("")
    //   .splice(0, 10)
    //   .join("");

    for (let j = 0; j < taxdetails.items.length; j++) {
      for (let i = 0; i < taxdetails.items[j].taxes.length; i++) {
        if (taxdetails.items[j].taxes[i]["tax_type"] === "percentage") {
          taxRate.push(
            <div key={"taxrate" + i + "perc"}>
              {taxdetails.items[j].taxes[i]["tax_value"] + "%"}
            </div>
          );
        } else if (taxdetails.items[j].taxes[i]["tax_type"] === "flat") {
          taxRate.push(
            <div key={"taxrate" + i + "flat"}>
              {taxdetails.items[j].taxes[i]["tax_value"]}
            </div>
          );
        }
      }
    }
    for (let j = 0; j < taxdetails.items.length; j++) {
      for (let i = 0; i < taxdetails.items[j].taxes.length; i++) {
        taxType.push(
          <div key={"taxtype" + i + "_" + j}>
            {taxdetails.items[j].taxes[i]["tax_name"]}
          </div>
        );
      }
    }
    for (let j = 0; j < taxdetails.items.length; j++) {
      for (let i = 0; i < taxdetails.items[j].taxes.length; i++) {
        taxValue.push(
          <div key={"taxdetail" + i + "_" + j}>
            {taxdetails.items[j].taxes[i]["value"]}
          </div>
        );
      }
    }
    for (let j = 0; j < taxdetails.items.length; j++) {
      courseName.push(taxdetails.items[j].course.course_name);
    }
    setOrder({ order: props.prevOrder });
    // setPrevorder({ prevOrder: props.prevOrder });
    SettaxRate({ taxRate: taxRate });
    SettaxType({ taxType: taxType });
    SetaxValue({ taxValue: taxValue });
    SetcourseName({ courseName: courseName });
    console.log(props.showModal);
    return () => {};
  }, [props]);

  const [show, setShow] = useState(false);
  const [order, setOrder] = useState({ order: {} });
  const [taxRate, SettaxRate] = useState([]);
  const [taxType, SettaxType] = useState([]);
  const [taxValue, SetaxValue] = useState([]);
  const [courseName, SetcourseName] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log(order.order.discount,"///////")
  return (
    <>
      <div onClick={props.showModal ? handleShow : handleClose}>
        {" "}
        Preview Order
      </div>
      <Modal size="lg " show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Preview Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="date">
            <p>
              <strong>Order Date: </strong>
              {order.order.order_date}
            </p>
            <p>
              <strong>Order Id: </strong>
              {order.order._id}
            </p>
            <p>
              <strong>Course Name: </strong>
              {courseName.courseName}
            </p>
            <div>
              <div className="addr">
                <p>
                  <strong>Address: </strong>
                  {order.order.billing_address}
                </p>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Base Price</th>
                    <th scope="col">Tax Rate</th>
                    <th scope="col">Tax Type</th>
                    <th scope="col">Tax Value</th>
                    <th scope="col">Discount Value</th>
                    <th scope="col">Final Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td scope="col">{1}</td>
                    <td scope="col">
                      <>{process.env.REACT_APP_CURRENCY}</>
                      {order.order.base_price}
                    </td>
                    <td scope="col">{taxRate.taxRate}</td>
                    <td scope="col">{taxType.taxType}</td>
                    <td scope="col">{taxValue.taxValue}</td>
                    <td scope="col">{order.order.discount}</td>
                    <td scope="col">
                      <>{process.env.REACT_APP_CURRENCY}</>
                      {order.order.final_price}
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="6">Total:</td>
                    <td scope="col">
                      <>{process.env.REACT_APP_CURRENCY}</>
                      {order.order.final_price}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default React.memo(PreviewOrder);
