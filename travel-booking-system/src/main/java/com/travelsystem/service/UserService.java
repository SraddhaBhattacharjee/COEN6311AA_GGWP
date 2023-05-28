package com.travelsystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelsystem.model.User;
import com.travelsystem.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	public User createUser(User user) {
		return userRepository.save(user);
	}

	public List<User> getAllUsers() {
		return userRepository.findAll();
	}

	public User getUser(User user) {
		return userRepository.findByEmailAndPassword(user.getEmail(), user.getPassword());
	}

	public User getAllUser(Long userId) {
		return userRepository.findById(userId).get();
	}
}
