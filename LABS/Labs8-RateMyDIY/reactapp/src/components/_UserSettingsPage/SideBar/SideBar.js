// // Dependencies
// import React, { Component } from 'react';
// import styled from 'styled-components';
// import { NavLink } from 'react-router-dom';
// import { Header } from '../../../components';
// import { fetchSearchResults } from '../../../actions';
// import { connect } from 'react-redux';

// // Styles
// const UserSettingSideBarContainer = styled.nav`
//   display: flex;
//   flex-direction: column;
//   width: 150px;
//   min-height: 20%;
//   background: #fff;
//   border: 3px solid black;
//   border-radius: 4px;
//   margin-top: 98px;
// `;

// const UserSettingLink = styled(NavLink)`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   height: 24px;
//   padding: 0px 6px;
//   font-size: 18px;
//   color: black;
//   text-decoration: none;
//   /* onHover Attributes */
//   &:hover {
//     background: lightblue;
//     transition-duration: 0.1s;
//     cursor: pointer;
//   }
// `;

// class UserSettingSideBar extends Component {
//   // State management to supply link names/addresses to the sidebar.
//   state = {
//     userSettingSidebarLinks: [
//       'summaries',
//       'positions',
//       'education',
//       'skills',
//       'resumes',
//       'settings'
//     ],
//     input: ''
//   };
//   // Takes a string and converts the first character to uppercase.
//   firstLetterUppercase = navLinkTitle => {
//     return navLinkTitle.charAt(0).toUpperCase() + navLinkTitle.slice(1);
//   };

//   handleChange = e => {
//     this.setState({ ...this.state, input: e.target.value });
//   };

//   handleSearch = e => {
//     e.preventDefault();
//     const searchTerm = this.state.input;
//     console.log(searchTerm);
//     //call featch search results action
//     //push to search page
//     this.props.fetchSearchResults(searchTerm);
//     this.props.history.push(`/search?query=${searchTerm}`);
//   };

//   render() {
//     return (
//       <div>
//         <Header
//           handleChange={this.handleChange}
//           handleSearch={this.handleSearch}
//         />
//         <UserSettingSideBarContainer>
//           {/* Maps through this.state.userSettingSidebarLinks and generates sidebar links from the array. */}
//           {this.state.userSettingSidebarLinks.map(link => (
//             <UserSettingLink
//               to={'/settings/' + link}
//               activeClassName="selected"
//               activeStyle={{
//                 fontWeight: 'bold',
//                 background: 'lightgrey'
//               }}
//               key={link}
//             >
//               {this.firstLetterUppercase(link)}
//             </UserSettingLink>
//           ))}
//         </UserSettingSideBarContainer>
//       </div>
//     );
//   }
// }


// const mapStateToProps = state => {
//   return {
    
//   };
// };

// export default connect(
//   mapStateToProps,
//   {fetchSearchResults }
// )(UserSettingSideBar);
