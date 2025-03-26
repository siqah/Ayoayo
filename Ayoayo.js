class Player{
    constructor(name){
        this.name = name;
    }

    getName(){
        return this.name;
    }
}

class Ayoayo{
    constructor(){
        this.board = Array(14).fill(4);
        this.board[6] = 0; // Store 1
        this.board[13] = 0; // Store 2
        this.player1 = null;
        this.player2 = null;
        this.gameEnded = false;
    }

    createPlayer(name){
        return new Player(name);
    }

    printBoard(){
        console.log("player1:");
        console.log("store" + this.board[6]); //player1 pits
        console.log(this.board.slice(0, 6));

        console.log("player2:");
        console.log("store" + this.board[13]); //player2 pits
        console.log(this.board.slice(7, 13));
    }

    returnWinner(){
        if(!this.gameEnded){
            return "Game is not over";
        }

        const player1Store = this.board[6];
        const player2Store = this.board[13];

        //determining the winner based on numbers of seeds in there store
        if(player1Store > player2Store){
            return "winner is player 1" + this.player1.getName();
        }else if(player2Store > player1Store){
            return "winner is player 2" + this.player2.getName();
        }else{
            return "It is a draw";
        }
    }

    //method to simulate the game
    playGame(playerIndex, pitIndex){
        if(pitIndex <= 0 || pitIndex > 6){
            return "Invalid number for pit index";
        }

        if(this.gameEnded){
            return "Game has ended";
        }

        //calculate the board index
        let boardIndex = 0;
        if(playerIndex === 1){
            boardIndex = pitIndex - 1;
        }else {
            boardIndex = pitIndex + 6;
        }

        if(this.board[boardIndex] === 0){
            return null;
        }

        //get the number of seeds in the pit that is selecetd and empty the pit
        let seeds = this.board[boardIndex];
        this.board[boardIndex] = 0;

        //distribute the seeds
        let currentIndex = boardIndex;
        while(seeds > 0){
            if(playerIndex === 1 && currentIndex === 13 || (playerIndex === 2 && currentIndex === 6)){
                currentIndex = (currentIndex + 1) % 14;
                
            }
            this.board[currentIndex] += 1; 
            seeds--;
        }
        if((playerIndex === 1 && currentIndex ===6) || (playerIndex === 2 && currentIndex === 13)){
            if(playerIndex ===1){
                console.log("player 1 take another turn");
            }else{
                console.log("player 2 take another turn");
            }
        }else{
            this.captureSeeds(playerIndex, currentIndex);
        }

        this.checkGameOver();
        
        return this.board;
    }

    //method to capture seeds
    captureSeeds(playerIndex, currentIndex){
        if(playerIndex === 1 && currentIndex >= 0 && currentIndex <= 5 && this.board[currentIndex] === 1 && this.board[12 - currentIndex] > 0){
            this.board[6] += this.board[12 - currentIndex] + 1;
            this.board[currentIndex] = 0;
            this.board[12 - currentIndex] = 0;
        }else if(playerIndex === 2 && currentIndex >= 7 && currentIndex <= 12 && this.board[currentIndex] === 1 && this.board[12 - currentIndex] > 0){
            this.board[13] += this.board[12 - currentIndex] + 1;
            this.board[currentIndex] = 0;
            this.board[12 - currentIndex] = 0;
        }
    }

    //Method to check if the game is over
    checkGameOver(){
        const player1Empty = this.board.slice(0, 6).every(pit => pit === 0);

        const player2Empty = this.board.slice(7, 13).every(pit => pit ===0 );

        if(player1Empty || player2Empty){
            this.gameEnded = true;

            if(player1Empty){
                for(let i = 7; i < 13; i++){
                    this.board[13] += this.board[i];
                    this.board[i] = 0
                }
            }else {
                for(let i=0; i < 6; i++){
                    this.board[6] += this.board[i];
                    this.board[i] = 0;
                }
            }
        }
    }

}