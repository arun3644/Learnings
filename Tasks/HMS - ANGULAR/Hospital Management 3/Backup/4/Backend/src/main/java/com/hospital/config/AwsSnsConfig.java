package com.hospital.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import software.amazon.awssdk.auth.credentials.DefaultCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.sns.SnsClient;

@Configuration
public class AwsSnsConfig {
	
	@Value("${aws.region:us-east-1}")
	private String awsRegion;
	
	@Bean
	@ConditionalOnProperty(name = "aws.sns.enabled", havingValue = "true")
	public SnsClient snsClient() {
		return SnsClient.builder()
				.region(Region.of(awsRegion))
				.credentialsProvider(DefaultCredentialsProvider.create())
				.build();
	}
}
