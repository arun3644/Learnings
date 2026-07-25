package jdbc;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.sql.*;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.sql.Date;

public class Main {
	private static Scanner ss = new Scanner(System.in);

	public static void clearBuffer() {
		if (ss.hasNextLine())
			ss.nextLine();
	}

	public static Connection getConnection() {
		Connection con = null;
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");

			final String url = "jdbc:mysql://localhost:3306/library";
			final String userName = "root";
			final String pass = "root";

			con = DriverManager.getConnection(url, userName, pass);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return con;

	}

	public static int getBookId() {
		int bookId = -1;
		System.out.print("Enter the Book ID you want to return: ");
		int idToCheck = ss.nextInt();

		String fetchBookIdQuery = "SELECT * FROM books WHERE book_id=?";

		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(fetchBookIdQuery)) {

			ps.setInt(1, idToCheck);
			ResultSet rs = ps.executeQuery();

			if (rs.next())
				bookId = rs.getInt("book_id");
		} catch (SQLException e) {
			System.err.println("DataBase Error in getBookId(): " + e.getMessage());
		}
		return bookId;
	}

	public static void addBook() {

		clearBuffer();

		System.out.print("Enter Book Name: ");
		String title = ss.nextLine().trim();

		System.out.print("Enter the Author Name: ");
		String author = ss.nextLine().trim();

		String query = "INSERT INTO books(title,author,available) VALUES(?,?,?)";

		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(query)) {

			ps.setString(1, title);
			ps.setString(2, author);
			ps.setBoolean(3, true);

			int rows = ps.executeUpdate();

			if (rows > 0) {
				System.out.println("Book Added Successfully");
				System.out.println(" Title: " + title);
				System.out.println(" Author: " + author);
			} else
				System.out.println("Book Not Added, Please Try again!");
		} catch (SQLException e) {
			System.err.println("Database error in addBook(): " + e.getMessage());
		}
	}

	public static void addMember() {

		clearBuffer();

		System.out.print("Enter the Member Name: ");
		String name = ss.nextLine().trim();

		System.out.print("Enter the Email: ");
		String email = ss.nextLine().trim();

		String query = "INSERT INTO members(name,email) VALUES(?,?)";

		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(query)) {

			ps.setString(1, name);
			ps.setString(2, email);

			int rows = ps.executeUpdate();

			if (rows > 0) {
				System.out.println("\nMember Added Successfully...");
				System.out.println("  MEMBER NAME: " + name);
				System.out.println("  EMAIL :" + email);
			} else {
				System.out.println("Member Not Added, Please Try again");
			}

		} catch (SQLException e) {
			System.err.println("Database error in addMember(): " + e.getMessage());
		}
	}

	public static void showBook() {

		String query = "SELECT * from BOOKS";
		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(query)) {

			ResultSet rs = ps.executeQuery();

			boolean hasResult = false;

			System.out.printf("%-4s | %-25s | %-20s | %-9s%n", "ID", "Title", "Author", "Available");
			System.out.println("-------------------------------------------------------------");

			while (rs.next()) {
				hasResult = true;
				int id = rs.getInt("book_id");
				String title = rs.getString("title");
				String author = rs.getString("author");
				boolean available = rs.getBoolean("available");

				System.out.printf("%-4d | %-25s | %-20s | %-9s%n", id, title, author, available ? "Yes" : "No");
			}

			if (!hasResult) {
				System.out.println("No Books Available in the Library.");
			}
		} catch (SQLException e) {
			System.err.println("Database error in showBook() : " + e.getMessage());
		}
	}

	public static int addMemberIdByEmail() {

		System.out.print("Enter your Email ID: ");
		String email = ss.nextLine();

		String query = "SELECT * from members WHERE email= ?";

		try (Connection con = getConnection(); PreparedStatement ps = con.prepareStatement(query)) {
			ps.setString(1, email);
			ResultSet rs = ps.executeQuery();

			while (rs.next())
				return rs.getInt("member_id");

		} catch (SQLException e) {
			System.err.println("DataBase Error in addMemberIdByEmail(): " + e.getMessage());
		}

		return -1;
	}

	public static LocalDate getReturnDate(int book_id) {
		
		String getReturnDateQuery ="SELECT t.due_date FROM transactions t join books b ON b.book_id=t.book_id WHERE b.book_id=?";
		
		LocalDate date=null;
		try(Connection con=getConnection();
					PreparedStatement getReturnDateStmt = con.prepareStatement(getReturnDateQuery)) {
			
			 getReturnDateStmt.setInt(1,book_id);
			 ResultSet rs = getReturnDateStmt.executeQuery();
			 
			 date = rs.next() ? rs.getDate("due_date").toLocalDate() : null;
		
		}
				catch(SQLException e) {
			System.err.println("Database Error in getReturnDate() : "+e.getMessage());
		}
		return date;
	}
	
	private static final Map<Integer, Object> booklocks = new ConcurrentHashMap<>();
	
	private static Object getBookLockObject(int bookId) {
		booklocks.putIfAbsent(bookId, new Object());
		return booklocks.get(bookId);
	}
	public static void issueBook() {

		clearBuffer();
		int memberId = addMemberIdByEmail();

		if (memberId < 0) {
			System.out.println("You are not a Member of the library");
			return;
		}

		showBook();
		System.out.print("Enter Book id: ");
		int bookId = ss.nextInt();
		
		Object lock = getBookLockObject(bookId);
		
		synchronized (lock){
			Date issueDate = new Date(System.currentTimeMillis());

			final int LOAN_PERIOD_DAYS = 15;

			final long millisInLoanPeriod = LOAN_PERIOD_DAYS * 24L * 60 * 60 * 1000;

			Date dueDate = new Date(issueDate.getTime() + millisInLoanPeriod);

			String insertTransactionQuery = "INSERT INTO transactions(member_id, book_id, issue_date, due_date) VALUES(?,?,?,?)";

			String updateBookAvailabilityQuery = "UPDATE books SET available=false where book_id=?";

			String fetchUserQuery = "SELECT * from members WHERE member_id=?";

			String checkAvailableQuery = "SELECT available from books WHERE book_id=? FOR UPDATE";

			try (Connection con = getConnection()) {
				con.setAutoCommit(false);
				try (PreparedStatement insertTransactionStmt = con.prepareStatement(insertTransactionQuery);
						PreparedStatement updateAvailabilityStmt = con.prepareStatement(updateBookAvailabilityQuery);
						PreparedStatement fetchUserStmt = con.prepareStatement(fetchUserQuery);
						PreparedStatement checkAvailableStmt = con.prepareStatement(checkAvailableQuery)){

					checkAvailableStmt.setInt(1, bookId);
					ResultSet rs1 = checkAvailableStmt.executeQuery();

					if (rs1.next() && rs1.getBoolean("available")) {
						insertTransactionStmt.setInt(1, memberId);
						insertTransactionStmt.setInt(2, bookId);
						insertTransactionStmt.setDate(3, issueDate);
						insertTransactionStmt.setDate(4, dueDate);

						int rows = insertTransactionStmt.executeUpdate();

						updateAvailabilityStmt.setInt(1, bookId);
						updateAvailabilityStmt.executeUpdate();

						fetchUserStmt.setInt(1, memberId);
						ResultSet rs2 = fetchUserStmt.executeQuery();

						String userName = rs2.next() ? rs2.getString("name") : "Member";

						if (rows == 0) {
							con.rollback();
							System.err.println("Transaction Failed. Please Try Again.");
						}

						else {
							con.commit();
							System.out.printf("Thank You, %s. You have to return this book on: %s ", userName, dueDate);

						}

					}
					else {
						System.out.println("Sorry! This Book is currently unavailable...");
	                 	System.out.println("You may get this book On or After: " +getReturnDate(bookId));
						
					}
				} catch (SQLException e) {
					con.rollback();
					System.err.println("Database error in issueBook(): " + e.getMessage());
				}

			} catch (Exception e) {
				System.err.println("Database Error in issueBook(): " + e.getMessage());
			}
		}
		

	}

	public static void returnBook() {

		clearBuffer();
		int memberId = addMemberIdByEmail();

		if (memberId < 0) {
			System.out.println("\nYou are not a member of a Library");
			return;
		}

		int bookId = getBookId();

		if (bookId < 0) {
			System.out.println("\nThis book does not belong to this library.");
			return;
		}

		LocalDate date=getReturnDate(bookId);
		
		LocalDate currentDate = LocalDate.now();
		
		long daysDiff = ChronoUnit.DAYS.between(date, currentDate);

		if(currentDate.isAfter(date)) {
			System.out.println("The Book is Overdue");
			System.out.println("You must pay "+ (daysDiff * 2)+" rupees for exceeding the due date by "+daysDiff+" Days.");
		}
		
		String returnedDateQuery ="UPDATE transactions SET returned_date=? WHERE book_id=?";
		String updateAvailableQuery = "UPDATE books SET available=true WHERE book_id=?";
		
		try(Connection con = getConnection()){
			
			con.setAutoCommit(false);
			
			try( PreparedStatement updateAvailableStmt = con.prepareStatement(updateAvailableQuery);
				 PreparedStatement returnedDateStmt = con.prepareStatement(returnedDateQuery)){
				
				updateAvailableStmt.setInt(1,bookId);
				int row1 = updateAvailableStmt.executeUpdate();
				
				returnedDateStmt.setDate(1,Date.valueOf(currentDate));
				returnedDateStmt.setInt(2, bookId);
				int row2 = returnedDateStmt.executeUpdate();
				
				if(row1 == 0 || row2 == 0) {
					con.rollback();
					System.err.println("⚠ Transaction failed while updating records. Please try again.");
				}
				else {
					con.commit();
					System.out.println("Book returned successfully.");
				}
			}
			catch(SQLException e) {
				System.err.println("Database Error in returnBook(): "+e.getMessage());
			}
			
		}
		catch(SQLException e) {
			System.err.println("DataBase Error in returnBook(): "+e.getMessage());			
		}
	}
	
	public static void viewIssuedBooksWithMembers() {

		String fetchQuery = "SELECT t.book_id, t.member_id, b.title, m.name, t.returned_date "+
		                    "FROM transactions t "+
				            "JOIN books b ON t.book_id = b.book_id "+
		                    "JOIN members m ON t.member_id = m.member_id";
		try(Connection con = getConnection();
			 PreparedStatement fetchStmt = con.prepareStatement(fetchQuery);
			 ResultSet rs = fetchStmt.executeQuery()){
	
			System.out.printf("%-4s | %-20s | %-4s | %-20s%n",
					 "MEMBER_ID","MEMBER_NAME","BOOK_ID","TITLE");
			
			boolean found = false;
			while(rs.next()) {
				
				if(rs.getDate("returned_date") == null) {
					found = true;
					
					System.out.printf("%-9d | %-20s | %-7d | %-20s%n",
							rs.getInt("member_id"),
							rs.getString("name"),
							rs.getInt("book_id"),
							rs.getString("title"));

				}
			}
			if(!found) {
				System.out.println("All books are returned.");
			}
		}
		catch(SQLException e) {
			System.err.println("Database error in viewIssuedBooksWithMembers(): "+e.getMessage());
		}
	}
	
	/*Prints list of overdue books with member details. */

	public static void overDueBooks() {
		
		String overDueQuery = 
			    "SELECT t.member_id, m.name, t.book_id, b.title " +
			    "FROM transactions t "+
			    "JOIN members m ON t.member_id = m.member_id " +
			    "JOIN books b ON t.book_id = b.book_id "+
			    "WHERE (t.returned_date > t.due_date) "+
			    "OR (t.returned_date is null AND current_date() > t.due_date)";

		
		try(Connection con = getConnection();
			PreparedStatement overDueStmt = con.prepareStatement(overDueQuery);
			ResultSet rs = overDueStmt.executeQuery()){
			
			System.out.printf("%n%-4s | %-14s | %-4s | %-20s%n","MEMBER_ID","NAME","BOOK_ID","TITLE");
			while(rs.next()) {
				System.out.printf("%-9d | %-14s | %-7d | %-20s%n",
						  rs.getInt("member_id"),
						  rs.getString("name"),
						  rs.getInt("book_id"),
						  rs.getString("title"));
			}
			
		}
		catch(SQLException e) {
			System.err.println("Database Error in overDueBooks() : "+e.getMessage());
		}
	}

	public static void searchByTitleOrAuthor() {
		
		System.out.println("--------Books Search--------");
		System.out.println("  1. Search by TITLE");
		System.out.println("  2. Search by AUTHOR");
		System.out.print("Enter your choice (1 or 2):  ");
		int choice = ss.nextInt();
		clearBuffer();
		
		String fetchQuery;
		String userInput;
		
		switch(choice) {
		case 1:
			System.out.print("Enter Book Title: ");
			userInput = ss.nextLine().trim();
			fetchQuery = "SELECT book_id, title, author FROM books WHERE title like ?";
			break;
		case 2:
			System.out.print("Enter Author Name: ");
			userInput = ss.nextLine().trim();
			fetchQuery = "SELECT book_id, title, author FROM books WHERE author like ?";
			break;
		default:
			 System.out.println("Invalid choice. Please enter 1 or 2.");
	            return;
			
		}
		
		try(Connection con=getConnection();
			PreparedStatement fetchTitleStmt = con.prepareStatement(fetchQuery)){
			
			fetchTitleStmt.setString(1, "%"+userInput+"%");
			
			ResultSet rs = fetchTitleStmt.executeQuery();
			
			boolean inputFound = false;
			System.out.printf("%n%-7s | %-25s | %-15s%n", "BOOK_ID", "TITLE", "AUTHOR");
			System.out.println("-------------------------------------------------------");
             while(rs.next()) {
				inputFound = true;
				System.out.printf("%-7s | %-25s | %-15s%n",rs.getInt("book_id"),rs.getString("title"),rs.getString("author"));
			}
			if(!inputFound) {
				System.out.println("No books found matching your search.");
				return;
			}
			
		}
		catch(SQLException e) {
			System.out.println("Database Error in searchByTitleOrAuthor(): "+e.getMessage());
		}
		
	}
	public static void main(String args[]) {

		while (true) {
			System.out.println("\n\nEnter your choice:");
			System.out.println("1 -> Add new book");
			System.out.println("2 -> Add new member");
			System.out.println("3 -> Issue a book");
			System.out.println("4 -> Return a book");
			System.out.println("5 -> View all issued books with member details");
			System.out.println("6 -> Find overdue books");
			System.out.println("7 -> Search books by title/author");
			System.out.println("8 -> Exit");

			int input = ss.nextInt();

			switch (input) {

			case 1:
				addBook();
				break;
			case 2:
				addMember();
				break;
			case 3:
				issueBook();
				break;
			case 4:
				returnBook();
				break;
			case 5: 
				viewIssuedBooksWithMembers();
				break;
			case 6:
				overDueBooks();
				break;
			case 7:
				searchByTitleOrAuthor();
				break;
			case 8:
				return;
			default:
				System.out.println("Invalid choice. Please Enter Correct Choice...");
			}

		}

	}
}
