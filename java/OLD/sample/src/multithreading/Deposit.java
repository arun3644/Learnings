package multithreading;

public class Deposit  implements Runnable{
	private BankAccount bal;
	
	 public Deposit(BankAccount bal){
		this.bal=bal;
	}
	
	public void run() {
		for(int i=1;i<=5;i++) {
			bal.deposit(i*100);
			try {
				Thread.sleep(100);
			}
			catch(Exception e) {
				e.printStackTrace();
			}
		}
	}
}
