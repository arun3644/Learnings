package multithreading;

public class MainAccount {
	
	public static void main(String args[]) {
	
    BankAccount b=new BankAccount();
	
	
	
	Thread t1 = new Thread(new Deposit(b));
	Thread t2 = new Thread(new Withdraw(b));
	
	t1.start();
	t2.start();
	
  }
}