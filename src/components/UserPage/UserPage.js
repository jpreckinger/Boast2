import React, { Component } from 'react';
import { connect } from 'react-redux';
import './UserPage.css';
import ActionMenu from '../ActionMenu/ActionMenu';
import DataChart from '../DataChart/DataChart';

class UserPage extends Component {

//   componentDidMount() {
//     axios.get('/stats/all)
//     .then((response) => {
//         console.log(response.data);
//         this.setState({
//             wins: response.data[0].wins,
//             losses: response.data[0].losses,
//         });
//     })
//     .catch(() => {
//         console.log('error getting stats');
//     })
// }

    componentDidMount() {
      this.props.dispatch({type: 'GET_ALL_DATA'})
    }

    newGameClick = () => {
        this.props.history.push('/addgame')
    }

    render() {
        return (
          <div >
            <div>
              <h1 id="welcome">
                Hello, { this.props.state.user.username }!
              </h1>
            </div>
            <div id="playThis">
              <button onClick={this.newGameClick}>Start New Game</button>
            </div>
            <div id="actionMenu">
              <ActionMenu/>
            </div>
            <div>
              <DataChart />
            </div>
          </div>
        );
    }
}


const mapStateToProps = state => ({state});

export default connect(mapStateToProps)(UserPage);

