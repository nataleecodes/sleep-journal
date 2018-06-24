import React from 'react';
import firebase from 'firebase';

//Configure firebase
const config = {
    apiKey: "AIzaSyDyQS2vy3LGNyeSp4nW--2_VDwHJcqg0r0",
    authDomain: "sleep-better-app.firebaseapp.com",
    databaseURL: "https://sleep-better-app.firebaseio.com",
    projectId: "sleep-better-app",
    storageBucket: "sleep-better-app.appspot.com",
    messagingSenderId: "116475073473"
};

//Initalize firebase
firebase.initializeApp(config);

class LandingPage extends React.Component {
    constructor() {
        super();
        this.state = {
            starRating: null,
            date: '',
            user: '',
            notes: ''
        }
        this.handleStarClick = this.handleStarClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    ComponentDidMount() {
        const dfRef = firebase.database().ref('entries');

        dbRef.on('value',(snapshot) => {
            console.log(snapshot.val());
            const data = snapshot.val();
        });

    }

    handleChange(e) {
        //When users type in form input fields, show the letters on the screen
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit() {
        alert("Submitted");
    }

    handleStarClick(e) {
        let starClass = e.target.classList[1];
        console.log(starClass);
        console.log(starClass.charAt(4));
        this.setState({
            starRating: starClass.charAt(4)
        });
        //Try some inline CSS?
        // .journalForm__rating > .journalForm__stars,
        // .journalForm__rating > .journalForm__stars ~ & __stars {
        //     color: transparent;
        // }
        //Use conditional rendering?
        //What if they clicked once and want to change the number?
        //Set the number of stars to remain gold
        //Render that on the page
        //Save the number to be averaged against other nights in the journal
        //Should these be props? Should they be passed into a component that redraws the correct 
        //number of stars each time the state is updated?
    } 

    render() {
        return(
            <div className="landingPageContainer">
                <div className="moon">
                    <h1 className="moon__heading">How did you <br></br>sleep last night?</h1>
                </div>
                <div className="journalForm">
                    <div className="journalForm__rating">
                        <span className="journalForm__stars star5" onClick={this.handleStarClick}>☆</span>
                        <span className="journalForm__stars star4" onClick={this.handleStarClick}>☆</span>
                        <span className="journalForm__stars star3" onClick={this.handleStarClick}>☆</span>
                        <span className="journalForm__stars star2" onClick={this.handleStarClick}>☆</span>
                        <span className="journalForm__stars star1" onClick={this.handleStarClick}>☆</span>
                    </div>
                    <form action="" onSubmit={this.handleSubmit}>
                        <input type="text" name="date" placeholder="Date" onClick={this.handleChange}/>
                        <input type="text" name="name" placeholder="Name" onClick={this.handleChange}/>
                        <textarea name="notes" id="notes" name="notes" cols="30" rows="10" placeholder="What went well last night? What didn't? What might you try doing differently tonight?" onClick={this.handleChange}></textarea>
                        <input type="submit" value="Submit" onSubmit={this.handleSubmit}/>
                    </form>
                </div>
            </div>
        )
    }
}

export default LandingPage;