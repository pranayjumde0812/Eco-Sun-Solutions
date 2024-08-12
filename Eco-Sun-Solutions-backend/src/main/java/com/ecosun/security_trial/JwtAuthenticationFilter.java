package com.ecosun.security_trial;
//package com.ecosun.security;
//
//import java.io.IOException;
//
//import javax.servlet.FilterChain;
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import io.jsonwebtoken.ExpiredJwtException;
//import io.jsonwebtoken.MalformedJwtException;
//
//public class JwtAuthenticationFilter extends OncePerRequestFilter { //step 5
//
//	@Autowired
//	private UserDetailsService userDetailsSrvice;
//
//	@Autowired
//	private JwtTokenHelper jwtTokenHelper;
//
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//
//		// 1. get token
//		String requestToken = request.getHeader("Authorization");
//
//		String username = null;
//
//		String token = null;
//
//		if (request != null && requestToken.startsWith("Bearer")) {
//			token = requestToken.substring(7);
//			try {
//				username = this.jwtTokenHelper.getUsernameFromToken(token);
//
//			} catch (IllegalArgumentException e) {
//				System.out.println("Unable to get jwt token");
//			} catch (ExpiredJwtException e) {
//				System.out.println("jwt token has expired");
//			} catch (MalformedJwtException e) {
//				System.out.println("invalid jwtb token");
//			}
//		} else {
//			System.out.println("JWT token does not starts with bearer");
//		}
//
//		// once we get the token
//
//		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//
//			UserDetails userDetails = this.userDetailsSrvice.loadUserByUsername(username);
//
//			if (this.jwtTokenHelper.validateToken(token, userDetails)) {
//
//				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
//						userDetails, null, userDetails.getAuthorities());
//
//				authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//			} else {
//				System.out.println("Invalid JWT token");
//			}
//		} else {
//			System.out.println("Username is null or context is not null");
//		}
//
//		filterChain.doFilter(request, response);
//	}
//
//}
