package MovieBooking;
import java.util.*;
public class TicketBookingSystem {


private List<Movie> movies = new ArrayList<>();

// ✅ Fix: Separate seat map for each movie
// Outer map -> Movie name
// Inner map -> Seat number -> Availability
private HashMap<String, HashMap<Integer, Boolean>> seatMap = new HashMap<>();

// Add new movie
public synchronized void addMovie(Movie movie) {
    movies.add(movie);

    // ✅ Create independent seat map for this movie
    HashMap<Integer, Boolean> seats = new HashMap<>();
    for (int i = 1; i <= 10; i++) {
        seats.put(i, true); // true = available
    }
    seatMap.put(movie.getName(), seats);
}

// Show available movies and their seat counts
public void showMovies() {
    System.out.println("Available Movies:");
    for (Movie movie : movies) {
        HashMap<Integer, Boolean> seats = seatMap.get(movie.getName()); // ✅ Separate seats per movie
        long available = seats.values().stream().filter(v -> v).count();
        System.out.println("- " + movie.getName() + " (" + available + " seats available)");
    }
}

// Book tickets for a given movie and seat numbers
public synchronized void bookTickets(Movie movie, List<Integer> seatNumbers) {
    HashMap<Integer, Boolean> seats = seatMap.get(movie.getName()); // ✅ Use seat map of that movie

    for (int seat : seatNumbers) {
        if (seats.containsKey(seat) && seats.get(seat)) {
            seats.put(seat, false); // Seat booked
            System.out.println("Seat " + seat + " booked for " + movie.getName());
        } else {
            System.out.println("Seat " + seat + " is not available for " + movie.getName());
        }
    }
 }

}
