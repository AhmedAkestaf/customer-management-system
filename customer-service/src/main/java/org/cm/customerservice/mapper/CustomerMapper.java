package org.cm.customerservice.mapper;

import org.cm.customerservice.dto.CustomerRequestDTO;
import org.cm.customerservice.dto.CustomerResponseDTO;
import org.cm.customerservice.model.Customer;

import java.time.LocalDate;

public class CustomerMapper {

    public static CustomerResponseDTO toDTO(Customer customer){
        CustomerResponseDTO customerDTO = new CustomerResponseDTO();
        customerDTO.setId(customer.getId().toString());
        customerDTO.setName(customer.getName());
        customerDTO.setEmail(customer.getEmail());
        customerDTO.setAddress(customer.getAddress());
        customerDTO.setDateOfBirth(customer.getDateOfBirth().toString());
        return customerDTO;

    }

    public static Customer toModel(CustomerRequestDTO customerRequestDTO){
        Customer customer = new Customer();
        customer.setName(customerRequestDTO.getName());
        customer.setEmail(customerRequestDTO.getEmail());
        customer.setAddress(customerRequestDTO.getAddress());
        customer.setDateOfBirth(LocalDate.parse(customerRequestDTO.getDateOfBirth()));
        customer.setRegisteredDate(LocalDate.parse(customerRequestDTO.getRegisteredDate()));

        return customer;
    }


}
