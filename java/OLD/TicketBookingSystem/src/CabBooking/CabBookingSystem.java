package CabBooking;

import java.util.ArrayList;
import java.util.*;

public class CabBookingSystem {

	private List<Cab> cabList = new ArrayList<>();
	private List<Users> userList = new ArrayList<>();
	
	private HashMap<Cab, Boolean> drivers = new HashMap<>();
	
	public synchronized void addDriver(Cab cab) {
		cabList.add(cab);
		drivers.put(cab,true);
		
	}
	
	public synchronized void addUser(Users user) {
		userList.add(user);
	}
	

	public void showCabs() {
		System.out.println("ID |   Name   |  Location   |  Availability ");
		for(HashMap.Entry<Cab,Boolean> entry : drivers.entrySet()) {
			System.out.println(entry.getKey().getId()+"     "+ entry.getKey().getName()+"   "+entry.getKey().getLocation()+"       "+entry.getValue());
		}
	}
	
	public synchronized void book(Cab cab, Users user) {
		
		if(drivers.containsKey(cab) && drivers.get(cab)) {
			drivers.put(cab, false);
			System.out.println("Cab is Booked for user : "+user.getName()+" by driver "+cab.getName()+" to location "+cab.getLocation());
		}
		else {
			System.out.println("Cab driver : "+cab.getName()+" is not available for the location "+cab.getLocation());
		}
	}
} 
