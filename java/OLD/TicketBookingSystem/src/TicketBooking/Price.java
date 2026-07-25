package TicketBooking;

import java.util.Scanner;

public class Price implements Runnable{
	DataFile d=null;
	Price(DataFile data){
		this.d=data;
	}

	Scanner ss=new Scanner(System.in);
	
	public void run() {
		System.out.println("1.Front    Row Rs.100 \n2.Second Class Rs.130 \n3.First  Class Rs.190 \n0 --> Back");
		int input=ss.nextInt();
		if(input==0) 
	    d.displayDetails();
	}
	
	
}
