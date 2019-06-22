import React from 'react';
import './header.css';
import './header-small.css';

class Header extends React.Component {

	constructor(props) {
		super(props);
		// this.state = {
		// 	cates: [],
		// };

		// this.setCategories = this.setCategories.bind(this);
		// this.displayLogo = this.displayLogo.bind(this);
		// this.displayCategories = this.displayCategories.bind(this);
		this.navigateToLogin = this.navigateToLogin.bind(this);
		// this.uploadItem = this.uploadItem.bind(this);
		this.getCookie = this.getCookie.bind(this);
		this.deleteCookie = this.deleteCookie.bind(this);
		this.setLoginOutButton = this.setLoginOutButton.bind(this);

		// this.setCategories();
	}

	navigateToLogin() {
        window.location.href="/login.html";
    }

    // uploadItem() {
    // 	if(this.getCookie("username") != "") {
    // 		window.location.href="/upload_item.html";
    // 	} else {
    // 		window.location.href="/login.html";
    // 	}
    // }

    deleteCookie() {
    	let expire = "Thu, 01 Jan 1970 00:00:00 UTC";
    	document.cookie = "username=; " + expire + "path=/;";
    	window.location.reload();
    }

    setLoginOutButton() {
    	if(this.getCookie("username") != "") {
    		return <input className = "button_link" type="button" value="Logout" onClick={this.deleteCookie} />
    	} else {
    		return <input className = "button_link" type="button" value="Login/Register" onClick={this.navigateToLogin} />
    	}
    }

    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
	}

	// setCategories() {
	// 	axios.get("/Categories").then((res) => {
	// 		if(res.data.length === 0){return;}
	// 		this.setState({
	// 			cates: res.data
	// 		});		
 //        });
 //    }

 //    displayCategories() {
 //    	return(
	// 		this.state.cates.map((element) => {
	// 			return <li key = {element.id.toString()}><a href={"/browse/" + element.id} className="stretched-link"> {element.name} </a></li>
	// 		})
	// 	)
 //    }

	render() {
		return(
			<div className="wrapper">
				<div className="title row align-items-center">
					<div className="logo col-3 text-hide">
						<a href="/homeItem.html" className="logo">Sharing within Bristol</a>
						}
					</div>
					<div className="search col-6">
						<form>
							<input className="search_area" type="search" placeholder="search concerts" />
							<button className="search_button" type="submit" value="search">
								<i className="fas fa-search"></i>
							</button>
						</form>
					</div>
					<div className="login_out col3">
						{this.setLoginOutButton()}
						<button className="like_list_button" type="button">
								<i className="fas fa-heart "></i>
						</button>
					</div>
				</div>
			</div>

		)
	}
}

export default Header;
// ReactDOM.render(<Header />, document.getElementsByTagName('HEADER'));

