import React, { Component } from 'react';
import {  Link, NavLink } from 'react-router-dom';
// import logo from "../cc.svg";
import { Button, Header, Icon, Modal } from 'semantic-ui-react';


class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            email: '',
            password: '',
            name: '',
            hasAgreed: false,
            modalOpen: false,
            modalOpen1: false,
            flag:true
        };

        this.handleChange = this.handleChange.bind(this);
       this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleOpen = () => this.setState({ modalOpen: true })
        
    handleClose = () => this.setState({ modalOpen: false })

    handleOpen1 = () => this.setState({ modalOpen1: true })
        
    handleClose1 = () => this.setState({ modalOpen1: false })

    closeAllModal = () => this.setState({modalOpen: false , modalOpen1: false})

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
          [name]: value
        });
    }

    handleSubmit = (e) => {
      e.preventDefault();

      // console.log('The form was submitted with the following data:');
      // console.log(this.state.email);
      // console.log(e.target)
       
     
          //const url = "http://localhost:5000/sent";
          var data = new URLSearchParams();
           for(const pair of new FormData(e.target)){
              // console.log(pair)
             data.append(pair[0],pair[1])
           }

           fetch('/api/data',{
                method:"post",
                body:data,
               
            }).then(res=>res.json())
            .then(res2 => {
                //  console.log(res2)
                // //location.reload()
              res2.forEach(user => {
                if((this.state.email === user.email) ){
                  // console.log('idhar aa raha hai')
                  this.closeAllModal()
                  this.handleOpen1()
                  this.setState({flag:false})
                }
               
                 else{
                
                  this.setState({flag:true})
                }
              });
               
            });

       if ((this.state.hasAgreed ) && (this.state.flag)) {
          fetch('/api/sent',{
              method:"post",
              body:data,
             
          }).then(res=>res.json())
          .then(res2 => {
              // console.log(res2)
              //location.reload()
          }); 

          this.setState({in: true})
          this.props.history.push({pathname:'/home', state: this.state});
          window.location.reload()

        }
        else if (!this.state.hasAgreed){
          this.closeAllModal()
          this.handleOpen()
        }
        else if (!this.state.flag){
          this.closeAllModal()
          this.handleOpen1()
        }
        else{
          // console.log('sab sahi')
        }
      
  }



  // getMeIn =() =>{
  //   // this.state.in ?  <Link to="/home"></Link> : <Link exact to="/"></Link> 
  //  if (this.state.hasAgreed) {
  //   this.setState({in: true})
  //   this.props.history.push({pathname:'/home', state: this.state});
  //   window.location.reload()
  //  } else {
  //   this.props.history.push({pathname:'/sign-up', state: this.state});
  //   window.location.reload()
  //  } 
  // }

    render() {
        return (
        

        <div className="App">
        <div className="App__Aside">
             {/* <img src={logo} alt="ConnectClub" className="App-logo" style={{marginTop:100, marginLeft:170}} /> */}
            <p className='text-title' style={{fontWeight:500, fontSize:80, color:'#2E4158', marginLeft:50}}>Connect Club</p>
        </div>
        <div className="App__Form">
          <div className="PageSwitcher">
              <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
              <NavLink  to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            </div>

                {/* ============================================================================================================ */}


            <div className="FormTitle">
                <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/sign-up" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
            </div>
            <div className="FormCenter">
            <form id="form" onSubmit={(e)=>this.handleSubmit(e)} className="FormFields">
              <div className="FormField">
                <label className="FormField__Label" htmlFor="name">Full Name</label>
                <input type="text" id="name" className="FormField__Input" placeholder="Enter your full name" name="name" value={this.state.name} onChange={(e)=>this.handleChange(e)} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="password">Password</label>
                <input type="password" id="password" className="FormField__Input" placeholder="Enter your password" name="password" value={this.state.password} onChange={(e)=>this.handleChange(e)} />
              </div>
              <div className="FormField">
                <label className="FormField__Label" htmlFor="email">E-Mail Address</label>
                <input type="email" id="email" className="FormField__Input" placeholder="Enter your email" name="email" value={this.state.email} onChange={(e)=>this.handleChange(e)} />
              </div>

              <div className="FormField">
                <label className="FormField__CheckboxLabel">
                    <input className="FormField__Checkbox" type="checkbox" name="hasAgreed" value={this.state.hasAgreed} onChange={(e)=>this.handleChange(e)} /> I agree all statements in <a href="www.google.com" className="FormField__TermsLink">terms of service</a>
                </label>
              </div>

              <div className="FormField">
                {/* <Link to="/home"> */}
                  <button type='submit' className="FormField__Button mr-20" onClick={()=>this.getMeIn}>Sign Up</button>
                {/* </Link>  */}
                  <Link exact to="/" className="FormField__Link">I'm already member</Link>
              </div>
            </form>
          </div>
        </div>

        <Modal
                //  trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
                open={this.state.modalOpen}
                onClose={this.handleClose}
                basic
                centered={true}
                // dimmer={"blurring"}
                size='small'
              >
                <Header icon='browser' content='Alert Message' />
                <Modal.Content>
                  <h3>Make sure you read our terms and services and agree with it !</h3>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='green' onClick={this.handleClose} inverted>
                    <Icon name='checkmark' /> Got it
                  </Button>
                </Modal.Actions>
          </Modal>


          <Modal
                //  trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
                open={this.state.modalOpen1}
                onClose={this.handleClose1}
                basic
                centered={true}
                //dimmer={"blurring"}
                size='small'
              >
                <Header icon='browser' content='Alert Message' />
                <Modal.Content>
                  <h3>This Email address exists !! ...Try another one</h3>
                </Modal.Content>
                <Modal.Actions>
                  <Button color='green' onClick={this.handleClose1} inverted>
                    <Icon name='checkmark' /> Got it
                  </Button>
                </Modal.Actions>
          </Modal>

         
        
      </div>
        );
    }
}
export default SignUp;