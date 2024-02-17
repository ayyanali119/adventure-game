import inquirer, { Answers, QuestionCollection } from "inquirer";
import chalk from 'chalk';


class Opponent {
    fuel: number = 100;
    constructor(public name: string) {
        this.name = name;
    }

    fuelDecrease() {
        this.fuel = this.fuel - 30
    }
}

class Player {
    fuel: number = 100
    portions: number = 3
    constructor(public name: string) {
        this.name = name;
    }
    private fuelIncrease() {
        let fuel = this.fuel + (Math.floor(Math.random() * (40 - 30 + 1)) + 30);
        this.fuel = fuel;
    }

    private fuelDecrease() {
        this.fuel = this.fuel - (Math.floor(Math.random() * (40 - 20 + 1)) + 20);
    }

    public async animateAttack() {

        console.log(chalk.red.bold('Attacking...'));
        await this.delay(1000); // Delay for 1 second

        console.log(chalk.green.bold('Attack successful!'));
    }

    // Defend animation
    public async animateDefend() {

        console.log(chalk.yellow.bold('Defending...'));
        await this.delay(1000); // Delay for 1 second

        console.log(chalk.green.bold('Well defended!'));
    }

    // Drink energy drink animation
    public async animateDrink() {

        console.log(chalk.blue.bold('Having Energy Drink...'));
        await this.delay(1000); // Delay for 1 second

        console.log(chalk.green.bold('Feeling refreshed!'));
    }

    // Running away animation
    public async animateEscape() {

        console.log(chalk.red.bold('Running away...'));
        await this.delay(1000); // Delay for 1 second

        console.log(chalk.green.bold('You managed to escape!'));
    }

    // Utility method for delaying execution
    public delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    public async attacking(opponent:Opponent){
        let num = Math.floor(Math.random() * 2) //To make a random chance of increasing or decreasing.
            if (num === 0) {
                this.fuelDecrease()
                console.log(chalk.red.bold(`${player.name} fuel is ${player.fuel}                   Portions Available : ${player.portions}`))
                console.log(chalk.green.bold(`${opponent.name} fuel is ${opponent.fuel}`))

                if (this.fuel <= 0) {
                    console.log(chalk.bold.red.italic("You lose , hope better luck next time"))
                    process.exit();
                }
            }

            if (num === 1) {
                opponent.fuelDecrease()
                console.log(chalk.red.bold(`${this.name} fuel is ${this.fuel}                   Portions Available : ${player.portions}`))
                console.log(chalk.green.bold(`${opponent.name} fuel is ${opponent.fuel}`))

                if (opponent.fuel <= 0) {
                    console.log(chalk.bold.green.italic.bgWhite("You Win"))
                    process.exit()
                }
            }
    }

    public async drinkingEnergyDrink(){
        if (this.portions > 0) {
            this.portions = this.portions - 1
            this.fuelIncrease()
            console.log(chalk.green.bold.italic(`You Drink Health Portion , Your Fuel is ${this.fuel}              Portions Available : ${this.portions}`))
        }
        else {
            console.log("You don't have any portion.");

        }
    }

    public async runningAway(){
        console.log(chalk.red.bold.italic.bgWhite("You lose , hope better luck next time"))
            process.exit()
    }

    public async defend(){
        console.log(chalk.green.bgCyan.bold("Well Defended !"));
        
    }
}



let playerName = await inquirer.prompt({ name: "player", type: "input", message: "Enter your name : " })
console.log(`Welcome ${playerName.player} to the Adventure Game. Be ready to play.`);

let opponentName = await inquirer.prompt({ name: 'opponent', type: 'list', message: "Please Select an Opponent :", choices: ["Skeleton 💀", "Assasin 🦹‍♂️", "Zombie 🧟‍♂️", "Warrior ⚔️", "Archer 🏹", "Giant 🦾"] })

let player = new Player(playerName.player)
let opponent = new Opponent(opponentName.opponent)


do {
    let action = await inquirer.prompt({ name: "action", type: "list", message: `What you want to do against ${opponentName.opponent}`, choices: ["Attack ", "Defend ", "Have Energy Drink ", "Escape "] })

    if (opponentName.opponent == "Skeleton " || opponentName.opponent == "Assasin " || opponentName.opponent == "Zombie " || opponentName.opponent == "Warrior " || opponentName.opponent == "Archer " || opponentName.opponent == "Giant 🦾") {

        if (action.action == "Attack ") {
            player.animateAttack()
            player.attacking(opponent)
        }

        if (action.action === 'Have Energy Drink ') {
            player.animateDrink()
           player.drinkingEnergyDrink()
        }

        if (action.action === 'Escape ') {
            player.animateEscape()
            player.runningAway()
        }
        if (action.action === 'Defend ') {
            player.defend()
        }
    }
} while (true)