import React from "react";
import presentationImage from '../../assets/images/presentation.png';
import Header from "../../components/header";
import {Link} from "react-router-dom";
import "../../styles/home.scss"

function HomeScreen() {
    return (
        <>
            <Header />
            <section class="section home">
                <div class="container">
                    <div class="columns home-content">
                        <div class="column is-5 text">
                            <h2 class="title is-2 has-text-white is-spaced">Create notes easily and access when you wants on the cloud</h2>
                            <p class="subtitle is-5 has-text-white">Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs.
                            <br/><br />Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print.</p>
                            <div class="has-text-centered">
                                <Link to="/register" className="button is-outlined is-white is-large home-btn"><strong>Register for free Now</strong></Link>
                            </div>                            
                        </div>
                        <div class="column is-6">
                            <img src={presentationImage} alt="presentarion Image" />
                        </div>
                        
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomeScreen;