#! /usr/bin/env node
  import inquirer from "inquirer";
  import chalk from "chalk";
  
  class Player {
      name: string;
      fuel: number = 100;
      constructor(name: string) {
          this.name = name;
      }
  
      fuelDecrease() {
          this.fuel -= 25;
      }
  
      fuelIncrease() {
          this.fuel = 100;
      }
  }
  
  class Opponent {
      name: string;
      fuel: number = 100;
      constructor(name: string) {
          this.name = name;
      }
  
      fuelDecrease() {
          this.fuel -= 25;
      }
  }
  
  let player = await inquirer.prompt([
      {
          name: "name",
          type: "input",
          message: "Please enter your name:",
      }
  ]);
  
  let opponent = await inquirer.prompt([
      {
          name: "select",
          type: "list",
          message: "Select your Opponent:",
          choices: ["Vampire", "Werewolf", "Zombie"]
      }
  ]);
  
  let P1 = new Player(player.name);
  let o1 = new Opponent(opponent.select);
  
  do {
      let ask = await inquirer.prompt([
          {
              name: "opt",
              type: "list",
              message: "What would you like to do?",
              choices: ["Attack", "Drink Potion", "Run for your life..."]
          }
      ]);
  
      if (ask.opt == "Attack") {
          let num = Math.floor(Math.random() * 2);
          if (num > 0) {
              P1.fuelDecrease();
              console.log(chalk.red(`${P1.name}'s fuel is ${P1.fuel}`));
              console.log(chalk.green(`${o1.name}'s fuel is ${o1.fuel}`));
              if (P1.fuel <= 0) {
                  console.log(chalk.red("You lose, Better luck next time.."));
                  process.exit();
              }
          } else {
              o1.fuelDecrease();
              console.log(chalk.red(`${P1.name}'s fuel is ${P1.fuel}`));
              console.log(chalk.green(`${o1.name}'s fuel is ${o1.fuel}`));
              if (o1.fuel <= 0) {
                  console.log(chalk.green("Congratulations you won!"));
                  process.exit();
              }
          }
      } else if (ask.opt == "Drink Potion") {
          P1.fuelIncrease();
          console.log(chalk.blue(`You drank a health potion. Your fuel is ${P1.fuel}`));
      } else if (ask.opt == "Run for your life...") {
          console.log(chalk.yellow("You lose, Better luck next time.."));
          process.exit();
      }
  } while (true);

  
   


