package com.kreitek.store.infrastucture.persistence;

import com.kreitek.store.domain.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByNickname(String nickname);
}
