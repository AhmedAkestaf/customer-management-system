package org.cm.walletservice.service;

import org.cm.walletservice.exception.WalletAlreadyExistsException;
import org.cm.walletservice.exception.WalletNotFoundException;
import org.cm.walletservice.model.Wallet;
import org.cm.walletservice.model.WalletStatus;
import org.cm.walletservice.repository.WalletRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

@Service
public class WalletService {
    private static final Logger log = LoggerFactory.getLogger(WalletService.class);

    private final WalletRepository walletRepository;

    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    @Transactional
    public Wallet createWallet(String customerId, String name, String email, String currency) {
        log.info("Creating wallet for customer: {}", customerId);

        if (walletRepository.existsByCustomerId(customerId)) {
            log.warn("Wallet already exists for customer: {}", customerId);
            throw new WalletAlreadyExistsException(
                    "Wallet already exists for customer: " + customerId
            );
        }

        Wallet wallet = new Wallet();
        wallet.setCustomerId(customerId);
        wallet.setName(name);
        wallet.setEmail(email);
        wallet.setBalance(BigDecimal.ZERO);
        wallet.setStatus(WalletStatus.ACTIVE);
        wallet.setCurrency(currency != null ? currency : "USD");

        Wallet savedWallet = walletRepository.save(wallet);
        log.info("Wallet created successfully with ID: {}", savedWallet.getId());

        return savedWallet;
    }

    public Optional<Wallet> findByCustomerId(String customerId) {
        return walletRepository.findByCustomerId(customerId);
    }

    public Wallet getByCustomerId(String customerId) {
        return walletRepository.findByCustomerId(customerId)
                .orElseThrow(() -> new WalletNotFoundException(
                        "Wallet not found for customer: " + customerId
                ));
    }

    public Optional<Wallet> findById(UUID walletId) {
        return walletRepository.findById(walletId);
    }
}