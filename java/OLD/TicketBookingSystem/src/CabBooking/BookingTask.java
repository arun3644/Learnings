package CabBooking;

public class BookingTask implements Runnable {
	private CabBookingSystem system;
	private Cab cab;
	private Users user;
	
	public BookingTask(CabBookingSystem system2, Cab driver, Users user) {
		this.system = system2;
		this.cab=driver;
		this.user=user;
	}
	
	@Override
	public void run() {
		system.book(cab,user);
	}
}
