import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonsDisplay';
import Spinner from './Spinner';

// stateless function component
// const App = () =>{
//     navigator.geolocation.getCurrentPosition(
//         position=>console.log(position),
//         err=>console.log(err) 
//     );
//     return(
//         <div>Hi there!!</div>
//     );
// };
class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = { lat: null, errorMessage: '' };
    //     // navigator.geolocation.getCurrentPosition(
    //         //     // position=>console.log(position),
    //         //     position => {
    //             //         this.setState({ lat: position.coords.latitude });
    //             //     },
    //             //     // err => console.log(err)
    //             //     err => {
    //                 //         this.setState({ errorMesage: err.message })
    //                 //     }
    //                 // );
    // }
    // componentDidMount(){
    //     console.log('My component was rendered to the screen.');
    // }
    // componentDidUpdate(){
    //     console.log('My component was just updated- it rerendered.');
    // }

    //initializaiton
    state = { lat: null, errorMessage: '', time:'' };
    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude }),
            err => this.setState({ errorMesage: err.message })
        );
        setInterval(()=> {
            this.setState({ time : new Date().toLocaleTimeString()})
        },1000)
    }
    render() {
        // return (
        //     <div>
        //     Latitude:{this.state.lat}
        //     <br/>
        //     Error: {this.state.errorMesage}
        //     </div>
        // )
        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>;
        }
        if (!this.state.errorMessage && this.state.lat) {
            return (
                <SeasonDisplay lat={this.state.lat} time={this.state.time} />
            );
        }
        return <Spinner message="Please accept the location request"/>;
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)