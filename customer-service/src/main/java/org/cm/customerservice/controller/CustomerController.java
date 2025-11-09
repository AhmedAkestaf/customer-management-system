package org.cm.customerservice.controller;

import jakarta.validation.Valid;
import jakarta.validation.groups.Default;
import org.cm.customerservice.dto.CustomerRequestDTO;
import org.cm.customerservice.dto.CustomerResponseDTO;
import org.cm.customerservice.dto.validators.CreateCustomerValidationGroup;
import org.cm.customerservice.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public ResponseEntity<List<CustomerResponseDTO>> getCustomers() {
        List<CustomerResponseDTO> customers = customerService.getCustomers();
        return ResponseEntity.ok().body(customers);
    }

    @PostMapping
    public ResponseEntity<CustomerResponseDTO> createCustomer(@Validated({Default.class, CreateCustomerValidationGroup.class}) @RequestBody CustomerRequestDTO customerRequestDTO) {
        CustomerResponseDTO customerResponseDTO = customerService.createCustomer(customerRequestDTO);
        return ResponseEntity.ok().body(customerResponseDTO);


    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponseDTO> updateCustomer(@PathVariable UUID id ,@Validated({Default.class}) @RequestBody CustomerRequestDTO customerRequestDTO) {
        CustomerResponseDTO customerResponseDTO = customerService.updateCustomer(id, customerRequestDTO);
        return ResponseEntity.ok().body(customerResponseDTO);
    }

}
