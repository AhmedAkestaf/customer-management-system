package org.cm.customerservice.kafka;

import customer.events.CustomerEvent;
import org.cm.customerservice.model.Customer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
public class kafkaProducer {

    private static final Logger log = LoggerFactory.getLogger(kafkaProducer.class);
    private final KafkaTemplate<String, byte[]> kafkaTemplate;

    public kafkaProducer(KafkaTemplate<String, byte[]> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendEvent(Customer customer) {
        log.info("Preparing to send CustomerEvent for customer: {}", customer.getId());

        CustomerEvent.Builder eventBuilder = CustomerEvent.newBuilder()
                .setCustomerId(customer.getId().toString())
                .setName(customer.getName())
                .setEmail(customer.getEmail())
                .setEventType("CUSTOMER_CREATED")
                .setTimestamp(System.currentTimeMillis());


        if (customer.getAddress() != null) {
            eventBuilder.setAddress(customer.getAddress());
        }


        CustomerEvent event = eventBuilder.build();

        try {
            CompletableFuture<SendResult<String, byte[]>> future =
                    kafkaTemplate.send("customers", customer.getId().toString(), event.toByteArray());

            future.whenComplete((result, ex) -> {
                if (ex == null) {
                    log.info("Successfully sent CustomerEvent for customer: {} to partition: {} with offset: {}",
                            customer.getId(),
                            result.getRecordMetadata().partition(),
                            result.getRecordMetadata().offset());
                } else {
                    log.error("Failed to send CustomerEvent for customer: {}, error: {}",
                            customer.getId(), ex.getMessage(), ex);
                }
            });

        } catch (Exception e) {
            log.error("Error sending CustomerCreated Event for customer: {}, error: {}",
                    customer.getId(), e.getMessage(), e);
        }
    }


    public void sendUpdateEvent(Customer customer) {
        log.info("Preparing to send CustomerUpdateEvent for customer: {}", customer.getId());

        CustomerEvent event = CustomerEvent.newBuilder()
                .setCustomerId(customer.getId().toString())
                .setName(customer.getName())
                .setEmail(customer.getEmail())
                .setEventType("CUSTOMER_UPDATED")
                .setTimestamp(System.currentTimeMillis())
                .setAddress(customer.getAddress() != null ? customer.getAddress() : "")
                .build();

        try {
            kafkaTemplate.send("customers", customer.getId().toString(), event.toByteArray());
            log.info("Successfully sent CustomerUpdateEvent for customer: {}", customer.getId());
        } catch (Exception e) {
            log.error("Error sending CustomerUpdateEvent for customer: {}", customer.getId(), e);
        }
    }


    public void sendDeleteEvent(String customerId) {
        log.info("Preparing to send CustomerDeleteEvent for customer: {}", customerId);

        CustomerEvent event = CustomerEvent.newBuilder()
                .setCustomerId(customerId)
                .setEventType("CUSTOMER_DELETED")
                .setTimestamp(System.currentTimeMillis())
                .build();

        try {
            kafkaTemplate.send("customers", customerId, event.toByteArray());
            log.info("Successfully sent CustomerDeleteEvent for customer: {}", customerId);
        } catch (Exception e) {
            log.error("Error sending CustomerDeleteEvent for customer: {}", customerId, e);
        }
    }
}