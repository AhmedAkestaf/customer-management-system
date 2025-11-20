package org.cm.analyticsservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Objects;

@Document(collection = "customer_analytics")
public class CustomerAnalytics {

    @Id
    private String id;

    @Indexed(unique = true)
    private LocalDate date;

    private Long totalCustomers;
    private Long newCustomers;
    private Long updatedCustomers;
    private Long deletedCustomers;
    private Double growthRate;
    private LocalDateTime lastUpdated;

    public CustomerAnalytics() {
    }

    public CustomerAnalytics(String id, LocalDate date, Long totalCustomers, Long newCustomers,
                             Long updatedCustomers, Long deletedCustomers, Double growthRate,
                             LocalDateTime lastUpdated) {
        this.id = id;
        this.date = date;
        this.totalCustomers = totalCustomers;
        this.newCustomers = newCustomers;
        this.updatedCustomers = updatedCustomers;
        this.deletedCustomers = deletedCustomers;
        this.growthRate = growthRate;
        this.lastUpdated = lastUpdated;
    }

    public String getId() {
        return id;
    }

    public LocalDate getDate() {
        return date;
    }

    public Long getTotalCustomers() {
        return totalCustomers;
    }

    public Long getNewCustomers() {
        return newCustomers;
    }

    public Long getUpdatedCustomers() {
        return updatedCustomers;
    }

    public Long getDeletedCustomers() {
        return deletedCustomers;
    }

    public Double getGrowthRate() {
        return growthRate;
    }

    public LocalDateTime getLastUpdated() {
        return lastUpdated;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public void setTotalCustomers(Long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public void setNewCustomers(Long newCustomers) {
        this.newCustomers = newCustomers;
    }

    public void setUpdatedCustomers(Long updatedCustomers) {
        this.updatedCustomers = updatedCustomers;
    }

    public void setDeletedCustomers(Long deletedCustomers) {
        this.deletedCustomers = deletedCustomers;
    }

    public void setGrowthRate(Double growthRate) {
        this.growthRate = growthRate;
    }

    public void setLastUpdated(LocalDateTime lastUpdated) {
        this.lastUpdated = lastUpdated;
    }


    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String id;
        private LocalDate date;
        private Long totalCustomers;
        private Long newCustomers;
        private Long updatedCustomers;
        private Long deletedCustomers;
        private Double growthRate;
        private LocalDateTime lastUpdated;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder date(LocalDate date) {
            this.date = date;
            return this;
        }

        public Builder totalCustomers(Long totalCustomers) {
            this.totalCustomers = totalCustomers;
            return this;
        }

        public Builder newCustomers(Long newCustomers) {
            this.newCustomers = newCustomers;
            return this;
        }

        public Builder updatedCustomers(Long updatedCustomers) {
            this.updatedCustomers = updatedCustomers;
            return this;
        }

        public Builder deletedCustomers(Long deletedCustomers) {
            this.deletedCustomers = deletedCustomers;
            return this;
        }

        public Builder growthRate(Double growthRate) {
            this.growthRate = growthRate;
            return this;
        }

        public Builder lastUpdated(LocalDateTime lastUpdated) {
            this.lastUpdated = lastUpdated;
            return this;
        }

        public CustomerAnalytics build() {
            return new CustomerAnalytics(id, date, totalCustomers, newCustomers,
                    updatedCustomers, deletedCustomers, growthRate,
                    lastUpdated);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomerAnalytics that = (CustomerAnalytics) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(date, that.date) &&
                Objects.equals(totalCustomers, that.totalCustomers) &&
                Objects.equals(newCustomers, that.newCustomers) &&
                Objects.equals(updatedCustomers, that.updatedCustomers) &&
                Objects.equals(deletedCustomers, that.deletedCustomers) &&
                Objects.equals(growthRate, that.growthRate) &&
                Objects.equals(lastUpdated, that.lastUpdated);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, date, totalCustomers, newCustomers, updatedCustomers,
                deletedCustomers, growthRate, lastUpdated);
    }

    @Override
    public String toString() {
        return "CustomerAnalytics{" +
                "id='" + id + '\'' +
                ", date=" + date +
                ", totalCustomers=" + totalCustomers +
                ", newCustomers=" + newCustomers +
                ", updatedCustomers=" + updatedCustomers +
                ", deletedCustomers=" + deletedCustomers +
                ", growthRate=" + growthRate +
                ", lastUpdated=" + lastUpdated +
                '}';
    }
}