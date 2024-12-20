package com.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Customer {
	
	@Id @Column(unique = true)
	private int customerId;
	private String customerName;
	private String Gender;
	private String address;
	private boolean newsletterSubscription;
	
	public Customer() {
		super();
	}

	public Customer(int customerId, String customerName, String gender, String address) {
		super();
		this.customerId = customerId;
		this.customerName = customerName;
		Gender = gender;
		this.address = address;
	}

	public int getCustomerId() {
		return customerId;
	}

	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getGender() {
		return Gender;
	}

	public void setGender(String gender) {
		Gender = gender;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public boolean isNewsletterSubscription() {
		return newsletterSubscription;
	}

	public void setNewsletterSubscription(boolean newsletterSubscription) {
		this.newsletterSubscription = newsletterSubscription;
	}
	
	
	
	
	
}
