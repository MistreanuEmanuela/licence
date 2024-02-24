package com.example.PetPulse;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication(scanBasePackages={"com.example.*"})
@EnableJpaRepositories(basePackages = "com.example.PetPulse.repositories")
@Configuration
@EntityScan(basePackages = "com.example.PetPulse.models.entities")
public class PetPulseApplication {

	public static void main(String[] args) {
		SpringApplication.run(PetPulseApplication.class, args);
		System.out.print("Start");
	}

}
