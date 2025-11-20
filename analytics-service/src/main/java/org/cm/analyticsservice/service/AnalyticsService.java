package org.cm.analyticsservice.service;

import org.cm.analyticsservice.model.CustomerAnalytics;
import org.cm.analyticsservice.model.CustomerEventDocument;
import org.cm.analyticsservice.repository.CustomerAnalyticsRepository;
import org.cm.analyticsservice.repository.CustomerEventRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
public class AnalyticsService {
    private static final Logger log = LoggerFactory.getLogger(AnalyticsService.class);

    private final CustomerEventRepository eventRepository;
    private final CustomerAnalyticsRepository analyticsRepository;

    public AnalyticsService(
            CustomerEventRepository eventRepository,
            CustomerAnalyticsRepository analyticsRepository) {
        this.eventRepository = eventRepository;
        this.analyticsRepository = analyticsRepository;
    }


    @Transactional
    public CustomerEventDocument saveEvent(CustomerEventDocument event) {
        log.info("Saving customer event: {} for customer: {}",
                event.getEventType(), event.getCustomerId());

        CustomerEventDocument savedEvent = eventRepository.save(event);

        updateDailyAnalytics(savedEvent);

        return savedEvent;
    }


    @Transactional
    public void updateDailyAnalytics(CustomerEventDocument event) {
        LocalDate today = event.getTimestamp().toLocalDate();

        log.info("Updating daily analytics for date: {}", today);

        CustomerAnalytics analytics = analyticsRepository.findByDate(today)
                .orElse(CustomerAnalytics.builder()
                        .date(today)
                        .totalCustomers(0L)
                        .newCustomers(0L)
                        .updatedCustomers(0L)
                        .deletedCustomers(0L)
                        .build());

        switch (event.getEventType()) {
            case "CUSTOMER_CREATED":
                analytics.setNewCustomers(analytics.getNewCustomers() + 1);
                analytics.setTotalCustomers(analytics.getTotalCustomers() + 1);
                break;
            case "CUSTOMER_UPDATED":
                analytics.setUpdatedCustomers(analytics.getUpdatedCustomers() + 1);
                break;
            case "CUSTOMER_DELETED":
                analytics.setDeletedCustomers(analytics.getDeletedCustomers() + 1);
                analytics.setTotalCustomers(analytics.getTotalCustomers() - 1);
                break;
        }


        calculateGrowthRate(analytics);

        analytics.setLastUpdated(LocalDateTime.now());
        analyticsRepository.save(analytics);

        log.info("Daily analytics updated successfully for date: {}", today);
    }


    private void calculateGrowthRate(CustomerAnalytics analytics) {
        LocalDate yesterday = analytics.getDate().minusDays(1);
        analyticsRepository.findByDate(yesterday).ifPresent(previousAnalytics -> {
            if (previousAnalytics.getTotalCustomers() > 0) {
                double growth = ((double) (analytics.getTotalCustomers() -
                        previousAnalytics.getTotalCustomers()) /
                        previousAnalytics.getTotalCustomers()) * 100;
                analytics.setGrowthRate(Math.round(growth * 100.0) / 100.0);
            }
        });
    }


    public Long getTotalCustomerEvents() {
        return eventRepository.count();
    }


    public Long getNewCustomersToday() {
        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        return eventRepository.countByEventTypeAndTimestampBetween(
                "CUSTOMER_CREATED",
                startOfDay,
                endOfDay
        );
    }


    public List<CustomerEventDocument> getEventsByCustomer(String customerId) {
        return eventRepository.findByCustomerId(customerId);
    }


    public CustomerAnalytics getDailyAnalytics(LocalDate date) {
        return analyticsRepository.findByDate(date).orElse(null);
    }


    public List<CustomerAnalytics> getAnalyticsRange(LocalDate start, LocalDate end) {
        return analyticsRepository.findByDateBetweenOrderByDateDesc(start, end);
    }


    public List<CustomerEventDocument> getRecentEvents() {

        return eventRepository.findTop10ByOrderByTimestampDesc();
    }

}