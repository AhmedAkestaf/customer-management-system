package org.cm.walletservice.grpc;

import io.grpc.Status;
import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.cm.walletservice.exception.WalletAlreadyExistsException;
import org.cm.walletservice.exception.WalletNotFoundException;
import org.cm.walletservice.model.Wallet;
import org.cm.walletservice.service.WalletService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wallet.*;

import java.time.format.DateTimeFormatter;

@GrpcService
public class WalletGrpcService extends WalletServiceGrpc.WalletServiceImplBase {
    private static final Logger log = LoggerFactory.getLogger(WalletGrpcService.class);
    private static final DateTimeFormatter ISO_FORMATTER = DateTimeFormatter.ISO_DATE_TIME;

    private final WalletService walletService;

    public WalletGrpcService(WalletService walletService) {
        this.walletService = walletService;
    }

    @Override
    public void createWallet(WalletRequest request,
                             StreamObserver<WalletResponse> responseObserver) {
        log.info("gRPC createWallet request for customer: {}", request.getCustomerId());

        try {
            Wallet wallet = walletService.createWallet(
                    request.getCustomerId(),
                    request.getName(),
                    request.getEmail(),
                    request.hasCurrency() ? request.getCurrency() : "MAD"
            );

            WalletResponse response = buildWalletResponse(wallet);

            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (WalletAlreadyExistsException e) {
            log.error("Wallet already exists: {}", e.getMessage());
            responseObserver.onError(
                    Status.ALREADY_EXISTS
                            .withDescription(e.getMessage())
                            .asRuntimeException()
            );
        } catch (Exception e) {
            log.error("Unexpected error creating wallet", e);
            responseObserver.onError(
                    Status.INTERNAL
                            .withDescription("Internal error: " + e.getMessage())
                            .asRuntimeException()
            );
        }
    }

    @Override
    public void getWalletByCustomerId(GetWalletRequest request,
                                      StreamObserver<WalletResponse> responseObserver) {
        log.info("gRPC getWalletByCustomerId for customer: {}", request.getCustomerId());

        try {
            Wallet wallet = walletService.getByCustomerId(request.getCustomerId());
            WalletResponse response = buildWalletResponse(wallet);

            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (WalletNotFoundException e) {
            responseObserver.onError(
                    Status.NOT_FOUND
                            .withDescription(e.getMessage())
                            .asRuntimeException()
            );
        } catch (Exception e) {
            responseObserver.onError(
                    Status.INTERNAL
                            .withDescription("Internal error: " + e.getMessage())
                            .asRuntimeException()
            );
        }
    }

    @Override
    public void getBalance(GetBalanceRequest request,
                           StreamObserver<BalanceResponse> responseObserver) {
        log.info("gRPC getBalance for wallet: {}", request.getWalletId());

        try {
            Wallet wallet = walletService.findById(java.util.UUID.fromString(request.getWalletId()))
                    .orElseThrow(() -> new WalletNotFoundException(
                            "Wallet not found: " + request.getWalletId()
                    ));

            BalanceResponse response = BalanceResponse.newBuilder()
                    .setWalletId(wallet.getId().toString())
                    .setBalance(wallet.getBalance().toString())
                    .setCurrency(wallet.getCurrency())
                    .setStatus(wallet.getStatus().name())
                    .build();

            responseObserver.onNext(response);
            responseObserver.onCompleted();

        } catch (WalletNotFoundException e) {
            responseObserver.onError(
                    Status.NOT_FOUND
                            .withDescription(e.getMessage())
                            .asRuntimeException()
            );
        } catch (Exception e) {
            responseObserver.onError(
                    Status.INTERNAL
                            .withDescription("Internal error: " + e.getMessage())
                            .asRuntimeException()
            );
        }
    }

    private WalletResponse buildWalletResponse(Wallet wallet) {
        return WalletResponse.newBuilder()
                .setWalletId(wallet.getId().toString())
                .setCustomerId(wallet.getCustomerId())
                .setName(wallet.getName())
                .setEmail(wallet.getEmail())
                .setBalance(wallet.getBalance().toString())
                .setStatus(wallet.getStatus().name())
                .setCurrency(wallet.getCurrency())
                .setCreatedAt(wallet.getCreatedAt().format(ISO_FORMATTER))
                .setUpdatedAt(wallet.getUpdatedAt().format(ISO_FORMATTER))
                .build();
    }
}