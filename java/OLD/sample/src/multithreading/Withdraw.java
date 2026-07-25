package multithreading;

public class Withdraw implements Runnable{
	private BankAccount bal;
	
	public Withdraw(BankAccount bal) {
		this.bal=bal;
	}
	
	public void run() {
		for(int i=1;i<=5;i++) {
			bal.withdraw(i*50);
			
			try {
				Thread.sleep(100);
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		}
	}
	
}
