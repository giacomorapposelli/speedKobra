// import React from "react";
// import { AlexaForBusiness } from "aws-sdk";

// export default class RegisterForm extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = { error: false };
//         this.resetError = this.resetError.bind(this);
//         this.setError1 = this.setError1.bind(this);
//         this.setError2 = this.setError2.bind(this);
//         this.setError3 = this.setError3.bind(this);
//         this.setError4 = this.setError4.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         this.setState({ [event.target.name]: event.target.value });
//     }

//     handleSubmit(event) {
//         event.preventDefault();

//         axios
//             .post("/register", this.state)
//             .then((response) => {
//                 if (response.data.noMatch) {
//                     this.setState({
//                         noMatch: true,
//                     });
//                 } else {
//                     location.replace("/cart");
//                 }
//             })
//             .catch((err) => {
//                 this.setState({
//                     error: true,
//                 });
//                 const errorMsg = document.querySelector(".reg-error");
//                 setTimeout(() => (errorMsg.style.visibility = "hidden"), 3000);
//                 console.log("error: ", err);
//             });
//     }

//     resetError(event) {
//         event.preventDefault();
//         this.setState({
//             error: false,
//             noMatch: false,
//             shortPW: false,
//         });
//     }

//     setError1(event) {
//         event.preventDefault();
//         this.setState({
//             error1: true,
//             error2: false,
//             error3: false,
//             error4: false,
//         });
//     }

//     setError2(event) {
//         event.preventDefault();
//         this.setState({
//             error2: true,
//             error1: false,
//             error3: false,
//             error4: false,
//         });
//     }

//     setError3(event) {
//         event.preventDefault();
//         this.setState({
//             error3: true,
//             error2: false,
//             error1: false,
//             error4: false,
//         });
//     }

//     setError4(event) {
//         event.preventDefault();
//         this.setState({
//             error4: true,
//             error2: false,
//             error3: false,
//             error1: false,
//         });
//     }

//     render() {
//         if (this.state.counter == 1) {
//             return (
//                 <div className="registration">
//                     <h2 className="reg-title">
//                         REGISTER HERE IN ORDER TO BUY SOMETHING
//                     </h2>
//                     <form onSubmit={this.handleSubmit} className="reg-form">
//                         <input
//                             type="text"
//                             name="firstname"
//                             placeholder="First Name"
//                             required
//                             onChange={this.handleChange}
//                             onFocus={this.resetError}
//                         />
//                         <input
//                             type="text"
//                             name="lastname"
//                             placeholder="Last Name"
//                             required
//                             onChange={this.handleChange}
//                             onFocus={this.resetError}
//                         />
//                         <input
//                             type="email"
//                             name="email"
//                             placeholder="Email"
//                             required
//                             onChange={this.handleChange}
//                             onFocus={this.resetError}
//                         />
//                         <input
//                             type="text"
//                             name="address"
//                             placeholder="Street Name and Number"
//                             required
//                             onChange={this.handleChange}
//                             onFocus={this.resetError}
//                         />
//                         <input
//                             type="text"
//                             name="zip"
//                             placeholder="ZIP"
//                             required
//                             onChange={this.handleChange}
//                             onFocus={this.resetError}
//                         />
//                         <input
//                             type="text"
//                             name="city"
//                             placeholder="City"
//                             required
//                             onChange={this.handleChange}
//                             onFocus={this.resetError}
//                         />
//                         <input
//                             type="text"
//                             name="country"
//                             placeholder="Country"
//                             required
//                             onChange={this.handleChange}
//                             onFocus={this.resetError}
//                         />
//                         <input
//                             type="password"
//                             name="password1"
//                             placeholder="Password"
//                             required
//                             onChange={this.handleChange}
//                             onFocus={this.resetError}
//                         />
//                         <input
//                             type="password"
//                             name="password2"
//                             placeholder="Confirm Password"
//                             required
//                             onChange={this.handleChange}
//                             onFocus={this.resetError}
//                         />
//                         <button className="reg-btn">Register</button>
//                         <p className="already">
//                             Already a member?{" "}
//                             {/* <Link to="/log" className="login-link">
//                                 Log in
//                             </Link> */}
//                         </p>
//                         {this.state.error && (
//                             <p className="reg-error">Email already in use</p>
//                         )}
//                         {this.state.noMatch && (
//                             <p className="reg-error">Passwords don't match</p>
//                         )}
//                     </form>
//                 </div>
//             );
//         } else if (this.state.counter == 1) {
//             return (
//                 <div className="login">
//                     <h2 className="login-title">LOG IN:</h2>
//                     <form onSubmit={this.handleSubmit} className="login-form">
//                         <input
//                             type="email"
//                             name="email"
//                             onChange={this.handleChange}
//                             placeholder="Email"
//                             required
//                             onFocus={this.resetError}
//                         />
//                         <input
//                             type="password"
//                             name="password"
//                             onChange={this.handleChange}
//                             placeholder="Password"
//                             required
//                             onFocus={this.resetError}
//                         />
//                         <button className="reg-btn">Log in</button>
//                         <p className="already">
//                             <Link to="/reset" className="login-link">
//                                 Forgot password?
//                             </Link>
//                         </p>
//                         <p className="already">
//                             <Link to="/store" className="login-link">
//                                 Register here{" "}
//                             </Link>
//                             if you haven't yet.
//                         </p>

//                         {this.state.error && (
//                             <p className="reg-error">
//                                 Email or Password aren't correct
//                             </p>
//                         )}
//                     </form>
//                 </div>
//             );
//         }
//     }
// }
