package com.example.demo.repositories;

import com.example.demo.domain.user.RegisterDTO;
import com.example.demo.domain.user.User;
import com.example.demo.domain.user.UserRole;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.ActiveProfiles;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
class UserRepositoryTest {
    @Autowired
    UserRepository repository;

    @Autowired
    EntityManager entityManager;

    @Test

    void UserRepository_findByLogin_ReturnUserWithSpecficLogin() {
        String login = "Rapha";
        RegisterDTO data = new RegisterDTO(login,"123", UserRole.USER);
        this.createUser(data);

        UserDetails result = this.repository.findByLogin(login);

        assertThat(result).isNotNull();
    }

    @Test

    void UserRepository_findByLogin_DontReturnAnyUsers() {
        String login = "pedro";

        UserDetails result = this.repository.findByLogin(login);

        assertThat(result).isNull();
    }

    private User createUser(RegisterDTO data){
        User newUser = new User(data);
        this.entityManager.persist(newUser);
        return newUser;
    }
}