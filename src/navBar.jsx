// client.jsx
import React from "react";
import ReactDOM from "react-dom";

var contents = app.remote.getCurrentWindow().contents;

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.navbars = [];
        contents.navbar.sections.forEach(element => {
            this.navbars.push(
            <a className="mdl-navigation__link" href=""><i className="mdl-color-text--blue-grey-400 material-icons" role="presentation">assignment</i>{element.title}</a>
        )});
    }

    render() {
        return (
            <nav className="demo-navigation mdl-navigation mdl-color--blue-grey-800">
                {this.navbars}
            </nav>
        )
    }
}

const navBar = document.getElementById('navBar')

ReactDOM.render(<NavBar />, navBar);
