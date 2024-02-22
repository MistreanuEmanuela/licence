package com.example.PetPulse.Advice;

import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Component
public class ForgotPasswordToken {
    private final Map<String, TokenInfo> tokenMap = new ConcurrentHashMap<>();
    private final ScheduledExecutorService executorService = Executors.newSingleThreadScheduledExecutor();

    public ForgotPasswordToken() {
        executorService.scheduleAtFixedRate(this::cleanUpExpiredTokens, 1, 1, TimeUnit.HOURS);
    }

    public String generateToken(String email) {
        String token = UUID.randomUUID().toString();
        tokenMap.put(token, new TokenInfo(email));
        return token;
    }

    public boolean validateToken(String email, String token) {
        TokenInfo tokenInfo = tokenMap.get(token);
        boolean emailMatch = true;
        if(tokenInfo != null ){
            emailMatch = email.equals(tokenInfo.email);
        }
        return tokenInfo != null && !tokenInfo.isExpired() && emailMatch;
    }

    private void cleanUpExpiredTokens() {
        LocalDateTime now = LocalDateTime.now();
        tokenMap.entrySet().removeIf(entry -> {
            TokenInfo tokenInfo = entry.getValue();
            return tokenInfo.isExpired(now);
        });
    }

    private static class TokenInfo {
        private final String email;
        private final LocalDateTime expirationDateTime;

        public TokenInfo(String email) {
            this.email = email;
            this.expirationDateTime = LocalDateTime.now().plusHours(1);
        }

        @Override
        public String toString() {
            return "TokenInfo{" +
                    "email='" + email + '\'' +
                    ", expirationDateTime=" + expirationDateTime +
                    '}';
        }

        public boolean isExpired() {
            return isExpired(LocalDateTime.now());
        }

        public boolean isExpired(LocalDateTime now) {
            return now.isAfter(expirationDateTime);
        }
    }

}
