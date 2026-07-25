package MovieBooking;

import java.util.*;
class BookingTask implements Runnable {
	 private TicketBookingSystem system;
	    private Movie movie;
	    private List<Integer> seats;

	    public BookingTask(TicketBookingSystem system, Movie movie, List<Integer> seats) {
	        this.system = system;
	        this.movie = movie;
	        this.seats = seats;
	    }

	    @Override
	    public void run() {
	        system.bookTickets(movie, seats);
	    }
}