package org.cm.customerservice.grpc;

import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import wallet.WalletRequest;
import wallet.WalletResponse;
import wallet.WalletServiceGrpc;

@Service
public class WalletGrpcServiceClient {
    private static final Logger log = LoggerFactory.getLogger(WalletGrpcServiceClient.class);
    private final WalletServiceGrpc.WalletServiceBlockingStub blockingStub;

    public WalletGrpcServiceClient(
            @Value("${WALLET_SERVICE_ADDRESS:localhost}") String serverAddress,
            @Value("${WALLET_SERVICE_GRPC_PORT:9001}") int serverPort
    ) {
        log.info("Connecting to Wallet Service Grpc server at {}:{}", serverAddress, serverPort);

        ManagedChannel channel = ManagedChannelBuilder.forAddress(serverAddress
                , serverPort).usePlaintext().build();

        blockingStub = WalletServiceGrpc.newBlockingStub(channel);

    }

    public WalletResponse createWallet(String customerId , String name , String email){

        WalletRequest request = WalletRequest.newBuilder().setCustomerId(customerId)
                 .setName(name).setEmail(email).build();

        WalletResponse response = blockingStub.createWallet(request);
        log.info("Received response from wallet service via GRPC: {}", response);
        return response;



    }

}
