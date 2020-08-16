import React from 'react';

function About() {
    return(
       <div className="container">
            <div id="about">
                <h3 className="text-center pt-4 pb-2">About This App</h3>
                <hr/>
                <p>
                    This React.js application is connected to a Rails API to handle server side functionality.
                </p>
                <p>
                    It demonstrates all of the <strong>CRUD</strong> actions in an elegant way. Users can login and the authenticate strategy issued
                    was a <strong>JWT</strong> which is generated via Devise on the Rails side. 
                </p>
                <p>
                    This application is hosted on Netlify and uses Bootstrap as a CSS framework.
                </p>
            </div>
       </div>   
    )
}

export default About;
