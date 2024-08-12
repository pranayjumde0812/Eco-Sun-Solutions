package com.ecosun.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtils utils;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// check authorization header from incoming request
		String authHeader = request.getHeader("Authorization");
		if (authHeader != null && authHeader.startsWith("Bearer ")) {

			String jwt = authHeader.substring(7);
			Authentication authentication = utils.populateAuthenticationTokenFromJWT(jwt);

			SecurityContextHolder.getContext().setAuthentication(authentication);
			System.out.println("saved auth token in sec context");
		}
		filterChain.doFilter(request, response);// to continue with remaining chain of spring sec filters

	}

}
