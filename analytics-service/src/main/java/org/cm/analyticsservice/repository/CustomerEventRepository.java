package org.cm.analyticsservice.repository;

import org.cm.analyticsservice.model.CustomerEventDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CustomerEventRepository extends MongoRepository<CustomerEventDocument, String> {

    List<CustomerEventDocument> findByCustomerId(String customerId);

    List<CustomerEventDocument> findByEventType(String eventType);

    List<CustomerEventDocument> findByTimestampBetween(
            LocalDateTime start,
            LocalDateTime end
    );

    @Query("{ 'eventType': ?0, 'timestamp': { $gte: ?1, $lte: ?2 } }")
    List<CustomerEventDocument> findEventsByTypeAndDateRange(
            String eventType,
            LocalDateTime start,
            LocalDateTime end
    );

    Long countByEventTypeAndTimestampBetween(
            String eventType,
            LocalDateTime start,
            LocalDateTime end
    );


    List<CustomerEventDocument> findTop10ByOrderByTimestampDesc();
}