package CabBooking;

public class Cab {
	private int id;
	private String name;
	private String location;

	
	public Cab(int id, String name, String location) {
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
