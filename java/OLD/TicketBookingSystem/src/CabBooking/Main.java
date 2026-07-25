dpackage CabBooking;

public class Main {
   public static void main(String args[]) {
	    
	   CabBookingSystem system = new CabBookingSystem();
	   
		Cab driver1 = new Cab( 1,"arun", "palladam");
		Cab driver2 = new Cab( 2,"prasanth","Tiruppur");
		
		Users mukesh = new Users( 11, "Mukesh", "Tiruppur");
		Users lokesh = new Users( 12, "Lokesh", "Tiruppur");
		
		system.addDriver(driver1);
		system.addDriver(driver2);
		
		system.addUser(mukesh);
		system.addUser(lokesh);
		
		system.showCabs();
		
		Thread t1 = new Thread(new BookingTask(system,driver1,mukesh));
		Thread t2 = new Thread(new BookingTask(system,driver1,lokesh));
		Thread t3 = new Thread(new BookingTask(system,driver2,lokesh));
		Thread t4 = new Thread(new BookingTask(system,driver2,mukesh));
		
		t1.start();
		t2.start();
		t3.start();
		t4.start();
		
		try {
			t1.join();
			t2.join();
			t3.join();
			t4.join();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		system.showCabs();
				
	 }
}
