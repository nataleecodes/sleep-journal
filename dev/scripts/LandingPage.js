import React from 'react';
import firebase from 'firebase';
import EntryLayout from './EntryLayout';

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
            starRating: '',
            starRated: false,
            date: '',
            user: '',
            notes: '',
            entries: []
        }
        this.handleStarClick = this.handleStarClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const dbRef = firebase.database().ref('entries');
        dbRef.on('value',(snapshot) => {
            // console.log(snapshot.val());
            const data = snapshot.val();
            const entriesArray = [];

            for(let item in data){
                // console.log(item);
                // console.log( data[item] )
                data[item].key = item;
                entriesArray.push( data[item] )
            }

            this.setState({
                entries: entriesArray
            });
        });
    }

    handleChange(e) {
        //When users type in form input fields, update the state in React
        console.log(`target name is ${e.target.name}`);
        console.log(`target value is ${e.target.value}`);
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        alert("Submitted");

        const entry = {
            date: this.state.date,
            user: this.state.user,
            notes: this.state.notes,
            starRating: this.state.starRating
        };

        const dbRef = firebase.database().ref('entries');
        dbRef.push(entry);
        this.setState({
            date: '',
            user: '',
            notes: '',
            starRating: ''
        });
    }

    handleStarClick(e) {
        let starClass = e.target.classList[1];
        let starSelected = e.target;
        console.log(starClass);
        console.log(starClass.charAt(4));

        this.setState({
            starRating: starClass.charAt(4),
            starRated : true
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

    removeEntry(keyToRemove){
        firebase.database().ref(`entries/${keyToRemove}`);
        console.log(`The key to remove is ${keyToRemove}`);
    }

    render() {
        return(
            <div className="landingPageContainer">
                <div className="moon">
                    <h1 className="moon__heading">How did you <br></br>sleep last night?</h1>
                </div>
                <div className="journalForm">
                    {(this.state.starRated === false) ?
                        <div className="journalForm__rating">
                            <span className="journalForm__stars star5" onClick={this.handleStarClick}>☆</span>
                            <span className="journalForm__stars star4" onClick={this.handleStarClick}>☆</span>
                            <span className="journalForm__stars star3" onClick={this.handleStarClick}>☆</span>
                            <span className="journalForm__stars star2" onClick={this.handleStarClick}>☆</span>
                            <span className="journalForm__stars star1" onClick={this.handleStarClick}>☆</span>
                        </div>
                    : 
                        <p>
                        Sleep quality: {this.state.starRating} / 5 
                        </p>}
                        
                    <form action="" onSubmit={this.handleSubmit}>
                        <input type="text" name="date" placeholder="Date" onChange={this.handleChange} value={this.state.date}/>
                        <input type="text" name="user" placeholder="Name" onChange={this.handleChange} value={this.state.user}/>
                        <textarea name="notes" id="notes" name="notes" cols="30" rows="10" placeholder="What went well last night? What didn't? What might you try doing differently tonight?" onChange={this.handleChange} value={this.state.notes}></textarea>
                        <input type="submit" value="Submit"/>
                    </form>
                    <ul>
                        {this.state.entries.map((entry, i) => {
                            return <EntryLayout
                                key={entry.key}
                                date={entry.date}
                                user={entry.user}
                                notes={entry.notes}
                                starRating={entry.starRating}
                            /> 
                            // <li key={`entry-${i}`}>
                            // </li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}

export default LandingPage;