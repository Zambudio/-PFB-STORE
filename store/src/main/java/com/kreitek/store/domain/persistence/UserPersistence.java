package com.kreitek.store.domain.persistence;

import com.kreitek.store.domain.entity.User;

public interface UserPersistence {
    User findByNickname(String nickname);
    User saveUser(User user);
    void deleteUser(Long userId);
}
