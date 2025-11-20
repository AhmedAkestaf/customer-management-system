package org.cm.analyticsservice.controller;

import org.cm.analyticsservice.model.CustomerAnalytics;
import org.cm.analyticsservice.model.CustomerEventDocument;
import org.cm.analyticsservice.service.AnalyticsService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = "*")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }


    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "UP");
        response.put("service", "analytics-service");
        return ResponseEntity.ok(response);
    }


    @GetMapping("/events/count")
    public ResponseEntity<Map<String, Long>> getTotalEvents() {
        return ResponseEntity.ok(Map.of(
                "totalEvents", analyticsService.getTotalCustomerEvents()
        ));
    }


    @GetMapping("/customers/today")
    public ResponseEntity<Map<String, Long>> getNewCustomersToday() {
        return ResponseEntity.ok(Map.of(
                "newCustomersToday", analyticsService.getNewCustomersToday(),
                "date", System.currentTimeMillis()
        ));
    }


    @GetMapping("/events/customer/{customerId}")
    public ResponseEntity<List<CustomerEventDocument>> getEventsByCustomer(
            @PathVariable String customerId) {
        List<CustomerEventDocument> events = analyticsService.getEventsByCustomer(customerId);
        return ResponseEntity.ok(events);
    }

    @GetMapping("/events/recent")
    public ResponseEntity<List<CustomerEventDocument>> getRecentEvents() {
        return ResponseEntity.ok(analyticsService.getRecentEvents());
    }




    @GetMapping("/daily/{date}")
    public ResponseEntity<CustomerAnalytics> getDailyAnalytics(
            @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        CustomerAnalytics analytics = analyticsService.getDailyAnalytics(date);
        return analytics != null
                ? ResponseEntity.ok(analytics)
                : ResponseEntity.notFound().build();
    }


    @GetMapping("/daily/today")
    public ResponseEntity<CustomerAnalytics> getTodayAnalytics() {
        CustomerAnalytics analytics = analyticsService.getDailyAnalytics(LocalDate.now());
        return analytics != null
                ? ResponseEntity.ok(analytics)
                : ResponseEntity.notFound().build();
    }


    @GetMapping("/range")
    public ResponseEntity<List<CustomerAnalytics>> getAnalyticsRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate end) {
        return ResponseEntity.ok(
                analyticsService.getAnalyticsRange(start, end)
        );
    }


    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboard() {
        Map<String, Object> dashboard = new HashMap<>();

        dashboard.put("totalEvents", analyticsService.getTotalCustomerEvents());
        dashboard.put("newCustomersToday", analyticsService.getNewCustomersToday());

        CustomerAnalytics todayAnalytics = analyticsService.getDailyAnalytics(LocalDate.now());
        dashboard.put("todayAnalytics", todayAnalytics);

        dashboard.put("recentEvents", analyticsService.getRecentEvents());

        return ResponseEntity.ok(dashboard);
    }
}