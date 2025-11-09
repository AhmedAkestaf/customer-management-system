package org.cm.customerservice.controller;

import org.cm.customerservice.dto.CustomerResponseDTO;
import org.cm.customerservice.service.CustomerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

}
