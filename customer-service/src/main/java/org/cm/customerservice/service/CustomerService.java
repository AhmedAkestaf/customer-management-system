package org.cm.customerservice.service;

import org.cm.customerservice.dto.CustomerResponseDTO;
import org.cm.customerservice.mapper.CustomerMapper;
import org.cm.customerservice.model.Customer;
import org.cm.customerservice.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerService {
    private CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<CustomerResponseDTO> getCustomers(){
        List<Customer> customers = customerRepository.findAll();

        return customers.stream()
                .map(CustomerMapper::toDTO).toList();

    }


}
