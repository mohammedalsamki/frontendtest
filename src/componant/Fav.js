import Axios from 'axios';
import {
    Card, Button, Form, Row, Col, InputGroup, FormControl, FloatingLabel
} from 'react-bootstrap';
// const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

import React, { Component } from 'react'

class Fav extends Component {
    constructor(props) {
        super(props);
        this.state = { dataDB: [], showUpdate: false, ids: '', strDrink: '', strDrinkThumb: '', idDrink: '' }
    }
    componentDidMount = () => {
        // console.log(BACKEND_URL);
        Axios.get(`https://testbacknew.herokuapp.com/fav`).then(res => {
            this.setState({ dataDB: res.data })
        })
    }
    handleDelete = (id) => {
        let ID = id;
        let config = { method: "DELETE", baseURL: `https://testbacknew.herokuapp.com`, url: `/fav/${ID}`, }
        Axios(config).then(response => { this.setState({ dataDB: response.data }) })
    }
    handleNAME = (event) => { this.setState({ strDrink: event.target.value }); }
    handleIMG = (event) => { this.setState({ strDrinkThumb: event.target.value }); }
    handleLEVEL = (event) => { this.setState({ idDrink: event.target.value }); }

    handleUpdate = ( strDrink, strDrinkThumb, idDrink,id) => {
        this.setState({
            showUpdate: true,
            
            strDrink: strDrink,
            strDrinkThumb: strDrinkThumb,
            idDrink: idDrink,
            ids: id
        })
    }
    handleUpdateForm = (e) => {
        e.preventDefault();
        // let ID = id;
        let config = {
            method: "PUT",
            baseURL: `https://testbacknew.herokuapp.com`,
            url: `/fav/${this.state.ids}`,
            data: { 
                strDrink: this.state.strDrink,
                 strDrinkThumb: this.state.strDrinkThumb,
                  showUpdate: this.state.showUpdate 
                }
        }
        Axios(config).then(response => {
             this.setState({ dataDB: response.data }) });
    }






    render() {
        return (
            <div>
                {!this.state.showUpdate ? <br></br> :
                    <Form onSubmit={() => this.handleUpdateForm(this.state.ids)}>
                        <Row className="align-items-center">
                            <Col sm={3} className="my-1">
                                <Form.Label htmlFor="inlineFormInputName" visuallyHidden>
                                    Name
                                </Form.Label>
                                <Form.Control id="inlineFormInputName" placeholder={this.state.strDrink} onChange={this.handleNAME} />
                            </Col>
                            <Col sm={3} className="my-1">
                                <Form.Label htmlFor="inlineFormInputGroupUsername" visuallyHidden>
                                    Username
                                </Form.Label>
                                <InputGroup>
                                    <InputGroup.Text>@</InputGroup.Text>
                                    <FormControl id="inlineFormInputGroupUsername" placeholder={this.state.strDrinkThumb} onChange={this.handleIMG} />
                                </InputGroup>
                            </Col>
                            <Col sm={2} className="my-1">
                                <FloatingLabel onChange={this.handleLEVEL} controlId="floatingTextarea" label={this.state.idDrink} className="mb-3">
                                    <Form.Control as="textarea" />
                                </FloatingLabel>
                            </Col>
                            <Col xs="auto" className="my-1">
                                <Button variant="success" type="submit" >UPDATE ✔️</Button>
                            </Col>
                        </Row>
                    </Form>
                }

                <div className="row">
                    {console.log('DB', this.state.dataDB)}
                    {this.state.dataDB.map(item => {
                        return <>
                            <Card style={{ width: '18rem' }}>
                                <Card.Title>{item.strDrink}</Card.Title>
                                <Card.Img variant="top" src={item.strDrinkThumb} />
                                <Card.Body>
                                    <Card.Text>
                                        {item.idDrink}
                                    </Card.Text>
                                    <Button variant="danger" onClick={() => this.handleDelete(item._id)}>Delete</Button>{' '}
                                    {' '}<Button variant="success" onClick={() => this.handleUpdate(item._id, item.strDrink, item.strDrinkThumb, item.idDrink)}>Update</Button>
                                </Card.Body>
                            </Card>
                        </>
                    })
                    }
                </div>
            

                
            </div >
            
        )
    }
}
export default Fav