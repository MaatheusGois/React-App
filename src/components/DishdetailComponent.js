import React, { Component } from 'react';

import {
  Card, CardImg, CardText, CardBody,
  CardTitle, Breadcrumb, BreadcrumbItem, Button, Row, Modal, ModalHeader, ModalBody,
  Label, Col
} from 'reactstrap';


import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';




const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);



class CommentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false
    };

    this.toggleModal = this.toggleModal.bind(this);

  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }


  handleSubmit(values) {
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
  }

  render() {
    return (
      <div>

        <Row className="form-group">
          <Button color="secondary" size="lg" onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
        </Row>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>

              <Label htmlFor="name">Rating</Label>
              <Row className="form-group">
                <Col md={10}>
                  <Control.select model=".rating" name="rating"
                    className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>


              <Label htmlFor="author">Name</Label>
              <Row className="form-group">
                <Col md={10}>
                  <Control.text model=".author" id="author" name="author"
                    placeholder=" Name"
                    className="form-control"
                    validators={{
                      required, minLength: minLength(3), maxLength: maxLength(15)
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".name"
                    show="touched"
                    messages={{
                      required: 'Required',
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less'
                    }}
                  />
                </Col>
              </Row>

              <Label htmlFor="comment">Comment</Label>
              <Row className="form-group">
                <Col md={10}>
                  <Control.textarea model=".comment" id="comment" name="comment"
                    rows="5"
                    className="form-control" />
                </Col>
              </Row>
              <Button type="submit" value="submit" color="primary">Submit</Button>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}


function RenderComments({ comments, addComment, dishId }) {
  if (comments != null) {

    const dishComments = comments.map(comment => {
      return (
        <div>
          <p>{comment.comment}</p>
          <p>{comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
        </div>
      )
    })
    return (
      <div>
        <h5>
          Comments
            </h5>
        {dishComments}
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    )
  }
  else
    return (
      <div></div>
    );
}
function RenderDish({ dish }) {
  if (dish != null)
    return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>

    );
  else
    return (
      <div></div>
    );
}
const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>

          <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <RenderComments comments={props.comments}
            addComment={props.addComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    </div>
  );
}


export default DishDetail;
