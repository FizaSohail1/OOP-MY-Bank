#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

class Customer {
    Firstname:string;
    Lastname:string;
    gender:string;
    age:number;
    Accountbalance:number;
    Accountnumber:number;

    constructor(First:string,Last:string,gender:string,age:number,Accountbalance:number,Accountnumber:number){
        this.Firstname = First,
        this.Lastname = Last,
        this.gender = gender,
        this.age = age,
        this.Accountbalance = Accountbalance,
        this.Accountnumber = Accountnumber
    }
}

interface IBankAccount{
    debit(amount:number):void
    credit(amount:number):void
}

class BankAccount implements IBankAccount {
   private customer:Customer
    constructor(customer:Customer){
        this.customer = customer
    }

    debit(amount:number):void{
        if(amount > this.customer.Accountbalance){
            console.log(chalk.red.bold(`Transection cancelled: Insufficiant Balance.`))
        }
        else{
            this.customer.Accountbalance -= amount
            console.log(chalk.green.bold(`Successfully Debited $${amount}.\nRemaing balnce is $${this.customer.Accountbalance} `))
        }
    }
    credit(amount:number):void{
        if(amount > 100){
            this.customer.Accountbalance += amount - 1
            console.log(chalk.green.bold(`Successfully Credited $${amount}.\nNew balance: $${this.customer.Accountbalance}`))
        }
        else{
            this.customer.Accountbalance += amount 
            console.log(chalk.green.bold(`Successfully Credited $${amount}.\nNew balance: $${this.customer.Accountbalance}`))
        }
    }
    showBalance():void{
        console.log(chalk.yellowBright.bold(`Your current balance: $${this.customer.Accountbalance}`))
    }
    async options(): Promise<void>{
        while(true){
     const menu = await inquirer.prompt([{
        name:"select",
        type:"list",
        message:"Select an option you want to perform:",
        choices:['Account Info','Debit','Credit','Show Balance','Exit']
     }])
     if(menu.select === 'Account Info'){
       console.log(this.customer)
       console.log(chalk.green.bold(`Account created Successfully!`))
    }
    else if(menu.select === 'Debit'){
        let DebitAmount = await inquirer.prompt([{
            name:"debAmount",
            type:'number',
            message:'Enter amount to debit:'
        }])
       this.debit(DebitAmount.debAmount)
       break;
    }
    else if(menu.select === 'Credit'){
        let CreditAmount = await inquirer.prompt([{
            name:"CredAmount",
            type:'number',
            message:'Enter amount to debit:'
        }])
       this.credit(CreditAmount.CredAmount)
       break
    }
    else if(menu.select === "Show Balance"){
        this.showBalance()
        break;
    }
    else{
        console.log(chalk.yellowBright.bold('Thanks for using. Exiting.....'))
        break;
    }
    }
}
}
(async () => {
    console.log(chalk.green.bold("\t...Welcome to My Bank App...\t"))
    const customerInfo = await inquirer.prompt([
        { 
          name: 'firstName', 
          type: 'input', 
          message: 'Enter your first name:' 
        },
        {
          name: 'lastName', 
          type: 'input',
          message: 'Enter your last name:' 
        },
        {
          name: 'age', 
          type: 'number', 
          message: 'Enter your age:' 
        },
        { 
          name: 'gender', 
          type: 'list', 
          message: 'Select your gender:', 
          choices: ['Male', 'Female', 'Other'] 
        },
        {
          name: 'balance', 
          type: 'number', 
          message: 'Enter your initial balance:' 
        },
        {
          name: 'accountNo', 
          type: 'number', 
          message: 'Enter your account number:' 
        },
    ]);

    const customer = new Customer(
        customerInfo.firstName,
        customerInfo.lastName,
        customerInfo.age,
        customerInfo.gender,
        customerInfo.balance,
        customerInfo.accountNo
    );

    const bankAccount = new BankAccount(customer);
    await bankAccount.options();
})();