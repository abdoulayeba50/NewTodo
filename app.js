class JemmaCoder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            newUser: {
                prenom: "",
                nom: "",
                email: "",
                telephone: "",
            },
            isModifying: false,
            selectedUserIndex: null,
        };
        this.addPerson = this.addPerson.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.modifyUser = this.modifyUser.bind(this);
        this.saveModification = this.saveModification.bind(this);
    }

    handleChangePrenom = (e) => {
        this.setState({
            newUser: {
                ...this.state.newUser,
                prenom: e.target.value,
            },
        });
    }

    handleChangeNom = (e) => {
        this.setState({
            newUser: {
                ...this.state.newUser,
                nom: e.target.value,
            },
        });
    }

    handleChangeEmail = (e) => {
        this.setState({
            newUser: {
                ...this.state.newUser,
                email: e.target.value,
            },
        });
    };

    handleChangeTelephone = (e) => {
        this.setState({
            newUser: {
                ...this.state.newUser,
                telephone: e.target.value,
            },
        });
    }

    addPerson = (e) => {
        e.preventDefault();

        if (
            this.state.newUser.prenom.trim() === "" ||
            this.state.newUser.nom.trim() === "" ||
            this.state.newUser.telephone.trim() === "" ||
            this.state.newUser.email.trim() === ""
        ) {
            alert("Veuillez remplir tous les champs avant d'ajouter un utilisateur.");
            return;
        }

        if (this.state.isModifying) {
            this.saveModification();
        } else {
            this.setState((prevState) => ({
                users: [...prevState.users, this.state.newUser],
                newUser: {
                    prenom: "",
                    nom: "",
                    email: "",
                    telephone: "",
                },
            }));
        }
    }

    deleteUser = (index) => {
        this.setState((prevState) => ({
            users: prevState.users.filter((user, i) => i !== index),
        }));
    }

    modifyUser = (index) => {
        const selectedUser = this.state.users[index];
        this.setState({
            isModifying: true,
            selectedUserIndex: index,
            newUser: { ...selectedUser },
        });
    }

    saveModification = () => {
        const { selectedUserIndex, newUser } = this.state;
        const updatedUsers = [...this.state.users];
        updatedUsers[selectedUserIndex] = newUser;

        this.setState({
            users: updatedUsers,
            isModifying: false,
            selectedUserIndex: null,
            newUser: {
                prenom: "",
                nom: "",
                email: "",
                telephone: "",
            },
        });
    }

    render() {
        return (
            <div>
                <h4 className='text-center mt-3'>JemmaCoder Gestion D'utilisateur</h4>
                <form className='container w-50 shadow' style={{ width: '75%', height: '210px', borderRadius: '10px' }}>
                    <div className='row mt-3 d-flex justify-content-around'>
                        <div className='col-12 col-md-6 pt-3 text start d-flex flex-column'>
                            <label>Prenom</label>
                            <input
                                type="text"
                                placeholder=""
                                value={this.state.newUser.prenom}
                                onChange={this.handleChangePrenom}
                            />
                        </div>

                        <div className='col-12 col-md-6 pt-3 text start d-flex flex-column'>
                            <label>Nom</label>
                            <input
                                type="text"
                                placeholder=""
                                value={this.state.newUser.nom}
                                onChange={this.handleChangeNom}
                            />
                        </div>
                    </div>

                    <div className='row mt-3 d-flex justify-content-around'>
                        <div className='col-12 col-md-6 text start d-flex flex-column'>
                            <label>Email</label>
                            <input
                                type="text"
                                placeholder=""
                                value={this.state.newUser.email}
                                onChange={this.handleChangeEmail}
                            />
                        </div>

                        <div className='col-12 col-md-6 text start d-flex flex-column'>
                            <label>Telephone</label>
                            <input
                                type="text"
                                placeholder=""
                                value={this.state.newUser.telephone}
                                onChange={this.handleChangeTelephone}
                            />
                        </div>
                    </div>

                    <div className="d-flex justify-content-center mt-3">
                        <button className="btn btn-success" style={{ width: '70%', height: '35px' }} onClick={(e) => this.addPerson(e)}>
                            {this.state.isModifying ? "Sauvegarder Modification" : "Ajouter"}
                        </button>
                    </div>
                </form>
                <Table users={this.state.users} deleteUser={this.deleteUser} modifyUser={this.modifyUser} />
            </div>
        );
    }
}

class TableRow extends React.Component {
    render() {
        const { user, index, deleteUser, modifyUser } = this.props;

        return (
            <div className='tr' key={index}>
                <div className='td'>{user.prenom}</div>
                <div className='td'>{user.nom}</div>
                <div className='td'>{user.email}</div>
                <div className='td '>{user.telephone}</div>
                <div className='td '>
                    <button className="btn btn-danger"
                     onClick={() => deleteUser(index)}
                     >
                        <i className="fa-sharp fa-solid fa-xmark"></i>
                    </button>
                    <button
                        className="btn btn-warning"
                        style={{ width: '70%', height: '35px' }}
                        onClick={() => modifyUser(index)}
                    >
                    <i class="fa-solid fa-pen-nib"></i>
                    </button>
                </div>
            </div>
        );
    }
}

class Table extends React.Component {
    render() {
        return (
            <div className="table table-striped">
                <h3 className="text-center">Utilisateurs</h3>
                <hr />
                <div className='thead'>
                    <div className='tr'>
                        <div className='th fw-bold'>Prenom</div>
                        <div className='th fw-bold'>Nom</div>
                        <div className='th fw-bold'>Email</div>
                        <div className='th fw-bold'>Telephone</div>
                        <div className='th fw-bold'>Action</div>
                    </div>
                </div>
                <div className='tbody ml-auto'>
                    {this.props.users.map((user, index) => (
                        <TableRow
                            key={index}
                            user={user}
                            index={index}
                            deleteUser={this.props.deleteUser}
                            modifyUser={this.props.modifyUser}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

ReactDOM.render(<JemmaCoder />, document.getElementById('root'));
