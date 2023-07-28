import React, { useState } from "react";
import UsersService from "../../services/users";
import { useNavigate } from "react-router-dom";


function FormUserEdit(props) {
    const navigate = useNavigate();
    let User = localStorage.getItem('user')
    const [user, setUser] = useState(JSON.parse(User))
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [label, setlabel] = useState(false);
    const [passwordLabel, setPasswordLabel] = useState("")
    const [updateLabel, setupdateLabel] = useState("")
    const [erro, setError] = useState(false)

    const updateNameAndEmail = async (evt) => {
        evt.preventDefault();
        setPasswordLabel("")
        try {
            const userUpdate = await UsersService.updateNameEmail({ name: name, email: email })
            setlabel(true);
            setupdateLabel("data updated successfully")
        } catch (error) {
            setlabel(true);
        }
    }
    const updatePassword = async (evt) => {
        evt.preventDefault();
        setupdateLabel("")
        try {
            const userUpdate = await UsersService.updatePassword({ oldPassword: oldPassword, newPassword: newPassword });
            setOldPassword("")
            setNewPassword("")
            setPasswordLabel("Password updated successfully")
            setlabel(true);
        } catch (error) {
            setPasswordLabel("Incorrect Password")
            setlabel(true);
        }
    }
    const deleteAccount = async (evt) => {
        evt.preventDefault();
        try {
            if (window.confirm("Are you sure you want to delete the account?")) {
                await UsersService.deleteAccount();
                navigate('/')
            }            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section class="form-edit">
                <div class="container ">
                    <div class="columns is-centered has-text-centered">
                        <div className="column is-5 has-background-white has-text-centered is-vcentered">
                            <h3 class="title is-4">Informações pessoais</h3>                            
                                <form className="card" onSubmit={updateNameAndEmail} action="">
                                    <div class="field">
                                        <label class="label" for="name">Name</label>
                                        <div class="control">
                                            <input id="name"
                                                name="name"
                                                class="input"
                                                type="text"
                                                placeholder="Jonh Doe"
                                                required
                                                value={name}
                                                onChange={e => setName(e.target.value)} />
                                        </div>
                                    </div>

                                    <div class="field">
                                        <label class="label" for="email" >Email</label>
                                        <div class="control">
                                            <input id="email"
                                                class="input"
                                                type="email"
                                                placeholder="jonh_doe@gamil.com"
                                                required
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {label && <p class="help is-primary">{updateLabel}</p>}
                                    <div class="field">
                                        <div class="columns ">
                                            <div class="column has-text-centered ">
                                                <button className="button is-custom-purple is-outlined">Save editions</button>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            
                            </div>
                            </div>

                            <div class="columns is-centered ">
                                <div className="column is-5 has-background-white has-text-centered is-vcentered">
                                    <h3 class="title is-4 title-password">Password</h3>
                                    
                                        <form className="card" onSubmit={updatePassword} action="">
                                            <div class="field">
                                                <label class="label" for="password">Password</label>
                                                <div class="control">
                                                    <input id="password"
                                                        class="input"
                                                        type="password"
                                                        placeholder="Text input"
                                                        required
                                                        value={oldPassword}
                                                        onChange={e => setOldPassword(e.target.value)} />
                                                </div>
                                            </div>

                                            <div class="field">
                                                <label class="label" for="password"> New Password</label>
                                                <div class="control">
                                                    <input id="password"
                                                        class="input"
                                                        type="password"
                                                        placeholder="Text input"
                                                        required
                                                        value={newPassword}
                                                        onChange={e => setNewPassword(e.target.value)} />
                                                </div>
                                                {label && <p class="help is-danger">{passwordLabel}</p>}
                                            </div>

                                            <div class="field">
                                                <div class="columns ">
                                                    <div class="column has-text-centered ">
                                                        <button className="button is-custom-purple is-outlined">Change Password</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>

                                    
                                </div>
                            </div>





                            <form onSubmit={deleteAccount} action="">
                                <div class="columns ">
                                    <div class="column has-text-centered ">
                                        <button className="button is-danger is-outlined">Delete Acount</button>
                                    </div>
                                </div>
                            </form>


                        


                    
                </div>
            </section>
        </>
    )

}

export default FormUserEdit;