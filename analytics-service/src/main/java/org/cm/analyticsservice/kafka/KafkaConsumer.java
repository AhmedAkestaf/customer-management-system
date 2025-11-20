package org.cm.analyticsservice.kafka;

import com.google.protobuf.InvalidProtocolBufferException;
import customer.events.CustomerEvent;
import org.cm.analyticsservice.model.CustomerEventDocument;
import org.cm.analyticsservice.service.AnalyticsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.HashMap;
import java.util.Map;

@Service
public class KafkaConsumer {
    private static final Logger log = LoggerFactory.getLogger(KafkaConsumer.class);

    private final AnalyticsService analyticsService;

    public KafkaConsumer(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @KafkaListener(
            topics = "customers",
            groupId = "analytics-service-group",
            containerFactory = "kafkaListenerContainerFactory"
    )
    public void consumeEvent(
            @Payload byte[] eventBytes,
            @Header(KafkaHeaders.RECEIVED_TOPIC) String topic,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition,
            @Header(KafkaHeaders.OFFSET) long offset) {

        log.info("Received message from topic: {}, partition: {}, offset: {}",
                topic, partition, offset);

        try {
            CustomerEvent customerEvent = CustomerEvent.parseFrom(eventBytes);

            log.info("Processing Customer Event: [CustomerId={}, Name={}, Email={}, Type={}]",
                    customerEvent.getCustomerId(),
                    customerEvent.getName(),
                    customerEvent.getEmail(),
                    customerEvent.getEventType());

            CustomerEventDocument document = convertToDocument(customerEvent);

            analyticsService.saveEvent(document);

            log.info("Event successfully processed and saved to MongoDB with ID: {}",
                    document.getId());

        } catch (InvalidProtocolBufferException e) {
            log.error("Error deserializing Protobuf event: {}", e.getMessage(), e);
        } catch (Exception e) {
            log.error("Error processing customer event: {}", e.getMessage(), e);
        }
    }


    private CustomerEventDocument convertToDocument(CustomerEvent event) {
        long timestampMillis = event.getTimestamp();
        LocalDateTime timestamp = (timestampMillis > 0)
                ? LocalDateTime.ofInstant(
                Instant.ofEpochMilli(timestampMillis),
                ZoneId.systemDefault())
                : LocalDateTime.now();

        Map<String, Object> metadata = new HashMap<>();
        metadata.put("receivedAt", LocalDateTime.now().toString());

        CustomerEventDocument.Builder builder = CustomerEventDocument.builder()
                .customerId(event.getCustomerId())
                .name(event.getName())
                .email(event.getEmail())
                .eventType(event.getEventType())
                .timestamp(timestamp)
                .address(event.getAddress())
                .metadata(metadata);



        return builder.build();
    }
}