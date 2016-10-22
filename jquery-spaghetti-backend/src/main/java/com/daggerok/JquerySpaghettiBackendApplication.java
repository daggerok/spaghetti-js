package com.daggerok;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.stream.Stream;

@SpringBootApplication
public class JquerySpaghettiBackendApplication extends RepositoryRestConfigurerAdapter {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Person.class);
    }

    @Bean
    CommandLineRunner runner(PeopleRepository peopleRepository) {

        return args -> Stream.of("Max", "Fax")
                .map(Person::new)
                .forEach(peopleRepository::save);
    }

    public static void main(String[] args) {
        SpringApplication.run(JquerySpaghettiBackendApplication.class, args);
    }
}

@RepositoryRestResource(collectionResourceRel = "people", path = "people")
interface PeopleRepository extends JpaRepository<Person, Long> {}

@Data
@Entity
@NoArgsConstructor
@RequiredArgsConstructor
class Person implements Serializable {

    @Id @GeneratedValue Long id;
    @NonNull String name;
}
