package com.kreitek.store.application.service.impl;

import com.kreitek.store.application.dto.UserDTO;
import com.kreitek.store.application.mapper.UserMapper;
import com.kreitek.store.application.service.UserService;
import com.kreitek.store.domain.entity.User;
import com.kreitek.store.domain.persistence.UserPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserPersistence persistence;
    private final UserMapper mapper;

    @Autowired
    public UserServiceImpl(UserPersistence persistence, UserMapper mapper) {
        this.persistence = persistence;
        this.mapper = mapper;
    }

    @Override
    public UserDTO findByNickname(String nickname) {
        User user = this.persistence.findByNickname(nickname);
        return this.mapper.toDto(user);
    }

    @Override
    public UserDTO saveUser(UserDTO userDTO) {
        User userSaved = this.persistence.saveUser(this.mapper.toEntity(userDTO));
        return this.mapper.toDto(userSaved);
    }

    @Override
    public void deleteUser(Long userId) {
        this.persistence.deleteUser(userId);
    }

}
