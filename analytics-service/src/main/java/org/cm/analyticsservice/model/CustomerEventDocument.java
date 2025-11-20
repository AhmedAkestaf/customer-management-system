package org.cm.analyticsservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Objects;

@Document(collection = "customer_events")
public class CustomerEventDocument {

    @Id
    private String id;

    @Indexed
    private String customerId;

    private String name;

    @Indexed
    private String email;

    @Indexed
    private String eventType;

    @Indexed
    private LocalDateTime timestamp;

    private String address;
    private Map<String, Object> metadata;

    public CustomerEventDocument() {
    }

    public CustomerEventDocument(String id, String customerId, String name, String email,
                                 String eventType, LocalDateTime timestamp, String address,
                                 Map<String, Object> metadata) {
        this.id = id;
        this.customerId = customerId;
        this.name = name;
        this.email = email;
        this.eventType = eventType;
        this.timestamp = timestamp;
        this.address = address;
        this.metadata = metadata;
    }

    public String getId() {
        return id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getEventType() {
        return eventType;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getAddress() {
        return address;
    }

    public Map<String, Object> getMetadata() {
        return metadata;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private String id;
        private String customerId;
        private String name;
        private String email;
        private String eventType;
        private LocalDateTime timestamp;
        private String address;
        private Map<String, Object> metadata;

        public Builder id(String id) {
            this.id = id;
            return this;
        }

        public Builder customerId(String customerId) {
            this.customerId = customerId;
            return this;
        }

        public Builder name(String name) {
            this.name = name;
            return this;
        }

        public Builder email(String email) {
            this.email = email;
            return this;
        }

        public Builder eventType(String eventType) {
            this.eventType = eventType;
            return this;
        }

        public Builder timestamp(LocalDateTime timestamp) {
            this.timestamp = timestamp;
            return this;
        }

        public Builder address(String address) {
            this.address = address;
            return this;
        }

        public Builder metadata(Map<String, Object> metadata) {
            this.metadata = metadata;
            return this;
        }

        public CustomerEventDocument build() {
            return new CustomerEventDocument(id, customerId, name, email, eventType,
                    timestamp, address, metadata);
        }
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CustomerEventDocument that = (CustomerEventDocument) o;
        return Objects.equals(id, that.id) &&
                Objects.equals(customerId, that.customerId) &&
                Objects.equals(name, that.name) &&
                Objects.equals(email, that.email) &&
                Objects.equals(eventType, that.eventType) &&
                Objects.equals(timestamp, that.timestamp) &&
                Objects.equals(address, that.address) &&
                Objects.equals(metadata, that.metadata);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, customerId, name, email, eventType, timestamp, address, metadata);
    }

    @Override
    public String toString() {
        return "CustomerEventDocument{" +
                "id='" + id + '\'' +
                ", customerId='" + customerId + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", eventType='" + eventType + '\'' +
                ", timestamp=" + timestamp +
                ", address='" + address + '\'' +
                ", metadata=" + metadata +
                '}';
    }
}