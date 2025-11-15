package org.cm.walletservice.grpc;

import io.grpc.stub.StreamObserver;
import net.devh.boot.grpc.server.service.GrpcService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import wallet.WalletResponse;
import wallet.WalletServiceGrpc.WalletServiceImplBase;

@GrpcService
public class WalletGrpcService extends WalletServiceImplBase {
    private static final Logger log = LoggerFactory.getLogger(WalletGrpcService.class);

    @Override
    public void createWallet(wallet.WalletRequest walletRequest,
                             StreamObserver<wallet.WalletResponse> responseObserver) {

        log.info("createWallet request received {}", walletRequest.toString());

        // TODO : add some business logic


        WalletResponse walletResponse = WalletResponse.newBuilder()
                                             .setWalletId("12345")
                                             .setStatus("Active")
                                             .build();
        responseObserver.onNext(walletResponse);
        responseObserver.onCompleted();

    }


}
