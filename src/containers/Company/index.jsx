import React, { PureComponent } from 'react';
import Layout from '../Layout';
import { connect } from 'react-redux';
import { companySelector } from '../../selectors';
import { createCompany, readCompany, updateCompany, deleteCompany } from '../../actions';
import Button from '../../components/Button';
import { Confirm } from '../../components/Confirm';
import Pagination from '../../components/Pagination';
import { useSuccessNotification, useDangerNotification } from '../../hooks/useNotification';
import Search from '../../components/Search';
import moment from 'moment';
import { CompanyModal } from '../../components/Company/CompanyModal';

const LIMIT_ROWS = 10;
class Company extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			page: 1,
			modal: false,
			isEdit: false,
			toEdit: {},
			toDelete: {},
			filter: '',
			confirmDelete: false
		};
	}
	componentDidMount() {
		this.handleReadCompany();
	}
	handleReadCompany(filter = '') {
		this.props.readCompany({
			variables: {
				filter,
				limit: LIMIT_ROWS,
				page: this.state.page
			},
			callback: () => {}
		});
	}
	renderRows() {
		return (this.props.companyList || []).map((company, idx) => {
			return (
				<tr key={`area_${idx}`}>
					<td>{company.name}</td>
					<td>
						{company.status ? (
							<span className="tag is-link">Activo</span>
						) : (
							<span className="tag is-danger">Inactivo</span>
						)}
					</td>
					<td>{moment.unix(company.createdAt).format('MM/DD/YYYY HH:mm:ss')}</td>
					<td>
						<div className="buttons">
							<Button
								icon="edit"
								className="is-info has-tooltip-primary"
								tooltip="Editar"
								onClick={this.handleOpenModal.bind(this, true, company)}
							/>
							<Button
								icon="trash"
								className="is-danger has-tooltip-primary"
								tooltip="Eliminar"
								onClick={this.openDeleteConfirmation.bind(this, company)}
							/>
						</div>
					</td>
				</tr>
			);
		});
	}
	openDeleteConfirmation(company) {
		this.setState({
			toDelete: company,
			confirmDelete: true
		});
	}
	handleOpenModal(isEdit = false, company = {}) {
		isEdit ? this.setState({ isEdit, toEdit: company, modal: true }) : this.setState({ modal: true });
	}
	onChangePage(page) {
		if (page != this.state.page) {
			this.setState(
				{
					page
				},
				() => {
					this.handleReadCompany();
				}
			);
		}
	}
	handleDeleteCompany(isSuccess) {
		if (isSuccess) {
			this.props.deleteCompany({
				variables: {
					companyId: this.state.toDelete.companyId
				},
				callback: (statusCode) => {
					this.handleReadCompany(this.state.filter);
					this.setState(
						{
							confirmDelete: false,
							toDelete: {}
						},
						() => {
							if (statusCode == 200) {
								useSuccessNotification({ title: 'Eliminado', message: 'Se elimino correctamente.' });
							}
						}
					);
				}
			});
		} else {
			this.setState({
				confirmDelete: false,
				toDelete: {}
			});
		}
	}
	handleSearch(filter) {
		this.setState({ filter });
		this.handleReadCompany(filter);
	}
	handleUpdateCompany(company, files) {
		this.props.updateCompany({
			files,
			variables: {
				companyId: company.companyId,
				input: company
			},
			callback: (statusCode) => {
				this.handleReadCompany(this.state.filter);
				this.handleCallbackModal(false);
				if (statusCode == 200) {
					useSuccessNotification({ title: 'Actualizdo', message: 'Se actualizo correctamente.' });
				}
			}
		});
	}
	handleCreateCompany(company, files) {
		this.props.createCompany({
			files,
			variables: {
				input: company
			},
			callback: (statusCode) => {
				this.handleReadCompany(this.state.filter);
				this.handleCallbackModal(false);
				if (statusCode == 201) {
					useSuccessNotification({ title: 'Creado', message: 'Se creo correctamente.' });
				}
			}
		});
	}
	handleCallbackModal(isSuccess, company = {}, files = []) {
		if (isSuccess) {
			this.state.isEdit ? this.handleUpdateCompany(company, files) : this.handleCreateCompany(company, files);
		} else {
			this.setState({ modal: false, toEdit: {}, isEdit: false });
		}
	}
	render() {
		return (
			<Layout>
				<div className="main-section">
					<div className="controls">
						<div className="buttons">
							<Button
								className="is-info"
								label="Crear Compañia"
								onClick={this.handleOpenModal.bind(this)}
							/>
						</div>
						<div>
							<Search callback={this.handleSearch.bind(this)} />
						</div>
					</div>
					<div>
						<table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
							<thead>
								<tr>
									<th>Nombre</th>
									<th>Estado</th>
									<th>Fecha de Creación</th>
									<th>Opciones</th>
								</tr>
							</thead>
							<tbody>{this.renderRows()}</tbody>
						</table>
						<Pagination
							totalPages={Math.ceil(this.props.companyCount / LIMIT_ROWS)}
							currentPage={this.state.page}
							onChangePage={this.onChangePage.bind(this)}
						/>
					</div>
				</div>
				{this.state.modal && (
					<CompanyModal callback={this.handleCallbackModal.bind(this)} company={this.state.toEdit} />
				)}
				{this.state.confirmDelete && (
					<Confirm text="Confirme para eliminar" callback={this.handleDeleteCompany.bind(this)} />
				)}
			</Layout>
		);
	}
}

const mapStateToProps = (state) => {
	const companyState = companySelector(state);
	return {
		...companyState
	};
};
const mapDispatchToProps = {
	createCompany,
	readCompany,
	updateCompany,
	deleteCompany
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
