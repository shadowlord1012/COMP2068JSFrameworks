/*
Mike Kipp
*/

//gets the required module that is needed
var prompt = require('prompt');
var gameType;

var yesNoSchema = {
    properties :{
        value: {
            message: 'Quit?',
            required: true
        }
    }
};

//custom schema for the prompt node
var schema = {
    properties :{
        value: {
            message: 'Which version of the game do you want? (reg or bbt)',
            required: true
        }
    }
};

//custom schema for the prompt node for regular game
var rockPaperSciccorsSchema = {
    properties :{
        value: {
            message: 'Enter in Rock Paper Scissors or to quit type quit',
            required: true
        }
    }
};

//Custom schema for the big bang theory version
var bigBangTheorySchema = {
    properties : {
        value : {
            message : 'Rock, paper, scissors, lizard, spock or quit to quit',
            required: true
        }
    }
};

//starts the prompt module
prompt.start();

//Outputs to the 
console.log("Welcome to Rock, Papper, Scissors!");
console.log("Game will shutdown with invalid entries at set prompts");

//Places the main prompt in a function that is called at the end.
function gameTypeSelection(){
    //Prompt to get the user information
    prompt.get(schema,function (err,res){
        if(res.value.toLocaleLowerCase() !== 'reg' || res.value.toLocaleLowerCase() !== 'bbt'){
            gameType = res.value.toLocaleLowerCase();
            mainDes(res.value.toLocaleLowerCase());
        }
        else {
            console.log("Invalid Input. Shutting down game.");
        }
    });
}

//Starts up the game for regular game
function startGameReg(userInput){

    let computerChoice = Math.random();

    //if the random number is between 0.34 and 0
    if(computerChoice>=0 && computerChoice <= 0.34){
        //paper
        //outputs the results
        switch(userInput)
        {
            case "rock":
                console.log("you loose.");
                break;
            case "paper":
                console.log("its a tie");
                break;
            case "scissors":
                console.log("you win!");
                break;
            default:
                console.log("Invalid entry. Try again");
                break;
        }
    }
    //if the random number is between 0.34 and 0.67
    else if (computerChoice > 0.34 && computerChoice <= 0.67)
    {
        //Scissors
        //outputs the results
        switch(userInput)
        {
            case "rock":
                console.log("you Win!");
                break;
            case "paper":
                console.log("Your Lose");
                break;
            case "scissors":
                console.log("Tie!");
                break;
            default:
                console.log("Invalid entry. Try again");
                break;
        }
    }
    //if the random number is between 0.67 and 1
    else if (computerChoice > 0.67 && computerChoice <= 1)
    {
        //ROCK        
        //outputs the results
        switch(userInput)
        {
            case "rock":
                console.log("Tie!");
                break;
            case "paper":
                console.log("you Win!");
                break;
            case "scissors":
                console.log("you lose!");
                break;
            default:
                console.log("Invalid entry. Try again");
                break;
        }
    }    

    //starts the game over again until quit is used.
    prompt.get(yesNoSchema,function (err,res){

    mainDes(res.value.toLocaleLowerCase());
    
    });
}

//Starts up the game for big bang theory
function startGameBBT(userInput){

    let computerChoice = Math.random();

    //if the random number is between 0 and 0.20
    if(computerChoice>=0 && computerChoice <= 0.20){
        //paper
        //outputs the results
        switch(userInput)
        {
            case "rock":
                console.log("Paper covers rock, you loose.");
                break;
            case "paper":
                console.log("its a tie");
                break;
            case "scissors":
                console.log("Scissors cut Paper, you win!");
                break;
            case "lizard":
                console.log("lizard eats paper, You Win!");
                break;
            case "spock" :
                console.log("Paper disproves Spock. You lose!");
                break;
            default:
                console.log("Invalid entry. Try again");
                break;
        }
    }
    //if the random number is between 0.2 and 0.4
    else if (computerChoice > 0.20 && computerChoice <= 0.40)
    {
        //Scissors
        //outputs the results
        switch(userInput)
        {
            case "rock":
                console.log("Rock Smashes scissors,you Win!");
                break;
            case "paper":
                console.log("Scissors cuts paper,Your Lose");
                break;
            case "scissors":
                console.log("Tie!");
                break;
            case "lizard":
                console.log("Scissors decapitates Lizard, You Lose!");
                break;
            case "spock" :
                console.log("Spock smashes Scissors. You Win!");
                break;
            default:
                console.log("Invalid entry. Try again");
                break;
        }
    }
    //if the random number is between 0.4 and 0.6
    else if (computerChoice > 0.40 && computerChoice <= 0.6)
    {
        //ROCK        
        //outputs the results
        switch(userInput)
        {
            case "rock":
                console.log("Tie!");
                break;
            case "paper":
                console.log("Paper covers rock. you Win!");
                break;
            case "scissors":
                console.log("Rock smashes Scissors, you lose!");
                break;
            case "lizard":
                console.log("Rock crushes Lizard, You lose!");
                break;
            case "spock" :
                console.log("Spock vapourizes Rock. You Win!");
                break;
            default:
                console.log("Invalid entry. Try again");
                break;
        }
    }   
    //if the random number is between 0.6 and 0.8
    else if (computerChoice > 0.60 && computerChoice <= 0.8)
    {
        //Lizard        
        //outputs the results
        switch(userInput)
        {
            case "rock":
                console.log("Rock crushes lizard, You Win!");
                break;
            case "paper":
                console.log("Lizard eat paper, You Lose!");
                break;
            case "scissors":
                console.log("Scissors decapitates Lizard, You Win!");
                break;
            case "lizard":
                console.log("Tie");
                break;
            case "spock" :
                console.log("Lizard poisons Spock. You lose!");
                break;
            default:
                console.log("Invalid entry. Try again");
                break;
        }
    }  
    //if the random number is between 0.8 and 1
     else if (computerChoice > 0.80 && computerChoice <= 1)
    {
        //Spock        
        //outputs the results
        switch(userInput)
        {
            case "rock":
                console.log("Spock vapourizes rock, You Lose!");
                break;
            case "paper":
                console.log("Paper disproves Spock, You Win!");
                break;
            case "scissors":
                console.log("Spock smashes scissors, You lose");
                break;
            case "lizard":
                console.log("Lizard poisons Spock, You Win!");
                break;
            case "spock" :
                console.log("Tie!");
                break;
            default:
                console.log("Invalid entry. Try again");
                break;
        }
    }  

    //starts the game over again until quit is used.
    prompt.get(yesNoSchema,function (err,res){

    mainDes(res.value.toLocaleLowerCase());
    
    });
}

//Desides what game is to be played
function mainDes(inputValue){
//makes sure if the user is quiting the game or not

    if(inputValue !== 'quit' )
    {
        if(gameType == "reg")
        {
            prompt.get(rockPaperSciccorsSchema, function (err,res) {
                startGameReg(res.value.toLocaleLowerCase());
            });
        }
        else if (gameType == "bbt"){
            prompt.get(bigBangTheorySchema, function(err,res){
                startGameBBT(res.value.toLocaleLowerCase());
            });
        }
    //if not play the game
    }
    else {
        //quit program
        console.log("Quitting game");
    }
}

//starts the game
gameTypeSelection();