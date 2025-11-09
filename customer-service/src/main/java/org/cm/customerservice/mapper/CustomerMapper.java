package org.cm.customerservice.mapper;

import org.cm.customerservice.dto.CustomerResponseDTO;
import org.cm.customerservice.model.Customer;

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


}
