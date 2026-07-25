package StoreSimulation;
import java.util.*;

public class InventorySystem {
	
	List<Product> productList=new ArrayList<>();
	List<Customer> customerList=new ArrayList<>();
	
	
	public synchronized void addProduct(Product product) {
		productList.add(product);
	}
	public synchronized void addCustomer(Customer customer) {
		customerList.add(customer);
	}
	public void showProducts() {
	
		System.out.println("Id  ProName  price Quantity(kg)");
		for(Product p: productList) {
			System.out.println(p.getProId()+"     "+p.getProName()+"    "+p.getPrice()+"    "+p.getStock()+"\n");
		}
		
	}
	
	public synchronized void purchase(Customer customer,Product product,int quantity) {
		boolean found =false;
		for(Product p: productList) {
			if(p.getProName().equalsIgnoreCase(product.getProName())) {
				found=true;
				if(quantity <= p.getStock()) {
					int updatedStock= p.getStock() - quantity;
					p.setStock(updatedStock);
					System.out.println("\n\nCustomer : \n"
							             + "	id          : "+customer.getId()
							             +"\n	Name        : "+customer.getName()
										 +"\n	PhoneNumber : "+customer.getNumber());
					System.out.println("Purchased " 
							             +"\n	ProductId   : "+product.getProId()
							             +"\n	Product     : "+product.getProName()
							             +"\n	Quantity(kg): "+quantity
							             +"\n	Price       : "+product.getPrice()*quantity+"\n\n\n");
				}
				else
					System.out.println( product.getProName()+" Stock is not Available!  for Customer : "+customer.getName());
				break;
			}
			
		}
		if(!found)
			System.out.println("X product not found: "+product.getProName());

	}
}
 