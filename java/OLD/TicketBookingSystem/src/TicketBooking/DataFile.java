package TicketBooking;

import java.util.*;
public class DataFile {
	HashMap<Integer,String> map = new HashMap<>();
	
	HashMap<Integer, Integer> seatMap=new HashMap<>();
	
	String movieInput="";
	int seatInput=-1;
	int priceInput=-1;
	String seat="";
	Scanner ss=new Scanner(System.in);
	DataFile(){
		map.put(1,"--> Avengers - 10:00 AM");
		map.put(2,"--> Spider-Man - 1:00 PM");
		map.put(3,"--> Inception - 6:00 PM");
		
		for(int i=0;i<10;i++) {
			seatMap.put(i+1, 1);
		}
	}
	
	public void displayDetails() {
		System.out.println("1.Choose movies \n2.Seats \n3.Price details");
		int n=ss.nextInt();
		
		switch(n) {
		case 1: displayMovie();break;
		case 2: displaySeats();break;
		case 3: displayPrice();break;
		default : System.out.println("Choose correct option!");
		}
	}
	public void displayMovie() {
	      System.out.println("Available Movies");
	      for(HashMap.Entry<Integer, String> e: map.entrySet()){
	          System.out.println(e.getKey()+" "+e.getValue());
	      }
	      System.out.println("0 --> back.....");
	      int in=ss.nextInt();
	      
	      if(in!=0) {
	      if(in==1) {
	    	  movieInput="Avengers - 10:00 AM";
	    	  displaySeats();}
	      else if(in==2) {
	    	  movieInput="Spider-Man - 1:00 PM";
	          displaySeats();}
	      else if(in==3) {
	    	  movieInput="Inception - 6:00 PM";
	          displaySeats();}
	      else {
	    	  System.out.println("Choose correct option");
	    	  displayMovie();
	      }}
	      else 
	    	  displayDetails();
    }
	
	public void seatAvalilability() {
		for(HashMap.Entry<Integer, Integer> e : seatMap.entrySet()) {
			System.out.print(e.getKey()+"     ");
			if(e.getValue()==1)
				System.out.println("Available");
			else
				System.out.println("Booked....");
		}
	}
	public void displaySeats() {
		System.out.println("S.NO  Availability");
		
		seatAvalilability();
		System.out.println("0 --> back.....");
	  	    
		int input=ss.nextInt();
		seatInput=input;

		if(input!=0) {
		    if(seatMap.containsKey(input)) {
			     int check = seatMap.get(input);  // safe access
			     if(check==1)
			 		seatMap.put(input, -1);
			     else
			    	 System.out.println("Already Booked");
			}
		    displayPrice();
		}
		else
			displayDetails();
	}
	
	public void displayPrice() {
		System.out.println("1.Front    Row Rs.100 \n2.Second Class Rs.130 \n3.First  Class Rs.190 \n0 --> Back");
		int input=ss.nextInt();
		
		if(input!=0) {
			if(input==1) {
				seat="Front Row";
				priceInput=100;
			}
			if(input==2) {
				seat="Second Class";
				priceInput=130;
				
			}
			if(input==3) {
				seat="First Class";
				priceInput=190;
			}
			displayData();
		}
		else
			displayDetails();
	}
	
	public void displayData(){
		if(movieInput.length() > 0 && seatInput!=-1 && priceInput!=-1) {
			System.out.println("Details... \nMovie Name : "+movieInput+"\nSeat No : "+seatInput+" "+seat+"\nPrice : "+priceInput);
			
			ss.nextLine();  // consume leftover newline
			
			System.out.println("Confirm booking? (yes/no): ");
			String confirm = ss.nextLine();

			if(confirm.equalsIgnoreCase("yes")) {
			    System.out.println("Booking Successful!");
			} else {
				seatMap.put(seatInput, 1);
			    System.out.println("Booking Cancelled!");
			}

			
		}
		else {
			System.out.println("Choose Carefully");
			displayDetails();
		}
	
	ss.close();
  }
}
