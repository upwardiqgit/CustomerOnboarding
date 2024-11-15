package com.ts;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.dao.CustomerService;
import com.model.Customer;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CustomerController {

	@Autowired
	CustomerService customerService;

	@PostMapping("addcustomer")
	public Customer addCustomer(@RequestBody Customer customer) {
		if (customerService.isCustomerIdUnique(customer.getCustomerId())) {
			return customerService.addCustomer(customer);
		} else {
			throw new ResponseStatusException(HttpStatus.CONFLICT, "Customer ID already exists");
		}
	}

	@GetMapping("validateCustomerId/{customerId}")
	public boolean validateCustomerId(@PathVariable int customerId) {
		return customerService.isCustomerIdUnique(customerId);
	}

	@GetMapping("getcustomer/{customerId}/{customerName}")
	public Optional<Customer> getCustomer(@PathVariable int customerId, @PathVariable String customerName) {
		return customerService.getCustomer(customerId, customerName);
	}

}
