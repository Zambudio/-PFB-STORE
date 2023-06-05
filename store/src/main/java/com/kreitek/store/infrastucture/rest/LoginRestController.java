package com.kreitek.store.infrastucture.rest;

import com.kreitek.store.application.dto.UserDTO;
import com.kreitek.store.application.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class LoginRestController {

    private final UserService userService;

    @Autowired
    public LoginRestController(UserService userService) {
        this.userService = userService;
    }

    @CrossOrigin
    @GetMapping(value = "/{nickname}", produces = "application/json")
    ResponseEntity<UserDTO> getUserByNickname(@PathVariable String nickname) {
        UserDTO user = this.userService.findByNickname(nickname);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @CrossOrigin
    @PostMapping(produces = "application/json", consumes = "application/json")
    ResponseEntity<UserDTO> createUser(@RequestBody UserDTO userDTO) {
        userDTO = this.userService.saveUser(userDTO);
        return new ResponseEntity<>(userDTO, HttpStatus.CREATED);
    }

    @CrossOrigin
    @DeleteMapping(value = "/{userId}")
    ResponseEntity<?> deleteUser(@PathVariable Long userId) {
        this.userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}
