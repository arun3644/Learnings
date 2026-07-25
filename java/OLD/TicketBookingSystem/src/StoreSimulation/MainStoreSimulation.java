package StoreSimulation;

import java.util.Arrays;

public class MainStoreSimulation {
	public static void main(String args[]) {
		
		InventorySystem system=new InventorySystem();
		
		//(id, ProName, price, stock)
		Product rice=new Product(1,"rice",80,40);
		Product sugar=new Product(2,"sugar",45,10);
		Product c_masala=new Product(3,"C_masala",20,20);
		
		system.addProduct(rice);
		system.addProduct(sugar);
		system.addProduct(c_masala);
		
		//(id,name, phoneNumber)
		Customer arun=new Customer(1,"arun",7865432198L);
		Customer asif=new Customer(2,"asif",9872349878L);
		
		system.addCustomer(arun);
		system.addCustomer(asif);
		
		System.out.println("Initial Stock....\n");
		system.showProducts();
		
		Thread t1=new Thread(new PurchaseTask(system,arun,sugar,8));
		Thread t2=new Thread(new PurchaseTask(system,arun,rice,5));
		Thread t3=new Thread(new PurchaseTask(system,arun,c_masala,2));
		Thread t4=new Thread(new PurchaseTask(system,asif,rice,10));
		Thread t5=new Thread(new PurchaseTask(system,asif,sugar,4));
		
		t1.start();
		t2.start();
		t3.start();
		t4.start();
		t5.start();
		
		try {
			t1.join();
			t2.join();
			t3.join();
			t4.join();
			t5.join();
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		System.out.println();
		System.out.println("\nAfter purchasing.......\n");
		system.showProducts();
		
		
	}
}
