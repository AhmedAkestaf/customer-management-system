package org.cm.analyticsservice.repository;

import org.cm.analyticsservice.model.CustomerAnalytics;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface CustomerAnalyticsRepository extends MongoRepository<CustomerAnalytics, String> {

    Optional<CustomerAnalytics> findByDate(LocalDate date);

    List<CustomerAnalytics> findByDateBetweenOrderByDateDesc(
            LocalDate startDate,
            LocalDate endDate
    );

    Optional<CustomerAnalytics> findTopByOrderByDateDesc();

    boolean existsByDate(LocalDate date);
}