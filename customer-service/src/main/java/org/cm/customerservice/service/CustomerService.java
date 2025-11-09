package org.cm.customerservice.service;

import org.cm.customerservice.dto.CustomerRequestDTO;
import org.cm.customerservice.dto.CustomerResponseDTO;
import org.cm.customerservice.exception.CustomerNotFoundException;
import org.cm.customerservice.exception.EmailAlreadyExistsException;
import org.cm.customerservice.mapper.CustomerMapper;
import org.cm.customerservice.model.Customer;
import org.cm.customerservice.repository.CustomerRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    public List<CustomerResponseDTO> getCustomers() {
        List<Customer> customers = customerRepository.findAll();

        return customers.stream().map(CustomerMapper::toDTO).toList();

    }

    public CustomerResponseDTO createCustomer(CustomerRequestDTO customerRequestDTO) {
        if (customerRepository.existsByEmail(customerRequestDTO.getEmail())) {
            throw new EmailAlreadyExistsException("A customer with email "
                              + " already exists" + customerRequestDTO.getEmail());
        }

        Customer newCustomer = customerRepository.save(CustomerMapper.toModel(customerRequestDTO));

        return CustomerMapper.toDTO(newCustomer);
    }

    public CustomerResponseDTO updateCustomer(UUID id, CustomerRequestDTO customerRequestDTO) {
        Customer customer = customerRepository.findById(id).orElseThrow(
                () -> new CustomerNotFoundException("Customer not found with ID: " + id));

        if (customerRepository.existsByEmailAndIdNot(customerRequestDTO.getEmail(),id)) {
            throw new EmailAlreadyExistsException("A customer with email "
                    + " already exists" + customerRequestDTO.getEmail());
        }

        customer.setName(customerRequestDTO.getName());
        customer.setEmail(customerRequestDTO.getEmail());
        customer.setAddress(customerRequestDTO.getAddress());
        customer.setDateOfBirth(LocalDate.parse(customerRequestDTO.getDateOfBirth()));

        Customer updatedCustomer = customerRepository.save(customer);

        return CustomerMapper.toDTO(updatedCustomer);



    }


}
