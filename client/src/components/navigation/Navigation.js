import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { NavLink } from 'react-router-dom';


// eslint-disable-next-line react/prefer-stateless-function
class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: true
    };

    this.toggleDarkMode = this.toggleDarkMode.bind(this);
  }

  toggleDarkMode() {
    const { isDarkMode } = this.state;
    this.setState({
      isDarkMode: !isDarkMode
    });
  }

  render() {
    const { navOptions } = this.props;
    const { isDarkMode } = this.state;
    const { currentTeam } = this.props;

    const themeColor = (isDarkMode) ? 'dark' : 'light';

    return (
      <Navbar collapseOnSelect expand="lg" bg={themeColor} variant={themeColor}>
        <Navbar.Brand as={NavLink} to="/">TEAR</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav " />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {navOptions.primaryLinks.map((primLink) => (
              <Nav.Link
                as={NavLink}
                to={primLink.linkPath}
                key={primLink.index}
              >
                {primLink.linkName}
              </Nav.Link>
            ))}
            {navOptions.dropdownOptions.map((item) => (
              <NavDropdown title={item.linkName} id={item.linkId} key={item.index}>
                {
                  item.subLinks.map((subItem) => (
                    <NavDropdown.Item
                      as={NavLink}
                      to={subItem.linkPath}
                      key={subItem.index}
                    >
                      {subItem.linkName}
                    </NavDropdown.Item>
                  ))
                }
              </NavDropdown>
            ))}
          </Nav>
          <Nav>
            <Nav.Link as={NavLink} to="/">
              {currentTeam}
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} onClick={this.toggleDarkMode}>
              {(isDarkMode) ? 'Light Mode' : 'Dark Mode'}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Navigation.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  navOptions: PropTypes.object.isRequired,
  currentTeam: PropTypes.string
};

Navigation.defaultProps = {
  currentTeam: 'Select a team'
};

function mapStateToProps(state) {
  return {
    currentTeam: state.team.currentTeam.teamName
  };
}

export default connect(
  mapStateToProps
)(Navigation);
