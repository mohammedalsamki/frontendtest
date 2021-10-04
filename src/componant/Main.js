import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios from 'axios';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataApi: [],
        }
    }
    componentDidMount = async() => {
        console.log(BACKEND_URL);
        await axios.get(`https://testbacknew.herokuapp.com/deinks`)
      .then((res) => {
        this.setState({
            dataApi: res.data
        });
        
      })
      console.log(this.state.dataApi)
        // Axios.get(`${BACKEND_URL}/deinks`).then(res => {
        //     this.setState({ dataApi: res.data })
        // })
    }
    handleSubmit = (strDrink, strDrinkThumb) => {
        console.log('WORKED', strDrink, strDrinkThumb);
        let config = {
            method: "POST", baseURL: `https://testbacknew.herokuapp.com`, url: "/fav",
            data: {
                strDrink: strDrink,
                strDrinkThumb: strDrinkThumb,
            }
        }
        axios(config);
    }
    
    render() {
        return (
            <div className="row">
                {console.log('API', this.state.dataApi)}
                {this.state.dataApi.map(item => {
                    return <>
                
                    
                        <Card style={{ width: '18rem' }} >
                            <Card.Title>{item.strDrink}</Card.Title>
                            <Card.Img variant="top" src={item.strDrinkThumb} />
                            <Card.Body>
                               
                                <Button onClick={() => this.handleSubmit(item.strDrink, item.strDrinkThumb)} 
                                variant="danger">Favorite</Button>
                            </Card.Body>
                        </Card>
                    </>
                })
                }
            </div>
        )
    }
}
export default Main