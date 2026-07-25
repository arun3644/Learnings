package CabBooking;

public class Users {
	private int id;
	private String name;
	private String location;
	
	
	public Users(int id, String name, String location) {
		// TODO Auto-generated constructor stub
		this.id=id;
		this.name=name;
		this.location=location;
	}

	public int getId() {
		return id;
	}
	
	public String getName() {
		return name;
	}
	
	public String getLocation() {
		return location;
	}
}
