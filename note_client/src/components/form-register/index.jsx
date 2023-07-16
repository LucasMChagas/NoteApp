import React, {useState} from "react";
import logoImage from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import UsersService from "../../services/users";


function FormRegister() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = async (evt)=>{
        evt.preventDefault();
        try {
            const user = await UsersService.register({name: name, email: email, password: password});
            setRedirectToLogin(true);
        } catch (error) {
            setError(true);
        }
    }

    if (redirectToLogin == true)
        return navigate('/login')
    return (
        <>
            <section class="form-content">
                <div class="container ">
                    <div class="columns is-centered ">
                        <div class="card">
                            <img src={logoImage} alt="logo" />
                            <p class="subtitle is-5 has-text-centered">Your notes on the cloud</p>
                            <form onSubmit={handleSubmit} action="">
                                <div className="column is-12" >
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

                                    <div class="field">
                                        <label class="label" for="password">Password</label>
                                        <div class="control">
                                            <input id="password"
                                             class="input" 
                                             type="password" 
                                             placeholder="Text input"
                                             required
                                             value={password}
                                             onChange={e => setPassword(e.target.value)} />
                                        </div>
                                        {error && <p class="help is-danger">This email is already in use</p> }
                                    </div>

                                    <div class="field">
                                        <div class="columns ">
                                            <div class="column has-text-centered">
                                                <a onClick={e => setRedirectToLogin(true)} class="button is-white has-text-custom-purple">Login or</a>
                                            </div>
                                            <div class="column has-text-centered ">
                                                <button className="button is-custom-purple is-outlined">Register</button>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                            </form>
                        </div>




                    </div>
                </div>
            </section>
        </>
    )

}

export default FormRegister;