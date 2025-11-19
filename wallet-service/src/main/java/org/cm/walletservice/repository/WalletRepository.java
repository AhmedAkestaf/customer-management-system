package org.cm.walletservice.repository;

import org.cm.walletservice.model.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface WalletRepository extends JpaRepository<Wallet, UUID> {
    Optional<Wallet> findByCustomerId(String customerId);
    boolean existsByCustomerId(String customerId);
    boolean existsByEmail(String email);
}