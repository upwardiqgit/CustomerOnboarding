package com.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.model.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer> {
	
	@Query("from Customer where customerId = :customerId and customerName = :customerName")
	Optional<Customer> findByIdName(@Param("customerId") int customerId, @Param("customerName") String customerName);

}
