package StoreSimulation;

public class Customer {
   private String name;
   private int id;
   private long phoneNum;
   
   public Customer(int id,String name, long num){
	   this.name=name;
	   this.id=id;
	   this.phoneNum=num;
   }
   
   public String getName() {
	   return name;
   }
   public int getId() {
	   return id;
   }
   public long getNumber() {
	   return phoneNum;
   }
}
