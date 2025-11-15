package org.cm.customerservice.kafka;
import customer.events.CustomerEvent;
import org.cm.customerservice.model.Customer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class kafkaProducer {

    private static final Logger log = LoggerFactory.getLogger(kafkaProducer.class);
    private final KafkaTemplate<String, byte[]> kafkaTemplate;

    public kafkaProducer(KafkaTemplate<String, byte[]> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendEvent(Customer customer) {
        CustomerEvent event = CustomerEvent.newBuilder()
                .setCustomerId(customer.getId().toString())
                .setName(customer.getName())
                .setEmail(customer.getEmail())
                .setEventType("Customer_CREATED")
                .build();

        try{
            kafkaTemplate.send("customers",event.toByteArray());
        }
        catch(Exception e){
            log.error("Error sending CustomerCreated Event {}",event);
        }

    }


}
