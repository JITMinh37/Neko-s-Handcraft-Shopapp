package com.project.shopapp.service;

import com.project.shopapp.dto.UserDTO;
import com.project.shopapp.exceptions.DataNotFoundException;
import com.project.shopapp.exceptions.InvalidParamException;
import com.project.shopapp.exceptions.PermissionDenyException;
import com.project.shopapp.model.User;
import com.project.shopapp.response.LoginResponse;

public interface IUserService {
    User createUser(UserDTO userDTO) throws DataNotFoundException, PermissionDenyException;
    LoginResponse login(String phoneNumber, String password) throws Exception;
}
