package multithreading;

public class BankAccount {
	public int balance= 1000;
	
	public synchronized void deposit(int money) {
			this.balance+=money;
			System.out.println("Deposited money: "+money+" "+"balance : "+balance);
	}
	public synchronized void withdraw(int money) {
			if(balance>money) {
			this.balance-=money;
			System.out.println("withdrqwn money: "+money+" "+"balance : "+balance);}
			else {
				System.out.println("Insufficient balance");
			}
	}
}
