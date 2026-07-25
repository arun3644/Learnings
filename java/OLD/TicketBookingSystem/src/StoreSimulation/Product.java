package StoreSimulation;

public class Product {
   private String proName;
   private int proId;
   private int price;
   private int stock;
   
   public  Product( int proId,String proName, int price, int stock) {
	   this.proName=proName;
	   this.proId=proId;
	   this.price=price;
	   this.stock=stock;
   }
   
   public String getProName() {
	   return proName;
   }
   public int getProId() {
	   return proId;
   }
   public int getPrice() {
	   return price;
   }
   public int getStock() {
	   return stock;
   }
   public void setStock(int stock) {
	   this.stock=stock;
   }
}
