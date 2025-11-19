package org.cm.customerservice.grpc;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.StatusRuntimeException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import wallet.WalletRequest;
import wallet.WalletResponse;
import wallet.WalletServiceGrpc;

import jakarta.annotation.PreDestroy;

@Service
public class WalletGrpcServiceClient {
    private static final Logger log = LoggerFactory.getLogger(WalletGrpcServiceClient.class);

    private final WalletServiceGrpc.WalletServiceBlockingStub blockingStub;
    private final ManagedChannel channel;

    public WalletGrpcServiceClient(
            @Value("${WALLET_SERVICE_ADDRESS:localhost}") String serverAddress,
            @Value("${WALLET_SERVICE_GRPC_PORT:9001}") int serverPort
    ) {
        log.info("Initializing gRPC client for Wallet Service at {}:{}",
                serverAddress, serverPort);

        this.channel = ManagedChannelBuilder
                .forAddress(serverAddress, serverPort)
                .usePlaintext()
                .build();

        this.blockingStub = WalletServiceGrpc.newBlockingStub(channel);
    }

    public WalletResponse createWallet(String customerId, String name, String email) {
        log.info("Calling wallet service to create wallet for customer: {}", customerId);

        try {
            WalletRequest request = WalletRequest.newBuilder()
                    .setCustomerId(customerId)
                    .setName(name)
                    .setEmail(email)
                    .build();

            WalletResponse response = blockingStub.createWallet(request);
            log.info("Wallet created successfully: {}", response.getWalletId());

            return response;

        } catch (StatusRuntimeException e) {
            log.error("gRPC call failed: {}", e.getStatus());
            throw new RuntimeException("Failed to create wallet: " + e.getStatus().getDescription(), e);
        }
    }

    @PreDestroy
    public void shutdown() {
        if (channel != null && !channel.isShutdown()) {
            log.info("Shutting down gRPC channel");
            channel.shutdown();
        }
    }
}