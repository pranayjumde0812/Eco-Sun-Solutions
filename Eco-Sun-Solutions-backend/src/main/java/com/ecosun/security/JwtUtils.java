package com.ecosun.security;

import java.security.Key;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtUtils {

    @Value("${EXP_TIMEOUT}")
    private int jwtExpirationMs;

    private Key key;

    @PostConstruct
    public void init() {
        // Generate a secure key for HS512
        key = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    // Generate JWT token for the authenticated user
    public String generateJwtToken(Authentication authentication) {
        CustomUserDetails userPrincipal = (CustomUserDetails) authentication.getPrincipal();
        return Jwts.builder()
                .setSubject(userPrincipal.getUsername())
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + jwtExpirationMs))
                .claim("authorities", getAuthoritiesInString(userPrincipal.getAuthorities()))
                .claim("user_id", userPrincipal.getUserId())
                .signWith(key, SignatureAlgorithm.HS512)
                .compact();
    }

    // Extract username from JWT token
    public String getUserNameFromJwtToken(Claims claims) {
        return claims.getSubject();
    }

    // Validate JWT token and return claims
    public Claims validateJwtToken(String jwtToken) {
        try {
            return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwtToken).getBody();
        } catch (Exception e) {
            log.error("JWT token validation failed", e);
            throw e;
        }
    }

    // Convert GrantedAuthority collection to comma-separated string
    private String getAuthoritiesInString(Collection<? extends GrantedAuthority> authorities) {
        return authorities.stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
    }

    // Extract authorities from claims
    public List<GrantedAuthority> getAuthoritiesFromClaims(Claims claims) {
        String authString = (String) claims.get("authorities");
        return AuthorityUtils.commaSeparatedStringToAuthorityList(authString);
    }

    // Extract user ID based on the role from claims
    public Long getUserIdFromJwtToken(Claims claims) {
        // Correctly cast user_id to Long
        return ((Integer) claims.get("user_id")).longValue();
    }

    // Populate Authentication token from JWT
    public Authentication populateAuthenticationTokenFromJWT(String jwt) {
        Claims claims = validateJwtToken(jwt);
        String username = getUserNameFromJwtToken(claims);
        List<GrantedAuthority> authorities = getAuthoritiesFromClaims(claims);
        Long userId = getUserIdFromJwtToken(claims);

        return new UsernamePasswordAuthenticationToken(username, null, authorities);
    }
}
