package StoreSimulation;

public class PurchaseTask implements Runnable{
	 private Product product;
	 private Customer customer;
	 private InventorySystem system;
	 private int quantity;
	 public PurchaseTask(InventorySystem system, Customer customer, Product product, int quantity) {
		 this.system=system;
		 this.product=product;
		 this.customer=customer;
		 this.quantity=quantity;
	 }
	 public void run() {
		 system.purchase(customer,product,quantity);
	 }
}
