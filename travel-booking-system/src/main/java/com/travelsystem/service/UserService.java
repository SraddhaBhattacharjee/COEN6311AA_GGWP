package com.travelsystem.service;

import java.util.List;
import java.util.Optional;

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

	public User updateUser(User user) {
		Optional<User> findById = userRepository.findById(user.getId());
		User updateUser = findById.get();
		updateUser.setDateOfBirth(user.getDateOfBirth());
		updateUser.setFirstName(user.getFirstName());
		updateUser.setLastName(user.getLastName());
		updateUser.setEmail(user.getEmail());
		updateUser.setPassword(user.getPassword());
		return userRepository.save(updateUser);
	}
}
