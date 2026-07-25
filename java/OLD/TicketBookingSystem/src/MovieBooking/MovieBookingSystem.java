package MovieBooking;
import java.util.*;
public class MovieBookingSystem {
	public static void main(String[] args) {
		TicketBookingSystem system = new TicketBookingSystem();

        // Add movies (each gets its own seat map)
        Movie avengers = new Movie("Avengers");
        Movie spiderman = new Movie("Spider-Man");
        Movie coolie = new Movie("coolie");
        system.addMovie(avengers);
        system.addMovie(spiderman);
        system.addMovie(coolie);

        // Show movies initially
        system.showMovies();

        // Multithreading simulation: multiple users booking at the same time
        Thread t1 = new Thread(new BookingTask(system, avengers, Arrays.asList(1, 2, 3)));
        Thread t2 = new Thread(new BookingTask(system, avengers, Arrays.asList(2, 4))); // Seat 2 clash
        Thread t3 = new Thread(new BookingTask(system, spiderman, Arrays.asList(1, 2))); // Spider-Man seats independent
        Thread t4 = new Thread(new BookingTask(system, coolie, Arrays.asList(1, 2)));
        // Start threads
        t1.start();
        t2.start();
        t3.start();
        t4.start();

        // Wait for all threads to finish
        try {
            t1.join();
            t2.join();
            t3.join();
            t4.join();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Show movies after booking
        System.out.println("\nAfter booking:");
        system.showMovies();
    }
	    }

