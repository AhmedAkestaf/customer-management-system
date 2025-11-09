package org.cm.customerservice.service;

import org.cm.customerservice.dto.CustomerRequestDTO;
import org.cm.customerservice.dto.CustomerResponseDTO;
import org.cm.customerservice.mapper.CustomerMapper;
import org.cm.customerservice.model.Customer;
import org.cm.customerservice.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public CustomerResponseDTO createCustomer(CustomerRequestDTO customerRequestDTO){
        Customer newCustomer = customerRepository.save(CustomerMapper.toModel(customerRequestDTO));

        return CustomerMapper.toDTO(newCustomer);
    }


}
