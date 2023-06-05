package com.kreitek.store.infrastucture.persistence;

import com.kreitek.store.domain.entity.User;
import com.kreitek.store.domain.persistence.UserPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class UserPersistenceImpl implements UserPersistence {

    private final UserRepository userRepository;

    @Autowired
    public UserPersistenceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User findByNickname(String nickname) {
        return userRepository.findByNickname(nickname);
    }

    @Override
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }


}