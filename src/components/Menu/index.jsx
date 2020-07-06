import React, { PureComponent } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from '../Icon';
class Menu extends PureComponent {
	render() {
		return (
			<div className="column is-one-quarter is_background_gray is_fullheight">
				<aside className="aside has-text-white is_fullheight" style={{ padding: '10px' }}>
					<div className="menu-container ps">
						<div className="menu is-menu-main">
							<figure className="image is-128x128 has-centered">
								<img
									src="http://localhost:4500/images/companies/7ece7a58-a675-497d-8940-6837f016b8fa.png"
									alt="Placeholder image"
								/>
							</figure>

							<ul className="menu-list">
								<li className="">
									<NavLink to="/" activeClassName="is-active" className="has-icon" title="Home" exact>
										<Icon name="home" />
										<span className="menu-item-label">Inicio</span>
									</NavLink>
								</li>
								<li className="">
									<NavLink
										to="/company"
										activeClassName="is-active"
										className="has-icon"
										title="Company"
									>
										<Icon name="building" />
										<span className="menu-item-label">Compañias</span>
									</NavLink>
								</li>
							</ul>
						</div>
					</div>
				</aside>
			</div>
		);
	}
}
export default Menu;
