package com.kreitek.store.application.service;

import com.kreitek.store.application.dto.UserDTO;

public interface UserService {

    UserDTO findByNickname(String nickname);
    UserDTO saveUser(UserDTO userDTO);
    void deleteUser(Long userId);

}
