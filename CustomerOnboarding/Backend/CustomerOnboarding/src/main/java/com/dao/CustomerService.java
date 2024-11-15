package com.dao;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Customer;

@Service
public class CustomerService {
	
	@Autowired
	CustomerRepository customerRepository;

	public Customer addCustomer(Customer customer) {
		return customerRepository.save(customer);
	}
	
	public boolean isCustomerIdUnique(int customerId) {
	    return !customerRepository.existsById(customerId);
	}

	public Optional<Customer> getCustomer(int customerId, String customerName) {
	    return customerRepository.findByIdName(customerId, customerName);
	}
	



}
